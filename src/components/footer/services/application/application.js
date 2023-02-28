import './application.css';
import share from '../assets/img/share.svg'

const Application = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
  return (
    <div className="service-application ">
      <div className='container'>
        <div className="list-page-upper-section">
          <div className="list-links">
            <div className="breadcrumb-link">Main</div>
            <div className="breadcrumb-arrow">
              <span className="arrow right"></span>
            </div>
            <div className="breadcrumb-link">What's New</div>
            <div className="breadcrumb-arrow">
              <span className="arrow right"></span>
            </div>
            <div className="breadcrumb-link active">Announcements</div>
          </div>
        </div>
        <div className='service-detail'>
          <div className="">
            <div className="post-detail light" id="post-detail"><div className="post-detail-title">Application: Token/Coin Listing on BLC Exchange</div>
              <div className="post-page-topics-container">
                <div className="post-page-topics-container-left">
                  <div className="post-page-date">Aug 20, 2022 </div>
                </div>
                <div className="post-page-topics-container-right">
                  <div className="social-share">
                    <div className="ant-dropdown-trigger more-icon">
                      <img src={share} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="post-detail-content" id="post-detail-content">
                <p>ICYMI — BLC Exchange’s spot trading platform is now in full launch. As we continue to expand, we aim to make the best efforts to select top-quality tokens/coins, and allow traders easy access to their preferred crypto assets!</p>
                <p></p><p></p><p></p>
                <h3>
                  <span id="1" style={{ visibility: "hidden", display: "block", position: "relative", top: "-100px" }}></span>
                  <strong>How to get my project token/coin listed on BLC Exchange?</strong>
                </h3>
                <p>
                </p>
                <p>The process is straightforward — simply submit your application via this <a href="https://docs.google.com/forms/d/16eqSubVmMIuNOgLd_SLMJjDEz1PevqDDn0nKMlwaiwo/viewform?edit_requested=true" target="_blank" rel="noreferrer">Google form</a>! Our spot team will reach back out if you pass the initial review.</p>
                <p></p><p></p><p></p>
                <h3>
                  <span id="2" style={{ visibility: "hidden", display: "block", position: "relative", top: "-100px" }}></span>
                  <strong>What to expect during the review process?</strong>
                </h3>
                <p></p>
                <p>We may require additional information. This, however, does not guarantee that your project token/coin will be listed on BLC Exchange. If your project passes our initial review, a dedicated Business Development (BD) manager will contact you via email.</p>
                <p></p><p></p><p></p>
                <h3><span id="3" style={{ visibility: "hidden", display: "block", position: "relative", top: "-100px" }}></span>
                  <strong>What to expect after my project token/coin gets listed successfully?</strong>
                </h3>
                <p><strong></strong></p>
                <p>Please update the dedicated BD manager on your project progress regularly (i.e. each week or every month), and provide BLC Exchange with promotional resources.</p>
                <p></p>
                <p>Thank you for your support!</p>
                <p></p><p></p><p></p>
                <h3><span id="4" style={{ visibility: "hidden", display: "block", position: "relative", top: "-100px" }}></span>
                  <strong><em>Note:</em></strong>
                </h3>
                <ul>
                  <li><em>BLC Exchange mandates a strict and one-way non-disclosure agreement (NDA) at the first point of contact</em></li>
                </ul>
                <ul>
                  <li><em>BLC Exchange won’t charge any listing fees</em></li>
                </ul>
                <p>
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="fix-ctn">
              <div className="signup-box">
                <h3>Get your daily dose of crypto and trading info</h3>
                <p>No spam —&nbsp;just heaps of sweet content and industry updates in the crypto space.</p>
                <div className="signup-button" data-cy="articleSignUpButton"><a>Sign up now</a></div>
              </div>
              <div className="recommend-wrapper">
                <div className="recommend-title">Related Articles</div>
                <div>
                  <a className="recommend-item" href="/en-US/post/the-great-deposit-deal-get-25-bonus--bltbe5894789eda688c">
                    <div className="ant-typography ant-typography-ellipsis ant-typography-ellipsis-multiple-line recommend-item-title" data-cy="relatedTitle-0">The Great Deposit Deal — Get $25 Bonus!</div>
                    <div data-cy="relatedDate-0" className="recommend-item-date">Sep 22, 2022</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Application;