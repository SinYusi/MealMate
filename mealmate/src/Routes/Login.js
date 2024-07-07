import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
    const [id, setId] = useState(null) //id를 저장하는 변수
    const [password, setPassword] = useState(null) //비밀번호를 저장하는 변수
    const [error, setError] = useState(null) //에러 변수
    const navigate = useNavigate()
    const [ , setCookie] = useCookies(['access_token']) //쿠키 변수
    const handleSubmit = async (e) => { //로그인 버튼을 누르면 작동되는 함수
        e.preventDefault(); //버튼이 눌렸을 때 새로고침을 방지하는 함수
        if (!id) //아이디를 입력하지 않으면 
            setError('아이디를 입력하세요')
        if (id) //아이디를 입력했는데 비밀번호를 입력하지 않으면
            if (!password)
                setError('비밀번호를 입력하세요')
        if (id && password) { //아이디와 비밀번호를 다 입력했다면
            //
            // 데이터 요청
            //
            try {
                //로그인 api 요청
                const response = await axios.post('https://api.meal-mate.shop/api/login', {
                    email: id,
                    password: password
                })
                //받은 토큰을 쿠키에 저장
                const token = response.data.token
                setCookie('access_token', token, {
                    path: '/',
                    httpOnly: false,
                    secure: true,
                    sameSite: 'Strict',
                    maxAge: 3600
                })
                //로그인 완료 시 홈페이지로 이동
                navigate('/')
            } catch (error) {
                //실패 시 에러 띄우기
                setError('아이디 혹은 비밀번호를 잘못 입력하셨습니다.')
            }
        }
    }
    //
    // 렌더링
    //
    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '700px', height: '300px', border: '1px solid black' }}>
            <Form onSubmit={handleSubmit} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" onChange={(e) => { setId(e.target.value) }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                </Form.Group>
                {error == null ? null : <Form.Text>{error}</Form.Text>}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div >
    )
}

export default Login