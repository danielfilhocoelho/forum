window.addEventListener('load', function() {
    getCategory();
});

function getCategory() {
    let statusCode;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    let category = getQueryParameter('category');

    fetch(`/categories/${category}`, options)
        .then((response) => {
            statusCode = response.status;
            return response.json();
        })
        .then((responseJSON) => {
            if (statusCode === 200) {
                fillCategory(responseJSON);
            }
        });
}

function fillCategory(category) {
    let container = document.querySelector('.main-content');

    container.insertAdjacentHTML('beforeend',
        '<div class="path category">' +
            '<i class="fa fa-home" aria-hidden="true"></i>' +
            '<div class="links">' +
                '<a href="/web/public/index.html">Página Inicial</a>' +
                '<span>/</span>' +
                '<a href="/web/public/categories.html">Categorias</a>' +
                '<span>/</span>' +
                '<a href="#">' + category.title + '</a>' +
            '</div>' +
        '</div>' +
        '<h2 class="category-name">' + category.title + '</h2>' +
        '<div class="grid last-posts grid-category-page-fix grid-mgm">' +
            '<header>' +
                '<h1>Posts</h1>' +
                '<ul>' +
                    '<li>Visitas</li>' +
                    '<li>Comentários</li>' +
                    '<li>Autor</li>' +
                '</ul>' +
            '</header>'
    );

    container = document.querySelector('.grid.last-posts');

    for (let i = 0; i < category.posts.length; i++) {
        container.insertAdjacentHTML('beforeend',
            '<div class="row">' +
                '<div class="left-side">' +
                    '<div class="icon"></div>' +
                    '<a href="/web/public/post.html?category=' + category.title + '&id=' + category.posts[i].id  + '" class="title">' + category.posts[i].title + '</a>' +
                '</div>' +
                '<div class="right-side">' +
                    '<ul>' +
                        '<li class="number">' + category.posts[i].visits + '</li>' +
                        '<li class="number">' + category.posts[i].comments + '</li>' +
                        '<li class="author">' +
                            '<a href="#">' + category.posts[i].author.split(' ')[0] + '</a>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
            '</div>'
        );
    }
}
