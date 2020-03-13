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
document.getElementById('sbt-create').addEventListener('submit', async (e) => {
    e.preventDefault();
    [...document.getElementsByClassName('fields')].forEach((field) => {
        // eslint-disable-next-line no-param-reassign
        field.style.display = 'none';
    });
    document.getElementById('error').style.display = 'none';
    document.getElementById('message').style.display = 'none';
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const response = await fetch('https://my-diary-heroku.herokuapp.com/api/v2/auth/signup', {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        }),
    });
    const json = await response.json();
    if (json.error) {
        if (json.status === 409) {
            document.getElementById('error').innerHTML = json.error;
            document.getElementById('error').style.display = 'inline';
        } else {
            document.getElementById(`${json.path}-div`).innerHTML = json.error;
            document.getElementById(`${json.path}-div`).style.display = 'inline';
        }
    } else {
        sessionStorage.setItem('Authorization', `${json.token}`);
        document.getElementById('message').innerHTML = json.message;
        document.getElementById('message').style.display = 'inline';
        setTimeout(() => {
            window.location.href = 'html/user-page.html';
        }, 3000);
    }
});
document.getElementById('sbt-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    [...document.getElementsByClassName('fields')].forEach((field) => {
        // eslint-disable-next-line no-param-reassign
        field.style.display = 'none';
    });
    document.getElementById('login-error').style.display = 'none';
    document.getElementById('login-message').style.display = 'none';
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('https://my-diary-heroku.herokuapp.com/api/v2/auth/signin', {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
    const json = await response.json();
    if (json.error) {
        if (json.status === 401) {
            document.getElementById('login-error').innerHTML = json.error;
            document.getElementById('login-error').style.display = 'inline';
        } else {
            document.getElementById(`login-${json.path}-div`).innerHTML = json.error;
            document.getElementById(`login-${json.path}-div`).style.display = 'inline';
        }
    } else {
        sessionStorage.setItem('Authorization', `${json.data.token}`);
        document.getElementById('login-message').innerHTML = json.message;
        document.getElementById('login-message').style.display = 'inline';
        setTimeout(() => {
            window.location.href = 'html/user-page.html';
        }, 3000);
    }
});
