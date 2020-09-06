import config from '../../config'
// import drawEdgeAnimate from './drawEdgeAnimate'
// import destroyEdgeAnimate from './destroyEdgeAnimate'

export default function (name, value, item) {
  if (name === 'active') {
    let group = item.getContainer()
    let children = group.get('children')
    let line = children[0]
    if (line) {
      if (value) {
        line.attr(config.line.style.active)
        // drawEdgeAnimate(item.getModel(), item.getContainer())
      } else {
        line.attr(config.line.style.inactive)
        // destroyEdgeAnimate(item.getModel(), item.getContainer())
      }
    }
  }
  if (name ==='hover') {
    let group = item.getContainer()
    let children = group.get('children')
    let line = children[0]
    if (line) {
      if (value) {
        line.attr(config.line.style.active)
        // drawEdgeAnimate(item.getModel(), item.getContainer())
      } else {
        line.attr(config.line.style.inactive)
        // destroyEdgeAnimate(item.getModel(), item.getContainer())
      }
    }
  }
}
