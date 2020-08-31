window.addEventListener('load', function() {
    handleRegister();
});

function handleRegister() {
    const button = document.querySelector('#register-button');

    button.addEventListener('click', (event) => {
        event.preventDefault();

        const name = document.querySelector('input#name').value;
        const username = document.querySelector('input#username').value;
        const password = document.querySelector('input#password').value;
        const email = document.querySelector('input#email').value;
        const registry = document.querySelector('input#registry').value;
        const phone = document.querySelector('input#phone').value;
        const course = document.querySelector('input#course').value;
        const semester = document.querySelector('input#semester').value;

        if (name === '') {
            showWarningMessage('div-name', 'Nome inválido.', true);
        } else if (username === '') {
            showWarningMessage('div-username', 'Usuário inválido.', true);
        } else if (password === '') {
            showWarningMessage('div-password', 'Senha inválida.', true);
        } else if (email === '') {
            showWarningMessage('div-email', 'Email inválido.', true);
        } else if (registry === '') {
            showWarningMessage('div-registry', 'Matrícula inválida.', true);
        } else if (phone === '') {
            showWarningMessage('div-phone', 'Telefone inválido.', true);
        } else if (course  === '') {
            showWarningMessage('div-course', 'Curso inválido.', true, true);
        } else if (semester === '') {
            showWarningMessage('div-semester', 'Semestre inválido.', true);
        } else {
            let statusCode;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    username,
                    password,
                    email,
                    registry,
                    phone,
                    course,
                    semester
                })
            };

            fetch('/users', options)
                .then((response) => {
                    statusCode = response.status;
                    return response.json();
                })
                .then((responseJSON) => {
                    if (statusCode === 200) {
                        localStorage.setItem('profile', responseJSON.profile);
                        localStorage.setItem('registry', responseJSON.registry);
                        location.href = '/web/public/login.html';
                    }
                });
        }
    });
}
