import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

function RestaurantCard({ restaurantData }) {
  return (
    <Container>
      <Row>
        {
          restaurantData.map((data) => {
            return (
              <Col>
                <Link to={'./' + data.restaurantId} style={{ textDecorationLine: 'none' }}>
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