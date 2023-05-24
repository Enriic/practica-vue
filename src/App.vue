<template>
    <div id="page">
        <navbar id="navbar"></navbar>
        <div class="container general-container">
            <router-view></router-view>           
        </div>
    </div>
    
</template>

<style>

.general-container{
    margin-top: 2rem;
    width: 100%;
    padding-top: 4rem;
    padding: 2rem;
}

#page{
    background-color: #f6f5f5;
}   

body{
    background-color: #f6f5f5;
    padding: 3rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Verdana, sans-serif;
}


</style>

<script>
import store from './store.js';
    export default{
        name:'App',
        store,
        data(){
            return{

            }
        }
    }
</script>
