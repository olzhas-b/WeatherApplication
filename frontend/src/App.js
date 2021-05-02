import { useState, useEffect } from 'react';
import './App.css';

import countries from 'i18n-iso-countries';
import Weather from './Weather';

countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

function App() {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState('almaty');
  const [state, setState] = useState('almaty');
  const [info, setInfo] = useState([{name : "user"}, {name: "user2"}]);

  const apiUrl = `http://127.0.0.1:8000/${state}`;

  // Side effect
  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, [apiUrl]);

  const inputHandler = (event) => {
    setGetState(event.target.value);
  };

  const submitHandler = () => {
    setState(getState);
  };
  
  return (
    <div className="App">
      <header className="d-flex justify-content-center align-items-center">
      </header>
      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div class="col-auto">
            <label for="location-name" class="col-form-label">
              <strong>Enter Location :</strong>
            </label>
          </div>
          <div class="col-auto">
            <input
              type="text"
              id="location-name"
              class="form-control"
              onChange={inputHandler}
              value={getState}
            />
          </div>
          <button className="btn btn-primary mt-2" onClick={submitHandler}>
            Search
          </button>
        </div>
          
        <div className="card mt-3 mx-auto" style={{ width: '60vw' }}>
          {apiData[0] ? (
          <div> {
            apiData.map((result) => (
              <Weather item={result}/>
            ))} </div>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
