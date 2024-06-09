import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function Comment({ boardId, user }) {
  const [comment, setComment] = useState([])
  const [cookies] = useCookies(['access_token'])

  useEffect(() => {
    const loadCommentData = async () => {
      try {
        const response = await axios.get(`https://api.meal-mate.shop/api/comment/${boardId}`)
        setComment(response.data)
        console.log('댓글 데이터 불러오기 성공')
      } catch (error) {
        console.log(error)
      }
    }
    loadCommentData()
  }, [boardId])

  return (
    <div>
      {comment.map((data, i) => (
        <div key={data.commentId} style={{ position: 'relative', marginBottom: '1em' }}>
          <div style={{ display: 'flex' }}>
            <p>{data.commentContent}</p>
            <p>{data.createDt}</p>
            {
              user ?
                user.sub === data.email ?
                  <form onSubmit={async (e) => {
                    const token = cookies.access_token
                    try {
                      await axios.delete(`https://api.meal-mate.shop/api/comment/${data.commentId}`, {
                        headers: {
                          Authorization: `Bearer ${token}`
                        }
                      })
                      document.location.href = document.location.href;
                    } catch (error) {
                      console.log('댓글 삭제 중 오류 발생, 오류 코드 : ' + error)
                    }
                  }}>
                    <button type="submit">댓글 삭제</button>
                  </form>
                  : null
                : null
            }
          </div>
          <div>
            <p>{data.email}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Comment