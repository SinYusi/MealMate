import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import RestaurantCard from "../components/RestaurantCard";

function Wish() {
  let [wishData, setWishData] = useState(null)
  const [cookies] = useCookies(['access_token'])

  useEffect(() => {
    const getWishData = async () => {
      const token = cookies.access_token
      try {
        let response = await axios.get('https://api.meal-mate.shop/api/wish', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        setWishData(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getWishData()
  }, [])

  return (
    <>
      {wishData == null ? null : <RestaurantCard restaurantData={wishData.restaurantInfoList} />}
    </>
  )
}

export default Wish