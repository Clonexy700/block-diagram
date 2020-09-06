<!--
 * @description     Настройки и опции
 *
 * @author          Георгий Дедов, Dedov Georgiy
 * @create          2020-04-09 11:00
-->
<template>
    <div class="options">
        <el-form v-if="Object.keys(formData).length && currentItem" :model="formData" label-position="top">
            <CardItem :title="$t('Текст')" :enableFold="true">
                <div class="form-item-block">
                    <el-form-item label="содержание">
                        <el-input v-model="formData.label" size="small" @input="handleChange"></el-input>
                    </el-form-item>
                    <el-form-item label="позиция" v-if="formData.labelCfg">
                        <el-select v-model="formData.labelCfg.position" size="small" @change="handleChange">
                            <el-option value="center">центр</el-option>
                            <el-option value="top">верх</el-option>
                            <el-option value="left">лево</el-option>
                            <el-option value="right">право</el-option>
                            <el-option value="bottom">низ</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="описание" v-if="formData.labelCfg">
                        <el-input v-model="formData.labelCfg.offset" size="small" @change="handleChange"></el-input>
                    </el-form-item>
                    
                </div>
            </CardItem>
            <CardItem :title="$t('Аттрибуты')" :enableFold="true" v-if="currentItem.type=='node'">
                <div class="form-item-block">
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="x">
                                <el-input v-model="formData.x" size="small" @change="handleChange"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="y">
                                <el-input v-model="formData.y" size="small" @change="handleChange"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="ширина">
                                <el-input v-model="formData.width" size="small" @change="handleChange"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="высота">
                                <el-input v-model="formData.height" size="small" @change="handleChange"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </CardItem>
            <CardItem :title="$t('Стиль')" :enableFold="true">
                <div class="form-item-block">
                    <template v-if="currentItem.type === 'node'">
                        <el-form-item label="Цвет заполнения">
                            <el-color-picker v-model="formData.style.fill" show-alpha @change="handleChange"></el-color-picker>
                        </el-form-item>
                    </template>
                    <el-form-item label="Цвет границы">
                        <el-color-picker v-model="formData.style.stroke" show-alpha @change="handleChange"></el-color-picker>
                    </el-form-item>
                    <el-form-item label="Прозрачность границы">
                        <el-slider v-model="formData.style.strokeOpacity" :min="0" :max="1" :step="0.1" :show-input="true" size="mini" @change="handleChange">
                        </el-slider>
                    </el-form-item>
                    <el-form-item label="Ширина границы">
                        <el-slider v-model="formData.style.lineWidth" :min="1" :max="10" :step="1" :show-input="true" size="mini" @change="handleChange">
                        </el-slider>
                    </el-form-item>
                </div>
            </CardItem>
        </el-form>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import CardItem from './CardItem'
import utils from '../global/utils'
import i18n from '@/lang'
export default {
    name: 'Options',
    components: {
        CardItem,
        
    },
    data() {
        var signList = [
            { value: 1, label: this.$t('form.approveCreateTip2') },
            { value: 2, label: this.$t('form.approveCreateTip3') }
        ]
        return {
            signList:signList,
            formData: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                style: {
                    fill: '',
                    fillOpacity: 1,
                    stroke: '',
                    strokeOpacity: 1,
                    cursor: 'default',
                    lineDash: '',
                    lineWidth: 1
                },
                label: '',
                labelCfg: {
                    position: '',
                    offset: 0
                },
                data:{

                }
            },
            fieldMap: {
                enabled: [],
                disabled: ['anchorPoints', 'shapeControl', 'size'],
                common: [{
                        name: 'x',
                        label: 'x',
                        lang: '',
                        type: 'number',
                        component: 'InputNumber',
                        enable: true,
                        children: []
                    },
                    {
                        name: 'y',
                        label: 'y',
                        lang: '',
                        type: 'number',
                        component: 'InputNumber',
                        enable: true,
                        children: []
                    },
                    {
                        name: 'width',
                        label: 'ширина',
                        lang: '',
                        type: 'number',
                        component: 'InputNumber',
                        enable: true,
                        children: []
                    },
                    {
                        name: 'height',
                        label: 'высота',
                        lang: '',
                        type: 'number',
                        component: 'InputNumber',
                        enable: true,
                        children: []
                    },
                    {
                        name: 'label',
                        label: 'текст',
                        lang: '',
                        type: 'string',
                        component: 'Input',
                        enable: true,
                        children: []
                    },
                    {
                        name: 'labelCfg',
                        label: '',
                        lang: '',
                        type: 'object',
                        component: 'OptionGroup',
                        enable: true,
                        children: [{
                                name: 'position',
                                label: 'позиция',
                                lang: '',
                                type: 'string',
                                component: 'Select',
                                enable: true,
                                option: ['center', 'top', 'left', 'right', 'bottom'],
                                children: []
                            },
                            {
                                name: 'offset',
                                label: 'смещение',
                                lang: '',
                                type: 'string',
                                component: 'InputNumber',
                                enable: true,
                                children: []
                            },
                            {
                                name: 'style',
                                label: 'стиль текста',
                                lang: '',
                                type: 'object',
                                component: 'OptionGroup',
                                enable: false,
                                children: []
                            }
                        ]
                    },
                    {
                        name: 'shape',
                        label: 'форма',
                        lang: '',
                        type: 'string',
                        component: 'Select',
                        enable: true,
                        children: []
                    },
                    {
                        name: 'style',
                        label: 'стиль',
                        lang: '',
                        type: 'object',
                        component: 'OptionGroup',
                        enable: false,
                        children: []
                    }
                ],
                node: [],
                edge: []
            }
        }
    },
    computed: {
        ...mapGetters([
            'currentItem'
        ])
    },
    watch: {
        currentItem: {
            handler(val) {
                let _t = this
                _t.formData = JSON.parse(JSON.stringify(val.model))
                
            },
            deep: true
        }
    },
    methods: {
        handleChange() {
            let _t = this
            let model = {
                ..._t.formData,
                size: [_t.formData.width, _t.formData.height]
            }
            utils.bus.$emit('editor/currentItem/update', {
                id: _t.currentItem.model.id,
                type: _t.currentItem.type,
                model: model
            })
        }
    }
}
</script>
<style scoped lang="scss">
.options {
    display: inline-block;
    width: 100%;
    height: 100%;

    .form-item-block {
        padding: 10px 20px;

        /deep/ {
            .el-input__inner {
                border: 1px solid #eee;
                padding-left: 10px;
                padding-right: 10px;
            }
            .el-form-item__label{
                font-size: 12px;
            }
        }
    }
}
</style>