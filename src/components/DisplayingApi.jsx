import { useState, useEffect } from 'react';
function DisplayingApi() {
  const [responseData, setResponseData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://0fazax1en4.execute-api.us-east-1.amazonaws.com/test-environment/transactions?id=12&type=231&amount=2fdgfd1');
      const data = await response.json();
      setResponseData(data);
    }
    fetchData();
  }, []);
  return (
    <div>
      <p>Response data: {JSON.stringify(responseData)}</p>
    </div>
  );
}
export default DisplayingApi;
