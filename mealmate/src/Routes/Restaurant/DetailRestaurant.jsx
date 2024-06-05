import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom"

function DetailRestaurant() {
  const restaurantId = useParams().id
  const [cookies] = useCookies(['access_token'])
  let [restaurant, setRestaurant] = useState({})
  const token = cookies.access_token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.meal-mate.shop/api/restaurant/${restaurantId}`)
        setRestaurant(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [restaurantId])

  const wishButtonController = async () => {
    try {
      await axios.get(`https://api.meal-mate.shop/api/wish/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    } catch (error) {
      if (error.message.includes('500')) {
        // try {
        //   await axios.delete('')
        // }
      }
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <h3>{restaurant.restaurantName}</h3>
          <img src={restaurant.restaurantImageUrl} alt='식당사진' style={{ width: '100%' }} />
        </Col>
        <Col>
          <p style={{ marginTop: '40px' }}>여는 시간 : {restaurant.openAt}</p>
          <p>닫는 시간 : {restaurant.closeAt}</p>
          <Button variant="info" onClick={wishButtonController}>찜</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default DetailRestaurant