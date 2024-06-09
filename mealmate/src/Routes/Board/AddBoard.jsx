import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function AddBoard() {
  const [title, setTitle] = useState(null)
  const [content, setContent] = useState(null)
  const [cookies] = useCookies(['access_token'])
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = cookies.access_token
    if (title && content) {
      try {
        await axios.post('https://api.meal-mate.shop/api/board', {
          content: content,
          title: title
        },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        navigate('/board')
      } catch (error) {
        console.log(error)
      }
    }
    if (title == null) {
      alert('제목을 작성해주세요')
    }
    if (content == null) {
      alert('내용을 작성해주세요')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>제목</Form.Label>
        <Form.Control type="text" placeholder="제목을 입력하세요." onChange={(e) => { setTitle(e.target.value) }} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>내용</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder='내용을 입력하세요.' onChange={(e) => { setContent(e.target.value) }} />
      </Form.Group>
      <Button variant="warning" type="submit">글 쓰기</Button>
    </Form>
  )
}

export default AddBoard