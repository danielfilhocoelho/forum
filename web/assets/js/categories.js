window.addEventListener('load', function() {
    getCategories();
});

function getCategories() {
    let statusCode;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    fetch('/categories', options)
        .then((response) => {
            statusCode = response.status;
            return response.json();
        })
        .then((responseJSON) => {
            if (statusCode === 200) {
                fillCategories(responseJSON);
            }
        });
}

function fillCategories(categories) {
    const container = document.querySelector('.grid.main-categories');
    let numberOfPosts = 0;

    for (let i = 0; i < categories.length; i++) {
        container.insertAdjacentHTML('beforeend',
            '<div class="row">' +
                '<div class="left-side">' +
                    '<div class="icon"></div>' +
                    '<div class="info">' +
                        '<a href="/web/public/category.html?category=' + categories[i].title + '" class="title">' + categories[i].title + '</a>' +
                        '<p class="description">' + categories[i].description + '</p>' +
                    '</div>' +
                '</div>' +
                '<div class="right-side">' +
                    '<ul>' +
                        '<li class="number">' + categories[i].topics.length + '</li>' +
                        '<li class="number">' + numberOfPosts + '</li>' +
                        '<li class="last-post">' +
                            '<a href="#">Tutorial</a>' +
                            '<p>by <span>Admin</span></p>' +
                            '<span>08 de Agosto de 2020, 09:30</span>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
            '</div>'
        );
    }
}
