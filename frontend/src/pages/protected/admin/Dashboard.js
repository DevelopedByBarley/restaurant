import { useEffect, useState } from 'react';
import { fetchAuthentication } from '../../../helpers/AuthService';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';
import { AdminOffCanvas } from '../../../components/AdminOffCanvas';
import { CgMenu } from 'react-icons/cg';


export function Dashboard({ setAdmin, admin }) {
  const navigate = useNavigate();
  const [showAdminCanvas, setShowAdminCanvas] = useState(false);

  const handleCanvasClose = () => setShowAdminCanvas(false);
  const handleCanvasShow = () => setShowAdminCanvas(true);

  useEffect(() => {
    fetchAuthentication.get('/admin/getMe')
      .then((res) => {
        setAdmin(res.data.admin)

      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem('accessToken')
        navigate('/admin')
      })
  }, [navigate, setAdmin])



  return (
    <>
      <Row>
        <Col xs={12} className='text-center d-flex p-3 rounded border align-items-center justify-content-center'>
          <Button variant="primary" onClick={handleCanvasShow}  >
            <CgMenu size={25} />
          </Button>
          <h3 className='m-3'>Üdvözöllek <b><span className='text-primary display-6'>{admin?.name}</span></b> !</h3>
        </Col>

      </Row>





      <AdminOffCanvas showAdminCanvas={showAdminCanvas} handleCanvasClose={handleCanvasClose} admin={admin} setAdmin={setAdmin} />
    </>



  )
}