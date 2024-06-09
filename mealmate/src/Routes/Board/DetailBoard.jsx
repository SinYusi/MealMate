import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"
import Comment from "./Comment"

function DetailBoard() {
  const boardId = useParams().id
  let [board, setBoard] = useState({})
  let [isComment, setIsComment] = useState(false)
  const [cookies] = useCookies(['access_token'])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = cookies.access_token
    if (token) {
      const decodedToken = jwtDecode(token)
      setUser(decodedToken)
      console.log('토큰 디코드 성공')
    }
    const loadDetailData = async () => {
      try {
        const response = await axios.get(`https://api.meal-mate.shop/api/board/${boardId}`)
        setBoard(response.data)
        console.log('게시물 데이터 불러오기 성공')
      } catch (error) {
        console.log(error)
      }
    }
    loadDetailData()
  }, [boardId, cookies])

  let isMatched = false

  if (user) {
    isMatched = board.email === user.sub
    console.log('글 작성자와 일치')
  }

  return (
    <>
      <div>
        <h2>{board.title}</h2>
        <p>작성자 : {board.email}</p>
        <p>올린 시간 : {board.lastTime}</p>
        <p>{board.content}</p>
        <DeleteAndFetchBoard isMatched={isMatched} boardId={boardId} />
      </div>
      <fieldset>
        <legend>댓글</legend>
        {<Comment boardId={boardId} user={user} />}
      </fieldset>
      <button onClick={() => setIsComment(true)}>댓글쓰기</button>
      {isComment === true ? <AddComment boardId={boardId} /> : null}
    </>
  )
}

function DeleteAndFetchBoard(props) {
  const navigate = useNavigate();
  const deleteBoard = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`https://api.meal-mate.shop/api/board/${props.boardId}`)
      console.log('게시물 삭제 완료')
      navigate('/board')
    } catch (error) {
      console.log('게시물 삭제 중 오류 발생')
    }
  }
  return (
    <>
      {props.isMatched ?
        <form onSubmit={deleteBoard}>
          <button type="submit">글 삭제</button>
        </form>
        : null
      }
    </>
  )
}

function AddComment(props) {
  const [cookies] = useCookies(['access_token'])
  const [addComment, setAddComment] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = cookies.access_token
    try {
      await axios.post(`https://api.meal-mate.shop/api/comment/${props.boardId}`, {
        commentContent: addComment
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      document.location.href = document.location.href;
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="댓글을 쓰세요" onChange={(e) => { setAddComment(e.target.value) }} />
      <button type="submit">추가</button>
    </form>
  )
}

export default DetailBoard