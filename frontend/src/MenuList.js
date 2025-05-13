import { useParams, useLoaderData, Link } from "react-router-dom";

async function loadMenus(request) {
	try {
		const response = await fetch(`http://localhost:3001/restaurant/${request.params.restaurantId}/menu`);
		return await response.json();
	} catch (error) {
        console.error("Failed to load menus:", error);
        // Return a default value in case of error
        return []; // Return an empty array or any error indication as needed
    }
}

export default function MenuList() {
	const menus = useLoaderData();
	const { restaurantId } = useParams();
	console.log(menus);
    console.log(menus.length);

	return (
		<div className="menu">
			<h2>↓↓↓Menu Type List↓↓↓</h2>
			<Link to={`/restaurant/${restaurantId}/menu/new`}><h3>New Menu?</h3></Link>
			<div className="menuList">
				{menus.length > 0 ? 
				(menus.map((data) => (
					<article key={data._id}>
						<h3>{data.type}</h3>
						<Link to={`/restaurant/${data.restaurant_id}/menu/${data._id}`}><p>{data._id}</p></Link>
						
		
					</article>
				))
				) : (
					<p>No menus found.</p>
				)}
			</div>
		</div>
	);
}

export { loadMenus };