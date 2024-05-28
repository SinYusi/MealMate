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
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])

  return (
    <>
      <h2>{board.title}</h2>
      <p>{board.content}</p>
    </>
  )
}

export default DetailBoard