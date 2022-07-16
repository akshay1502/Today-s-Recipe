import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './searchBox.scss';

export default function SearchBox() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const searchForQuery = () => {
    navigate(`/search?query=${search}`);
  };
  return (
    <div className="navbar-input">
      <input
        type="text"
        id="searchBox"
        name="searchBox"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <AiOutlineSearch size="32px" className="searchIcon" type="button" onClick={searchForQuery} />
    </div>
  );
}
