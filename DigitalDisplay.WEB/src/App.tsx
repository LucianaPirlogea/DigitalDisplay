import { Outlet } from 'react-router-dom';
import { Header } from './components';
import { Home } from './components/Home';
import { useLocation } from "react-router-dom";
function App() {
  const { pathname } = useLocation();
  if (pathname === '/') {
    return (
      <div className="App">
        <Header /> <Home /><Outlet />
      </div>
    );
  }
  return (
    <div className="App">
      <Header /> <Outlet />
    </div>
  );
}

export default App;
