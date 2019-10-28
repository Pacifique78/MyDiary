document.getElementById('login-btn').addEventListener('click', () => {
    document.getElementById('login').style.display = 'flex';
    document.getElementById('login-form').style.display = 'inline';
});
document.getElementById('close-form').addEventListener('click', () => {
    document.getElementById('login').style.display = 'none';
});
document.getElementById('create-account-btn').addEventListener('click', () => {
    document.getElementById('create').style.display = 'flex';
    document.getElementById('create-account').style.display = 'inline';
});
document.getElementById('close-create-form').addEventListener('click', () => {
    document.getElementById('create').style.display = 'none';
});
const createAccount = document.getElementById('new-account-btn');
createAccount.addEventListener('click', () => {
    window.location.assign('html/user-page.html');
});
const loginBtn = document.getElementById('login-page-btn');
loginBtn.addEventListener('click', () => {
    window.location.assign('html/user-page.html');
});
document.getElementById('have-account').addEventListener('click', () => {
    document.getElementById('create-account').style.display = 'none';
    document.getElementById('create').style.display = 'none';
    document.getElementById('login').style.display = 'flex';
    document.getElementById('login-form').style.display = 'inline';
});
document.getElementById('create-account-login').addEventListener('click', () => {
    document.getElementById('login').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('create').style.display = 'flex';
    document.getElementById('create-account').style.display = 'inline';
});
const mediaQuery500Px = window.matchMedia('(max-width: 500px)');
if (mediaQuery500Px.matches) {
    document.getElementById('login-btn').style.width = `${90}%`;
    document.getElementById('create').style.width = `${90}%`;
    document.getElementById('login-btn').addEventListener('click', () => {
        document.getElementById('login').style.display = 'flex';
        document.getElementById('login-form').style.display = 'inline';
    });
    document.getElementById('create-account-btn').addEventListener('click', () => {
        document.getElementById('create').style.display = 'flex';
        document.getElementById('create-account').style.display = 'inline';
    });
}
