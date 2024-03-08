import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { AuthProvider } from './contexts/auth';

import './styles/global.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
