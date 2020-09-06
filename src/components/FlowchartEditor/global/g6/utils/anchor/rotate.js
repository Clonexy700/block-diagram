export default function (cfg, group, radian) {
  let { anchorPoints, id } = cfg
  if (anchorPoints && anchorPoints.length) {
    for (let i = 0, len = anchorPoints.length; i < len; i++) {
      let anchorBgShape = group.findById(id + '_anchor_bg_' + i)
      let anchorShape = group.findById(id + '_anchor_' + i)
      if (anchorBgShape) {
        anchorBgShape.resetMatrix()
        anchorBgShape.rotate(radian)
      }
      if (anchorShape) {
        anchorShape.resetMatrix()
        anchorShape.rotate(radian)
      }
    }
  }
}
