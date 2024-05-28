import axios from 'axios';

export async function login(username, password, csrfToken) {
    console.log(csrfToken)
    console.log(username)
    console.log(password)
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username: username,
        password: password,
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