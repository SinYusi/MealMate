import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom"

function DetailRestaurant() {
  const restaurantId = useParams().id
  const [cookies] = useCookies(['access_token'])
  let [restaurant, setRestaurant] = useState({})
  const navigate = useNavigate();

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
    const token = cookies.access_token
    try {
      await axios.get(`https://api.meal-mate.shop/api/wish/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert('찜하기 완료!')
    } catch (error) {
      if (error.message.includes('409')) {
        try {
          await axios.delete(`https://api.meal-mate.shop/api/wish/${restaurantId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          alert('찜하기 해제 완료')
        } catch (error) {
          alert('찜하기 해제 중 오류 발생')
        }
      }
      else if(error.message.includes('500')){
        alert('로그인 후 이용 가능합니다.')
        navigate('/login')
      }
      else {
        alert('알 수 없는 오류 발생')
      }
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <h3>{restaurant.restaurantName}</h3>
          <img src={restaurant.restaurantImageUrl} alt='식당사진' style={{ width: '400px', height: '400px' }} />
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