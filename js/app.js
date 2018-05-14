/*
 * Create a list that holds all of your cards
 */
 let $deck = $(".deck");
 let memoryGame = {};

 memoryGame.timer = new Timer();
 memoryGame.start = function() {
   memoryGame.createCards();
 };
 memoryGame.restart = function(){
   $deck.empty();
   memoryGame.setCounter(0);
   memoryGame.createCards();
   memoryGame.resetTimer();
   memoryGame.setStars(3);
 };
 memoryGame.previousSelectedCard = {};

/**
 * original reset function of timer starts counting again, this is why I've set up reset this way
*/
 memoryGame.resetTimer = function(){
   memoryGame.timer.stop();
   $('.timer').html("00:00:00");
 };

 memoryGame.createCards = function(){
   let cards = [
     {
       'type': 'diamond'
     },
     {
       'type': 'diamond'
     },
     {
       'type': 'paper-plane-o'
     },
     {
       'type': 'paper-plane-o'
     },
     {
       'type': 'anchor'
     },
     {
       'type': 'anchor'
     },
     {
       'type': 'bolt'
     },
     {
       'type': 'bolt'
     },
     {
       'type': 'cube'
     },
     {
       'type': 'cube'
     },
     {
       'type': 'leaf'
     },
     {
       'type': 'leaf'
     },
     {
       'type': 'bicycle'
     },
     {
       'type': 'bicycle'
     },
     {
       'type': 'bomb'
     },
     {
       'type': 'bomb'
     },
   ];

   shuffle(cards);

   for (let card of cards) {
    $deck.append(renderCard(card));
   }


 };






 function renderCard(card) {
   return `<li class="card" data-type="${card.type}">
             <i class="fa fa-${card.type}"></i>
           </li>`;
 }

 memoryGame.start();

 memoryGame.getCounter = function() {
   return parseInt($('.moves').text());
 };

 memoryGame.incrementMoveCounter = function(){
   let counter = memoryGame.getCounter();
   counter++;
   memoryGame.setCounter(counter);
 };

 memoryGame.setCounter = function(newValue) {
   $('.moves').text(newValue);
 };

 memoryGame.startTimer = function() {
   memoryGame.timer.start();
   memoryGame.timer.addEventListener('secondsUpdated', function (e) {
        $('.timer').html(memoryGame.timer.getTimeValues().toString());
   });
 };

 memoryGame.markCardAsMatch = function($card) {
   $card.addClass('match');
   $card.removeClass('open show');
 };

 memoryGame.getStars = function(counter) {
   let stars = 0;
   if(counter <= 32) {
     stars = 3;
   }
   else if(counter <= 44) {
     stars = 2;
   }
   else if(counter <=64) {
     stars = 1;
   }
   return stars;
 };

 memoryGame.setStars = function(stars) {
   let starsSet = 0;

   $(".stars li").removeClass('active');
   $(".stars li").each(function(){
     if(starsSet < stars) {
       $(this).attr('class','active');
       starsSet++;
     }
   });

 }


 $('.deck').on('click', '.card', function(){
  // only for shown cards
  if(!$(this).hasClass("open")){
      $(this).addClass("show open");
      memoryGame.incrementMoveCounter();
      memoryGame.setStars(memoryGame.getStars(memoryGame.getCounter()));
      if(memoryGame.getCounter() % 2 == 0) {
          if($(memoryGame.previousSelectedCard).data('type') == $(this).data('type')) {
            memoryGame.markCardAsMatch($(this));
            memoryGame.markCardAsMatch($(memoryGame.previousSelectedCard));
            let notMatchingCardCount = $('.deck li:not(.match)').length;
            if(notMatchingCardCount == 0) {
                memoryGame.timer.stop();
                let timerStatus = $('.timer').html();
                $('#success-modal').modal();
                $('#modal-step').html( memoryGame.getCounter() );
                $('#modal-stars').html(memoryGame.getStars(memoryGame.getCounter()));
            }
          } else {
            $(this).addClass('not-match');
            $(memoryGame.previousSelectedCard).addClass('not-match');
            setTimeout(function($currentCard, $previousCard){
                $currentCard.removeClass('show open not-match');
                $previousCard.removeClass('show open not-match');
            }, 1000, $(this), $(memoryGame.previousSelectedCard));
          }
      }
  }

  let counter = memoryGame.getCounter();
  if(counter == 1) {
    memoryGame.startTimer();
  }



  memoryGame.previousSelectedCard = $(this);

 });


 $('.restart').on('click',memoryGame.restart);
 $('#modal-close').on('click',memoryGame.restart);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
