import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function Navigationbar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" style={{ width: '100%' }}>
            <Container>
                <Navbar.Brand href="#home" >
                    <img src={process.env.PUBLIC_URL + '/img/logo.png'} height={50} width={50} alt="로고" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="카테고리" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">중식</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.1">일식</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.1">양식</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.1">한식</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav.Link href="#home">게시글</Nav.Link>
                    <InputGroup className="mb-1" style={{ marginLeft: '80px', width: '60%', border: '3px orange' }}>
                        <Form.Control
                            placeholder="검색어 입력"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                            <img src={process.env.PUBLIC_URL + '/img/search.png'} style={{ width: "20px" }} />
                        </Button>
                    </InputGroup>
                    <Button style={{ marginLeft: '40px', backgroundColor: 'white', borderColor: 'orange', color: 'black' }}>로그인</Button>
                    <Button style={{ marginLeft: '40px', backgroundColor: 'orange', borderColor: 'orange', color: 'black' }}>가입하기</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigationbar