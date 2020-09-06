<!--
 * @description     Card Item
 *
 * @author          Георгий Дедов, Dedov Georgiy
 * @create          2020-04-09 11:00
-->
<template>
    <div class="card-item">
        <div class="header" @click="handleToggle">
            <div :class="{ 'title': true, 'bold': bold }" v-if="title">{{ title }}</div>
            <div class="handler" v-if="enableFold">
                <i class="el-icon-arrow-up" v-show="!isFolded"></i>
                <i class="el-icon-arrow-down" v-show="isFolded"></i>
            </div>
        </div>
        <div class="body" v-show="!isFolded">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CardItem',
    props: {
        title: String,

        enableFold: {
            type: Boolean,
            default: false
        },

        fold: {
            type: Boolean,
            default: false
        },

        bold: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

            isFolded: false
        }
    },
    watch: {
        fold: function(val, newVal) {
            let _t = this
            if (_t.enableFold) {
                _t.isFolded = newVal
            }
        }
    },
    methods: {
        handleToggle: function() {
            let _t = this
            if (!_t.enableFold) {
                return
            }

            _t.isFolded = !_t.isFolded
        }
    }
}
</script>
<style scoped lang="scss">
.card-item {
    display: inline-block;
    width: 100%;

    position: relative;
    border-top: 1px solid rgba(0, 0, 0, .1);
    border-bottom: 1px solid rgba(0, 0, 0, .1);

    .header {
        display: inline-block;
        width: 100%;
        position: relative;

        .title {
            width: 100%;
            height: 30px;
            line-height: 30px;
            border-bottom: 1px solid rgba(0, 0, 0, .1);
            text-indent: 10px;
            color: #000;

            &.bold {
                font-weight: 800;
            }
        }

        .handler {
            position: absolute;
            right: 10px;
            top: 3px;
            z-index: 10;
            cursor: pointer;
        }
    }

    .body {
        display: inline-block;
        width: 100%;
    }
}
</style>