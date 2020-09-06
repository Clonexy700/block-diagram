const shapeControl = {
  controllers: [
    [0, 0, 'nwse-resize'],
    [0, 0.5, 'ew-resize'],
    [0, 1, 'nesw-resize'],
    [0.5, 0, 'ns-resize'],
    [0.5, 1, 'ns-resize'],
    [1, 0, 'nesw-resize'],
    [1, 0.5, 'ew-resize'],
    [1, 1, 'nwse-resize']
  ],
  rotate: true
}

const anchorPoints = [
  [0.5, 0],
  [0.5, 1],
  [0, 0.5],
  [1, 0.5]
]

export default [
  {
    shape: 'start',
    label: '1',
    enable: true,
    width: 40,
    height: 40,
    minWidth: 20,
    minHeight: 20,
    anchorPoints: anchorPoints,
    shapeControl: shapeControl,
    icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><circle r="10" cx="15" cy="15" width="30" height="30" fill="#fdf6e7" stroke="#fbad5a" stroke-width="1" pointer-events="all"></circle></g></g><g></g><g></g></g>`,
    style: {
      fill: '#fdf6e7',
      stroke: '#fbad5a'
    }
  },
  {
    shape: 'apply',
    label: '2',
    enable: true,
    width: 80,
    height: 40,
    minWidth: 20,
    minHeight: 20,
    anchorPoints: anchorPoints,
    shapeControl: shapeControl,
    icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="1.44" y="7.68" width="28.8" height="14.4" fill="#e7feeb" stroke="#9efeae" stroke-width="1" pointer-events="all"></rect></g></g><g></g><g></g></g>`,
    style: {
      fill: '#e7feeb',
      stroke: '#9efeae'
    }
  },
  {
    shape: 'task',
    label: '3',
    enable: true,
    width: 80,
    height: 40,
    minWidth: 20,
    minHeight: 20,
    anchorPoints: anchorPoints,
    shapeControl: shapeControl,
    icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="1.44" y="7.68" width="28.8" height="14.4" fill="#e7f7fe" stroke="#9ed2fe" stroke-width="1" pointer-events="all"></rect></g></g><g></g><g></g></g>`,
    style: {
      fill: '#e7f7fe',
      stroke: '#9ed2fe'
    }
  },
  {
    shape: 'exclusiveGateway',
    label: '4',
    enable: true,
    width: 40,
    height: 40,
    minWidth: 20,
    minHeight: 20,
    anchorPoints: anchorPoints,
    shapeControl: shapeControl,
    svg: '../../../assets/flow/exclusive-gateway.svg',
    style: {
      fill: '#e8fefa',
      stroke: '#1ac4c4'
    }
  },
  {
    shape: 'end',
    label: '5',
    enable: true,
    width: 40,
    height: 40,
    minWidth: 20,
    minHeight: 20,
    anchorPoints: anchorPoints,
    shapeControl: shapeControl,
    icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><circle r="10" cx="15" cy="15" width="30" height="30" fill="#fce6e9" stroke="#f46369" stroke-width="1" pointer-events="all"></circle></g></g><g></g><g></g></g>`,
    style: {
      fill: '#fce6e9',
      stroke: '#f46369'
    }
  }
]
