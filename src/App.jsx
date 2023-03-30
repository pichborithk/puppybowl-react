import { Outlet } from 'react-router-dom';
import './App.css';
import Submit from './components/Submit';

const App = () => {
  return (
    <div className='App'>
      <h1>PuppyBowl</h1>
      <Submit />
      <Outlet />
    </div>
  );
};

export default App;
