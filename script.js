const cursorTime = 500;
const textTime = 1000;
const cursor = createCursor();
const textNode = document.querySelector('.text');

function textWriter(node, ms) {
  const text = node.textContent;

  let index = 0;
  const textToShowArray = [
    'Hello, im Dmitriy',
    'Dear my dear',
    'Nothing is absolute',
    'Lorem ipsum dolor'
  ];

  let textToShow = text;

  function reverse() {
    const step = ms / textToShow.length;
    const interval = setInterval(() => {
      textToShow = textToShow.slice(0, textToShow.length - 1);
      node.textContent = textToShow;
      if (textToShow.length === 0) {
        clearTimeout(interval);
        if (index > textToShowArray.length - 1) {
          index = 0;
        }
        textToShow = textToShowArray[index];
        index++;
        forward();
      }
    }, step)
  }

  function forward() {
    const step = ms / textToShow.length;
    const length = textToShow.length;
    const copyText = textToShow;
    let currentIndex = 1;
    const interval = setInterval(() => {
      textToShow = copyText.slice(0, currentIndex);
      currentIndex++;
      console.log(currentIndex);
      node.textContent = textToShow;
      if (textToShow.length === length) {
        clearTimeout(interval);
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          reverse();
        }, 800)
      }
    }, step)
  }
  reverse();
}

function createCursor () {
  const cursorNode = document.querySelector('.cursor');
  showCursor(cursorTime);
  return cursorNode;
}

function showCursor (ms) {
  animateOpacity(ms, 1, hideCursor);
}

function hideCursor (ms) {
  animateOpacity(ms, 0, showCursor);
}

function animateOpacity(ms, finish, cb) {
  const timeout = setTimeout(() => {
    cursor.style.opacity = finish;
    cb(ms);
    clearTimeout(timeout);
  }, ms);
}

textWriter(textNode, textTime);
