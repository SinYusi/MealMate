import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom"

function Restaurant() {
  const restaurantId = useParams().id
  let [restaurant, setRestaurant] = useState({})
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
  }, [])

  return (
    <Container>
      <Row>
        <Col>
          <h3>{restaurant.restaurantName}</h3>
          <img src={restaurant.restaurantImageUrl} alt='식당사진' style={{ width: '100%' }} />
        </Col>
        <Col>
          <p style={{marginTop: '40px'}}>여는 시간 : {restaurant.openAt}</p>
          <p>닫는 시간 : {restaurant.closeAt}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Restaurant