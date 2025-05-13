import { useState } from "react"
import { useParams, Link } from "react-router-dom";

export default function CreateForm() {

    const { restaurantId, menuId } = useParams();
	const initialFormData = {
		name: '',
		price: '',
		type_id: menuId,
		restaurant_id: restaurantId,
	};

	const initialResultMessage = {
		msg: '',
		newId: null,
	};
	// INFO: Rather than use separate hooks, let's jam the state together
	const [formData, setFormData] = useState(initialFormData);
	const [message, setMessage] = useState(initialResultMessage);

	const handleChange = (event) => {
		
	
		if (event.target.placeholder === 'name') {
			setFormData({
				...formData,
				name: event.target.value,		
			});
		}
		
		else if (event.target.placeholder === 'price') {
			setFormData({
				...formData,
				price: event.target.value,		
			});
		}

		
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		
		const result = await fetch(`http://localhost:3001/restaurant/${formData.restaurant_id}/menu/${formData.type_id}/item`, {
			method: "POST",
            mode: 'cors',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		if (result.status !== 201) {
			setMessage({ msg: "Failed to create new whatever...", newId: null });
			return;
		}

		const newId = await result.json();
		setMessage({ msg: "Successfully created!", newId });
		setFormData(initialFormData);
	}

	return (
        
		<div className="item">
			<h3>↓↓↓Create A New Item↓↓↓</h3>

			{message.msg ?
				<>
					<label>{message.msg}</label>
					<Link to={`/restaurant/${formData.restaurant_id}/menu/${formData.type_id}/item/${message.newId}`}>New Item created!</Link>
				</>
				: null
			}
			<form onSubmit={handleSubmit}>
				<label>Item Name: </label>
				<input type="text" placeholder="name" value={formData.name} onChange={handleChange} />
				<br />
				<label>Item price: </label>
				<input type="text" placeholder="price" value={formData.price} onChange={handleChange} />
				<br />
				<button type="submit">Create</button>
			</form>
		</div>
	)
}