document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Fixed credentials
    const validUsername = "examkingeot";
    const validPassword = "Elemoh090227";

    if (username === validUsername && password === validPassword) {
        // Store a flag in localStorage to indicate the user is logged in
        localStorage.setItem('adminLoggedIn', 'true');
        // Redirect to admin view if login is successful
        window.location.href = "admin.html";
    } else {
        // Show error message if login fails
        document.getElementById('errorMessage').innerText = "Invalid username or password.";
    }
});
