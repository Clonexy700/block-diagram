<!--
 * @description     Edit panel box, Поле для изменения CardBox типа
 *
 * @author          Георгий Дедов, Dedov Georgiy
 * @create          2020-04-09 11:00
-->

<template>
  <div class="card-box" :style="boxStyle">
    <Handler
      class="handler"
      :mode="mode"
      :position="position"
      :expand="isExpand"
      :callback="toggleHandler"
    >
    </Handler>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Handler from './Handler'
import utils from '../global/utils'
  export default {
    name: 'CardBox',
    components: {
      Handler
    },
    props: {
      width: {
        type: Number,
        default: 300
      },
      
      placement: {
        type: String,
        default: 'right'
      },
      
      mode: {
        type: String,
        validator (value) {
          return ['horizontal', 'vertical'].includes(value)
        },
        default: 'vertical'
      },

      position: {
        type: String,
        validator (value) {
          return ['top', 'right', 'bottom', 'left'].includes(value)
        },
        default: 'right'
      }
    },
    data () {
      return {
 
        isExpand: true
      }
    },
    computed: {
      boxStyle () {
        let _t = this
        let style = {}
        if (_t.placement) {
          style[_t.placement] = 0
        }
        if (_t.width) {
          style.width = _t.width + 'px'
        }

        if (_t.isExpand) {
          style[_t.placement] = 0
        } else {
          style[_t.placement] = (-_t.width) + 'px'
        }
        _t.$emit('expand', {
          name: _t.placement,
          isExpand: _t.isExpand,
          style: style
        })
        return style
      }
    },
    methods: {
      toggleHandler (val) {
        let _t = this
        _t.isExpand = val !== undefined ? val : !_t.isExpand
      }
    },
    created () {
      let _t = this
      utils.bus.$on('editor/pad/dblclick', _t.toggleHandler)
    }
  }
</script>

<style scoped lang="scss">
  .card-box {
    display: inline-block;
    position: absolute;
    top: 40px;
    bottom: 0;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, .1);
    background: #ffffff;
    z-index: 20;
    transition: all .5s ease-in-out;

    .card-body {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      padding: 0;
      z-index: 2000;
      background: #fff;
      text-align: left;
      overflow-y: auto;
    }
  }
</style>
