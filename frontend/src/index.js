import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './Layout';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Routers
import RestaurantList, { loadRestaurants } from "./RestaurantList";
import SingleRestaurant, { loadRestaurant } from "./SingleRestaurant";
import CreateRestaurant from "./CreateRestaurant";

import MenuList, { loadMenus } from "./MenuList";
import SingleMenu, { loadMenu } from "./SingleMenu";
import CreateMenu from "./CreateMenu";

import ItemList, { loadItems } from "./ItemList";
import SingleItem, { loadItem } from "./SingleItem";
import CreateItem from "./CreateItem";

/*
	Referencing lecture slides
*/
const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/restaurant/new",
				element: <CreateRestaurant/>,
			},
			{
				path: "/restaurant",
				element: <RestaurantList/>,
				loader: loadRestaurants,
			},
			{
				path: "/restaurant/:restaurantId",
				element: <SingleRestaurant/>,
				loader: loadRestaurant,
				children: [
					{
						path: "menu/new",
						element: <CreateMenu />,
					},
					{
	
						path: "menu",
						element: <MenuList />,
						loader: loadMenus,
					},
					{
						path: "menu/:menuId",
						element: <SingleMenu />,
						loader: loadMenu,
            			children: [
							{
								path: "item", 
								element: <ItemList />,
								loader: loadItems,
							}, 
							{
								path: "item/new", 
								element: <CreateItem />, 
							},
							{
								path: "item/:itemId", 
								element: <SingleItem />, 
								loader: loadItem, 
							},
						]
					},
					
				]
			},
		]
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);


reportWebVitals();
