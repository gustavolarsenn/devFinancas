import axios from "axios";

export const createTransaction = async (category_id, user_id, type, value, descricao, date, created_at, csrfToken) => {
    try {
        const response = await axios.post('http://localhost:8000/transaction', {
            category_id: category_id,
            user_id: user_id,
            type: type,
            value: value,
            descricao: descricao,
            date: date,
            created_at: created_at
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

export const showTransaction = async () => {
    try { 
        const response = await axios.get('http://localhost:8000/transaction', {
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

export const deleteTransaction = async (transactionId, csrfToken) => {
    try {
        const res = await axios.delete(`http://localhost:8000/transaction/${transactionId}`, {
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
}

export const get = async (transaction_id, csrfToken, user_id) => {
    try {
        const res = await axios.post(`http://localhost:8000/transaction/${transaction_id}`, {
            transaction_id: transaction_id,
            user_id: user_id
        },{
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
}

export const editTransaction = async (transaction_id, category_id, user_id, type, value, descricao, date, created_at, csrfToken) => {
    try {
        const response = await axios.put(`http://localhost:8000/transaction/${transaction_id}`, {
            category_id: category_id,
            user_id: user_id,
            type: type,
            value: value,
            descricao: descricao,
            date: date,
            created_at: created_at
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