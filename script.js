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
            // going right wraps around to start
        }

        transitioning.classList.add('carousel__third');
    }

    transitioning.classList.add('carousel__transitioning');
    updateCircles();

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
    if (c > 15) {
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


document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        scrollCarousel('left');
    }
    if (e.key === 'ArrowRight') {
        scrollCarousel('right');
    }
});


// hiding top bar when scrolled
const iconbar = document.getElementById('iconbar');
// const iconbarName = document.getElementById('iconbar__name');
document.addEventListener('scroll', (e) => {
    const scrolled = window.scrollY || window.pageYOffset;
    // console.log(scrolled);

    // disable effect if on desktop
    if (!window.matchMedia("(pointer:none), (pointer:coarse)").matches
    && window.matchMedia("(min-width: 600px)").matches
    || grid.style.opacity === '1') {
        return;
    }

    if (scrolled <= 0 && iconbar.classList.contains('invisible')) {
        iconbar.classList.remove('invisible');
    }
    if (scrolled > 0 && !iconbar.classList.contains('invisible')) {
        iconbar.classList.add('invisible');
    }
})


const projects = document.querySelectorAll('.carousel__project');
function updateCircles(n) {

    const activeCircles = document.querySelectorAll('.circle.active');
    [...activeCircles].forEach(div => {
        div.classList.remove('active');
    });
    
    if (n == undefined) {  // function is called during transition
        const index = Array.prototype.indexOf.call(projects, document.querySelector('.carousel__transitioning'));
        document.querySelector(`.circle:nth-child(${index + 1})`).classList.add('active');
    } else {
        document.querySelector(`.circle:nth-child(${n})`).classList.add('active');
    }
}
document.querySelector(`.circle:nth-child(1)`).classList.add('active');

const grid = document.getElementById('grid');
const gridWorks = document.getElementById('grid__works');
const body = document.querySelector('body');
let n = 0;
[...projects].forEach(project => {

    const div1 = document.createElement('div');
    div1.classList.add('grid__works__square');
    
    n++;
    div1.setAttribute('onClick', `setCarouselTo(${n}); toggleGrid();`);

    const div2 = document.createElement('div');

    const projectDirectory = project.querySelector('img.preview').getAttribute('src').split('/').slice(-2, -1)[0]
    // example: "works/fullsize/typographics/1.webp". second to last with split "/"
    
    div2.style.backgroundImage = `url('works/small-square/${projectDirectory}.webp')`
    div2.classList.add('grid__works__image');
    div1.appendChild(div2);
    gridWorks.appendChild(div1);

});
function toggleGrid() {

    if (grid.style.opacity === '1') {

        // make grid invisible
        window.scrollTo(0, 0);
        grid.style.opacity = '0';
        setTimeout(function() {
            grid.style.display = 'none';
        }, 250);
        [...document.querySelectorAll('.grid__works__square')].forEach(square => {
            square.classList.add('grid__works__square--animation');
        })

    } else {

        // make grid visible
        grid.style.display = 'flex';
        setTimeout(function() {
            grid.style.opacity = '1';
        }, 1);

    }
}
[...document.querySelectorAll('.grid__works__square')].forEach(square => {
    square.classList.add('grid__works__square--animation');
})

function setCarouselTo(n) {

    const target = document.querySelector(`#carousel .carousel__project:nth-child(${n})`);
    [...projects].forEach(div => {
        div.classList.remove('carousel__focused');
        div.classList.remove('carousel__transitioning');
    });
    target.classList.add('carousel__focused');
    updateCircles(n);


}

