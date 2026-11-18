function CharacterDetail({ character, onClose }) {
  if (!character) {
    return null;
  }

  return (
    <div className="detailSection">
      <div className="details">

        <button onClick={onClose}>Close</button>

        <img src={character.image} alt={character.name} />

        <h2>{character.name}</h2>

        <p>Gender: {character.gender}</p>

        <p>Origin: {character.origin.name}</p>

        <p>Location: {character.location.name}</p>

        <p>Episodes: {character.episode.length}</p>

      </div>
    </div>
  );
}

export default CharacterDetail;