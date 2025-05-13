import { useState } from "react"
import { useParams, Link } from "react-router-dom";

export default function CreateForm() {

    //const { restaurantId } = useParams();
	const initialFormData = {
		name: '',
		location: '',
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
		
		else if (event.target.placeholder === 'location') {
			setFormData({
				...formData,
				location: event.target.value,		
			});
		}
		
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		
		const result = await fetch(`http://localhost:3001/restaurant`, {
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
        
		<div className="restaurant">
			<h1>↓↓↓Create A New Restaurant↓↓↓</h1>

			{message.msg ?
				<>
					<label>{message.msg}</label>
					<Link to={`/restaurant/${message.newId}`}>New Restaurant created!</Link>
				</>
				: null
			}
			<form onSubmit={handleSubmit}>
				<label>Restaurant Name: </label>
				<input type="text" placeholder="name" value={formData.name} onChange={handleChange} />
				<br />
				<label>Restaurant Location: </label>
				<input type="text" placeholder="location" value={formData.location} onChange={handleChange} />
				<br />
				<button type="submit">Create</button>
			</form>
		</div>
	)
}
