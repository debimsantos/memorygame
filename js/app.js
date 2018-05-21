  // List to hold card classes

 const cardClasses = [
   "fa-diamond",
   "fa-paper-plane-o",
   "fa-anchor",
   "fa-bolt",
   "fa-cube",
   "fa-bug",
   "fa-leaf",
   "fa-bicycle",
   "fa-diamond",
   "fa-paper-plane-o",
   "fa-anchor",
   "fa-bolt",
   "fa-cube",
   "fa-bug",
   "fa-leaf",
   "fa-bicycle",
 ]

 let openCards = [];
 let moves = 0;
 const oneStar = 37;
 const twoStars = 36;
 const threeStars = 18;
 let movesDisplay = document.getElementById('moves');
 let stars = document.getElementById('stars');
 let displayTimer = document.getElementById('timer');

  // Display cards on the page calling shuffle function
  function startGame() {
    seconds = 0;

    moves = 0;
    movesDisplay.innerHTML = moves;

    stars.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";

    const deckArr = document.getElementsByClassName('deck');
    const deck = deckArr[0];
    deck.innerHTML = "";

    let cards = shuffle(cardClasses);
    for (let idx = 0; idx < cards.length; idx++) {
      let li = document.createElement('LI');
      li.setAttribute('class', 'card');
      li.addEventListener('click', openCard);
      let i = document.createElement('I');
      i.setAttribute('class', 'fa ' + cards[idx] );
      li.appendChild(i);
      deck.appendChild(li);
    }

      startTimer();
  }

  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
      }

      return array;
  }

// display card's symbol
  function openCard(evt) {
    const card = evt.target

    if (card.classList.contains('match')) {
      return;
    }

    card.classList.add('card','show');
    addToOpenCards(card);
  }

// add open cards to a list
  function addToOpenCards(card) {
    if (openCards.length < 2) {
      openCards.push(card);
    }

    matchCards();
  }

// Match cards - if cards match, lock in open position, if not close card
// Empty openCards list for next set of cards
  function matchCards() {
    moveCounter();

    if (openCards.length == 2) {

      let li1 = openCards[0].childNodes[0];
      let li2 = openCards[1].childNodes[0];

      if (li1.className === li2.className) {
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');
        openCards = [];

        if (isGameOver()) {
          endTimer();
          computeStars();
          setTimeout(function() {
            alert('Game Over');
          }, 100);
        }
      } else {
        setTimeout(function() {
          // delay closing of unmatched cards by half a second
          openCards[0].classList.remove('show', 'open');
          openCards[1].classList.remove('show', 'open');
          openCards = [];
        }, 500);
      }
    }
  }

  // Check if all cards are matched to end game
  function isGameOver() {
    const matchedArr = document.getElementsByClassName('match');
    if (matchedArr.length == 16) {
      return true;
      endTimer();
    }
    return false;
  }

  // Assign stars based on number of moves until game is won
  function computeStars() {

    if (moves >= oneStar) {
      stars.innerHTML = "<li><i class='fa fa-star'></i></li>";
    } else if (moves <= twoStars) {
      stars.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
    } else if (moves <= threeStars) {
      stars.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
    }
  }

  // Counter for the number of attempts to match cards
  function moveCounter() {

    //here used to be the --> let movesDisplay = document.getElementById('moves');
    movesDisplay.innerHTML = ++moves;
  }

  function startTimer() {
		var seconds = 0;
		timer = setInterval(function() {
			seconds ++;
			document.getElementById("sec").innerText = seconds % 60;
			document.getElementById("min").innerText = parseInt(seconds / 60) + ":";
		}, 1000);
  }

	function endTimer() {
		clearInterval(timer);
	}





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
