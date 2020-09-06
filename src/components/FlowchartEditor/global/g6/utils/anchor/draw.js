

import config from '../../config'

export default function (cfg, group) {
  let { anchorPoints, width, height, id } = cfg
  let shape = group.getFirst()
  if (anchorPoints && anchorPoints.length) {
    for (let i = 0, len = anchorPoints.length; i < len; i++) {
      let anchorX
      let anchorY
      // if (shape && shape.get('type') === 'path') {
      //   let point = shape.getPoint((i) / len)
      //   anchorX = point.x
      //   anchorY = point.y
      // } else {
      //   let [x, y] = anchorPoints[i]
      //   let originX = -width / 2
      //   let originY = -height / 2
      //   anchorX = x * width + originX
      //   anchorY = y * height + originY
      // }
      let [x, y] = anchorPoints[i]
      let originX = -width / 2
      let originY = -height / 2
      anchorX = x * width + originX
      anchorY = y * height + originY


      let flag = shape.isPointInPath(anchorX, anchorY)
      let anchorBgShape = group.addShape('marker', {
        id: id + '_anchor_bg_' + i,
        attrs: {
          boxName: 'anchor',
          name: 'anchorBg',
          x: anchorX,
          y: anchorY,
          ...config.anchorBg.style.default
        }
      })
      let anchorShape = group.addShape('marker', {
        id: id + '_anchor_' + i,
        attrs: {
          boxName: 'anchor',
          name: 'anchorPoint',
          x: anchorX,
          y: anchorY,
          ...config.anchor.style.default,
          fill: flag ? 'red' : config.anchor.style.default.fill
        }
      })

      anchorShape.on('mouseenter', function () {
        anchorBgShape.attr({
          ...config.anchorBg.style.active
        })
      })
      anchorShape.on('mouseleave', function () {
        anchorBgShape.attr({
          ...config.anchorBg.style.inactive
        })
      })
    }
  }
}
