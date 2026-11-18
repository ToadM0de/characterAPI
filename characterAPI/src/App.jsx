import { useState, useEffect } from "react";

import CharacterCard from "./components/CharacterCard";
import CharacterDetail from "./components/CharacterDetail";
import SearchBar from "./components/SearchBar";

function App() {

  const [characters, setCharacters] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {

    let ignore = false;

    async function fetchCharacters() {

      setLoading(true);
      setError("");

      try {

        const params = new URLSearchParams();
        params.set("page", page);

        if (search.trim() !== "") {
          params.set("name", search.trim());
        }
        if (status !== "") {
          params.set("status", status);
        }
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?${params.toString()}`
        );
        if (response.status === 404) {
          if (!ignore) {
            setCharacters([]);
            setPageInfo({});
            setError("No characters found");
          }
          return;
        }

        if (!response.ok) {
          throw new Error("Something went wrong. Please try again later");
        }

        const data = await response.json();

        if (!ignore) {
          setCharacters(data.results);
          setPageInfo(data.info);
        }

      } catch (err) {

        if (!ignore) {
          setError(err.message);
        }

      } finally {

        if (!ignore) {
          setLoading(false);
        }

      }
    }

    fetchCharacters();

    return () => {
      ignore = true;
    };

  }, [page, search, status]);

  function handleSearch() {
    setPage(1);
  }

  async function handleCharacterClick(id) {

    setDetailLoading(true);
    setSelectedCharacter(null);

    try {

      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again later");
      }

      const data = await response.json();

      setSelectedCharacter(data);

    } catch (err) {

      alert(err.message);

    } finally {

      setDetailLoading(false);

    }
  }


  return (
    <div className="app">

      <header>
        <h1>Rick and Morty Character API</h1>
      </header>

      <SearchBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onSearch={handleSearch}
      />

      {error && (
        <div className="message error">
          <p>{error}</p>

          <button onClick={() => setPage((current) => current)}>
            Try again
          </button>
        </div>
      )}


      {!loading && !error && (

        <div className="grid">

          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={() => handleCharacterClick(character.id)}
            />

          ))}

        </div>

      )}


      {!loading && !error && (
        <div className="page">

          <button
            disabled={!pageInfo.prev}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          <span>
            Page {page} of {pageInfo.pages}
          </span>

          <button
            disabled={!pageInfo.next}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>

        </div>

      )}

      <CharacterDetail
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />

    </div>
  );
}

export default App;