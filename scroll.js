const ipsum = document.querySelector('.cupcake-ipsum');
const theCupcake = document.querySelector('.peek-a-boo');

function obCallback(myList) {
  if (myList[0].intersectionRatio === 1) {
    theCupcake.classList.remove('hidden');
    myLookout.unobserve(ipsum.lastElementChild);
  }
}

const myLookout = new IntersectionObserver(obCallback, {
  root: ipsum,
  threshold: 1,
});

myLookout.observe(ipsum.lastElementChild);
