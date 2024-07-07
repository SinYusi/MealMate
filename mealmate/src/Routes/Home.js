import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  const [restaurantData, setRestaurantData] = useState(0); //식당 데이터
  const [isFull, setIsFull] = useState(false); //데이터를 불러왔는지 확인
  useEffect(() => {
    axios({ //데이터 요청
      method: 'get',
      url: `https://api.meal-mate.shop/api/restaurant/best` //홈에서는 top3를 보여줌
    })
      .then((response) => {
        setRestaurantData(response.data) //데이터를 저장
        setIsFull(true) //데이터를 정상적으로 불러왔다고 저장
      })
      .catch(() => { //데이터 불러오기 실패
        console.log('실패');
      })
  }, [])

  if (isFull) { //만약 식당 데이터가 정상적으로 불러와졌다면 렌더링
    return (
      <div>
        <div style={{marginLeft: '100px'}}>
          <h2>Top 3</h2>
        </div>
        {
          <Container>
            <Row>
              {
                restaurantData.map((data) => {
                  return (
                    <Col key={data.restaurantId}>
                      {/* 클릭하면 식당 디테일 페이지로 가도록 설정 */}
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