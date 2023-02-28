import google from '../images/google.png'
import Modal from 'react-bootstrap/Modal';

const Setup2FAModal = ({ display, setDisplay }) => {

  return (
    <Modal show={display} centered onHide={() => setDisplay(false)}>
      <Modal.Header className="text-center" closeButton={true} style={{ padding: '32px 32px 17px' }}>
        <h4 style={{ fontSize: '14px' }}>Security Verification</h4>
      </Modal.Header>
      <Modal.Body>
        <div style={{ fontSize: '14px', paddingBottom: '10px' }}>
          You are required to setup Google 2FA Authentication.
        </div>
        <div className="auth-container-column">
          <img src={google} alt="avatar set icon" />
          <div style={{ margin: '0 16px 0 4px', fontSize: '14px' }}>
            Google 2FA Authentication
          </div>
          <div style={{ color: '#f7a600', fontSize: '14px' }}>
            Not Enabled Yet
          </div>
        </div>
        <div className="accountInfo-auth-container-operation" onClick={() => { setDisplay(false) }}>
          <button type="submit" className=' submit__btn_mob btn text-white' name="submit">Set Up</button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Setup2FAModal;