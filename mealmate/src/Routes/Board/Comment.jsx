import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function Comment({ boardId, user }) {
  const [comment, setComment] = useState([])
  const [cookies] = useCookies(['access_token'])
  const [fetchButton, setFetchButton] = useState(null);

  useEffect(() => {
    const loadCommentData = async () => {
      try {
        const response = await axios.get(`https://api.meal-mate.shop/api/comment/${boardId}`)
        setComment(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    loadCommentData()
  }, [boardId])

  const deleteSubmit = async (e, data) => {
    e.preventDefault();
    const token = cookies.access_token
    try {
      await axios.delete(`https://api.meal-mate.shop/api/comment/${data.commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      window.location.reload();
    } catch (error) {
      console.log('댓글 삭제 중 오류 발생, 오류 코드 : ' + error)
    }
  }

  return (
    <div>
      {comment.map((data, i) => {
        const timeAgo = Math.floor(((new Date()) - (new Date(data.createDt))) / (1000 * 60))
        return (
          <div key={data.commentId} style={{ position: 'relative', marginBottom: '1em' }}>
            <p style={{ fontWeight: 'bold' }}>{data.email}</p>
            <div style={{ display: 'flex' }}>
              {fetchButton ?
                <input type="text"></input>
                : <p>{data.commentContent}</p>
              }

              {
                user ?
                  user.sub === data.email ?
                    <div style={{ display: 'flex' }}>
                      <form onSubmit={(e) => deleteSubmit(e, data)}>
                        <button type="submit">댓글 삭제</button>
                      </form>
                      <form>
                        <button type="submit" onClick={() => setFetchButton(true)}>댓글 수정</button>
                      </form>
                    </div>
                    : null
                  : null
              }
            </div>
            <p>
              {timeAgo !== -1 ?
                timeAgo ?
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
                : '방금'
              } 전
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default Comment