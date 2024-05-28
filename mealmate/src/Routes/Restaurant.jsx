import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom"

function Restaurant() {
  const { id } = useParams()
  let [restaurant, setRestaurant] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.meal-mate.shop/api/restaurant/${id}`,{
          params: {
            restaurantId: parseInt(id)
          }
        })
        setRestaurant(response)
      } catch (error) {
        console.log(error)
      }
    }
  }, [id])
  console.log(restaurant)
  return (
    <Container>
      <Row>
        <Col>
          <img src={restaurant.restaurantImageUrl} alt='식당사진' />
        </Col>
        <Col>2 of 2</Col>
      </Row>
    </Container>
  )
}

export default Restaurant