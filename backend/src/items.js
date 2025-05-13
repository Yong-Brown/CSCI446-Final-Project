import { Router } from "express";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from 'uuid';

const ItemsRouter = Router();
ItemsRouter.mergeParams = true;


// routers

ItemsRouter.get("/", async (req, res) => {
	const db = req.app.get("db");

	const menuId = req.params.menuId; // Assuming mergeParams is true
	const items = await db.collection("items").find({ type_id: (menuId) }).toArray();
    return res.json(items);


});

ItemsRouter.get("/:itemId", async (req, res) => {
	const db = req.app.get("db");
	const item = await db.collection("items").findOne({ _id: (req.params.itemId) });
	//const todo = await db.collection("todos").findOne({ _id: new ObjectId(req.params.todoId) });

	return res.json(item);
});

ItemsRouter.post("/", async (req, res) => {
	const db = req.app.get("db");

	try {

		// use uuidv4 to generate a unique id for the new project
		const newItem = {
            _id: uuidv4(), 
            ...req.body
        };
        const result = await db.collection("items").insertOne(newItem);
		//const result = await db.collection("todos").insertOne(req.body);
		console.info(result);
		res.status(201).json(result.insertedId);
	} catch (e) {
		console.error(e);
		return res.status(500).end();
	}
});


export default ItemsRouter;

