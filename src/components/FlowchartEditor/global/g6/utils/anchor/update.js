
export default function (cfg, group) {
  let { anchorPoints, width, height, id } = cfg
  let shape = group.getFirst()
  if (anchorPoints && anchorPoints.length) {
    for (let i = 0, len = anchorPoints.length; i < len; i++) {
      let anchorX
      let anchorY
      if (shape && shape.get('type') === 'path') {
        let point = shape.getPoint((i + 1) / len)
        anchorX = point.x
        anchorY = point.y
      } else {
        let [x, y] = anchorPoints[i]
        let originX = -width / 2
        let originY = -height / 2
        anchorX = x * width + originX
        anchorY = y * height + originY
      }
      let anchorBgShape = group.findById(id + '_anchor_bg_' + i)
      let anchorShape = group.findById(id + '_anchor_' + i)
      anchorBgShape.attr({
        x: anchorX,
        y: anchorY
      })
      anchorShape.attr({
        x: anchorX,
        y: anchorY
      })
    }
  }
}
