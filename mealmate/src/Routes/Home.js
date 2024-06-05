import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  const [restaurantData, setRestaurantData] = useState(0); // 상태 초기화
  const [isFull, setIsFull] = useState(false);
  useEffect(() => {
    axios({
      method: 'get',
      url: `https://api.meal-mate.shop/api/restaurant/best`
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
          <Container>
            <Row>
              {
                restaurantData.map((data) => {
                  return (
                    <Col key={data.restaurantId}>
                      <Link to={'restaurant/' + data.restaurantId} style={{ textDecorationLine: 'none' }}>
                        <img src={data.restaurantImageUrl} height={200} width={200} alt='식당이미지' />
                        <h4 style={{ color: 'black' }}>{data.restaurantName}</h4>
                        <p style={{ color: 'black' }}>{data.restaurantType}</p>
                        <p style={{color: 'black'}}>{data.likeCount}</p>
                      </Link>
                    </Col>
                  )
                })
              }
            </Row>
          </Container>
        }
      </div>
    )
  }
}

export default Home