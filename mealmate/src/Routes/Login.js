import { useState } from 'react';
import '../Css/Login.css';
import axios from 'axios';

function Login() {
    let [id, setId] = useState(null)
    let [password, setPassword] = useState(null)
    let [token, setToken] = useState(null)
    const handleSubmit = async (e) => {
        if (!id)
            alert('id 입력하셈')
        if (!password)
            alert('비번 입력하셈')

        try {
            await axios.post('https://api.meal-mate.shop/api/login', {
                email: id,
                password: password
            })
                .then((response) => {
                    setToken(response)
                })
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('로그인 실패: ' + error.response.data.message); // 서버로부터의 에러 메시지 표시
        }
    }
    return (
        <div class="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div class="input-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" onChange={(e) => { setId(e.target.value) }} required />
                </div>
                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value) }} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login