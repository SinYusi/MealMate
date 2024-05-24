import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
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

  if (isFull) {
    return (
      <div>
        {
          console.log(restaurantData)
        }
      </div>
    )
  }
}

export default Home