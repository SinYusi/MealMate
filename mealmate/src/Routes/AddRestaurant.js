import axios from "axios"
import { useState } from "react"

function AddRestaurant() {
  let [restaurantData, setRestaurantData] = useState({})
  const [file, setFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('restaurantimage', file);
    console.log(file)
    try {
      await axios.post('https://api.meal-mate.shop/api/restaurant', {
        imageFile: formData,
        restaurantRegister: restaurantData
      })
    } catch (error) {
      console.log(error);
      alert('실패')
    }
  }

  const onChangeImage = (e) => {
    console.log('onChange 호출')
    const file = e.target.files[0];
    console.log(file)
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
        <input type="text" onChange={(e) => { setRestaurantData((prevObj) => ({ ...prevObj, restaurantType: e.target.value })) }}></input>
        <p>식당 위치</p>
        <input type="text" onChange={(e) => { setRestaurantData((prevObj) => ({ ...prevObj, restaurantType: e.target.value })) }}></input>
        <p>식당 번호</p>
        <input type="text" onChange={(e) => { setRestaurantData((prevObj) => ({ ...prevObj, restaurantType: e.target.value })) }}></input>
        <p>식당 오픈</p>
        <input type="text" onChange={(e) => { setRestaurantData((prevObj) => ({ ...prevObj, restaurantType: e.target.value })) }}></input>
        <p>식당 마감</p>
        <input type="text" onChange={(e) => { setRestaurantData((prevObj) => ({ ...prevObj, restaurantType: e.target.value })) }}></input>
        <input type="file" onChange={onChangeImage}></input>
        <button type="submit">추가</button>
      </form>
    </div>
  )
}

export default AddRestaurant