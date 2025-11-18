const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('user');

if (!username) {
    window.location.href = './login.html';
} else {
    document.getElementById('welcomeMessage').textContent = `Bem-vindo, ${username}!`;
}

document.getElementById('btnLogout').addEventListener('click', () => {
    window.location.href = './login.html';
});
