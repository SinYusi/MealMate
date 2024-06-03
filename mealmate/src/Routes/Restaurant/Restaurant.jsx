import axios from "axios";
import { useEffect, useState } from "react";
import RestaurantCard from '../../components/RestaurantCard'

function Restaurant() {
  const [restaurantData, setRestaurantData] = useState(0); // 상태 초기화
  const [isFull, setIsFull] = useState(false);
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://api.meal-mate.shop/api/restaurant`,
      params: {
        type: ''  // 쿼리 파라미터 key-value
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

  if (isFull) {
    return (
      <div>
        <RestaurantCard restaurantData={restaurantData} />
      </div>
    )
  }
}

export default Restaurant