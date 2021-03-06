export default function (cfg, group, radian) {
  let { id, shapeControl } = cfg
  let shapeControlEdge = group.findById(id + '_shape_control_edge')
  if (shapeControlEdge) {
    shapeControlEdge.resetMatrix()
    shapeControlEdge.rotate(radian)
  }
  if (shapeControl && shapeControl.hasOwnProperty('controllers') && shapeControl.controllers.length) {
    for (let i = 0, len = shapeControl.controllers.length; i < len; i++) {
      let shapeControlPoint = group.findById(id + '_shape_control_point_' + i)
      if (shapeControlPoint) {
        shapeControlPoint.resetMatrix()
        shapeControlPoint.rotate(radian)
      }
    }
  }
  if (shapeControl && shapeControl.hasOwnProperty('rotate') && shapeControl.rotate) {
    let shapeControlRotate = group.findById(id + '_shape_control_rotate')
    if (shapeControlRotate) {
      shapeControlRotate.resetMatrix()
      shapeControlRotate.rotate(radian)
    }
  }
}
