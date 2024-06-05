import { useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

function RestaurantCard({ restaurantData }) {
  useEffect(() => {
    console.log(restaurantData)
  }, [])
  return (
    <Container>
      <Row>
        {
          restaurantData.map((data) => {
            return (
              <Col key={data.restaurantId}>
                <Link to={'/restaurant/' + data.restaurantId} style={{ textDecorationLine: 'none' }}>
                  <img src={data.restaurantImageUrl} height={200} width={200} alt='식당이미지' />
                  <h4 style={{ color: 'black' }}>{data.restaurantName}</h4>
                  <p style={{ color: 'black' }}>{data.restaurantType}</p>
                  <p style={{ color: 'black' }}>{data.likeCount}</p>
                </Link>
              </Col>
            )
          })
        }
      </Row>
    </Container>
  )
}

export default RestaurantCard