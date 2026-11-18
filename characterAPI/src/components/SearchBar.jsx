function SearchBar({
  search,
  setSearch,
  status,
  setStatus,
  onSearch
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearch();
  }

  return (
    <form onSubmit={handleSubmit} className="form">

      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <select
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <option value="">All</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="Unknown">Unknown</option>
      </select>

      <button type="submit">Search</button>

    </form>
  );
}

export default SearchBar;