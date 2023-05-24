<template>
    <div id="show-product">
        <div class="container container-showproduct">
            <h3 class="product-title">{{ product.name }}</h3>
            <hr>
            <div class="container product-container">
                <div class="container text-container">
                    <p>{{ product.description }}</p>
                </div>

                <div class="container content-container">
                    <img :src="product.imageURL" class="product-img" alt="product" />
                    <p class="coin-price">{{ product.price }}$</p>

                    <!--Add a button to Add To cart -->
                    <div class="coin-buy-container" v-on:click="handleBuyClick()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-paypal" viewBox="0 0 16 16">
                            <path
                                d="M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.7.7 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l-.202 1.28a.628.628 0 0 0 .62.726H8.14c.429 0 .793-.31.862-.731l.025-.13.48-3.043.03-.164.001-.007a.351.351 0 0 1 .348-.297h.38c1.266 0 2.425-.256 3.345-.91.379-.27.712-.603.993-1.005a4.942 4.942 0 0 0 .88-2.195c.242-1.246.13-2.356-.57-3.154a2.687 2.687 0 0 0-.76-.59l-.094-.061ZM6.543 8.82a.695.695 0 0 1 .321-.079H8.3c2.82 0 5.027-1.144 5.672-4.456l.003-.016c.217.124.4.27.548.438.546.623.679 1.535.45 2.71-.272 1.397-.866 2.307-1.663 2.874-.802.57-1.842.815-3.043.815h-.38a.873.873 0 0 0-.863.734l-.03.164-.48 3.043-.024.13-.001.004a.352.352 0 0 1-.348.296H5.595a.106.106 0 0 1-.105-.123l.208-1.32.845-5.214Z" />
                        </svg>
                        <button class="btn btn-buy-coin">Buy with PayPal</button>
                    </div>

                    <div class="addtocart-btn-container" v-on:click="handleBuyClick()">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        <span class="addtocart-text">Add to cart</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>

export default {

    data() {
        return {
            product: {}
        }
    },
    created() {
        this.getProduct()
    },
    methods: {
        getProduct: function () {
            this.$http.get('http://localhost:3000/api/product/' + this.$route.params.id).then((response) => {
                this.product = response.body;
            }, (response) => {

            });
        },

        handleBuyClick: function () {
            this.$router.push({ name: "paypal-coin", params: {id: this.$route.params.id} });
        }
    }
}


</script>

<style>
hr {
    max-width: 60%;
    margin-left: -1.2rem;
    margin-bottom: 25px;
    margin-top: 5px;
    border: 1px solid grey;
}

.product-title {
    font-family: 'Courier New', Courier, monospace;
    font-size: 2.5rem;
    font-weight: 600;
    margin: 0;
    margin-left: -1.2rem;
}

.product-container {
    padding: 2rem;
    width: 100%;
    height: 100%;
}

.text-container {
    margin-left: -2%;
    padding: 0rem 0rem 1rem 0rem;
    max-width: 60.2%;
    line-height: 2.2rem;
    font-size: 1.5rem;
    float: left;
    text-align: left;
    white-space: break-spaces;
}

.content-container {
    border: 1px solid rgb(172, 171, 171);
    border-radius: 1rem;
    padding: 2rem;
    max-width: 37%;
    float: right;
    text-align: center;
}

.container-showproduct {
    width: 100%;
    margin: 2rem;
}

.coin-buy-container {
    outline: none;
    padding: 0.5rem;
    margin-left: 7rem;
    margin-right: 7rem;
    background-color: #3653b5;
    max-width: 100%;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.bi-paypal {
    color: #d9cccc;
}

.coin-buy-container:hover {
    background-color: #2a3f8a;
    outline: none;
}

.btn-buy-coin:hover {
    color: rgb(255, 253, 253);
    outline: none;
}

.btn-buy-coin:focus {
    color: rgb(255, 253, 253);
    outline: none;
}

.btn-buy-coin {
    font-family: Arial;
    background: none;
    outline: none;
    color: rgb(255, 253, 253);
    font-weight: 600;
}

.coin-price {
    font-size: 2.2rem;
    font-weight: 600;
    padding: 2rem;
}

.product-img {
    width: 13rem;
    height: 13rem;
}

.addtocart-btn-container{
    outline: none;
    margin-top: 1.2rem;
    background-color: #cbe149;
    height: 3.5rem;
    margin-left: 7rem;
    margin-right: 7rem;
    max-width: 100%;
    border-radius: 1rem;
    display:flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.fa-shopping-cart{
    font-weight: bold;
    font-size: 1.5rem;
    padding-right: 1rem;
    color: rgb(0, 0, 0);
}

.addtocart-text{
    font-family: Arial;
    font-weight: bold;
}

.addtocart-btn-container:hover{
    background: #b3c741;
    outline: none;
}

.addtocart-btn-container:focus{
    outline: none;
}






/*Media Queries*/

@media screen and (max-width: 1080px) {
    .product-container {
        width: 100%;
        flex-direction: column;
        display: flex;
    }

    .text-container {
        max-width: 100%;
        margin-left: 0;
        margin-bottom: 2rem;
    }

    .product-title {
        margin-left: 0;
    }

    .content-container {
        max-width: 50%;
        margin-left: 0;
        margin-bottom: 2rem;
    }

    .coin-buy-container {
        margin-left: 0;
        margin-right: 0;
    }

    .product-img {
        width: 10rem;
        height: 10rem;
    }

    

}

@media screen and (max-width: 768px) {

    .product-container {
        width: 100%;
        flex-direction: column;
        display: flex;
    }

    .text-container {
        max-width: 100%;
        margin-left: 0;
        margin-bottom: 2rem;
    }

    .product-title {
        margin-left: 0;
    }

    .content-container {
        max-width: 100%;
        margin-left: 0;
        margin-bottom: 2rem;
    }

    .coin-buy-container {
        margin-left: 0;
        margin-right: 0;
    }

    .product-img {
        width: 8rem;
        height: 8rem;
    }

    .coin-price {
        font-size: 1.75rem;
    }

    .btn-buy-coin {
        font-size: 1.25rem;
    }
}
</style>