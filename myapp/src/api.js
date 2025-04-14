import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000"; // Your Flask backend

export const fetchFilteredData = async (filters) => {
    try {
        const response = await axios.get(`${BASE_URL}/data`, {
            params: filters,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};
