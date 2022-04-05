import React, { useState, useEffect } from 'react';
import './style.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(`https://breakingbadapi.com/api/characters?name=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, [query]);
  return (
    <div className="container">
      <Header />
      <div className="search">
        <div>
          <input
            type="text"
            placeholder="Search character"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <p
            style={{
              display: query === '' ? 'none' : 'block',
            }}
            className="reset"
            onClick={() => setQuery('')}
          >
            X
          </p>
        </div>
      </div>
      <Characters loading={loading} items={items} />
    </div>
  );
};

const Characters = ({ items, loading }) => {
  const spinnerStyle = { width: '200px', display: 'block', margin: 'auto' };
  if (items.length === 0 && loading === false) {
    return <h2 className="error">Character does not exist</h2>;
  }
  return loading ? (
    <img
      className=""
      style={spinnerStyle}
      src="https://i0.wp.com/codemyui.com/wp-content/uploads/2015/09/spinner-loader-animation.gif?fit=880%2C440&ssl=1"
      alt="Loading..."
    />
  ) : (
    <section className="cards">
      {items.map((item) => (
        <CharacterItem key={item.char_id} item={item} />
      ))}
    </section>
  );
};

const CharacterItem = ({ item }) => {
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          <img src={item.img} alt="" />
        </div>
        <div className="card-back">
          <h1>{item.name}</h1>
          <br />
          <br />
          <ul>
            <li>
              <strong>Actor Name:</strong> {item.portrayed}
            </li>
            <li>
              <strong>Nickname:</strong> {item.nickname}
            </li>
            <li>
              <strong>Birthday:</strong> {item.birthday}
            </li>
            <li>
              <strong>Status:</strong> {item.status}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="App-logo">
      <header className="center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Breaking_Bad_logo.svg/369px-Breaking_Bad_logo.svg.png"
          alt=""
        />
      </header>
    </div>
  );
};

export default App;
