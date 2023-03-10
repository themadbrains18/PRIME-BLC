import React from "react"
import { createNamespace } from "../utils"
import "./style/index.less"
import classNames from "classnames"

const [bem] = createNamespace("popup")

const Popup = props => {
  const { className, visible, onCancel } = props
  return (
    <div className={classNames(className, bem({ visible }))}>
      <div className={classNames(bem("mask"))} onClick={onCancel} />
      <div className={classNames(bem("body"))}>{props.children}</div>
    </div>
  )
}

Popup.defaultProps = {}

export default Popup
