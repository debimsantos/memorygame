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

 const stars3 = 16;
 const stars2 = 20;
 const stars1 = 24;

 let openCards = [];
 let moves = 0;
 let seconds = 0;
 let timer = null;

 let movesDisplay = document.getElementById('moves');
 let stars = document.getElementById('stars');
 let starCount = 3;
 let displayTimer = document.getElementById('timer');
 let modal = document.getElementById('modal');
 let span = document.getElementsByClassName("close")[0];
 let modalstars = document.getElementById('modalstars');
 let modalsec = document.getElementById('modalsec');
 let modalmin = document.getElementById('modalmin');
 let modalmoves = document.getElementById('modalmoves');
 let button = document.getElementById('button')

 // Initialize game by clearing old game values (time, stars, moves)
 function startGame() {
    endTimer();
    restartTimer();

    openCards = [];

    moves = 0;
    movesDisplay.innerHTML = moves;

    stars.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";

    // Card HTML is created by calling shuffle fxn on deck
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

  // Display card's symbol when clicked
  function openCard(evt) {

    startTimer();
    const card = evt.target

    if (card.classList.contains('match')) {
      return;
    }
    card.classList.add('show','open');
    addToOpenCards(card);
    reduceStars();
  }

  // Add open cards to a list
  function addToOpenCards(card) {
    if (openCards.length < 2) {
      openCards.push(card);
    }
      matchCards();
  }


// Match cards - if cards match, lock in open position, if not close card
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
          let timeout = setTimeout(function() {
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

  // Counter for the number of attempts to match cards
  function moveCounter() {
    movesDisplay.innerHTML = ++moves;
  }

  // Assign stars based on number of moves until game is won
  function reduceStars() {
      let _star = document.querySelectorAll('li');
      if (moves === 16) {
        _star[0].style.display="none";
        numStar = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
      } else if (moves === 20) {
        _star[1].style.display="none";
        numStar = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
      } else {
        return;
      }
  }

  // Timer function for when card is clicked
  function startTimer() {
    if (timer !== null) {
      return;
    }
		timer = setInterval(function() {
			seconds ++;
      // Converting time into seconds and minutes modified from
      //https://appfurnace.zendesk.com/hc/en-us/community/posts/255456346-Create-a-countdown-timer-
			document.getElementById("sec").innerText = seconds % 60;
			document.getElementById("min").innerText = parseInt(seconds / 60);
		}, 1000);
  }

  // Timer ends for when game is won
	function endTimer() {
		clearInterval(timer);
	}

  // Clear all timer data
  function resetTimer() {
    timer = null;
    seconds = 0;
  }

  // Timer restarts everytime startGame is called
  function restartTimer() {
    resetTimer();
    endTimer();
    document.getElementById("sec").innerText = 0;
    document.getElementById("min").innerText = 0;
  }

  // Modal pops up when game is over to show time, moves, star
  function openModal() {
    modalsec.innerText = seconds % 60;
    modalmin.innerText = parseInt(seconds / 60);
    modalmoves.innerText = moves;
    modalstars.innerHTML = numStar;

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    modal.classList.add("show-modal");
  }

    // Play Again button invokes startGame function
    button.addEventListener('click', function() {
      modal.classList.toggle('show-modal');
      startGame();
    }
  );
