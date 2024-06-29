import axios from "axios";

export const create = async (category_name, user_id, csrfToken) => {
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

export const showAll = async () => {
    try { 
        const response = await axios.get('http://localhost:8000/categoryAll', {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
} 
export const show = async () => {
    try { 
        const response = await axios.get('http://localhost:8000/category', {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
} 

export const deleteCategory = async (categoryId, user_id, csrfToken) => {
    try {
        console.log(user_id)
        const res = await axios.put(`http://localhost:8000/category/${categoryId}`,{
            categoryId: categoryId,
            user_id: user_id,
            active: 0
        }, {
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
};