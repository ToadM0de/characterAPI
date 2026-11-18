function CharacterCard({ character, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={character.image} alt={character.name} />

      <div className="info">
        <h2>{character.name}</h2>

        <p>
          <span className={`status ${character.status.toLowerCase()}`}></span>
          {character.status}
        </p>

        <p>Species: {character.species}</p>
      </div>
    </div>
  );
}

export default CharacterCard;