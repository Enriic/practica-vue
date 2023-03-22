import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        searchBar:''
    },
    mutations:{
         updateSearchBar(state, searchBar) {
             state.searchBar = searchBar;
         }
    },
    actions:{
         updateSearchBar({ commit }, searchBar) {
             commit('updateSearchBar', searchBar);
         }
    },
    getters:{

    }
})