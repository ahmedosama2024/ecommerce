import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Home/Home';
import Add from './Component/ADD/Add';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/add' element={<Add/>} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
