document.getElementById('login-btn').addEventListener('click', function() {
    const username = document.getElementById('username-field').value;
    const password = document.getElementById('password-field').value;

    if (username === "admin" && password === "admin123") {
        window.location.href = "./main.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
});