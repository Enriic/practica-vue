import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [], // Array para almacenar los productos del carrito
  },
  mutations: {
    addToCart(state, product) {
        console.log('addToCart mutation')
        const existingProduct = state.cart.find(item => item.id === product.id);
        if (existingProduct) {
          existingProduct.amount += product.amount;
        } else {
          state.cart.push(product);
        }
    },
      
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId); // Eliminar un producto del carrito
    },
    clearCart(state) {
      state.cart = []; // Vaciar el carrito
    },
  },
});
