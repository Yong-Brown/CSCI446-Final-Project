import { Router } from "express";
import { ObjectId } from "mongodb";
import TodosRouter from "./menus.js";
import { v4 as uuidv4 } from 'uuid';
import MenusRouter from "./menus.js";

const RestaurantsRouter = Router();

RestaurantsRouter.use("/:restaurantId/menu", MenusRouter);

// Get all restaurants
RestaurantsRouter.get("/", async (req, res) => {
	const db = req.app.get("db");
	const menus = await db.collection("restaurants").find().toArray();

  return res.json(menus);
});

// Get a single restaurant
RestaurantsRouter.get("/:id", async (req, res) => {
	const db = req.app.get("db");

	const menu = await db.collection("restaurants").findOne({ _id: (req.params.id) });

	return res.json(menu);
});

// Create a new restaurant
RestaurantsRouter.post("/", async (req, res) => {
	const db = req.app.get("db");

	try {
        
		const newRestaurant = {
            _id: uuidv4(), 
            ...req.body
        };
        const result = await db.collection("restaurants").insertOne(newRestaurant);
	
		console.info(result);
		res.status(201).json(result.insertedId);
	} catch (e) {
		console.error(e);
		return res.status(500).end();
	}
});

export default RestaurantsRouter;

