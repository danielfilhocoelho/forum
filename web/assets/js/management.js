window.addEventListener('load', function() {
    getUsers();
});

function getUsers() {
    let statusCode;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    fetch('/users', options)
        .then((response) => {
            statusCode = response.status;
            return response.json();
        })
        .then((responseJSON) => {
            if (statusCode === 200) {
                fillUsers(responseJSON);
            }
        });
}

function fillUsers(users) {
    const container = document.querySelector('.grid.main-categories');

    for (let i = 0; i < users.length; i++) {
        if (users[i].profile === 'admin') continue;

        container.insertAdjacentHTML('beforeend',
            '<div class="row">' +
                '<div class="left-side">' +
                    '<div class="icon"></div>' +
                    '<div class="info">' +
                        '<a href="#" class="title">' + users[i].name + '</a>' +
                        '<p class="description">' + users[i].course + '</p>' +
                    '</div>' +
                '</div>' +
                '<div class="right-side">' +
                    '<ul>' +
                        '<li></li>' +
                        '<li class="number">' + users[i].posts + '</li>' +
                        '<li class="actions">' +
                            '<a href="#"><img src="/web/assets/img/alert.png" alt="Suspender usuário"></a>' +
                            '<a href="#"><img src="/web/assets/img/danger.png" alt="Banir usuário"></a>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
            '</div>'
        );
    }
}
