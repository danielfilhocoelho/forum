window.onload = function() {
    setDefaultTheme();
    handleLogin();
}

function setDefaultTheme() {
    const currentTheme = localStorage.getItem('theme');

    if (!currentTheme) {
        document.documentElement.className = 'light-theme';
        localStorage.setItem('theme', 'light-theme');
    } else {
        document.documentElement.className = currentTheme;
    }
}

function handleLogin() {
    const button = document.querySelector('#login-button');

    button.addEventListener('click', (event) => {
        event.preventDefault();

        hideWarningMessage('div-username');
        hideWarningMessage('div-password');

        const username = document.querySelector('#login-username').value;
        const password = document.querySelector('#login-password').value;

        if (username === '') {
            showWarningMessage('div-username', 'Usuário inválido.', true);
        } else if (password === '') {
            showWarningMessage('div-password', 'Senha inválida.', true);
        } else {
            let statusCode;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ username, password })
            };

            fetch('/users/login', options)
                .then((response) => {
                    statusCode = response.status;
                    return response.json();
                })
                .then((responseJSON) => {
                    if (statusCode === 200) {
                        localStorage.setItem('profile', responseJSON.profile);
                        localStorage.setItem('registry', responseJSON.registry);
                        location.href = '/web/public/index.html';
                    } else if (statusCode === 401) {
                        showWarningMessage('div-password', 'Usuário ou senha inválidos.', false);
                    } else {
                        showWarningMessage('div-password', 'Erro no servidor. Tente novamente mais tarde.', false);
                    }
                });
        }
    });
}
