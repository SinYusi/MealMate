import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
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
  const [cookies] = useCookies(['access_token'])
  console.log(cookies)
  if (props.boardData === null) {
    return (
      <div>
        <p>게시글이 없습니다.</p>
        {cookies.access_token ? <Link to='/addboard'>글 쓰기</Link> : null}
      </div>
    )
  }
  else {
    return (
      <>
        {
          props.boardData.map((data) => {
            return (
              <div key={data.boardId} >
                <Link to={'./' + data.boardId} style={{ textDecorationLine: 'none' }}>
                  <p>{data.title}</p>
                </Link>
                <p>{data.lastTime}</p>
                <p>{data.email}</p>
              </div >
            )
          })
        }
        {cookies.access_token ? <Link to='/addboard'>글 쓰기</Link> : null}
      </>
    )
  }
}

export default Board