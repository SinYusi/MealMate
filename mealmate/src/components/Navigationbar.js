import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';

function Navigationbar() {
    let navigate = useNavigate();
    const [cookies] = useCookies(['access_token']);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // 쿠키에 토큰이 있는지 확인
        const token = cookies.access_token;
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [cookies]);
    return (
        < Navbar expand="lg" className="bg-body-tertiary" style={{ width: '100%' }}>
            <Container>
                <Navbar.Brand href="/">
                    <img src={process.env.PUBLIC_URL + '/img/logo.png'} height={50} width={50} alt="로고" onClick={() => { navigate('/') }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/restaurant" style={{ width: '60px' }}>식당</Nav.Link>
                        <Nav.Link href="/board" style={{ width: '80px' }}>게시글</Nav.Link>
                    </Nav>
                    <InputGroup className="mb-1" style={{ marginLeft: '40px', width: '60%', border: '3px orange' }}>
                        <Form.Control
                            placeholder="검색어 입력"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2" style={{ width: '40px' }}>
                            <img src={process.env.PUBLIC_URL + '/img/search.png'} style={{ width: "20px", margin: '0 auto' }} alt='로고' />
                        </Button>
                    </InputGroup>
                    <LoginOrMypage navigate={navigate} isAuthenticated={isAuthenticated} />
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

function LoginOrMypage(props) {
    const [, , removeCookie] = useCookies(['access_token']);

    const handleLogout = () => {
        removeCookie('access_token', { path: '/' }); // 쿠키 삭제
        props.navigate('/')
    };
    if (props.isAuthenticated) {
        return (
            <>
                <Button style={{ backgroundColor: 'white', borderColor: 'orange', color: 'black', marginLeft: '80px', width: '10%' }} onClick={() => { handleLogout() }}>
                    Logout
                </Button>
                <NavDropdown title="My Page" id="basic-nav-dropdown" style={{ marginLeft: '40px' }}>
                    <NavDropdown.Item href="/wish">찜 목록</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/mypage">내 정보</NavDropdown.Item>
                </NavDropdown>
            </>
        )
    }
    else {
        return (
            <>
                <Link to='/login' style={{ marginLeft: '80px', width: '10%' }}>
                    <Button style={{ backgroundColor: 'white', borderColor: 'orange', color: 'black' }}>로그인</Button>
                </Link>
                <Button style={{ marginLeft: '40px', backgroundColor: 'orange', borderColor: 'orange', color: 'black', width: '10%' }} onClick={() => { props.navigate('/signup') }}>가입하기</Button>
            </>
        )
    }
}

export default Navigationbar