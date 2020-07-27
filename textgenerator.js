const textarea = document.querySelector('.text');
const result = document.querySelector('.result');
const filterOptions = Array.from(document.querySelectorAll('[name="filter"]'));

const norwegianDictionary = {
  a: 'å',
  A: 'Æ',
  e: 'æ',
  o: 'ø',
  O: 'Ø',
};

const filters = {
  annoying(key, value) {
    if (value % 2) {
      // nifty modulo truthy trick to check for odd numbers
      return key.toUpperCase();
    }
    return key.toLowerCase();
  },
  norwegian(letter) {
    const nordicLetter = norwegianDictionary[letter];
    if (nordicLetter) return nordicLetter;
    return letter;
  },
  happy(char) {
    const random = Math.floor(Math.random() * 4);
    if (char === ' ' && random === 2) {
      return ' 😊 ';
    }
    if (char === ' ' && random === 3) {
      return ' 😀 ';
    }
    return char;
  },
};

function transformText(text) {
  const filter = filterOptions.find(input => input.checked).value;
  // property lookup with [] because variable
  const modifiedText = Array.from(text).map(filters[filter]);
  result.textContent = modifiedText.join('');
}

textarea.addEventListener('input', event => transformText(event.target.value));

filterOptions.forEach(input =>
  input.addEventListener('input', () => {
    transformText(textarea.value);
  })
);
