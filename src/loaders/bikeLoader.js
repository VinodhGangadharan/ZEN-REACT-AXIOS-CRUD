import axios from 'axios';
// Loading Data for component using loader
const bikeLoader = async () => {
    const response = await axios.get('https://66baf3856a4ab5edd636a698.mockapi.io/bikes');
    return response.data;
}
export default bikeLoader;