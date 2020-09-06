export default function (cfg, group) {
  let tmpArr = group.findAll(item => {
    return item._cfg && item._cfg.name === 'edgeAnimatePoint'
  })
  tmpArr.forEach(item => {
    item.remove && item.remove()
  })
}
