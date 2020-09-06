export default function (cfg, group) {
  let { id, width, height, shapeControl } = cfg
  let shapeControlEdge = group.findById(id + '_shape_control_edge')
  if (shapeControlEdge) {
    shapeControlEdge.attr({
      x: 0 - width / 2,
      y: 0 - height / 2,
      width,
      height,
      path: [
        [ 'M', -width / 2, -height / 2 ],
        [ 'L', width / 2, -height / 2 ],
        [ 'L', width / 2, height / 2 ],
        [ 'L', -width / 2, height / 2 ],
        [ 'Z' ]
      ]
    })
  }
  if (shapeControl && shapeControl.hasOwnProperty('controllers') && shapeControl.controllers.length) {
    for (let i = 0, len = shapeControl.controllers.length; i < len; i++) {
      let [x, y] = shapeControl.controllers[i]
      let originX = -width / 2
      let originY = -height / 2
      let anchorX = x * width + originX
      let anchorY = y * height + originY
      let shapeControlPoint = group.findById(id + '_shape_control_point_' + i)
      if (shapeControlPoint) {
        shapeControlPoint.attr({
          x: anchorX,
          y: anchorY
        })
      }
    }
  }
  if (shapeControl && shapeControl.hasOwnProperty('rotate') && shapeControl.rotate) {
    let shapeControlRotate = group.findById(id + '_shape_control_rotate')
    if (shapeControlRotate) {
      shapeControlRotate.attr({
        y: -height / 2 - 40
      })
    }
  }
}
