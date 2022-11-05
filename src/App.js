import plane from './assets/plane.png';
import './App.css';
import FlightSearch from './components/FlightSearch';

function App() {
  return (
    <div className="app">
      <header className="appHeader">
        <img src={plane} className="plane" alt="plane" />
      </header>
      <FlightSearch />
    
    </div>
  );
}

export default App;
