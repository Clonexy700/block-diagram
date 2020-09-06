<!--
 * @description     Индекс
 *
 * @author          Георгий Дедов, Dedov Georgiy
 * @create          2020-04-09 11:00
-->


<template>
  <div :class="['tool-box', mode]" @contextmenu.stop.prevent>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    props: {
      mode: {
        type: String,
        default: 'horizontal'
      },
      tools: {
        type: Array
      }
    }
  }
</script>

<style scoped lang="scss">
  .tool-box {
    padding: 5px;
    background: #fff;
    cursor: default;
    z-index: 10;

    &.horizontal {
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-content: flex-start;
      flex-direction: row;

      .tool-item {
        min-width: 25px;
        height: 30px;
        line-height: 30px;
        vertical-align: middle;
        text-align: center;
        opacity: .3;
        margin: 0 2px;
        color: #000000;

        &:hover {
          opacity: 1;
        }
        &.active {
          opacity: 1;
        }
        &.disabled {
          cursor: not-allowed;
        }

        .label {

        }
      }
    }
    &.vertical {
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-content: flex-start;
      flex-direction: column;

      .tool-item {
        text-align: left;
        min-width: 100px;
      }
    }
  }
</style>