import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navigationbar from './components/Navigationbar'
import Login from './Routes/Login'
import { useEffect, useState } from 'react';
import axios from 'axios';

function dataLoad(setRestaurantData) {

}

function App() {
  const [restaurantData, setRestaurantData] = useState(0); // 상태 초기화
  const [isFull, setIsFull] = useState(false);
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://api.meal-mate.shop/api/restaurant`,
      params: {
        type: '분식'  // 쿼리 파라미터 key-value
      }
    })
      .then((response) => {
        setRestaurantData(response.data)
        setIsFull(true)
      })
      .catch(() => {
        console.log('실패');
      })
  }, [])
  
  if (!isFull) {
    return <div>Loading...</div>; // 데이터가 로드될 때까지 로딩 표시
  }
  
  return (
    <div>
      <Navigationbar />
      
      <h2>name: {restaurantData[0].restaurantName}</h2>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
