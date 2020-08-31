window.addEventListener('load', function() {
    getData();
});

function getData() {
    let statusCode;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    const data = {};

    fetch('/categories', options)
        .then((response) => {
            statusCode = response.status;
            return response.json();
        })
        .then((responseJSON) => {
            data.categories = responseJSON;
            if (statusCode === 200) {
                fetch('/posts', options)
                .then((response) => {
                    statusCode = response.status;
                    return response.json();
                })
                .then((responseJSON) => {
                    data.posts = responseJSON;
                    if (statusCode === 200) {
                        fillHome(data);
                    }
                });
            }
        });
}

function fillCategoriesOptions(categories) {
    let s = '<option value="0">Selecione uma categoria</option>';

    categories.map(category => {
        s += `<option value="${category.title}">${category.title}</option>`;
    })

    return s;
}

function fillHome({ categories, posts }) {
    let container = document.querySelector('.main-content');
    container.innerHTML = '';

    container.insertAdjacentHTML('beforeend',
        '<div class="grid main-categories">' +
            '<div id="reply-container" class="reply-container reply-container-home">' +
                '<h1 id="new-post">Novo post</h1>' +
                '<select name="categories-name" id="categories-name">' +
                    fillCategoriesOptions(categories) +
                '</select>' +
                '<input id="title-input" class="title-input" type="text" placeholder="Digite o título aqui" autocomplete="off" />' +
                '<div class="icons">' +
                    '<i class="fa fa-bold" aria-hidden="true"></i>' +
                    '<i class="fa fa-italic" aria-hidden="true"></i>' +
                    '<i class="fa fa-underline" aria-hidden="true"></i>' +
                    '<i class="fa fa-font" aria-hidden="true"></i>' +
                    '<i class="fa fa-eraser" aria-hidden="true"></i>' +
                '</div>' +
                '<textarea name="reply-answer" id="reply-answer" class="reply-home" placeholder="Deixe sua mensagem aqui"></textarea>' +
                '<div class="buttons">' +
                    '<a id="reply-button">Postar <i class="fa fa-location-arrow" aria-hidden="true"></i></a>' +
                '</div>' +
            '</div>' +

            '<header>' +
                '<a href="/web/public/categories.html">Principais categorias</a>' +
                '<ul>' +
                    '<li>Tópicos</li>' +
                    '<li>Posts</li>' +
                    '<li>Last post</li>' +
                '</ul>' +
            '</header>'
    );

    container = document.querySelector('.grid.main-categories');

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
                        '<li class="number">2</li>' +
                        '<li class="number">10</li>' +
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

    container.insertAdjacentHTML('beforeend', '</div>');
    container = document.querySelector('.main-content');

    container.insertAdjacentHTML('beforeend',
        '<div class="grid last-posts">' +
            '<header>' +
                '<h1>Últimos posts</h1>' +
                '<ul>' +
                    '<li>Visitas</li>' +
                    '<li>Comentários</li>' +
                    '<li>Autor</li>' +
                '</ul>' +
            '</header>'
    );

    container = document.querySelector('.grid.last-posts');

    for (let i = 0; i < posts.length; i++) {
        container.insertAdjacentHTML('beforeend',
            '<div class="row">' +
                '<div class="left-side">' +
                    '<div class="icon"></div>' +
                    '<a href="/web/public/post.html?category=' + posts[i].category + '&id=' + posts[i]._id  + '" class="title">' + posts[i].title + '</a>' +
                '</div>' +
                '<div class="right-side">' +
                    '<ul>' +
                        '<li class="number">' + posts[i].visits + '</li>' +
                        '<li class="number">' + posts[i].comments + '</li>' +
                        '<li class="author">' +
                            '<a href="#">' + posts[i].author.split(' ')[0] + '</a>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
            '</div>'
        );
    }

    container.insertAdjacentHTML('beforeend', '</div>');
    container = document.querySelector('.main-content');

    container.insertAdjacentHTML('beforeend',
        '<div class="trending">' +
            '<header class="trending-heading">Mais Acessados</header>' +
            '<div class = "trending__item">' +
                '<a href="#">Mecânica dos sólidos</a>' +
                '<p class = "trending-info">Alguém me ensina francês?</p>' +
                '<p>by <span>Ícaro</span></p>' +
                '<span class = "trending-date">12 de Setembro de 2019, 13:30</span>' +
                '<hr>' +
            '</div>' +
            '<div class = "trending__item">' +
                '<a href="#">Física quântica</a>' +
                '<p class = "trending-info">Bichano de Schrödinger</p>' +
                '<p>by <span>Felipe</span></p>' +
                '<span class = "trending-date">12 de Setembro de 2010, 13:30</span>' +
                '<hr>' +
            '</div>' +
            '<div class = "trending__item">' +
                '<a href="#">Trabalho</a>' +
                '<p class = "trending-info">galera, sobre o trabalho...</p>' +
                '<p>by <span>Daniel</span></p>' +
                '<span class = "trending-date">12 de Setembro de 2010, 13:30</span>' +
                '<hr>' +
            '</div>' +
            '<a id="reply-top" href="#new-post" onclick="addNewPost()" class="new-topic-container">' +
                '<i class="fa fa-plus" aria-hidden="true"></i>' +
                'TÓPICO' +
            '</a>' +
        '</div>'
    );
}

function addNewPost() {
    if (!localStorage.getItem('profile')) {
        location.href = '/web/public/login.html';
        return;
    }

    const replyContainer = document.querySelector('.reply-container');
    replyContainer.style.display = 'block';

    const button = document.querySelector('#reply-button');

    button.addEventListener('click', () => {
        const title = document.querySelector('#title-input').value;
        const body = document.querySelector('#reply-answer').value;
        const select = document.getElementById('categories-name');
        const category = select.options[select.selectedIndex].value;
        	
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ title, body, category })
        };

        fetch('/posts', options)
            .then((response) => {
                if (response.status === 200) {
                    replyContainer.style.display = 'none';
                    getData();
                }
            });
    });
}