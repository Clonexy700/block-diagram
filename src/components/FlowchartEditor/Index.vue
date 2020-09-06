<!--
 * @description     Edit panel box, Поле для изменения CardBox типа
 *
 * @author          Георгий Дедов, Dedov Georgiy
 * @create          2020-04-09 11:00
-->
<template>
    <div class="materials-editor" @click="handleEditorClick">
        <ToolBar></ToolBar>
        <Sketchpad></Sketchpad>
        <PanelLeft></PanelLeft>
        <PanelRight></PanelRight>
        <ContextMenu></ContextMenu>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

import ToolBar from './containers/ToolBar'
import Sketchpad from './containers/Sketchpad'
import PanelLeft from './containers/PanelLeft'
import PanelRight from './containers/PanelRight'
import ContextMenu from './components/ContextMenu'
import G6 from './global/g6/index'
import Minimap from '@antv/g6/build/minimap'
import Grid from '@antv/g6/build/grid'
import screenfull from 'screenfull'
import config from './config/index'

import utils from './global/utils'
let isDev = process && process.env.NODE_ENV !== 'production'
import * as Cookies from 'js-cookie'

import {resource} from './config/processDefault';
import i18n from '@/lang';
import materials from './config/materials'
import {deepClone} from '@/utils'
export default {
    name: 'MaterialsEditor',
    components: {
        ToolBar,
        Sketchpad,
        PanelLeft,
        PanelRight,
        ContextMenu
    },
    data() {
        return {
            editorInfo: {},
            defInfo: {
                status: 'add'
            },
            editor: null,
            mode: 'edit',
            isFullScreen: false,
            clipboard: {
                data: null,
                count: 0
            },
            $X: {
                isDev,
                utils,
                Cookies
            },
            flowChartData: this.flowChart
        }
    },
    props: {
        flowChart: {
            type: Object,
            default:{}
        },
    },
    computed: {
        ...mapGetters([
            'currentItem',
            'toolList',
            'log'
        ])
    },
    beforeDestroy(){
        window.onbeforeunload = null
    },
    methods: {
        init() {
            let _t = this
            let el = _t.$el
            let sketchpad = el.querySelector('#sketchpad')
            let navigator = el.querySelector('#navigator')
            let size = [
                navigator.clientWidth,
                parseInt(navigator.clientWidth * sketchpad.clientHeight / sketchpad.clientWidth)
            ]
            const minimap = new Minimap({
                container: navigator,
                type: 'keyShape',
                size: size
            })
            const grid = new Grid()
            _t.editor = new G6.Graph({
                plugins: [
                    minimap,
                    grid
                ],
                container: sketchpad,
                width: sketchpad.clientWidth,
                height: sketchpad.clientHeight,
                fitViewPadding: 20,
                modes: {
                    edit: [
                        'zoom-canvas',
                        'drag-canvas',
                        'click-select',
                        {
                            type: 'node-control',
                            updateEdge: true,
                            enableNodeLabel: true,
                            enableEdgeLabel: true
                        }
                    ],
                    preview: ['drag-canvas', 'zoom-canvas']
                },
                nodeStyle: {
                    default: {
                        fill: '#ffcc33',
                        fillOpacity: 1,
                        stroke: '#000000',
                        strokeOpacity: 1,
                        cursor: 'move'
                    },
                    active: {},
                    selected: {},
                    hover: {}
                },
                edgeStyle: {
                    default: {
                        stroke: '#000000',
                        strokeOpacity: 1,
                        lineAppendWidth: 30,
                        cursor: 'pointer'
                    }
                }
            })
            _t.editor.$X = {
                ...config.$X
            }
            _t.editor.$C = G6.$C

            _t.doSetMode('edit')

            _t.initFlowchart();
            _t.editor.data(this.transfer().toEditor(_t.flowChartData))
            _t.editor.render()
            _t.editor.on('canvas:mousedown', _t._canvasMousedown)
            _t.editor.on('canvas:mouseup', _t._canvasMouseup)

            _t.editor.on('node:mousedown', _t._nodeMousedown)
            _t.editor.on('node:mouseover', _t._nodeHover)
            _t.editor.on('node:mouseout', _t._nodeOut)
            _t.editor.on('edge:mousedown', _t._edgeMousedown)
            _t.editor.on('edge:mouseover', _t._edgeHover)
            _t.editor.on('edge:mouseout', _t._edgeOut)
            _t.editor.on('editor:getItem', function(data) {
                _t.$store.commit('editor/currentItem/update', data)
            })
            _t.editor.on('editor:setItem', function(data) {
                let item = _t.editor.findById(data.id)
                if (item) {
                    _t.editor.updateItem(item, data.model)
                    _t.editor.paint()
                }
            })
            _t.editor.on('editor:contextmenu', function(data) {
                utils.bus.$emit('editor/contextmenu/open', data)
            })
            _t.editor.on('editor:record', function (from) {
                _t.$store.commit('editor/log/update', {
                    action: 'record',
                    data: {
                        time: new Date(),
                        content: _t.editor.save()
                    }
                })
            })
            _t.editor.emit('editor:record', 'init')

            _t.bindUnload()
        },
        initFlowchart(){
            if (!this.flowChart.nodes || !this.flowChart.nodes.length) {
                
                this.flowChartData=resource;
                
                
            }
        },
        _canvasMousedown() {
            let _t = this
            _t.doClearAllStates()
        },
        _canvasMouseup() {

        },
        _editorClick(event) {
        },
        _nodeClick(event) {

        },
        _nodeMousedown(event) {
            let _t = this
            _t.doClearAllStates()
            _t.editor.setItemState(event.item, 'active', true)
        },
        _nodeHover(event) {
            let _t = this
            if (!event.item.hasState('active')) {
                _t.editor.setItemState(event.item, 'hover', true)
            }
        },
        _edgeHover(event){
            let _t = this
            if (!event.item.hasState('active')) {
                _t.editor.setItemState(event.item, 'hover', true)
            }
        },
        _edgeOut(event) {
            let _t = this
            _t.editor.setItemState(event.item, 'hover', false)
        },
        _nodeOut(event) {
            let _t = this
            _t.editor.setItemState(event.item, 'hover', false)
        },
        _nodeContextmenu(event) {
            console.log('_nodeContextmenu', event)
        },
        _edgeMousedown(event) {
            let _t = this
            _t.doClearAllStates()
            if (event.item && !event.item.destroyed) {
                _t.editor.setItemState(event.item, 'active', !event.item.hasState('active'))
            }
        },
        doClearAllStates() {
            let _t = this
            if (!_t.editor) {
                return
            }
            _t.editor.setAutoPaint(false)
            _t.editor.getNodes().forEach(function(node) {
                _t.editor.clearItemStates(node, ['active', 'hover', 'selected'])
            })
            _t.editor.getEdges().forEach(function(edge) {
                _t.editor.clearItemStates(edge, ['active', 'hover', 'selected'])
            })
            _t.editor.paint()
            _t.editor.setAutoPaint(true)
        },
        doCopy() {
            let _t = this
            if (_t.currentItem && _t.currentItem.type === 'node') {
                _t.clipboard = {
                    data: _t.currentItem,
                    count: 0
                }
            }
        },
        doPaste(info) {
            let _t = this
            let item = _t.clipboard.data
            _t.clipboard.count++
            if (item) {
                if (item.type === 'node') {
                    let x = item.model.x + 10 * _t.clipboard.count
                    let y = item.model.y + 10 * _t.clipboard.count
                    if (info && info.context === 'ContextMenu' && info.data) {
                        if (info.data.hasOwnProperty('canvasX')) {
                            x = info.data.canvasX
                        }
                        if (info.data.hasOwnProperty('canvasY')) {
                            y = info.data.canvasY
                        }
                    }

                    let node = {
                        ...item.model,
                        id: G6.Util.uniqueId(),
                        x,
                        y
                    }
                    _t.editor.addItem('node', node)
                }
            }
        },
        doDelete() {
            let _t = this
            _t.editor.getNodes().forEach(node => {
                if (node.hasState('active')) {
                    _t.editor.removeItem(node)
                }
            })
            _t.editor.getEdges().forEach(edge => {
                if (edge.hasState('active')) {
                    _t.editor.removeItem(edge)
                }
            })
        },
        doZoom(info, position) {
            let _t = this
            let ratio = 1
            let center
            if (position) {
                center = position
            } else {
                let el = _t.$el
                let sketchpad = el.querySelector('#sketchpad')
                center = {
                    x: sketchpad.clientWidth / 2,
                    y: sketchpad.clientHeight / 2
                }
            }
            if (info.name === 'zoom') {
                _t.editor.zoomTo(info.data, center)
            } else if (['zoomIn', 'zoomOut'].includes(info.name)) {
                let currentRatio = _t.editor.getZoom()
                let step = 0.1
                ratio = info.name === 'zoomOut' ? currentRatio - step : currentRatio + step
                ratio = ratio.toFixed(1)
                _t.editor.zoomTo(ratio, center)
            } else if (info.name === 'actualSize') {
                ratio = 1
                _t.editor.zoomTo(ratio, center)
            }
        },
        doAddNode(info) {
            let _t = this
            let node = {
                id: G6.Util.uniqueId(),
                shape: info.shape,
                label: ['exclusive-gateway-node'].indexOf(info.shape) <= -1 ? info.label : '',
                labelCfg: {
                    position: 'center',
                    style: {
                        fontSize: 12
                    }
                },
                width: info.width,
                height: info.height,
                minWidth: info.minWidth,
                minHeight: info.minHeight,
                anchorPoints: info.anchorPoints,
                shapeControl: info.shapeControl,
                style: info.style
            }
            _t.editor.emit('editor:addNode', node)
        },
        doSetMode(name) {
            let _t = this
            console.log('mode', name)
            _t.mode = name
            _t.editor.setMode(name)
            let toolList
            toolList = _t.toolList.map(item => {
                if (item.hasOwnProperty('mode') && Array.isArray(item.mode)) {
                    item.disabled = !item.mode.includes(name)
                    if (['edit', 'preview'].includes(item.name)) {
                        item.enable = item.mode.includes(name)
                    }
                }
                return item
            })
            _t.$store.commit('editor/toolList/update', toolList)
        },
        handleToolTrigger(info) {
            let _t = this
            let isRecord = false
            switch (info.name) {
                case 'undo':
                case 'redo':
                case 'clearLog':
                    _t.$store.commit('editor/log/update', {
                      action: info.name
                    })
                    if (['undo', 'redo'].includes(info.name)) {
                      _t.$nextTick(function () {
                        if (_t.log.list.length) {
                          if (_t.log.current !== null) {
                            let data = _t.log.list[_t.log.current]
                            _t.editor.read(data.content)
                            _t.editor.paint()
                          } else {
                            _t.editor.clear()
                            _t.editor.paint()
                          }
                        }
                      })
                    }
                    break
                case 'copy':
                    _t.doCopy()
                    break
                case 'paste':
                    _t.doPaste(info)
                    break
                case 'delete':
                    _t.doDelete()
                    break
                case 'zoom':
                case 'zoomIn':
                case 'zoomOut':
                case 'actualSize':
                    _t.doZoom(info)
                    break
                case 'fit':
                    _t.editor.fitView()
                    break
                case 'preview':
                case 'edit':
                    _t.doSetMode(info.name)
                    break
                case 'fill':
                    _t.editor.$X.fill = info.data
                    _t.editor.getNodes().forEach(node => {
                        if (node.hasState('active')) {
                            let { style } = node.getModel()
                            _t.editor.updateItem(node, {
                                style: {
                                    ...style,
                                    fill: info.data
                                }
                            })
                            isRecord = true
                            console.log('sss',info.data)
                        }
                    })
                    break
                case 'lineColor':
                    _t.editor.$X.lineColor = info.data
                    _t.editor.getEdges().forEach(edge => {
                        if (edge.hasState('active')) {
                            let { style } = edge.getModel()
                            _t.editor.updateItem(edge, {
                                style: {
                                    ...style,
                                    stroke: info.data
                                }
                            })
                            isRecord = true
                        }
                    })
                    _t.editor.getNodes().forEach(node => {
                        if (node.hasState('active')) {
                            let { style } = node.getModel()
                            _t.editor.updateItem(node, {
                                style: {
                                    ...style,
                                    stroke: info.data
                                }
                            })
                            isRecord = true
                        }
                    })
                    break
                case 'lineWidth':
                    _t.editor.$X.lineWidth = info.data
                    _t.editor.getEdges().forEach(edge => {
                        if (edge.hasState('active')) {
                            let { style } = edge.getModel()
                            _t.editor.updateItem(edge, {
                                style: {
                                    ...style,
                                    lineWidth: info.data
                                }
                            })
                            isRecord = true
                        }
                    })
                    _t.editor.getNodes().forEach(node => {
                        if (node.hasState('active')) {
                            let { style } = node.getModel()
                            _t.editor.updateItem(node, {
                                style: {
                                    ...style,
                                    lineWidth: info.data
                                }
                            })
                            isRecord = true
                        }
                    })
                    break
                case 'lineStyle':
                    let lineConfig = _t.editor.$C.line
                    _t.editor.$X.lineStyle = info.data
                    _t.editor.getEdges().forEach(edge => {
                        if (edge.hasState('active')) {
                            let { style } = edge.getModel()
                            _t.editor.updateItem(edge, {
                                style: {
                                    ...style,
                                    ...lineConfig.type[info.data]
                                }
                            })
                            isRecord = true
                        }
                    })
                    _t.editor.getNodes().forEach(node => {
                        if (node.hasState('active')) {
                            let { style } = node.getModel()
                            _t.editor.updateItem(node, {
                                style: {
                                    ...style,
                                    ...lineConfig.type[info.data]
                                }
                            })
                            isRecord = true
                        }
                    })
                    break
                case 'lineType':
                    _t.editor.$X.lineType = info.data
                    _t.editor.getEdges().forEach(edge => {
                        if (edge.hasState('active')) {
                            _t.editor.updateItem(edge, {
                                shape: info.data
                            })
                            _t.editor.refreshItem(edge)
                            isRecord = true
                        }
                    })
                    break
                case 'startArrow':
                case 'endArrow':
                    _t.editor.$X[info.name] = info.data
                    _t.editor.getEdges().forEach(edge => {
                        if (edge.hasState('active')) {
                            let { style } = edge.getModel()
                            _t.editor.updateItem(edge, {
                                style: {
                                    ...style,
                                    [info.name]: info.data
                                }
                            })
                            isRecord = true
                        }
                    })
                    break
                case 'clear':
                    _t.$confirm(i18n.t('flowchart.L10201'),i18n.t('flowchart.L10200'),{type:'warning'})
                    .then(resp=>{
                        _t.$store.commit('editor/log/update', {
                          action: 'clear'
                        })
                        _t.editor.clear()
                        _t.editor.paint()
                    }).catch(()=>{})
                    break
                case 'toFront':
                case 'toBack':
                    if (info.data.hasOwnProperty('id') && info.data.id) {
                        isRecord = true
                        let item = _t.editor.findById(info.data.id)
                        if (item && item[info.name]) {
                            item[info.name]()
                            _t.editor.paint()
                        }
                    }
                    break
                case 'fullscreen':
                    if (screenfull.isEnabled) {
                        screenfull.toggle()
                    }
                    break
                case 'download':
                    let fileName ='блок-схема' + '_' + utils.filters.formatDate(new Date(), 'YYYYMMDDhhmmss')
                    if (info.data === 'image') {
                        _t.editor.downloadImage(fileName)
                    } else if (info.data === 'json') {
                        let content = _t.editor.save()
                        content = JSON.stringify(content)
                        let blob = new Blob([content], {
                            type: 'application/json;charset=UTF-8'
                        })
                        let url = URL.createObjectURL(blob)
                        let link = document.createElement('a')
                        link.textContent = 'download json'
                        link.href = url
                        link.download = fileName
                        link.click()
                        URL.revokeObjectURL(url)
                    }
                    break
            }
            if (isRecord) {
              _t.editor.emit('editor:record', 'handleToolTrigger')
            }
        },
        initInfo(data = {}) {
            let _t = this
            _t.editorInfo = {
                ..._t.defInfo,
                ...data
            }
        },
        ondblclickPad() {
            let _t = this
            utils.bus.$emit('editor/pad/dblclick')
        },
        bindShortcuts() {
            let _t = this
            _t.toolList.forEach(item => {
                if (item.enable && item.shortcuts) {
                    Mousetrap.bind(item.shortcuts, function(e) {
                        if (e.preventDefault) {
                            e.preventDefault()
                        } else {
                            e.returnValue = false
                        }
                        _t.handleToolTrigger({
                            name: item.name,
                            data: {}
                        })
                        return false
                    })
                }
            })
            document.addEventListener('keyup', function() {
               utils.bus.$emit('editor/contextmenu/close')
            })
        },
        bindUnload() {
            window.onbeforeunload = function(event) {

                var confirmationMessage = "Не забудьте сохранить! Вы уверены, что хотите выйти?";
                event.returnValue = confirmationMessage; // 兼容 Gecko + IE
                return confirmationMessage; // 兼容 Gecko + Webkit, Safari, Chrome

            }
        },
        handleEditorClick() {
            let _t = this
            utils.bus.$emit('editor/contextmenu/close')
        },
        transfer(){
            return {
                toPost(data){
                    return {
                        nodes: data.nodes.map(item=>{
                            var cloneItem = deepClone(item);
                            var data = cloneItem.data;
                            data.name = cloneItem.label;
                            data.model = cloneItem;
                            delete data.model.data;
                            return data;
                        }),
                        lines: data.lines.map(item=>{
                            var cloneItem = deepClone(item)
                            var data = cloneItem.data;
                            data.model = cloneItem;
                            delete data.model.data;
                            return data;
                        })
                    }
                },
                toEditor(data){
                    return {
                        nodes: data.nodes.map(item=>{
                            var cloneItem = deepClone(item);
                            var node = cloneItem.model;
                            if(!node){
                                var shape = cloneItem.id=='apply'?'apply':cloneItem.type
                                node = {
                                    "id": cloneItem.id,
                                    "shape": cloneItem.id=='apply'?'apply':cloneItem.type,
                                    "label": cloneItem.name,
                                    "labelCfg":{"position":"center","style":{"fontSize":12}},"width":40,"height":40,"minWidth":20,"minHeight":20,"anchorPoints":[[0.5,0],[0.5,1],[0,0.5],[1,0.5]],
                                    "shapeControl":{"controllers":[[0,0,"nwse-resize"],[0,0.5,"ew-resize"],[0,1,"nesw-resize"],[0.5,0,"ns-resize"],[0.5,1,"ns-resize"],[1,0,"nesw-resize"],[1,0.5,"ew-resize"],[1,1,"nwse-resize"]],"rotate":true},
                                    "style": materials.find(item=>item.shape==shape).style,
                                    "x": cloneItem.style.left,
                                    "y": cloneItem.style.top,
                                    "size":[40,40]
                                }
                            }else{
                                delete cloneItem.model;
                            }
                            
                            node.data = cloneItem;
                            return node
                        }),
                        edges: data.lines.map(item=>{
                            var cloneItem = deepClone(item);
                            var node = cloneItem.model;
                            if(!node){
                                node = {
                                    "id":cloneItem.id,
                                    "source":cloneItem.from,
                                    "sourceAnchor":1,
                                    "target":cloneItem.to,
                                    "label":"",
                                    "labelCfg":{"position":"center","style":{"fontSize":16,"stroke":"#000000"}},
                                    "lineAppendWidth":20,
                                    "attrs":{"start":"start_g22","end":"apply_g26"},
                                    "style":{"stroke":"#999999","lineWidth":1,"lineDash":[]},
                                    "shape":"x-line",
                                    "startArrow":false,
                                    "endArrow":true,
                                    "targetAnchor":1
                                }
                            }else{
                                delete cloneItem.model;
                            }
                            node.data = cloneItem;
                            return node
                        })
                    }
                }
            }
        },
        getData(){
            var editorNodes = this.editor.getNodes().map(item=>item.getModel());
            var editorLines = this.editor.getEdges().map(item=>item.getModel());
            
            var data = this.transfer().toPost({nodes:editorNodes,lines:editorLines})
            return data
        }
    },
    created() {
        let _t = this
        _t.initInfo()
        _t.$nextTick(_t.init)

        utils.bus.$on('editor/add/node', _t.doAddNode)
        utils.bus.$on('editor/tool/trigger', _t.handleToolTrigger)
        utils.bus.$on('editor/currentItem/update', function(data) {
            _t.editor.emit('editor:setItem', data)
        })
    },
}
</script>
<style lang="scss">
.materials-editor {
    display: inline-block;
    width: 100%;
    height: 100%;
    user-select: none;
    overflow: hidden;
    background: #f8f9fa;
    font-size: 12px;
}
</style>