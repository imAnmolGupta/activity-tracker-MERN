import "./App.css";
import { useEffect, useState } from "react";


const App=() =>{

  const [activities, setActivities] = useState([]);

  /* Fetching the data from the backend and setting the state of activities to the data. */
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/activities`
      );
      const data = await result.json();
      setActivities(data);
    };
    fetchData();
  }, []);

   /**
   * When the user clicks the submit button, the function will prevent the default action of the form,
   * create a new activity object with the name and time values from the form, and then send a POST
   * request to the backend to create a new activity
   */

  const addActivity = async (event) => {
    event.preventDefault();
    
    const newActivity = {
      name: event.target.activity.value,
      time: event.target.time.value,
    };
    
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/activity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newActivity),
    });
    
    event.target.activity.value = ""; // sets input empty after clicking submit
    event.target.time.value = ""; // sets input empty after clicking submit
    window.location.reload(); // reloads the window after sending request
  };


  return <div className="app">
          <header className="app-header">
            <h1>Activity Tracker</h1>
            <form onSubmit={addActivity}>
              
              <div>
                <label htmlFor="activity">Activity:</label>
                <input
                  type="text"
                  id="activity"
                  name="activity"
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="time">Time Taken:</label>
                <input type="text" id="time" name="time" autoComplete="off" />
              </div>
              <button type="submit">Add</button>
            </form>
          </header>
          <main className="app-main">
          <h2>Today</h2>
            {activities && activities.length > 0 ? (
              <ol>
                {activities.map((activity) => (
                  <li key={activity._id}>
                    {activity.name} - {activity.time}
                  </li>
                ))}
              </ol>
            ) : (
              <p>No activities yet</p>
)}
          </main>
        </div>
}

export default App;