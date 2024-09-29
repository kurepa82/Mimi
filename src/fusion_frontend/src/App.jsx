import React, { useState, useEffect } from 'react';
import './index.scss';

const App = () => {
    const [activity, setActivity] = useState('');
    const [activities, setActivities] = useState([]);
    const CANISTER_ID = 'bkyz2-fmaaa-aaaaa-qaaaq-cai'; // canister

    const fetchActivities = async () => {
      try {
          const response = await fetch(`https://${CANISTER_ID}.ic0.app/getActivities`);
          const data = await response.json();
          const dataArray = Array.isArray(data) ? data : Object.values(data); // Convierte un map a un array si es necesario
          setActivities(dataArray);
      } catch (error) {
          console.error('Error fetching activities:', error);
      }
  };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (activity) {
            try {
                await fetch(`https://${CANISTER_ID}.ic0.app/addActivity`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ description: activity }),
                });
                setActivity('');
                fetchActivities();
            } catch (error) {
                console.error('Error adding activity:', error);
            }
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    return (
        <div className="app-container">
            <h1>Mimi<i className="fas fa-paw"></i></h1>
            <h2>Registra la Actividad de Tu Mascota</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Actividad de tu mascota"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                />
                <button type="submit">
                    <i className="fas fa-plus-circle"></i> Registrar
                </button>
            </form>
            <h3>Actividades Registradas:</h3>
            <ul>
                {activities.map((act, index) => (
                    <li key={index}>
                        <i className="fas fa-paw"></i> {act.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
