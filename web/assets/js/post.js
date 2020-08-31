window.addEventListener('load', function() {
    getPost();
});

function getPost() {
    let statusCode;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    fetch(`/posts/${getQueryParameter('id')}`, options)
        .then((response) => {
            statusCode = response.status;
            return response.json();
        })
        .then((responseJSON) => {
            if (statusCode === 200) {
                fillPost(responseJSON);
                const search = document.querySelector('#search');
                search.addEventListener('keyup', function() {
                    // filterComments(responseJSON);
                });
            }
        });
}

function filterComments({ post, comments }) {
    // TODO
    let value = document.querySelector('#search').value.toLowerCase().trim();
    let filteredComments = comments.filter((comment) => {
        return comment.body.toLowerCase().indexOf(value) > -1;
    });
    if (filteredComments.length !== 0) {
        fillPost({ post, comments: filteredComments });
    }
};

function fillPost({ post, comments }) {
    const container = document.querySelector('.main-content');
    container.innerHTML = '';

    container.insertAdjacentHTML('beforeend',
        '<div class="header">' +
            '<div class="path">' +
                '<i class="fa fa-home" aria-hidden="true"></i>' +
                '<div class="links">' +
                    '<a href="/web/public/index.html">Página Inicial</a>' +
                    '<span>/</span>' +
                    '<a href="/web/public/categories.html">Categorias</a>' +
                    '<span>/</span>' +
                    '<a href="/web/public/category.html?category=' + getQueryParameter('category') + '">' + getQueryParameter('category') +'</a>' +
                '</div>' +
            '</div>' +
            '<h1>' + post.title + '</h1>' +
            '<div class="buttons">' +
                '<a id="reply-top" href="#reply-container" onclick="addComment()">Responder <i class="fa fa-reply" aria-hidden="true"></i></a>' +
                '<div class="search-container">' +
                    '<input type="text" id="search" autocomplete="off" placeholder="Procure aqui">' +
                    '<i class="fa fa-search" aria-hidden="true"></i>' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="container">' +
            '<div class="post">' +
                '<i class="fa fa-quote-right" aria-hidden="true"></i>' +
                '<h1>' + post.title + '</h1>' +
                '<span>' + formatDatetime(post.createdAt) + '</span>' +
                '<p>' + post.body +'</p>' +
            '</div>' +
            '<div class="user-info">' +
                '<span>' + post.user.name.split(' ')[0] + '</span>' +
                '<p class="posts">Total de posts: <span>' + post.user.posts + '</span></p>' +
                '<p class="joined">Entrou: <span>' + formatDatetime(post.user.createdAt) + '</span></p>' +
            '</div>' +
        '</div>'
    );

    for (let i = 0; i < comments.length; i++) {
        container.insertAdjacentHTML('beforeend',
            '<div class="container">' +
                '<div class="post">' +
                    '<i class="fa fa-quote-right" aria-hidden="true"></i>' +
                    '<h1>Re: ' + post.title + '</h1>' +
                    '<span>' + formatDatetime(comments[i].createdAt) + '</span>' +
                    '<p>' + comments[i].body +'</p>' +
                '</div>' +
                '<div class="user-info">' +
                    '<span>' + comments[i].user.name.split(' ')[0] + '</span>' +
                    '<p class="posts">Total de posts: <span>' + comments[i].user.posts + '</span></p>' +
                    '<p class="joined">Entrou: <span>' + formatDatetime(comments[i].user.createdAt) + '</span></p>' +
                '</div>' +
            '</div>'
        );
    }

    container.insertAdjacentHTML('beforeend',
        '<div id="reply-container" class="reply-container">' +
            '<div class="icons">' +
                '<i class="fa fa-bold" aria-hidden="true"></i>' +
                '<i class="fa fa-italic" aria-hidden="true"></i>' +
                '<i class="fa fa-underline" aria-hidden="true"></i>' +
                '<i class="fa fa-font" aria-hidden="true"></i>' +
                '<i class="fa fa-eraser" aria-hidden="true"></i>' +
            '</div>' +
            '<textarea name="reply-answer" id="reply-answer" placeholder="Deixe sua mensagem aqui"></textarea>' +
            '<div class="buttons">' +
                '<a id="reply-button">Responder <i class="fa fa-reply" aria-hidden="true"></i></a>' +
            '</div>' +
        '</div>'
    );
}

function addComment() {
    if (!localStorage.getItem('profile')) {
        location.href = '/web/public/login.html';
        return;
    }
    
    const replyContainer = document.querySelector('.reply-container');
    replyContainer.style.display = 'block';

    const button = document.querySelector('#reply-button');

    button.addEventListener('click', () => {
        const commentBody = document.querySelector('#reply-answer').value;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ commentBody, postId: getQueryParameter('id') })
        };

        fetch('/comments', options)
            .then((response) => {
                if (response.status === 200) {
                    replyContainer.style.display = 'none';
                    getPost();
                }
            });
    });
}
