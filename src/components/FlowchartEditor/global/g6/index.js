import G6 from '@antv/g6'
import registerBehavior from './behavior/index'
import registerEdge from './edge/index'
import registerNode from './node/index'

import config from './config/index'

G6.$C = config

registerBehavior(G6)
registerEdge(G6)
registerNode(G6)

export default G6
