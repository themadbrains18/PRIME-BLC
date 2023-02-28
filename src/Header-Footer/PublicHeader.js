import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { publicheader } from "../Constants/lang/lang";
const PublicHeader = () => {

  const [currency, setCurrency] = useState();
  const [langfun, setlangfun] = useState('en');
  const navigate = useNavigate()
  const publicheadernavres = () => {
    let toggel = document.getElementById("public_header");
    if(toggel.classList.contains('secondary') === false){
      toggel.classList.toggle("show");
    }
    else{
      toggel.classList.remove("show");
    }
    
  }

  return (
    <>
      <header className="header chart--header" >
        <nav className="navbar navbar-expand-md p-1 navbar-dark w-100">

          <Link className="header__logo" to="/" >
            <img src={require('../assets/images/primelogo.png')} className="logo" alt="" />
          </Link>
          <ol className="nav flex-column">
              <li className="nav-item">
                  <a className="nav-link" to="/vendor/swap-currency">
                      <p className="icon" >  <i className='fab fa-artstation'></i>  </p>
                      <div className="title">
                          <p>  Fast Swap</p>
                          <h6> Buy USDT with BTC,TRX  </h6>
                      </div>
                      <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                  </a>
              </li>
              <li className="nav-item">
                  <Link className="nav-link" to="/vendor/p2p">
                      <p className="icon" >  <i className='fab fa-artstation'></i>  </p>
                      <div className="title">
                          <p> P2P </p>
                          <h6> Bank transfer and 20+ Option  </h6>
                      </div>
                      <h5> <i className='fas fa-long-arrow-alt-right'></i> </h5>
                  </Link>
              </li>
          </ol>
          {/* Toggler/collapsibe Button  */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" onClick={() => publicheadernavres()} >
            <i className="fa fa-bars" aria-hidden="true"></i>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="public_header">
            <ul className="header__list">

              <li className="header__item public-header-drop-main">
               {/*   <button className="wifi__svg__icon text-white">
                  NFT
                </button>
               <div className='public-header-drop'>
                <Link to='#' >NFT</Link>
                <Link to='#' >NFT</Link>

              </div> */}
              </li>
              <li className="header__item">
                <a onClick={() => {publicheadernavres(); navigate('/login')}}> <button className="login">
                  {publicheader['0']['login']['en']}
                </button></a>
              </li>
              <li className="header__item">
                <a onClick={() => {publicheadernavres(); navigate('/sign-up')}} className="Sign__up">
                  {publicheader['0']['signup']['en']}
                </a>

              </li>
              <li className="header__item">
                {/* <select 
                  variant="outlined"
                  id="demo-simple-select"
                  value={'en'}
                  style={{ width: 100, height: 40, marginLeft: 15, color: '#fff', background: '#000' }}
                  onChange={(e) => setlangfun(e.target.value)}
                >
                  <option value={"en"}>En</option>
                  <option value={"hi"}>Hi</option>
                </select> */}

              </li>
              <li className="header__item">
                {/* <select
                  variant="outlined"
                  id="demo-simple-select"
                  value={currency}
                  style={{ width: 100, height: 40, marginLeft: 15, color: '#fff', background: '#000' }}
                  onChange={(e) => {setCurrency(e.target.value); publicheadernavres();}}
                >
                  <option value={"USD"}>USD</option>
                  <option value={"INR"}>INR</option>
                  <option value={"EUR"}>EUR</option>
                </select> */}

              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}
export default PublicHeader;