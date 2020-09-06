import config from '../../config'

export default function (cfg, group) {
  let { id, width, height, shapeControl } = cfg
  group.addShape('path', {
    id: id + '_shape_control_edge',
    attrs: {
      boxName: 'shapeControl',
      name: 'shapeControlEdge',
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
      ],
      ...config.shapeControl.style.default.edge
    }
  })
  if (shapeControl && shapeControl.hasOwnProperty('controllers') && shapeControl.controllers.length) {
    for (let i = 0, len = shapeControl.controllers.length; i < len; i++) {
      let [x, y, cursor] = shapeControl.controllers[i]
      let originX = -width / 2
      let originY = -height / 2
      let anchorX = x * width + originX
      let anchorY = y * height + originY
      group.addShape('marker', {
        id: id + '_shape_control_point_' + i,
        index: i,
        attrs: {
          boxName: 'shapeControl',
          name: 'shapeControlPoint',
          x: anchorX,
          y: anchorY,
          position: {
            x,
            y
          },
          cursor: cursor || 'pointer',
          ...config.shapeControl.style.default.point
        }
      })
    }
  }
  if (shapeControl && shapeControl.hasOwnProperty('rotate') && shapeControl.rotate) {
    let rotateW = 20
    let rotateH = 20
    group.addShape('image', {
      id: id + '_shape_control_rotate',
      attrs: {
        boxName: 'shapeControl',
        name: 'shapeControlRotate',
        x: -rotateW / 2,
        y: -height / 2 - 40,
        width: rotateW,
        height: rotateH,
        cursor: 'crosshair',
        img: require('@/assets/images/rotate.png'),
        ...config.shapeControl.style.default.rotate
      }
    })
  }

  let children = group.get('children')
  for (let i = 0, len = children.length; i < len; i++) {
      let child = children[i]
      if (child._attrs && child.attr('name') && ['shapeControlPoint','shapeControlEdge','shapeControlRotate'].indexOf(child.attr('name'))>-1) {
        child.hide()
      }
      
    }
}
