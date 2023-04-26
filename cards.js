// /*
// Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
// Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
// */

axios
  .get("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
  .then((res) => {
    console.log(res);
    const suit = res.data.cards[0].suit;
    const val = res.data.cards[0].value;
    const card = `${val} of ${suit}`;
    console.log(card);
  })
  .catch((err) => {
    console.log(err);
  });

// /*
// Make a request to the deck of cards API
// to request a single card from a newly shuffled deck.
// Once you have the card, make a request to the same API to get one more card from the same deck.
// */

const url = "https://deckofcardsapi.com/api/deck/new/draw/?count=1";

axios
  .get(url)
  .then((res) => {
    console.log(res);
    const suit = res.data.cards[0].suit;
    const val = res.data.cards[0].value;
    const card = `${val} of ${suit}`;
    console.log(card);
    return axios.get(url);
  })
  .then((res) => {
    console.log(res);
    const suit1 = res.data.cards[0].suit;
    const val1 = res.data.cards[0].value;
    const card1 = `${val1} of ${suit1}`;
    console.log(card1);
  })
  .catch((err) => {
    console.log(err);
  });

/*
Build an HTML page that lets you draw cards from a deck.
When the page loads, go to the Deck of Cards API to create a new deck,
and show a button on the page that will let you draw a card.
Every time you click the button, display a new card, until there are no cards left in the deck.
*/
$("#card-button").on("click", getCard);

let deck = null;
let deckCount = 52;

function getDeck() {
  const endPoint =
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
  return axios
    .get(endPoint)
    .then((res) => {
      const deckId = res.data.deck_id;
      console.group(deckId);
      return deckId;
    })
    .catch((err) => {
      console.log(err);
    });
}

getDeck().then((deckId) => {
  deck = deckId;
});

$("#new-deck").on("click", function () {
  $("#card-container").empty();
  deckCount = 52;
  getDeck().then((deckId) => {
    deck = deckId;
  });
});

function getCard() {
  const { num, otherNum } = randomNum();
  console.log(num, "<num", otherNum, "<otherNUM");
  deckCount--;
  console.log(deckCount);

  if (deckCount === 0) {
    $("#messages")
      .append(
        "<h3 id='message' class='absolute top-0 w-screen bg-zinc-900 text-white font-bold text-2xl p-2'>Out of Cards!</h3>"
      )
      .fadeIn();
    setTimeout(() => {
      $("#message").fadeOut();
    }, 4000);
  }

  axios
    .get(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
    .then((res) => {
      const card = res.data.cards[0].image;
      $("#card-container").append(
        `<img src="${card}" alt="card" id="images" class="absolute flex items-center justfiy-center" style="transform: rotate(${num}deg); top: ${otherNum}px;"/>`
      );
    })

    .catch((err) => {
      console.log(err);
      return err;
    });
}

function randomNum() {
  const num = Math.floor(Math.random() * 70 - 35);
  const otherNum = Math.floor(Math.random() * 45) + 170;
  return { num, otherNum };
}
