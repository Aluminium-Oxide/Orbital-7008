// Front-End/src/pages/EA.tsx

import { useEffect, useState } from 'react';

export default function EA() {
  const [buildingData, setBuildingData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/buildings/EA')
      .then(res => res.json())
      .then(data => {
        setBuildingData(data);
        console.log('data recieved:', data);
      })
      .catch(err => console.error('error:', err));
  }, []);

  return (
    <div>
      <h1>EA floor plans</h1>
      {buildingData ? (
        <pre>{JSON.stringify(buildingData, null, 2)}</pre>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
