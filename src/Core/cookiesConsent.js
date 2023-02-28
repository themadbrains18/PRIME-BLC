import CookieConsent from "react-cookie-consent";


const CookiesConsent = () => {
  return (<>
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      cookieName="myAwesomeCookieName2"
      style={{ background: "#2B373B" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
      expires={150}
      enableDeclineButton
      onDecline={() => {
        console.log("Decline!");
      }}
      flipButtons
    >
      By clicking Accept, you consent to BLC Exchange use of cookies..{" "}<br />
      <span style={{ fontSize: "10px" }}>This bit of text is smaller :O</span>
    </CookieConsent>
  </>)
}

export default CookiesConsent;