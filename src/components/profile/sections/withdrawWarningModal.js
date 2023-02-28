import Modal from 'react-bootstrap/Modal';

const WithdrawWarningModal = ({open, setOpen, setShowed, message, isloading}) => {
  return (
    <Modal show={open} centered onHide={() => setOpen(false)}>
      <Modal.Header className="text-center" closeButton={true} style={{ padding: '32px 32px 17px' }}>
        <h4 style={{ fontSize: '14px' }}>Warning</h4>
      </Modal.Header>
      <Modal.Body>
        <div style={{ fontSize: '14px', paddingBottom: '10px' }}>
          Withdrawal will be restricted for 24 hours after changing your {message}.
        </div>
        <div className="accountInfo-auth-container-operation" onClick={() => { setShowed(true); setOpen(false) }}>
          <button type="submit" className=' submit__btn_mob btn text-white' name="submit"><i style={{ display: isloading === true ? 'block' : 'none' }} className="fa fa-spinner fa-spin"></i>Submit</button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default WithdrawWarningModal;