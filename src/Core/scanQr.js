const ScanQr = () => {
  return (<div className="form2">
    <div className="tab__content">
      {location.pathname.includes('/trading-chart/') === true ?
        <img src="../../assets/img/qr-code.png" alt="" /> :
        <img src="./assets/img/qr-code.png" alt="" />
      }
      <h5>QR code login</h5>
      <div className="h5-border"></div>
      <div className="qr__description">
        <img src="../../assets/svg/scan.svg" alt="" />
        <p>
          Open BLC Exchange App and scan the QR code to log in
        </p>
      </div>
    </div>
  </div>
  )
}

export default ScanQr; 