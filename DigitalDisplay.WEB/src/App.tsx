import { Outlet } from 'react-router-dom';
import { Header } from './components';
function App() {
  return (
    <div className="App">
      <Header /> <Outlet />
    </div>
  );
}

export default App;
