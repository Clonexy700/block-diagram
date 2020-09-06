<!--
 * @description     Правая панель
 *
 * @author          Георгий Дедов, Dedov Georgiy
 * @create          2020-04-09 11:00
-->
<style scoped lang="scss"></style>
<template>
    <CardBox placement="right" position="left" :width="300" @expand="toggleHandler">
        <CardItem :title="$t('Конфигурация блоков')" :enableFold="true" :bold="true">
            <Options></Options>
        </CardItem>
        <!-- <CardItem :title="$t('flowchart.L10102')" :enableFold="true" :bold="true">
      <Navigator></Navigator>
    </CardItem> -->
    </CardBox>
</template>
<script>
import CardBox from '../components/CardBox'
import CardItem from '../components/CardItem'
import Options from '../components/Options'
// import Navigator from '../components/Navigator'
import utils from '../global/utils'
export default {
    name: 'PanelRight',
    components: {
        CardBox,
        CardItem,
        Options,
        // Navigator
    },
    methods: {
        toggleHandler(data) {
            // let _t = this
            utils.bus.$emit('editor/panel/toggle', data)
        }
    }
}
</script>