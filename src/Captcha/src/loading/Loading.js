import React from "react"
import { createNamespace } from "../utils"
import "./style/index.less"
import classNames from "classnames"
import Icon from "../icon"

const [bem] = createNamespace("loading")

const Loading = props => {
  const { className } = props
  return (
    <div className={classNames(className, bem())}>
      <Icon name="loading" size={38} spin />
    </div>
  )
}

Loading.defaultProps = {}

export default Loading
