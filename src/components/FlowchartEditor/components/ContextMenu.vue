<!--
 * @description     Контекстное меню
 *
 * @author          Георгий Дедов, Dedov Georgiy
 * @create          2020-04-09 11:00
-->

<template>
  <div class="context-menu" v-show="isShow" :style="contextMenuStyle">
    <ToolBox mode="vertical">
      <template v-for="(item, index) in contextMenuList">
        <ToolItem
          v-if="item.type === 'text'"
          :key="'contextmenu_item_' + index"
          :title="$t(item.lang)"
          :active="item.active"
          :disabled="item.disabled"
          @click.native="handleToolClick(item)"
        >
          <template slot="label">
            <div class="item-icon">
              <XIcon :type="item.icon"></XIcon>
            </div>
            <span class="item-label">{{ $t(item.lang) }}</span>
          </template>
        </ToolItem>
        <ToolItem
          v-if="item.type === 'dropdown-color-picker'"
          :key="'contextmenu_item_' + index"
          :title="$t(item.lang)"
          :active="item.active"
          :disabled="item.disabled"
          @mouseenter.native="handleItemHover"
        >
          <template slot="label">
            <div class="item-icon">
              <XIcon :type="item.icon"></XIcon>
            </div>
            <span class="item-label">{{ $t(item.lang) }}</span>
            <div class="item-more">
              <i class="el-icon-arrow-right"></i>
            </div>
          </template>
          <template slot="content">
            <ToolBox mode="vertical" style="padding: 0;">
              <ToolItem style="padding: 0;">
                <SketchPicker slot="label" :value="formData[item.name]" @input="(val) => handleToolClick(item, val, null)"></SketchPicker>
              </ToolItem>
            </ToolBox>
          </template>
        </ToolItem>
        <ToolItem
          v-if="item.type === 'dropdown-list'"
          :key="'contextmenu_item_' + index"
          :title="$t(item.lang)"
          :active="item.active"
          :disabled="item.disabled"
          @mouseenter.native="handleItemHover"
        >
          <template slot="label">
            <div class="item-icon">
              <XIcon :type="item.icon"></XIcon>
            </div>
            <span class="item-label">{{ $t(item.lang) }}</span>
            <div class="item-more">
              <i class="el-icon-arrow-right"></i>
            </div>
          </template>
          <template slot="content">
            <ToolBox mode="vertical">
              <template v-for="(child, childIndex) in item.children">
                <ToolItem
                  v-if="child.type === 'normal'"
                  :key="'contextmenu_item_' + index + '_child_' + childIndex"
                  :title="$t(child.lang)"
                  :active="child.active"
                  :disabled="child.disabled"
                  @click.native="handleChildClick(item, child)"
                >
                  <template slot="label">
                    <div class="item-icon">
                      <XIcon :type="child.icon"></XIcon>
                    </div>
                    <span class="item-label">{{ child.lang ? $t(child.lang) : child.label }}</span>
                  </template>
                </ToolItem>
                <XDivider
                  class="divider"
                  v-if="child.divider"
                  :key="'contextmenu' + '_divider_' + index + '_child_' + childIndex"
                  mode="horizontal"
                />
              </template>
            </ToolBox>
          </template>
        </ToolItem>
        <ToolItem
          v-if="item.type === 'link'"
          :key="'contextmenu_item_' + index"
          :title="$t(item.lang)"
          :active="item.active"
          :disabled="item.disabled"
          @click.native="handleToolClick(item)"
        >
          <template slot="label">
            <a :href="item.link" target="_blank" style="color: #333333;">
              <div class="item-icon">
                <XIcon :type="item.icon"></XIcon>
              </div>
              <span class="item-label">{{ $t(item.lang) }}</span>
            </a>
          </template>
        </ToolItem>
        <ToolItem
          v-if="item.type === 'normal'"
          :key="'contextmenu_item_' + index"
          :title="$t(item.lang)"
          :active="item.active"
          :disabled="item.disabled"
          @click.native="handleToolClick(item)"
        >
          <template slot="label">
            <div class="item-icon">
              <XIcon :type="item.icon"></XIcon>
            </div>
            <span class="item-label">{{ $t(item.lang) }}</span>
          </template>
        </ToolItem>
        <XDivider
          class="divider"
          v-if="item.divider"
          :key="'contextmenu' + '_divider_' + index"
          mode="horizontal"
        />
      </template>
    </ToolBox>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import ToolBox from './ToolBox/Index'
  import ToolItem from './ToolBox/ToolItem'
  import config from '../config/index'
import utils from '../global/utils'
import { Sketch } from 'vue-color'
import { XIcon, XDivider } from '../global/components'
  export default {
    name: 'ContextMenu',
    components: {
      ToolBox,
      ToolItem,
      SketchPicker: Sketch,
      XIcon,
      XDivider
    },
    data () {
      return {
        isShow: false,
        activeMenu: '',
        options: null,
        contextMenuList: [],
        formData: {
          ...config.$X
        },
        contextMenuStyle: {}
      }
    },
    computed: {
      ...mapGetters([
        'currentItem',
        'toolList'
      ])
    },
    methods: {
      handleContextMenuList () {
        let _t = this
        let contextMenuList = []
        _t.toolList.forEach(item => {
          if (item.enable && item.contextmenu && item.contextmenu.enable) {
            if (!item.contextmenu.hasOwnProperty('target') || (item.contextmenu.hasOwnProperty('target') && (item.contextmenu.target.length && _t.options && _t.options.type && item.contextmenu.target.includes(_t.options.type)))) {
              contextMenuList.push(item)
            }
          }
        })
        _t.contextMenuList = contextMenuList
      },
      handleContextMenuStyle () {
        let _t = this
        let style = {}
        if (!_t.options) {
          return style
        }
        _t.$nextTick(function () {
          let x = _t.options.x !== undefined ? (parseInt(_t.options.x) > 0 ? parseInt(_t.options.x) : 0) : 0
          let y = _t.options.y !== undefined ? (parseInt(_t.options.y) > 0 ? parseInt(_t.options.y) : 0) : 0
          console.log(x,y)

          if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            let winHeight = document.documentElement.clientHeight
            let winWidth = document.documentElement.clientWidth
            let elHeight = _t.$el.clientHeight
            let elWidth = _t.$el.clientWidth
            if (x + elWidth > winWidth) {
              style['right'] = '10px'
            } else {
              style['left'] = x + 'px'
            }
            if (y + elHeight > winHeight) {
              style['bottom'] = '42px'
            } else {
              style['top'] = y + 'px'
            }
          }
          console.log('options',_t.options)
          console.log('style',style)
          _t.contextMenuStyle = style
        })
      },
      doShow (data) {
        let _t = this
        _t.options = data
        _t.handleContextMenuList()

        _t.handleContextMenuStyle()
        _t.isShow = true
      },
      doHide () {
        let _t = this
        _t.options = null
        _t.contextMenuList = []
        _t.isShow = false
      },
      handleChildClick (item, child) {
        let _t = this
        if (child.disabled) {
          return
        }
        let payload = {
          context: 'ContextMenu',
          name: item.name
        }
        switch (item.name) {
          case 'lineWidth':
          case 'lineType':
          case 'lineStyle':
          case 'download':
            payload = {
              ...payload,
              data: child.name
            }
            break
          case 'zoom':
          case 'startArrow':
          case 'endArrow':
            payload = {
              ...payload,
              data: child.data
            }
            break
          case 'language':
            // 更新cookie
            let cookieKey = _t.$X.config.cookie.getItem('locale')
            _t.$X.Cookies.set(cookieKey, child.name, {
              expires: 7,
              path: _t.$X.config.cookie.path
            })
            _t.$i18n.locale = _t.$X.langs.locale = child.name
            break
        }
        utils.bus.$emit('editor/tool/trigger', payload)
      },
      handleToolClick (item, val) {
        let _t = this
        if (item.disabled) {
          return
        }
        let payload = {
          context: 'ContextMenu',
          name: item.name
        }
        switch (item.name) {
          case 'paste':
            payload = {
              ...payload,
              data: _t.options
            }
            break
          case 'fill':
          case 'lineColor':
            let color = val.hex8
            _t.formData[item.name] = color
            payload = {
              ...payload,
              data: color
            }
            break
          case 'toFront':
          case 'toBack':
            payload = {
              ...payload,
              data: _t.currentItem
            }
            break
        }
        utils.bus.$emit('editor/tool/trigger', payload)
        _t.doHide()
      },
      handleItemHover (event) {
        let target = event.target
        let toolBox = target.querySelector('.tool-box')
        if (toolBox && target.clientWidth) {
          toolBox.style.left = target.clientWidth + 'px'
        }
      }
    },
    created () {
      let _t = this
      utils.bus.$on('editor/contextmenu/open', _t.doShow)
      utils.bus.$on('editor/contextmenu/close', _t.doHide)
    }
  }
</script>
<style scoped lang="scss">
  .context-menu {
    position: fixed;
    min-width: 120px;
    width: auto !important;
    z-index: 9999;
    background: #FFF;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, .1);
    padding: 5px 0;
    z-index: 999;

    .tool-box {
      padding: 0;

      .tool-item {
        padding: 5px 10px;

        &:hover {
          color: #000000;
          background: rgba(0, 0, 0, .1);

          .tool-box {
            visibility: visible;
          }
        }

        .tool-box {
          visibility: hidden;
          position: absolute;
          top: 0;
          padding: 5px 0;
          background: #FFF;
          box-shadow: 0 0 5px 2px rgba(0, 0, 0, .1);
        }

        .item-icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 10px;
        }
        .item-label {}
        .item-more {
          display: inline-block;
          float: right;
          width: 16px;
          height: 16px;
        }
      }
      .divider {

      }
    }
  }
</style>