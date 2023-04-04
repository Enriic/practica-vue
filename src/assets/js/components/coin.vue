<template>
    <div id="coin">
        <div class="card text-center" @click="handleClick" v-if="coin">
            <img class="card-img-top" :src="coin.imageURL" alt="product" style="width: 75px; height: 75px;" /> 
            <div class="card-body">
                <h3 class="card-title">{{ coin.name }}</h3>
                <p class="price mt-3">{{ coin.price }}$</p>    
                <button class="btn bg-dark text-white">Get Info</button>
            </div>      
        </div>
    </div>
</template>

<script>
    export default {
        props:['id'],
        data()  {
            return {
                coin: {}
            }
        },
        created(){
            this.getCoin()
            setInterval(this.refreshCoin, 10000); // refresh every 10 seconds
        },
        methods:{
            getCoin()
            {
                this.$http.get('http://localhost:3000/api/product/' + this.id).then((response) => {
                    this.coin = response.body;
                    
                }, (response) => {

                });
            },

            handleClick(){
                this.$router.push({name: 'show_product', params: {id: this.id}})
            },

            refreshCoin() {
                this.getCoin();
            },
        }
    }
</script>

<style>


.card {
    border-radius: 2px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
    margin: 20px;
    width: 18rem;
    padding: 2.5rem 0.5rem 0.5rem 0.5rem;
}

.card-body{
    padding: 0.5rem;
}

.card img{
    width: 100%;
}
  
.card-title {
    font-size: 18px;
    font-weight: bold;
}
  
.card-text {
    margin-top: 2px;
    font-size: 16px;
    font-weight:800;
}
  



</style>