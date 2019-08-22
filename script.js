// fetch a word
fetch('http://jsonplaceholder.typicode.com/posts') //PROMISe is 'thenable'
  // promises 'resolve' or 'reject'
  .then(function (response) {
    return response.json();
  })
  .then(response => {
    // get a word
    const numWords = response.length;
    const randNum = Math.random() * numWords;
    const roundedRandNum = Math.floor(randNum);
    const randResponse = response[roundedRandNum];
    const randTitle = randResponse.title;
    const randWords = randTitle.split(' ');
    return randWords[0];
  })
  .then(printRandomWord);

// let realWord = ''

function printRandomWord(word) {
  // grab the .word
  // change the innerText (or innerHTML if you wanna get fancy)
  const wordContainer = document.querySelector('.word-container');
  const hiddenWordArr = [...Array(word.length)].map(el => '_');
  const hiddenWord = hiddenWordArr.join(' ');
  wordContainer.innerText = hiddenWord;
  wordContainer.setAttribute('data-real-word', word);
}

const letterInput = document.querySelector('.letter-input');

// listen for keydown
letterInput.addEventListener('keydown', function checkWord(event) {
  const keyLetter = event.key;

  // iterate through our word

  const hiddenWordInput = document.querySelector('.word-container');
  const hiddenWord = hiddenWordInput.innerText;
  const hiddenWordArr = hiddenWord.split('');

  const wordContainer = document.querySelector('.word-container');

  // const realWord = wordContainer.dataset.realWord;
  // OR
  const realWord = wordContainer.getAttribute('data-real-word');
  const realWordArr = realWord.split('');

  // find any matches

  let foundSomething = false;

  // array functions give us the array index:
  const underscoresOrLetters = hiddenWordArr
    .filter(letter => letter !== ' ')
    .map((underscoreOrLetter, index) => {
      // the same index applies to the real word
      const realLetter = realWordArr[index];

      const spaceOrNotSpace = index !== hiddenWordArr.length - 1 ? ' ' : '';

      // TODO: not working for all letters?
      if (keyLetter === realLetter) {
        foundSomething = true;
        return realLetter + spaceOrNotSpace;
      } else {
        return underscoreOrLetter + spaceOrNotSpace;
      }
    });

  if (!foundSomething) {
    // reveal a piece

    let revealedABodyPart = false;

    const personPieces = document.querySelectorAll('.person');
    // const ppArr = Array.from(personPieces);

    // reveal the next piece
    personPieces.forEach(piece => {
      const compStyle = window.getComputedStyle(piece);
      const compVisib = compStyle.getPropertyValue('visibility');

      if (!revealedABodyPart && compVisib === 'hidden') {
        piece.style.visibility = 'visible';
        revealedABodyPart = true;
        loseALife();
      }
    });
    // check its style -- is it visible? go to the next one,
    // if it's not visible, make it visible and stop
  }

  // reveal the matches

  hiddenWordInput.innerText = underscoresOrLetters.join('');
});

function loseALife() {
  const heartsDiv = document.querySelector('.lives-remaining');
  const heartsText = heartsDiv.innerText;

  // emojis is 2 characters
  const newHeartsText = heartsText.slice(0, -2);
  // const heartsArray = Array.from(heartsText)
  // const heartsArray = heartsText.split('')
  // const newHeartsText = heartsText.filter((letter,index)=>index!==heartsText.length-1)

  heartsDiv.innerText = newHeartsText;

  if (heartsDiv.innerText === '') {
    loseGame();
  }
}

function loseGame() {
  document.body.innerHTML = `
  <div class="game-over">GAME OVER</div>
  <button onclick="restart()">RESTART</button>
  `;
}
function restart() {
  window.location.reload();
}