import Comp1 from './Comp1.vue'
import Comp2 from './Comp2.vue'
import Comp3 from './Comp3.vue'
export default [
    {
        path: '/',
        name: 'comp',
        component: Comp1
    },
    {
        path: '/comp1',
        name: 'comp_1',
        component: Comp1
    },
    {
        path: '/comp2',
        name: 'comp_2',
        component: Comp2
    },
    {
        path: '/comp3',
        name: 'comp_3',
        component: Comp3
    }
]
