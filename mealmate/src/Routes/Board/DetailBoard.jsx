import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function DetailBoard() {
  const boardId = useParams().id
  let [board, setBoard] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.meal-mate.shop/api/board/${boardId}`)
        setBoard(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [boardId])

  return (
    <>
      <h2>{board.title}</h2>
      <p>작성자 : {board.email}</p>
      <p>올린 시간 : {board.lastTime}</p>
      <p>{board.content}</p>
    </>
  )
}

export default DetailBoard