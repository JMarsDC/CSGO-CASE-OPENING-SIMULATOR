const logoutButton = document.getElementById('logout-btn');

if (logoutButton) {
    logoutButton.addEventListener('click', function(){
        if (typeof player !== 'undefined' && player) {
            if (typeof player.save === 'function') {
                player.save();
            }
            const storage = player.getStorage();
            if (storage && typeof storage.save === 'function') {
                storage.save();
            }
        }

        localStorage.removeItem('currentUser');
        window.location.href = 'Login.html';
    });
}
