<template>
    <div id="show-product">
        <h3 class="product-title">{{ product.name }}</h3>
        <hr>
        <div class="container product-container">
            <div class="container text-container">
                <p>{{ product.description }}</p>
            </div>

            <div class="container content-container">

                <img :src="product.imageURL" class="product-img" alt="product" style="width: 125px; height: 125px;" />
                <p class="price mt-3">{{product.price}}$</p>

                <!--Add a button to Add To cart -->
                <button class="btn bg-dark text-white">Add To Cart</button>

            </div>
        </div>
    </div>

</template>


<script>

export default {
    
    data(){
        return {
            product:{}
        }
    },
    created(){
        this.getProduct()
    },
    methods:{
        getProduct: function()
            {
                this.$http.get('http://localhost:3000/api/product/' + this.$route.params.id).then((response) => {
                    this.product = response.body;
                }, (response) => {

                });
            },
    }
}


</script>

<style>


hr{
    max-width: 60%;
    margin-left: 0;
    margin-bottom: 25px;
    margin-top: 5px;
    border: 1px solid grey;
}


.product-title{
    font-family: 'Courier New', Courier, monospace;
    font-size: 2.5rem;
    font-weight: 600;
    margin: 0;
}

.product-container{
    padding: 2rem;
    /*border: 1px solid black;*/
    width: 100%;
    height: 100%;
}

.text-container{
    margin-left: -2%;
    
    /*border: 1px solid black;*/
    padding: 0rem 0rem 1rem 0rem;
    max-width: 60.2%;
    float: left;
    text-align: left
}

.content-container{
    /*border: 2px solid black;*/
    padding: 2rem;
    max-width: 37%;
    float: right;
    text-align: center;
}

</style>