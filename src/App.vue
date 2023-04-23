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
    width: 100%;
    margin-left: -2.3rem;
    margin-top: 2rem;
    border: 2px solid #e51919;
}

#page{
    background-color: #f5f5f5;
}   

body{
    background-color: #f5f5f5;
    padding: 3rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Verdana, sans-serif;
}

</style>

<script>
    export default{
        
        data(){
            return{

            }
        }
    }
</script>
