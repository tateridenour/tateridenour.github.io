const carousel = document.getElementById('carousel');
let timeout;
let focused;
let transitioning;
function scrollCarousel(direction) {

    if (timeout) {
        clearTimeout(timeout);
        scrollCarouselFinalize(focused, transitioning);
        timeout = null;
    }

    scrollToTop();
    carousel.classList.remove('carousel--instant');

    focused = document.querySelector('.carousel__focused');
    if (direction == 'left') {
        carousel.style.right = '0%';
        transitioning = focused.previousElementSibling;

        if (transitioning == null) {
            transitioning = document.querySelector('.carousel__project:last-child');
            // going left wraps around to end
        }

        transitioning.classList.add('carousel__first');
    }
    if (direction == 'right') {
        carousel.style.right = '200%';
        transitioning = focused.nextElementSibling;

        if (transitioning == null) {
            transitioning = document.querySelector('.carousel__project:first-child');
            console.log(transitioning);
            // going right wraps around to start
        }

        transitioning.classList.add('carousel__third');
    }

    transitioning.classList.add('carousel__transitioning');
    timeout = setTimeout(() => {
        scrollCarouselFinalize(focused, transitioning);
        timeout = null;
    }, 500)
}

function scrollCarouselFinalize(focused, transitioning) {
    focused.classList.remove('carousel__focused');
    transitioning.classList.add('carousel__focused');
    transitioning.classList.remove('carousel__transitioning');
    transitioning.classList.remove('carousel__first');
    transitioning.classList.remove('carousel__third');

    carousel.style.right = '100%';
    carousel.classList.add('carousel--instant');
}

function scrollToTop() {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 6);
    }
};


const circleWrapper = document.getElementById('circle-wrapper');
for (i = 0; i < carousel.children.length; i++) {
    const div = document.createElement('div');
    div.classList.add('circle');
    circleWrapper.append(div);
}