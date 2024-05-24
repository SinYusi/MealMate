import axios from "axios"
import { useState } from "react"

function AddRestaurant() {
  let [restaurantData, setRestaurantData] = useState({})
  const [file, setFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('imageFile', file);
    formData.append('restaurantRegister', new Blob([JSON.stringify(restaurantData)], { type: "application/json" }))
    try {
      await axios.post('https://api.meal-mate.shop/api/restaurant', formData)
      alert('성공')
    } catch (error) {
      console.log(error);
      alert('실패')
    }
  }

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