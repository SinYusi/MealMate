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
      <div style={{ marginLeft: '100px', marginRight: '100px' }}>
        {
          props.boardData.map((data) => {
            const timeAgo = Math.floor(((new Date()) - (new Date(data.lastTime))) / (1000 * 60))
            return (
              <div key={data.boardId} >
                <Link to={'./' + data.boardId} style={{ textDecorationLine: 'none' }}>
                  <p>{data.title}</p>
                </Link>
                <p>
                  {timeAgo ?
                    timeAgo > 60 ?
                      parseInt(timeAgo / 60) > 24 ?
                        parseInt(timeAgo / 60 / 24) + '일'
                        : parseInt(timeAgo / 60) + '시간'
                      : timeAgo + '분'
                    : '방금'} 전
                </p>
                <p>{data.email}</p>
                <hr style={{ width: '100%', color: 'black' }} noshade />
              </div >
            )
          })
        }
        {cookies.access_token ? <Link to='/addboard'>글 쓰기</Link> : null}
      </div>
    )
  }
}

export default Board