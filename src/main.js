import Vue from 'vue'
import store from './store'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource';
Vue.use(VueResource);

import App from './App.vue';
import Navbar from './assets/js/components/navbar.vue';
Vue.component('navbar', Navbar);

import Coin from './assets/js/components/coin.vue';
Vue.component('coin', Coin);


const AllProducts = require('./assets/js/components/all-products.vue');
const ShowProduct = require('./assets/js/components/show-product.vue');
const PayPal = require('./assets/js/components/paypal-coin.vue');
const OrderResume = require('./assets/js/components/order-resume.vue');

const routes = [
    {
        name: 'all_products',
        path: '/',
        component: AllProducts
    },
    {
        name: 'order-resume',
        path: '/order-resume/:id',
        component: OrderResume
    },
    {
        name: 'show_product',
        path: '/:id',
        component: ShowProduct
    },
    {
        name: 'paypal-coin',
        path: '/buy/:id',
        component: PayPal
    },

];


var router = new VueRouter({ routes: routes, mode: 'history' });


new Vue(
    Vue.util.extend({ 
        router,
}, App)).$mount('#app');

