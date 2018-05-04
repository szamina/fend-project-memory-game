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
 };

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
   return `<li class="card">
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

 $('.deck').on('click', '.card', function(){
  if(!$(this).hasClass("open")){
      memoryGame.incrementMoveCounter();
  }

  let counter =  memoryGame.getCounter();
  if(counter == 1) {
    memoryGame.startTimer();
  }

  $(this).addClass("show open");

 });


 $('.restart').on('click',memoryGame.restart);

 /*memoryGame.restart = function(){
   $deck.empty();
   memoryGame.createCards();
 };*/

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
