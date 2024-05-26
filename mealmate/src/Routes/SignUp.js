import axios from "axios"
import { useState } from "react"

function SignUp() {
  let [id, setId] = useState(null)
  let [password, setPassword] = useState(null)

  let [isEnterId, setIsEnterId] = useState(null)
  let [isEnterPassword, setIsEnterPassword] = useState(null)

  let [idServerError, setIdServerError] = useState(null)
  let [idServerMessage, setIdServerMessage] = useState(null)
  let [signupServerError, setSignupServerError] = useState(null)
  let [signupServerMessage, setSignupServerMessage] = useState(null)

  const onIdCheckHandler = async (e) => {
    e.preventDefault();
    if (!id) {
      setIsEnterId(false)
      return
    }
    try {
      await axios.post('https://api.meal-mate.shop/api/member/check-email', {
        email: id
      })
      setIdServerError(false)
    } catch (error) {
      //error 메시지에 따른 메시지 출력
      setIdServerMessage(error.response.data.message)
      setIdServerError(true);
    }
    setIsEnterId(true)
  }

  const onSignUpHandler = async (e) => {
    e.preventDefault();
    if (!id) {
      setIsEnterId(false)
      return
    }
    if (!password) {
      setIsEnterPassword(false)
      return
    }
    try {
      await axios.post('https://api.meal-mate.shop/api/member/signup', {
        email: id,
        password: password
      })
      setSignupServerError(false)
      console.log('회원가입 성공')
    } catch (error) {
      alert(error)
    }
    setIsEnterPassword(true)
  }

  return (
    <>
      <form onSubmit={onIdCheckHandler}>
        <p>아이디(이메일)입력</p>
        <input type="text" onChange={(e) => { setId(e.target.value) }}></input>
        <button type="submit">중복 검사</button>
        <IdErrorMessage idServerMessage={idServerMessage} idServerError={idServerError} isEnterId={isEnterId} />
      </form>
      <form onSubmit={onSignUpHandler}>
        <p>비밀번호 입력</p>
        <input type="password" onChange={(e) => { setPassword(e.target.value) }}></input>
        <PasswordErrorMessage isEnterPassword={isEnterPassword} />
        <button type="submit">가입하기</button>
      </form>
    </>
  )
}

function IdErrorMessage(props) {
  if (props.isEnterId) {
    if (props.idServerError) {
      return (
        <p>{props.idServerMessage}</p>
      )
    }
    else if (props.idServerError == false) {
      return (
        <p>사용 가능합니다.</p>
      )
    }
  }
  else if (props.isEnterId == false) {
    return (
      <p>아이디를 입력하세요.</p>
    )
  }
}

function PasswordErrorMessage(props) {
  if (props.isEnterPassword == false) {
    return (
      <p>비밀번호를 입력하세요.</p>
    )
  }
}

export default SignUp