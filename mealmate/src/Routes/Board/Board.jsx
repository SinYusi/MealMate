import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Board() {
  const [boardData, setBoardData] = useState(null)
  useEffect(() => {
    try {
      const getData = async (e) => {
        const response = await axios.get('https://api.meal-mate.shop/api/board')
        console.log(response.data)
        setBoardData(response.data)
      }
      getData()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <>
      <FermentBoard boardData={boardData} />
    </>
  )
}

function FermentBoard(props) {
  if (props.boardData === null) {
    return (
      <Link to='/addboard'>글 쓰기</Link>
    )
  }
  else {
    return (
      <>
        {
          props.boardData.map((data) => {
            return (
              <>
                <Link to={'./' + data.boardId} style={{ textDecorationLine: 'none' }}>
                  <p>{data.title}</p>
                </Link>
                <p>{data.lastTime}</p>
                <p>{data.email}</p>
              </>
            )
          })
        }
        <Link to='/addboard'>글 쓰기</Link>
      </>
    )
  }
}

export default Board