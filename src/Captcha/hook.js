import React, { useLayoutEffect, useRef } from "react"
import ReactDOM from "react-dom"
import Captcha from "./src/captcha/index"

export function useCaptcha(option) {
  const ref = useRef()
  const successRef = useRef()
  const failRef = useRef()
  const onSuccess = data => {
    successRef.current?.(data)
  }
  const onFail = (msg) => {
    // console.log(msg)
    failRef.current?.(msg)
  }
  useLayoutEffect(() => {
    const div = document.createElement("div")
    document.body.appendChild(div)
    ReactDOM.render(
      <Captcha
        path={option.path}
        type={option.type}
        onFail={onFail}
        onSuccess={onSuccess}
        ref={ref}
      />,
      div
    )
  }, [])

  const verify = (callBack, fail) => {
    //@ts-ignore
    ref.current?.verify()
    successRef.current = callBack
    failRef.current = fail
  }
  const run = () => {
    return new Promise((resolve, reject) => {
      verify(resolve, reject)
    })
  }
  return [run, ref.current]
}
