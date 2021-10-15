import Card from "./Card";

function Map({ cards }) {
  console.log(cards);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        width: "100%",
      }}
    >
      {cards.map((card) => (
        <Card key={card.image} imageSrc={card.image} />
      ))}
    </div>
  );
}

export default Map;
