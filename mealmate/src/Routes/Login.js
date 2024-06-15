import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
    let [id, setId] = useState(null)
    let [password, setPassword] = useState(null)
    let [error, setError] = useState(null)
    let navigate = useNavigate()
    const [, setCookie] = useCookies(['access_token'])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id)
            setError('아이디를 입력하세요')
        if (id)
            if (!password)
                setError('비밀번호를 입력하세요')
        if (id && password) {
            try {
                const response = await axios.post('https://api.meal-mate.shop/api/login', {
                    email: id,
                    password: password
                })
                const token = response.data.token
                setCookie('access_token', token, {
                    path: '/',
                    httpOnly: false,
                    secure: true,
                    sameSite: 'Strict',
                    maxAge: 3600
                })
                navigate('/')
            } catch (error) {
                setError('아이디 혹은 비밀번호를 잘못 입력하셨습니다.')
            }
        }
    }
    return (
        <>
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
        </>

    )
}

export default Login