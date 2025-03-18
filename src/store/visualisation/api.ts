import axios from 'axios';
const apiKey = process.env.REACT_APP_NASA_API_KEY || 'DEMO_KEY'; 
export const fetchApiData = async () => {
  const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`);
    return response.data;
  };