import { useLoaderData } from "react-router-dom";

export async function loadItem(request) {
	const response = await fetch(
		`http://localhost:3001/restaurant/${request.params.restaurantId}/menu/${request.params.menuId}/item/${request.params.itemId}`
	);
	return await response.json();
}

export default function SingleItem() {
	const item = useLoaderData();
	return (
		<div className="item">
			<h3>↓↓↓Item↓↓↓</h3>
			<h4>{item.name}</h4>
			<p>{item._id}</p>
			<p>{"Item Price:"} {item.price}</p>
			<p>{"Related Type Id:"} {item.type_id}</p>
			<p>{"Related Restaurant Id:"} {item.restaurant_id}</p>
		</div>
	);
}