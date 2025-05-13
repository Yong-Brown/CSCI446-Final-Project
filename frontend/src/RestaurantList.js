import { useLoaderData, Link } from "react-router-dom";

async function loadRestaurants() {
	const response = await fetch(`http://localhost:3001/restaurant`);
	return await response.json();
}

export default function RestaurantList() {
	const list = useLoaderData();

	console.log(list);

	return (
		<div className="restaurant">
			<h1>↓↓↓Restaurant List↓↓↓</h1> 
			<Link to={`/restaurant/new`}><h2>New?</h2></Link>
			<div className="restaurantList">
			{list.map((data) => (
				
				<article key={data._id}>
					<h2>{data.name}</h2>
					<Link to={`/restaurant/${data._id}`}><p>{data._id}</p></Link>
				</article>
				
			))}
			</div>
		</div>
	);
}

export { loadRestaurants };
