import { useState } from "react"
import { useParams, Link } from "react-router-dom";

export default function CreateForm() {

    const { restaurantId } = useParams();
	const initialFormData = {
		type: '',
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
		
	
		setFormData({
			...formData,
			type: event.target.value,		
		});

		
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		
		const result = await fetch(`http://localhost:3001/restaurant/${formData.restaurant}/menu`, {
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
        
		<div className="menu">
			<h2>↓↓↓Create A New Menu Type↓↓↓</h2>

			{message.msg ?
				<>
					<label>{message.msg}</label>
					<Link to={`/restaurant/${formData.restaurant_id}/menu/${message.newId}`}>New Menu Type created!</Link>
				</>
				: null
			}
			<form onSubmit={handleSubmit}>
				<label>Menu Type: </label>
				<input type="text" placeholder="type" value={formData.type} onChange={handleChange} />
				<br />
				<button type="submit">Create</button>
			</form>
		</div>
	)
}