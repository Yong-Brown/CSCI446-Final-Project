import { useLoaderData, Outlet, Link } from "react-router-dom";

export async function loadMenu(request) {
	const response = await fetch(
		`http://localhost:3001/restaurant/${request.params.restaurantId}/menu/${request.params.menuId}`
	);
	return await response.json();
}

export default function SingleMenu() {
	const menu = useLoaderData();
	return (
		<div className="menu">
			<h2>↓↓↓Menu Type↓↓↓</h2>
			<h3>{menu.type}</h3>
			<Link to={`/restaurant/${menu.restaurant_id}/menu/${menu._id}/item`}><p>{menu._id}</p></Link>		
			<p>{"Related Restaurant Id:"} {menu.restaurant_id}</p>

			<Outlet />
		</div>
	);
}