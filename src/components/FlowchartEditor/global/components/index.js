/**
 *
 * 全局组件
 */

// import {
//   Menu,
//   MenuItem,
//   Tooltip,
//   InputNumber,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Icon,
//   Message,
//   Modal,
//   Input,
//   Form,
//   FormItem,
//   Slider,
//   Select,
//   Option
// } from 'element-ui'

import { Sketch } from 'vue-color'

import XIcon from './Icon/Index'
import XTooltip from './Tooltip/Index'
import XDivider from './Divider/Index'

const obj = {
  // ui组件
  // Menu,
  // MenuItem,
  // Tooltip,
  // InputNumber,
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  // Icon,
  // Message,
  // Modal,
  // Input,
  // Form,
  // FormItem,
  // Slider,
  // Select,
  // Option,
  SketchPicker: Sketch,
  XIcon,
  XTooltip,
  XDivider
}

const components = {}
components.install = function (Vue, options) {
  for (let name in obj) {
    if (name && obj[name]) {
      Vue.component(name, obj[name])
      if (['Message', 'Modal'].includes(name)) {
        Vue.prototype[`$${name}`] = obj[name]
      }
    }
  }
}

export default components
export {XIcon,XTooltip,XDivider,Sketch}