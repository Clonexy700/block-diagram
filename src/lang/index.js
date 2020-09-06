
import _zh from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang

import zh from './zh-CN'

import VueI18n from 'vue-i18n'
import * as Cookies from 'js-cookie'
import config from '../config'

export default function (Vue) {
    let langs = {
        label: {
            'zh-CN': 'Russian',
        },
        icon: {
            'zh-CN': require('@/assets/images/langs/zh-CN.png'),
        },
        data: {
            'zh-CN': { ..._zh, ...zh },
        }
    }


    let key = config.cookie.getItem('locale')
    let val = Cookies.get(key)

        let keys = Object.keys(langs.label)
    var defLang = val || keys[0]

    Vue.use(VueI18n)
    Vue.locale = () => {}

    Vue.prototype.$X.langs = langs
    Vue.prototype.$X.locale = defLang

    let i18nInstance = new VueI18n({
        locale: defLang,
        messages: langs.data
    })

    Vue.prototype._i18n = i18nInstance
    return i18nInstance
}