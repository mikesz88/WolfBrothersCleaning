const navButton = document.querySelector('button[aria-expanded]')
const nav = document.getElementById("blue-navbar");
const modalClose = '[data-close]'
const isVisible = 'is-visible';

const reviewItems = [
    {
        reviewText: 'These guys are on Point! Straight forward, honest and upfront about the circumstances. Helpful across the board and went out of his way to help us out during our emergency. Easiest business I\'done in a long time. 5 stars and then some :) THANK YOU!',
        author: 'Reef D',
        company: ''
    },
    {
        reviewText: 'Great experience, extremely professional! Highly recommend Wolf Brothers!',
        author: 'Ben M',
        company: ''
    },
    {
        reviewText: 'This guy is fantastic. Comes in and does a great job everytime. We have used him several times.',
        author: 'Justice S',
        company: ''
    },
    // {
    //     reviewText: '#4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    //     author: 'First Last',
    //     company: ''
    // }
];

const testimonialItems = [
    {
        companyName: 'fridgeExample',
        beforePic: './assets/PhotoGallery/dirtyFridge.jpg',
        afterPic: './assets/PhotoGallery/cleanFridge.jpg'
    },
    {
        companyName: 'showerExample',
        beforePic: './assets/PhotoGallery/dirtyShower.jpg',
        afterPic: './assets/PhotoGallery/cleanShower.jpg'
    },
    {
        companyName: 'carpetExample',
        beforePic: './assets/PhotoGallery/carpetShowingDifference6.jpg',
        afterPic: './assets/PhotoGallery/cleanCarpet.jpg'
    }
]

function toggleNav({target}) {
    const expanded = target.getAttribute('aria-expanded') === 'true' || false;
    navButton.setAttribute('aria-expanded', !expanded);
}

const createReviewCards = (cardData) => {
    const reviewCarousel = document.querySelector('.review-carousel');
    cardData.map(item => {
        const div = document.createElement('div');
        div.classList.add('review-item')
        div.innerHTML = `
        <div class="review-text">
            ${item.reviewText}
        </div>
        <div class="review-author">
            <div class="avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="details">
                <div class="name">${item.author}</div>
                <div class="company">${item.company}</div>
            </div>
        </div>
        `;
        reviewCarousel.appendChild(div);
    })
}

const createTestimonialCards = (cardData) => {
    const galleryContainer = document.querySelector('.gallery-container');
    cardData.map(item => {
        const div = document.createElement('div');
        div.classList.add('card-container');
        div.innerHTML = `
        <div class="card-flex-container">
            <div class="wrapper">
                <h3 class="title">Before</h3>
                <div class="image-container">
                    <img class="thumbnailSize" src=${item.beforePic} alt="before work image">
                </div>
            </div>                    
            <div class="wrapper">
                <h3 class="title">After</h3>
                <div class="image-container">
                    <img class="thumbnailSize" src=${item.afterPic} alt="after work image">
                </div>
            </div>
        </div>
        <button data-name=${item.companyName} class="btn btn-alt round-pill">Click to Enlarge!</button>
        `
        galleryContainer.appendChild(div);
    })
}

const popUpModal = (card) => {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    div.setAttribute('data-animation', 'slideInOutTop');
    div.setAttribute('id',card.companyName);
    div.className = 'modal';
    div.innerHTML = `
    <div class="card-container">
        <i class="fas fa-times" data-close></i>
        <div class="card-flex-container">
            <div class="wrapper">
                <h3 class="title">Before</h3>
                <div class="image-container">
                    <img src=${card.beforePic} alt="before work image">
                </div>
            </div>                    
            <div class="wrapper">
                <h3 class="title">After</h3>
                <div class="image-container">
                    <img src=${card.afterPic} alt="after work image">
                </div>
            </div>
        </div>
    </div>
    `;
    body.appendChild(div)
    setTimeout(function() {
        document.getElementById(card.companyName).classList.add(isVisible);
    }, 100)
}

const closeModalCheck = (modalClose) => {
    closeModal = document.querySelectorAll(modalClose);
    for (const elm of closeModal) {
        elm.addEventListener('click', function() {
            this.parentElement.parentElement.classList.remove(isVisible);
            setTimeout(function() {
                elm.parentElement.parentElement.remove();
            },400);
        })
    }
}

const enlargeExamples = (buttonList, cardData) => {
    for (const button of buttonList) {
        button.addEventListener('click', () => {
            const companyName = button.dataset.name;
            const matchedTestimonialCard = cardData.find(item => item.companyName === companyName);
            popUpModal(matchedTestimonialCard);

            closeModalCheck(modalClose);
        })

    }
}


// scroll the nav bar after half the screen is scrolled
window.onscroll = function () {
    if (window.pageYOffset > 400) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
}
navButton.addEventListener('click', toggleNav);
createReviewCards(reviewItems);
createTestimonialCards(testimonialItems);
const exampleButtons = document.querySelectorAll('.card-container button');
enlargeExamples(exampleButtons, testimonialItems);


// slide carousel
const update = () => {
    slides.forEach(slide => {
        slide.classList.remove('active', 'previous', 'next');
    })
    slides[prev].classList.add('previous');
    slides[current].classList.add('active');
    slides[next].classList.add('next');
}

const goToNum = (number) => {
    current = number;
    next = current < slides.length - 1 ? current + 1 : 0;
    prev = current > 0 ? current - 1 : slides.length - 1;
    update();
}
const goToNext = () => current < slides.length - 1 ? goToNum(current + 1) : goToNum(0);
const goToPrev = () => current > 0 ? goToNum(current - 1) : goToNum(slides.length - 1);

let slides = document.querySelectorAll('.review-item');
let buttons = document.querySelectorAll('.slide-control-container button');

let current = 0;
let next = current < slides.length - 1 ? current + 1 : 0;
let prev = current > 0 ? current - 1 : slides.length - 1;

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => i === 0 ? goToPrev() : goToNext())
}

update();

// black screen click escape
document.addEventListener('click', e => {
    if (e.target === document.querySelector('.modal.is-visible')) {
        const module = document.querySelector('.modal.is-visible');
        module.classList.remove(isVisible);
        setTimeout(function() {
            module.remove();
        },400);
    }
})

// ESCAPE KEY
document.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
        const module = document.querySelector('.modal.is-visible');
        module.classList.remove(isVisible);
        setTimeout(function() {
            module.remove();
        },400);        
    }
})