import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const result = await response.json();
        setData(result.users); // Accessing users array from response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchApi();
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        <div>
          {data.map((item) => (
            <div key={item.id}>
              <h1>{item.firstName} {item.lastName}</h1>
              <p>Email: {item.email}</p>
              <p>Age: {item.age}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading user data...</div>
      )}
    </div>
  );
};

export default App;
