import Vue from 'vue'
import * as vueExpand from '../assets/js/utils'
import * as filters from '../assets/js/vue-filter'

/**
 * 生成常用方法
 */
Object.keys(vueExpand).forEach(key => {
    Vue.prototype[key] = vueExpand[key]
});

/**
 * 生成 Vue 过滤器
 */
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});
Vue.directive('template-edit', {
    bind: function (el,binding,vnode) {
        let editable = binding.value;
        console.log(editable)
        /* if(binding.expression !== undefined){
           editable = vnode.context.editable
         }*/
        el.style.position = 'relative'
        el.addEventListener('click',()=>{
            window.parent.postMessage(editable, '*')
        })
        el.onmouseenter = function () {
            // 插入蒙版
            let wd = this.offsetWidth
            let hg = this.offsetHeight
            let parentObj = document.createElement('div')
            parentObj.setAttribute('id', 'editable')
            parentObj.style.position = 'absolute'
            parentObj.style.top = 0
            parentObj.style.left = 0
            parentObj.style.width = wd + 'px'
            parentObj.style.height = hg + 'px'
            parentObj.style.zIndex = 999
            parentObj.style.backgroundColor = 'rgba(0,0,0,.4)'
            parentObj.style.cursor = 'pointer'
            this.appendChild(parentObj)
            //  创建按钮
            let btn = document.createElement('div')
            let node = document.createTextNode('编辑')
            btn.appendChild(node)

            btn.setAttribute('id', 'editBtn')
            btn.style.position = 'absolute'
            btn.style.top = 50 + '%'
            btn.style.left = 50 + '%'
            btn.style.transform = `translate(-50%,-50%) `
            btn.style.zIndex = 1000
            btn.style.color = '#fff'
            btn.style.borderRadius = `50%`
            btn.style.background = 'rgba(255,255,255,.4)'
            btn.style.width = 50 + 'px'
            btn.style.height = 50 + 'px'
            btn.style.lineHeight = 50 + 'px'
            btn.style.textAlign = 'center'
            btn.style.cursor = 'pointer'

            this.appendChild(btn)
        }
        el.onmouseleave = function() {
            this.removeChild(document.getElementById('editBtn'))
            this.removeChild(document.getElementById('editable'));
        }
    }
})