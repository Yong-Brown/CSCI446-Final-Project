import { Router } from "express";
import { ObjectId } from "mongodb";
import ItemsRouter from "./items.js";
import { v4 as uuidv4 } from 'uuid';

const MenusRouter = Router();
MenusRouter.mergeParams = true;

MenusRouter.use("/:menuId/item", ItemsRouter);
// routers

MenusRouter.get("/", async (req, res) => {
	const db = req.app.get("db");

	const restaurantId = req.params.restaurantId; // Assuming mergeParams is true
	const menus = await db.collection("menus").find({ restaurant_id: (restaurantId) }).toArray();
    return res.json(menus);


});

MenusRouter.get("/:menuId", async (req, res) => {
	const db = req.app.get("db");
	const menu = await db.collection("menus").findOne({ _id: (req.params.menuId) });

	return res.json(menu);
});

MenusRouter.post("/", async (req, res) => {
	const db = req.app.get("db");

	try {

		// use uuidv4 to generate a unique id for the new project
		const newMenu = {
            _id: uuidv4(), 
            ...req.body
        };
        const result = await db.collection("menus").insertOne(newMenu);

		console.info(result);
		res.status(201).json(result.insertedId);

	} catch (e) {
		console.error(e);
		return res.status(500).end();
	}
});

export default MenusRouter;

