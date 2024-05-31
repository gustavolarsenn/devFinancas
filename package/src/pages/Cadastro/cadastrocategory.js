import axios from "axios";

export const createCategory = async (category_name, user_id, csrfToken) => {
    try {
        const response = await axios.post('http://localhost:8000/category', {
            category_name: category_name,
            user_id: user_id
        }, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            withCredentials: true
        });

        return response.data.access;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}