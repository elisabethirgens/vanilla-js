function Slider(slider) {
    if (!(slider instanceof Element)) {
        throw new Error('Nope, no slider here!');
    }

    let prev;
    let current;
    let next;

    const slides = slider.querySelector('.slideshow');
    const prevButton = slider.querySelector('.flipPrev');
    const nextButton = slider.querySelector('.flipNext');

    function startSlider() {
        current = slider.querySelector('.current') || slides.firstElementChild;
        prev = current.previousElementSibling || slides.lastElementChild;
        next = current.nextElementSibling || slides.firstElementChild;
    }

    function applyClasses() {
        current.classList.add('current');
        prev.classList.add('prev');
        next.classList.add('next');
    }

    function move(direction) {
        const classesToRemove = ['prev', 'current', 'next'];
        prev.classList.remove(...classesToRemove);
        current.classList.remove(...classesToRemove);
        next.classList.remove(...classesToRemove);
        if (direction === 'back') {
            [prev, current, next] = [
                prev.previousElementSibling || slides.lastElementChild,
                prev,
                current,
            ];
        } else {
            [prev, current, next] = [
                current,
                next,
                next.nextElementSibling || slides.firstElementChild,
            ];
        }
        applyClasses();
    }

    startSlider();
    applyClasses();

    prevButton.addEventListener('click', () => move('back'));
    nextButton.addEventListener('click', move);
}

Slider(document.querySelector('#show-food'));
Slider(document.querySelector('#show-drinks'));
