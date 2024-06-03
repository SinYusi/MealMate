import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Routes/Login'
import Home from './Routes/Home'
import Navigationbar from './components/Navigationbar';
import SignUp from './Routes/SignUp';
import AddRestaurant from './Routes/Restaurant/AddRestaurant';
import Restaurant from './Routes/Restaurant/Restaurant';
import DetailRestaurant from './Routes/Restaurant/DetailRestaurant';
import Board from './Routes/Board/Board';
import DetailBoard from './Routes/Board/DetailBoard';
import AddBoard from './Routes/Board/AddBoard';
import Wish from './Routes/Wish';

function App() {
  return (
    <div>
      <Navigationbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/addrestaurant' element={<AddRestaurant />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/restaurant' element={<Restaurant />} />
        <Route path='/restaurant/:id' element={<DetailRestaurant />} />
        <Route path='/board' element={<Board />} />
        <Route path='/board/:id' element={<DetailBoard />} />
        <Route path='/addboard' element={<AddBoard />} />
        <Route path='/wish' element={<Wish />} />
      </Routes>
    </div>
  );
}

export default App;
