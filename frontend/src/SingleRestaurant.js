import { useLoaderData, Outlet, Link } from "react-router-dom";

async function loadRestaurant(request) {
	console.log(request);
	const id = request.params.restaurantId;
	const response = await fetch(`http://localhost:3001/restaurant/${id}`);
	return await response.json();
}

export default function SingleRestaurant() {
	const restaurant = useLoaderData();

	return (
		<div className="restaurant">
			<h1>↓↓↓Restaurant↓↓↓</h1>
			<h2>{restaurant.name}</h2>
			<Link to={`/restaurant/${restaurant._id}/menu`}><p>{restaurant._id}</p></Link>
			<p>{"Restaurant Location:"} {restaurant.location}</p>
			
			<Outlet />
		</div>
	)
}

export { loadRestaurant };
