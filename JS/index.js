const navButton = document.querySelector('button[aria-expanded]')
const nav = document.getElementById("blue-navbar");

function toggleNav({target}) {
    const expanded = target.getAttribute('aria-expanded') === 'true' || false;
    navButton.setAttribute('aria-expanded', !expanded);
}

window.onscroll = function () {
    if (window.pageYOffset > 500) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
}
navButton.addEventListener('click', toggleNav);

