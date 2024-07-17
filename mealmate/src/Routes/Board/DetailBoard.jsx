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
  const [loading, setLoading] = useState(true);
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const token = cookies.access_token
    if (token) {
      const decodedToken = jwtDecode(token)
      setUser(decodedToken)
    }

    const loadDetailData = async () => {
      try {
        const response = await axios.get(`https://api.meal-mate.shop/api/board/${boardId}`)
        setBoard(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    loadDetailData();

    const checkTimeAgo = async () => {
      const postDate = new Date(board.lastTime)
      const now = new Date();
      const diffInMinutes = Math.floor((now - postDate) / (1000 * 60));

      setTimeAgo(diffInMinutes);
    }
    checkTimeAgo();

    setLoading(false)
  }, [boardId, cookies, board.lastTime])

  let isMatched = false

  if (user) {
    isMatched = board.email === user.sub
    if (isMatched) console.log('글 작성자와 일치');
  }

  if (loading) {
    return (
      <div>로딩 중</div>
    )
  }
  else {
    return (
      <>
        <div style={{ display: 'flex' }}>
          <h2>{board.title}</h2>
          <DeleteAndFetchBoard isMatched={isMatched} boardId={boardId} />
        </div>
        <p>작성자 : {board.email}</p>
        <p>{timeAgo ?
          timeAgo > 60 ?
            parseInt(timeAgo / 60) > 24 ?
              parseInt(timeAgo / 60 / 24) > 7 ?
                parseInt(timeAgo / 60 / 24 / 7) > 4 ?
                  parseInt(timeAgo / 60 / 24 / 7 / 4) + '달'
                  : parseInt(timeAgo / 60 / 24 / 7) + '주'
                : parseInt(timeAgo / 60 / 24) + '일'
              : parseInt(timeAgo / 60) + '시간'
            : timeAgo + '분'
          : '방금'
        } 전</p>
        <p>{board.content}</p>
        <fieldset>
          <legend>댓글</legend>
          {<Comment boardId={boardId} user={user} />}
        </fieldset>
        <button onClick={() => setIsComment(true)}>댓글쓰기</button>
        {isComment === true ? <AddComment boardId={boardId} /> : null}
      </>
    )
  }
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
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = cookies.access_token
    console.log(addComment)
    if (!addComment) {
      setError('댓글을 작성해주세요.');
      return
    }
    else {
      try {
        await axios.post(`https://api.meal-mate.shop/api/comment/${props.boardId}`, {
          commentContent: addComment
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="댓글을 쓰세요" onChange={(e) => { setAddComment(e.target.value) }} />
        <button type="submit">추가</button>
      </form>
      <p>{error}</p>
    </>
  )
}

export default DetailBoard