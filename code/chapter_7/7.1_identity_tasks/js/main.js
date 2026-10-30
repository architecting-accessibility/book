const password = document.querySelector('#password');
const toggle = document.querySelector('.password-toggle');

toggle.addEventListener('click', () => {
    const isVisible = password.type === 'text';

    password.type = isVisible ? 'password' : 'text';
    toggle.textContent = isVisible ? 'Show password' : 'Hide password';
});