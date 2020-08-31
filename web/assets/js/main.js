document.onreadystatechange = function() {
    const loginItem = document.querySelector('#login-item');
    const profileItem = document.querySelector('#profile-item');
    const managementItem = document.querySelector('#management-item');
    const logoutItem = document.querySelector('#logout-item');

    if (loginItem && profileItem && logoutItem) {
        if (localStorage.getItem('profile') === 'common') {
            profileItem.style.display = 'inline';
            logoutItem.style.display = 'inline';
            loginItem.style.display = 'none';
        } else if (localStorage.getItem('profile') === 'admin') {
            profileItem.style.display = 'inline';
            managementItem.style.display = 'inline';
            logoutItem.style.display = 'inline';
            loginItem.style.display = 'none';
        } else {
            loginItem.style.display = 'inline';
            profileItem.style.display = 'none';
            managementItem.style.display = 'none';
            logoutItem.style.display = 'none';
        }
    }
};

window.onload = function() {
    // theme
    const toggleSwitch = document.querySelector('input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.className = currentTheme;
    
        if (currentTheme === 'dark-theme') {
            toggleSwitch && (toggleSwitch.checked = true);
        }
    } else {
        document.documentElement.className = 'light-theme';
        localStorage.setItem('theme', 'light-theme');
    }

    toggleSwitch && (toggleSwitch.addEventListener('click', toggleTheme, false));    

    const addTopic = document.querySelector('.new-topic-container');

    if (addTopic) {
        if (!localStorage.getItem('profile')) {
            replyButton.href = '/web/public/login.html';
            return;
        }
    }

    handleLogout();

    // Font size
    const normal = document.querySelector('#normalize-font-btn');
    const increase = document.querySelector('#increase-font-btn');
    const decrease = document.querySelector('#decrease-font-btn');

    normal && (normal.addEventListener('click', normalizeFontSize));
    increase && (increase.addEventListener('click', increaseFontSize));
    decrease && (decrease.addEventListener('click', decreaseFontSize));
}

function toggleTheme(e) {
    if (e.target.checked) {
        document.documentElement.className = 'dark-theme';
        localStorage.setItem('theme', 'dark-theme');
    }
    else {
        document.documentElement.className = 'light-theme';
        localStorage.setItem('theme', 'light-theme');
    }    
}

function togglePassword(id) {
    const icon = document.querySelector('#' + id);
    const parent = icon.parentNode;
    const password = parent.childNodes[1];

    if (password.type === 'password') {
        password.type = 'text';
    } else {
        password.type = 'password';
    }    
}

function replyPost() {
    const replyContainer = document.querySelector('.reply-container');
    replyContainer.style.display = 'block';

    const replyButton = document.querySelector('#reply-button');

    replyButton.addEventListener('click', () => {
        alert('OK');
        replyContainer.style.display = 'none';
    });
}

function handleLogout() {
    const logout = document.querySelector('#logout-item');

    if (logout) {
        logout.addEventListener('click', function() {
            localStorage.removeItem('profile');
        });
    }
}

function showWarningMessage(id, message, changeInputColor, isInputGroup=false) {
    // TODO: mudar cor do texto e da borda
    const div = document.querySelector('#' + id);
    const span = div.children[1];

    if (!isInputGroup) {
        const input = div.previousElementSibling.children[0];
    } else {
        const input = div; // TODO
    }
    

    div.style.visibility = 'visible';
    span.innerHTML = message;
    changeInputColor && (input.style.borderBottomColor = 'red');
}

function hideWarningMessage(id) {
    const div = document.querySelector('#' + id);
    const span = div.children[1];
    const input = div.previousElementSibling.children[0];

    div.style.visibility = 'hidden';
    span.innerHTML = '';
    input.style.borderBottomColor = 'var(--text)';
}

function getQueryParameter(variable) {
    let query = decodeURIComponent(window.location.search.substring(1));
    let vars = query.split('&');

    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return (false);
}

function formatTime (date) {
    let hour = addZeroBefore(date.getHours());
    let minutes =  addZeroBefore(date.getMinutes());
    let seconds = addZeroBefore(date.getSeconds());
    let formattedTime = `${hour}:${minutes}:${seconds}`;

    return formattedTime;
}

function formatDatetime(datetime) {
    const date = new Date(datetime);

    let day = addZeroBefore(date.getDate());
    let month = capitalize(date.toLocaleString('pt-br', { month: 'long' }));
    let year = date.getFullYear();
    let formattedDate = `${day} de ${month} de ${year}, ${formatTime(date)}`;

    return formattedDate;
}

function addZeroBefore(n) {
    return n < 10 ? '0' + n : n;
}

function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

function increaseFontSize() {
    const root = document.documentElement;
    let size = Number(root.style.getPropertyValue('--font-size'));
    if (!size)  size = 1;
    root.style.setProperty('--font-size', size + 0.1);
}

function decreaseFontSize() {
    const root = document.documentElement;
    let size = Number(root.style.getPropertyValue('--font-size'));
    if (!size) size = 1;
    root.style.setProperty('--font-size', size - 0.1);
}

function normalizeFontSize() {
    const root = document.documentElement;
    root.style.setProperty('--font-size', 1);
}