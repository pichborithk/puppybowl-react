import { Outlet } from 'react-router-dom';
import Submit from './components/Submit';
import './scss/app.scss';

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
