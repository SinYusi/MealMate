import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function SignUp() {
  let categoryName = ['보쌈', '일식', '고기', '피자', '찌개', '양식', '중식', '아시안', '치킨', '집밥', '버거', '분식', '카페']
  const maxChecked = 3;
  //아이디에 필요한 요소들
  let [id, setId] = useState(null)
  let [password, setPassword] = useState(null)
  let [category, setCategory] = useState([])

  //아이디와 비번을 입력했는지 확인하는 요소들
  let [isEnterId, setIsEnterId] = useState(null)
  let [isEnterPassword, setIsEnterPassword] = useState(null)

  //중복검사를 눌렀는지 확인해주는 요소
  let [isClickedTest, setIsClickedTest] = useState(null)

  //에러 요소들
  let [idServerMessage, setIdServerMessage] = useState(null)

  let navigate = useNavigate()

  const onIdCheckHandler = async (e) => {
    e.preventDefault();
    if (!id) {
      setIdServerMessage('아이디를 먼저 입력하세요')
      return
    }
    else {
      try {
        await axios.post('https://api.meal-mate.shop/api/member/check-email', {
          email: id
        })
        setIdServerMessage(null)
        setIsClickedTest(true)
      } catch (error) {
        //error 메시지에 따른 메시지 출력
        setIdServerMessage(error.response.data.message)
      }
      setIsEnterId(true)
    }
  }

  const onSignUpHandler = async (e) => {
    e.preventDefault();
    if (!id) {
      setIdServerMessage('아이디를 먼저 입력하세요')
      return
    }
    if (!password) {
      setIsEnterPassword(false)
      return
    }
    if (isClickedTest == true) {
      try {
        const categoryRegisters = category.map(categoryName => ({
          categoryName
        }));
        await axios.post('https://api.meal-mate.shop/api/member/signup', {
          categoryRegisters: categoryRegisters,
          email: id,
          password: password
        })
        console.log('회원가입 성공')
        navigate('/login')
      } catch (error) {
        alert(error)
      }
    }
    else setIsClickedTest(false)
  }

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((index) => index !== value));
    } else {
      if (category.length < maxChecked) {
        setCategory([...category, value]);
      } else {
        alert(`3개 까지만 체크 가능합니다.`);
      }
    }
  };

  return (
    <>
      <p>아이디(이메일)입력</p>
      <form onSubmit={onIdCheckHandler} style={{ display: 'flex', height: '30px' }}>
        <input type="text" onChange={(e) => { setId(e.target.value) }}></input>
        <IdErrorMessage idServerMessage={idServerMessage} setIdServerMessage={setIdServerMessage} isEnterId={isEnterId} />
        <button type="submit" style={{ width: '100px', height: '30px', marginLeft: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>중복 검사</button>
        {isClickedTest == false ? <p>중복검사를 눌러주세요</p> : null}
      </form>
      <form onSubmit={onSignUpHandler}>
        <p>비밀번호 입력</p>
        <input type="password" onChange={(e) => { setPassword(e.target.value) }}></input>
        {isEnterPassword == false ? <p>비밀번호를 먼저 입력하세요</p> : null}
        <div style={{ display: "flex" }}>
          {categoryName.map(function (index) {
            return (
              <div style={{ marginRight: '10px' }}>
                <input type="checkbox" id={index} value={index} checked={category.includes(index)} onChange={handleCheckboxChange} />
                <label for={index}>{index}</label>
              </div>
            )
          })}
        </div>
        <button type="submit">가입하기</button>
      </form>
    </>
  )
}

function IdErrorMessage(props) {
  if (props.isEnterId) {
    if (props.idServerMessage == null) {
      props.setIdServerMessage('사용 가능합니다.')
    }
  }
  else if (props.isEnterId == false) {
    props.setIdServerMessage('아이디를 먼저 입력하세요')
  }
  return (
    <p>{props.idServerMessage}</p>
  )
}

export default SignUp