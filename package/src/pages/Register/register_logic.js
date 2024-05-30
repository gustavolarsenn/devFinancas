import axios from 'axios';

export async function register(username, password, email, csrfToken) {
    try {
      const response = await axios.post('http://localhost:8000/register', {
        name: username,
        password: password,
        email: email
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