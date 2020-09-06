<!--
 * @description     callback для функций и их хэндлинг
 *
 * @author          Георгий Дедов, Dedov Georgiy
 * @create          2020-04-09 11:00
-->

<template>
  <div :class="className" @click="toggleHandler"></div>
</template>

<script>
export default {
  name: 'Handler',
  props: {
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
    },
    expand: {
      type: Boolean,
      default: true
    },
    callback: {
      type: Function
    }
  },
  computed: {
    className: function () {
      let _t = this
      return ['handler', _t.mode, _t.position, _t.expand]
    }
  },
  methods: {
    toggleHandler: function () {
      let _t = this
      if (_t.callback) {
        _t.callback()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .handler {
    display: inline-block;
    position: absolute;
    background: #ffffff;
    border: 1px solid #dddddd;
    overflow: hidden;
    transition: all .2s ease-in .1s;
    cursor: pointer;

    &:hover {
      background: #dddddd;
    }

    &.horizontal {
      width: 20px;
      height: 20px;
      line-height: 20px;
      left: 50%;
      margin-left: -10px;
    }
    &.vertical {
      width: 20px;
      height: 20px;
      line-height: 20px;
      top: 50%;
      margin-top: -10px;
    }

    &.top {
      top: -11px;
      border-bottom: none;
      border-radius: 20px 20px 0 0;
      box-shadow: 0 -2px 2px 0 rgba(0, 0, 0, 0.1);
    }
    &.right {
      right: -11px;
      border-left: none;
      border-radius: 0 20px 20px 0;
      box-shadow: 2px 0 2px 0 rgba(0, 0, 0, 0.1);
    }
    &.bottom {
      bottom: -11px;
      border-top: none;
      border-radius: 0 0 20px 20px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
    }
    &.left {
      left: -11px;
      border-right: none;
      border-radius: 20px 0 0 20px;
      box-shadow: -2px 0 2px 0 rgba(0, 0, 0, 0.1);
    }

    &.expand {
      &.top {
        margin-top: 0;
      }
      &.right {
        margin-right: 0;
      }
      &.bottom {
        margin-bottom: 0;
      }
      &.left {
        margin-left: 0;
      }
    }
  }

</style>
