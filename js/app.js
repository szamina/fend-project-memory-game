//setting up deck
let $deck = $(".deck");
let memoryGame = {};

//set up timer
memoryGame.timer = new Timer();
memoryGame.start = function() {
    memoryGame.createCards();
};

//empty deck at restart
memoryGame.restart = function() {
    $deck.empty();
    memoryGame.setCounter(0);
    memoryGame.createCards();
    memoryGame.resetTimer();
    memoryGame.setStars(3);
};
memoryGame.previousSelectedCard = {};

/*
 * original reset function of timer starts counting again, this is why I've set up reset this way
 */
memoryGame.resetTimer = function() {
    memoryGame.timer.stop();
    $('.timer').html("00:00:00");
};

//creating list that contains all of the cards
memoryGame.createCards = function() {
    let cards = [{
        'type': 'diamond'
    }, {
        'type': 'diamond'
    }, {
        'type': 'paper-plane-o'
    }, {
        'type': 'paper-plane-o'
    }, {
        'type': 'anchor'
    }, {
        'type': 'anchor'
    }, {
        'type': 'bolt'
    }, {
        'type': 'bolt'
    }, {
        'type': 'cube'
    }, {
        'type': 'cube'
    }, {
        'type': 'leaf'
    }, {
        'type': 'leaf'
    }, {
        'type': 'bicycle'
    }, {
        'type': 'bicycle'
    }, {
        'type': 'bomb'
    }, {
        'type': 'bomb'
    }, ];

    shuffle(cards);

    for (let card of cards) {
        $deck.append(renderCard(card));
    }

};

//shuffle cards
function renderCard(card) {
    return `<li class="card" data-type="${card.type}">
             <i class="fa fa-${card.type}"></i>
           </li>`;
}

//start game
memoryGame.start();

memoryGame.getCounter = function() {
    return parseInt($('.moves').text());
};

//increment or reset move counter
memoryGame.incrementMoveCounter = function() {
    let counter = memoryGame.getCounter();
    counter++;
    memoryGame.setCounter(counter);
};

memoryGame.setCounter = function(newValue) {
    $('.moves').text(newValue);
};

//timer added
memoryGame.startTimer = function() {
    memoryGame.timer.start();
    memoryGame.timer.addEventListener('secondsUpdated', function(e) {
        $('.timer').html(memoryGame.timer.getTimeValues().toString());
    });
};

//matching cards
memoryGame.markCardAsMatch = function($card) {
    $card.addClass('match');
    $card.removeClass('open show');
};

//set up star rating
memoryGame.getStars = function(counter) {
    let stars = 0;
    if (counter <= 32) {
        stars = 3;
    } else if (counter <= 44) {
        stars = 2;
    } else if (counter <= 64) {
        stars = 1;
    }
    return stars;
};

memoryGame.setStars = function(stars) {
    let starsSet = 0;

    $(".stars li").removeClass('active');
    $(".stars li").each(function() {
        if (starsSet < stars) {
            $(this).attr('class', 'active');
            starsSet++;
        }
    });
}

/* increment move counter once a card has been clicked;
 *
 *set up match and not match events*/
$('.deck').on('click', '.card', function() {

    if (!$(this).hasClass("open")) {
        $(this).addClass("show open");
        memoryGame.incrementMoveCounter();
        memoryGame.setStars(memoryGame.getStars(memoryGame.getCounter()));
        if (memoryGame.getCounter() % 2 == 0) {
            if ($(memoryGame.previousSelectedCard).data('type') == $(this).data('type')) {
                memoryGame.markCardAsMatch($(this));
                memoryGame.markCardAsMatch($(memoryGame.previousSelectedCard));
                let notMatchingCardCount = $('.deck li:not(.match)').length;
                if (notMatchingCardCount == 0) {
                    memoryGame.timer.stop();
                    let timerStatus = $('.timer').html();
                    $('#success-modal').modal();
                    $('#modal-step').html(memoryGame.getCounter());
                    $('#modal-stars').html(memoryGame.getStars(memoryGame.getCounter())
                  );
                }
            } else {
                $(this).addClass('not-match');
                $(memoryGame.previousSelectedCard).addClass('not-match');
                setTimeout(function($currentCard, $previousCard) {
                    $currentCard.removeClass('show open not-match');
                    $previousCard.removeClass('show open not-match');
                }, 1000, $(this), $(memoryGame.previousSelectedCard));
            }
        }
    }

    let counter = memoryGame.getCounter();
    if (counter == 1) {
        memoryGame.startTimer();
    }


    memoryGame.previousSelectedCard = $(this);

});

//if restart clicked, close modal
$('.restart').on('click', memoryGame.restart);
$('#modal-close').on('click', memoryGame.restart);

//shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
