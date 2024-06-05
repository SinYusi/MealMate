import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate, useParams } from "react-router-dom"

function DetailBoard() {
  const boardId = useParams().id
  let [board, setBoard] = useState({})
  let [comment, setComment] = useState([])
  let [isComment, setIsComment] = useState(false)
  const [cookies] = useCookies(['access_token'])
  const [isMatched, setIsMatched] = useState(false)

  useEffect(() => {
    const loadDetailData = async () => {
      const token = cookies.access_token
      const decodedToken = jwtDecode(token)
      try {
        const response = await axios.get(`https://api.meal-mate.shop/api/board/${boardId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setBoard(response.data)
        if (decodedToken.sub == board.email) { setIsMatched(true) }
      } catch (error) {
        console.log(error)
      }
    }
    loadDetailData();
    const loadCommentData = async () => {
      try {
        const response = await axios.get(`https://api.meal-mate.shop/api/comment/${boardId}`)
        setComment(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    loadCommentData()
  }, [boardId])
  return (
    <>
      <h2>{board.title}</h2>
      <p>작성자 : {board.email}</p>
      <p>올린 시간 : {board.lastTime}</p>
      <p>{board.content}</p>
      <fieldset>
        <legend>댓글</legend>
        {<Comment comment={comment} />}
      </fieldset>
      <button onClick={() => setIsComment(true)}>댓글쓰기</button>
      {isComment === true ? <AddComment boardId={boardId} /> : null}
    </>
  )
}

function Comment({ comment }) {
  return (
    <div>
      {comment.map((data) => (
        <div key={data.commentId} style={{ position: 'relative', marginBottom: '1em' }}>
          <div>
            <p>{data.commentContent}</p>
            <p>{data.createDt}</p>
          </div>
          <div>
            <p>{data.email}</p>
            <p>{data.createDt}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function AddComment(props) {
  const navigate = useNavigate()
  const [cookies] = useCookies(['access_token'])
  const [addComment, setAddComment] = useState(null)
  const [success, setSuccess] = useState(false)
  const handleSubmit = async (e) => {
    const token = cookies.access_token
    try {
      await axios.post(`https://api.meal-mate.shop/api/comment/${props.boardId}`, {
        commentContent: addComment
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setSuccess(true)
    } catch (error) {
      console.log(error)
    }
    if (success === true)
      navigate('./')
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="댓글을 쓰세요" onChange={(e) => { setAddComment(e.target.value) }} />
      <button type="submit">추가</button>
    </form>
  )
}

export default DetailBoard