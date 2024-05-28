export async function login(username, password) {
    const response = await fetch('http://localhost:8000/csrf-token');
    const csrfToken = await response.text();

    await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
    })
}