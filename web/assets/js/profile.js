window.addEventListener('load', function() {
    getUser();
    handleUpdateInfo();
});

function getUser() {
    let statusCode;
    const registry = localStorage.getItem('registry');
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    fetch(`/users/${registry}`, options)
        .then((response) => {
            statusCode = response.status;
            return response.json();
        })
        .then((responseJSON) => {
            if (statusCode === 200) {
                fillProfile(responseJSON);
            }
        });
}

function fillProfile(user) {
    document.querySelector('input#name').value = user.name;
    document.querySelector('input#username').value = user.username;
    document.querySelector('input#email').value = user.email;
    document.querySelector('input#registry').value = user.registry;
    document.querySelector('input#phone').value = user.phone;
    document.querySelector('input#course').value = user.course;
    document.querySelector('input#semester').value = user.semester;
}

function handleUpdateInfo() {
    const updateButton = document.querySelector('input#update');

    updateButton.addEventListener('click', function(event) {
        event.preventDefault();

        const name = document.querySelector('input#name').value;
        const username = document.querySelector('input#username').value;
        const email = document.querySelector('input#email').value;
        const registry = document.querySelector('input#registry').value;
        const phone = document.querySelector('input#phone').value;
        const course = document.querySelector('input#course').value;
        const semester = document.querySelector('input#semester').value;

        const body = {
            name,
            username,
            email,
            phone,
            course,
            semester
        };

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        };

        fetch(`/users/${registry}`, options)
            .then((response) => {
                if (response.status === 200) {
                    alert('OK!'); // Criar modal de confirmação!
                    getUser();
                }
            });
    });
}
