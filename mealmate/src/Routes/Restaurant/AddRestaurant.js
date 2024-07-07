import axios from "axios"
import { useState } from "react"

function AddRestaurant() {
  const [restaurantData, setRestaurantData] = useState({}) //추가할 식당 데이터를 저장하는 변수
  const [file, setFile] = useState(null) //이미지 파일을 저장하는 변수

  //
  // 추가 버튼을 누르면 작동되는 함수
  //
  const handleSubmit = async (e) => {
    e.preventDefault(); //함수가 작동되면 새로고침을 방지하는 문장
    const formData = new FormData(); //폼데이터로 데이터 추가 요청을 하기 위해 만든 변수
    formData.append('imageFile', file); //폼데이터에 이미지 파일 추가
    formData.append('restaurantRegister', new Blob([JSON.stringify(restaurantData)], { type: "application/json" })) //폼데이터에 식당에 대한 정보를 json 형태로 추가
    try {
      //
      // api 요청
      //
      await axios.post('https://api.meal-mate.shop/api/restaurant', formData) //폼데이터로 데이터 추가 api 요청
      alert('성공')
    } catch (error) {
      console.log(error);
      alert('실패')
    }
  }

  //이미지 파일이 업로드 되면 실행되는 함수
  const onChangeImage = (e) => {
    const file = e.target.files[0];
    setFile(file);
  }

  return (
    <div className="addrestaurant">
      <form onSubmit={handleSubmit}>
        <p>식당 이름</p>
        <input type="text" onChange={(e) => { setRestaurantData((prevObj) => ({ ...prevObj, restaurantName: e.target.value })) }}></input>
        <p>식당 카테고리</p>
        <input type="text" onChange={(e) => { setRestaurantData((prevObj) => ({ ...prevObj, restaurantType: e.target.value })) }}></input>
        <p>식당 소개</p>
        <input type="text" onChange={(e) => { setRestaurantData((prevObj) => ({ ...prevObj, restaurantNotice: e.target.value })) }}></input>
        <p>식당 위치</p>
        <input type="text" onChange={(e) => { setRestaurantData((prevObj) => ({ ...prevObj, location: e.target.value })) }}></input>
        <p>식당 오픈</p>
        <input type="text" onChange={(e) => { setRestaurantData((prevObj) => ({ ...prevObj, openAt: e.target.value })) }}></input>
        <p>식당 마감</p>
        <input type="text" onChange={(e) => { setRestaurantData((prevObj) => ({ ...prevObj, closeAt: e.target.value })) }}></input>
        <p>식당 번호</p>
        <input type="text" onChange={(e) => { setRestaurantData((prevObj) => ({ ...prevObj, telNum: e.target.value })) }}></input>
        <input type="file" onChange={onChangeImage}></input>
        <button type="submit">추가</button>
      </form>
    </div>
  )
}

export default AddRestaurant