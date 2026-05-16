const loginForm = document.querySelector('form');

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            alert('Invalid username or password.');
            return;
        }

        localStorage.setItem('currentUser', username);
        window.location.href = 'Menu.html';
    });
}
