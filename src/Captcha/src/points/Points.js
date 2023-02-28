import React, { useEffect, useState } from "react"
import Icon from "../icon"
import { createNamespace, toImg, pointSecond } from "../utils"
import "./style/index.less"
import classNames from "classnames"

const CHECK_WORD = 3
const [bem] = createNamespace("points")

const point = {
  default: {
    className: "default",
    icon: "",
    text: captcha => {
      if (!captcha.word) {
        return ""
      }
      let word = ""
      if (captcha.word) {
        word = `Please click〖${captcha.word}〗`
      }
      return word.replaceAll(",", "、")
    }
  },
  submit: {
    className: "active",
    icon: "loading",
    spin: true,
    text: () => "Checking..."
  },
  success: {
    className: "success",
    icon: "success",
    text: () => "Validation succeeded"
  },
  failure: {
    className: "failure",
    icon: "failure",
    text: () => "Validation failed"
  }
}

const Points = props => {
  const { className, captcha, onValid } = props
  const [pointVariant, setPointVariant] = useState(point.default)
  const [points, setPoints] = useState([])
  // @ts-ignore
  const getMouse = ({ nativeEvent: { offsetX, offsetY } }) => {
    return { x: offsetX, y: offsetY }
  }

  const onClick = async e => {
    if (points.length < CHECK_WORD) {
      const pointList = [...points, getMouse(e)]
      setPoints(pointList)
      if (pointList.length === CHECK_WORD) {
        setPointVariant(point.submit)
        const validate = await onValid(
          JSON.stringify(pointList),
          pointSecond(captcha, pointList)
        )
        setPointVariant(validate ? point.success : point.failure)
      }
    }
  }

  useEffect(() => {
    if (captcha.image !== null) {
      setPointVariant(point.default)
      setPoints([])
    }
  }, [captcha])

  return (
    <div className={classNames(className, bem())}>
      <div className={classNames(bem("image"))}>
        {captcha.image && (
          <img alt="" src={toImg(captcha.image)} onClick={onClick} />
        )}
      </div>
      {points.map((p, index) => (
        <div
          key={index}
          className={classNames(bem("point"))}
          style={{
            top: `${p.y}px`,
            left: `${p.x}px`
          }}
        >
          <div> {index + 1}</div>
        </div>
      ))}
      <div className={classNames(bem("bar", [pointVariant.className]))}>
        <Icon spin={pointVariant.spin} name={pointVariant.icon} color="#fff" />
        <div>{pointVariant.text(captcha)}</div>
      </div>
    </div>
  )
}

Points.defaultProps = {}

export default Points
