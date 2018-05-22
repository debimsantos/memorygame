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

 const oneStar = 45;
 const twoStars = 44;
 const threeStars = 36;

 let openCards = [];
 let moves = 0;
 let seconds = 0;
 let timer = null;

 let movesDisplay = document.getElementById('moves');
 let stars = document.getElementById('stars');
 let displayTimer = document.getElementById('timer');
 let modal = document.getElementById('modal');
 let span = document.getElementsByClassName("close")[0];
 let modalstars = document.getElementById('modalstars');
 let modalsec = document.getElementById('modalsec');
 let modalmin = document.getElementById('modalmin');
 let modalmoves = document.getElementById('modalmoves');
 let button = document.getElementById('button')

 // Display cards on the page calling shuffle function
 function startGame() {
    endTimer();
    restartTimer();

    openCards = [];

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
    startTimer();
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
          computeStars(stars);
          let timeout = setTimeout(function() {
//            alert('Game Over');
              clearInterval(timeout);
              openModal();
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
  function computeStars(_stars) {

    if (moves >= oneStar) {
      _stars.innerHTML = "<li><i class='fa fa-star'></i></li>";
    } else if (moves <= twoStars) {
      _stars.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
    } else if (moves <= threeStars) {
      _stars.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
    }
  }

  // Counter for the number of attempts to match cards
  function moveCounter() {

    movesDisplay.innerHTML = ++moves;
  }

  function startTimer() {
    if (timer !== null) {
      return;
    }
		timer = setInterval(function() {
			seconds ++;
			document.getElementById("sec").innerText = seconds % 60;
			document.getElementById("min").innerText = parseInt(seconds / 60);
		}, 1000);
  }

	function endTimer() {
		clearInterval(timer);
	}

  function resetTimer() {
    timer = null;
    seconds = 0;
  }

  function restartTimer() {
    resetTimer();
    endTimer();
    document.getElementById("sec").innerText = 0;
    document.getElementById("min").innerText = 0;
  }


  function openModal() {
    modalsec.innerText = seconds % 60;
    modalmin.innerText = parseInt(seconds / 60);
    modalmoves.innerText = moves;
    computeStars(modalstars);
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    modal.classList.add("show-modal");
  }

    button.addEventListener('click', function() {
      modal.classList.toggle('show-modal');
      startGame();
    }
  );
