import { useParams, useLoaderData, Link } from "react-router-dom";

async function loadItems(request) {
	try {
		const response = await fetch(`http://localhost:3001/restaurant/${request.params.restaurantId}/menu/${request.params.menuId}/item`);
		return await response.json();
	} catch (error) {
        console.error("Failed to load items:", error);
        // Return a default value in case of error
        return []; // Return an empty array or any error indication as needed
    }
}

export default function ItemList() {
	const items = useLoaderData();
	const { restaurantId, menuId } = useParams();
	console.log(items);
    console.log(items.length);

	return (
		<div className="item">
			<h3>↓↓↓Item List↓↓↓</h3>
			<Link to={`/restaurant/${restaurantId}/menu/${menuId}/item/new`}><h4>New Item?</h4></Link>
			<div className="itemList">
				{items.length > 0 ? 
				(items.map((data) => (
					<article key={data._id}>
						<h4>{data.name}</h4>
						<Link to={`/restaurant/${data.restaurant_id}/menu/${data.type_id}/item/${data._id}`}><p>{"Item Id:"} {data._id}</p></Link>
						
		
					</article>
				))
				) : (
					<p>No items found.</p>
				)}
			</div>
		</div>
	);
}

export { loadItems };