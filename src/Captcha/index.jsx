import React, { useRef } from 'react';
import { Captcha } from './src/index.js';

export default (props) => {
  const ref = useRef();
  // const [run] = useCaptcha({
  //   path: 'https://api.ejiexi.com/system/cgi',
  // });
  const click = (e) => {
    e.preventDefault();
    ref.current?.verify();
  };

  return (
    <Captcha
      onSuccess={(data) => {console.log(data) ; props.getCaptchaStatus(data) }}
      // path='https://picsum.photos/140/280'
      path='https://api.ejiexi.com/system/cgi'
      type='auto'
      ref={ref}
    >
      <button
        onClick={(e)=>click(e)}
        className="submit__btn"
        // style={{
        //   border: 'none',
        //   color: '#fff',
        //   width: '100px',
        //   height: '50px',
        //   lineHeight: '50px',
        //   background: '#1890ff',
        // }}
      >
        Submit
      </button>

    </Captcha>
  );
}
