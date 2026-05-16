const registerForm = document.querySelector('form');

if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        if (!username || !email || !password) {
            alert('Please complete all fields.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some(u => u.username === username)) {
            alert('That username is already taken.');
            return;
        }

        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', username);

        // Create initial player data for the new account.
        const player = new Player(username, 500);
        player.save();
        player.getStorage().save();

        window.location.href = 'TitleScreen.html';
    });
}
