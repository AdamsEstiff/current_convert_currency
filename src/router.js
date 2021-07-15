import Vue from 'vue'
import Router from 'vue-router'
import convert from './views/converted.vue'

Vue.use(Router)
const router=new Router({
    routes:[
        {
            path:'/',
            component:convert
        }
    ]
})
export default router;
