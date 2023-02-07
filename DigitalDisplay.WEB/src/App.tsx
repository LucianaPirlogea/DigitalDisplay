import { Outlet } from 'react-router-dom';
import { Header } from './components';
import { Home } from './components/Home';
function App() {
  return (
    <div className="App">
      <Header /> <Home /><Outlet />
    </div>
  );
}

export default App;
