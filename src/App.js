import Routes from './routes';
import { AuthProvider } from './contexts/auth';

import './styles/global.css';

function App() {
  return (
    <div className="App">
        <AuthProvider>
            <Routes />
        </AuthProvider>
    </div>
  );
}

export default App;
