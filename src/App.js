import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
