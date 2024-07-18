import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import Table from 'react-bootstrap/Table';

export default function MyPage() {
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(['access_token'])
  const [decodedToken, setDecodedToken] = useState(null)

  useEffect(() => {
    const token = cookies.access_token
    if (token)
      setDecodedToken(jwtDecode(token))

    setLoading(false)
  }, [cookies.access_token])

  if (loading) {
    return (
      <div>loading</div>
    )
  }

  console.log(decodedToken)

  return (
    <>
      <div style={{ marginLeft: '20%', marginRight: '20%' }}>
        <Table striped="columns">
          <thead>
            <tr>
              <th>Email</th>
              <th>{decodedToken.sub}</th>
            </tr>
          </thead>
        </Table>
      </div>
    </>
  )
}