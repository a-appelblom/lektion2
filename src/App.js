import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Map from "./components/Map";

function App() {
  const [ready, setReady] = useState(true);
  const [choice, setChoice] = useState("");
  const [currentCard, setCurrentCard] = useState({});
  const [prevCard, setPrevCard] = useState({});
  const [loading, setLoading] = useState(false);
  const [deck, setDeck] = useState({});
  const [deck2, setDeck2] = useState({});
  const [lottsaCards, setLottsaCards] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const res = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      const data = await res.json();

      const res2 = await fetch("http://localhost:3000/api/hello");
      const data2 = await res2.json();

      console.log(data2);

      setDeck(data);
      setDeck2(data);
      setLoading(false);
    }
    getData();
  }, []);

  useEffect(() => {
    async function fetchCard() {
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
      );
      const data = await res.json();
      setCurrentCard(data.cards[0]);
    }

    deck.deck_id && fetchCard();
  }, [deck]);

  useEffect(() => {
    async function fetchCard() {
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/${deck2.deck_id}/draw/?count=12`
      );
      const data = await res.json();
      setLottsaCards(data.cards);
    }

    deck2.deck_id && fetchCard();
  }, [deck2]);

  useEffect(() => {
    // console.log("deck", deck);
    console.log("current", currentCard);
    console.log("Previous", prevCard);
  }, [deck, currentCard, prevCard]);

  useEffect(() => {
    function compareCards() {
      const curr = getValues(currentCard);
      const prev = getValues(prevCard);

      console.log(prev, curr, choice);

      if (choice === "lower" && curr <= prev) {
        console.log("correct");
        setScore(score + 1);
      } else if (choice === "higher" && curr >= prev) {
        console.log("correct");
        setScore(score + 1);
      } else {
        console.log("wrong");
        return;
      }
    }
    if (ready) {
      compareCards();
      setChoice("");
    }
  }, [currentCard, prevCard, ready, score, choice]);

  function getValues(card) {
    let compareValue = 0;
    console.log(card.value);
    switch (card.value) {
      case "JACK":
        compareValue = 11;
        break;
      case "QUEEN":
        compareValue = 12;
        break;
      case "KING":
        compareValue = 13;
        break;
      case "ACE":
        compareValue = 14;
        break;

      default:
        compareValue = parseInt(card.value);
        break;
    }
    console.log("compare", compareValue);
    return compareValue;
  }

  function getCard() {
    console.log(choice);
    async function fetchCard() {
      setReady(false);
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
      );
      const data = await res.json();
      setPrevCard(currentCard);
      setCurrentCard(data.cards[0]);
      setReady(true);
    }
    fetchCard();
  }

  if (loading) return <div>Loading.....</div>;

  if (!deck) return <div>Error!!!</div>;

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Higher or Lower</h1>
      <h2 style={{ textAlign: "center" }}>Score: {score}</h2>
      <div className="container">
        <button
          onClick={() => {
            getCard();
            setChoice("lower");
          }}
        >
          Lower
        </button>
        <button
          onClick={() => {
            getCard();
            setChoice("higher");
          }}
        >
          Higher
        </button>
        <div>
          <h3>Current</h3>
          {currentCard.value && (
            <Card
              imageSrc={currentCard.image}
              imageAlt={`${currentCard.value} of ${currentCard.suit}`}
            />
          )}
        </div>
        <div>
          <h3>Previous</h3>
          {prevCard.value && (
            <Card
              imageSrc={prevCard.image}
              imageAlt={`${prevCard.value} of ${prevCard.suit}`}
            />
          )}
        </div>
      </div>
      <Map cards={lottsaCards} />
    </div>
  );
}

export default App;
