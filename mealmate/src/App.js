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
import MyPage from './Routes/User/MyPage';

function App() {
  return (
    <div>
      <Navigationbar />
      <Routes>
        {/* 홈페이지 */}
        <Route path='/' element={<Home />} />
        {/* 로그인 */}
        <Route path='/login' element={<Login />} />
        {/* 식당 추가 */}
        <Route path='/addrestaurant' element={<AddRestaurant />} />
        {/* 가입하기 */}
        <Route path='/signup' element={<SignUp />} />
        {/* 식당 */}
        <Route path='/restaurant' element={<Restaurant />} />
        {/* 식당 상세 */}
        <Route path='/restaurant/:id' element={<DetailRestaurant />} />
        {/* 게시판 */}
        <Route path='/board' element={<Board />} />
        {/* 게시판 상세 */}
        <Route path='/board/:id' element={<DetailBoard />} />
        {/* 게시판 추가 */}
        <Route path='/addboard' element={<AddBoard />} />
        {/* 찜 목록 */}
        <Route path='/wish' element={<Wish />} />
        {/* 회원 정보 */}
        <Route path='/mypage' element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
