import { useState } from 'react';
import '../Css/Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Login() {
    let [id, setId] = useState(null)
    let [password, setPassword] = useState(null)
    let [error, setError] = useState(null)
    let navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['access_token'])
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
        <div class="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div class="input-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" onChange={(e) => { setId(e.target.value) }} />
                </div>
                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                {error == null ? null : error}
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login