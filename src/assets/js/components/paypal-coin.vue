<template>
    <!-- Create a form to make an order with input for amount with dollar unit to buy -->

    <div id="paypal">

        <h3 class="paypal-title"> Process of buying {{ product.name }}</h3>

        <div class="content">

            <div class="paypal-form">
                <h3 class="form-title">Introduce the amount and select the currency:</h3>
                <form @submit.prevent="processPayment">
                    <div class="form-group">
                        <label for="amount">Amount:</label>
                        <input type="number" id="amount" v-model.number="amount" step="0.01" min="0" required
                            v-on:change="handleCriptoAmount()">
                    </div>
                    <div class="form-group">
                        <label for="currency">Currency:</label>
                        <select id="currency" v-model="currency" required>
                            <option v-for="(option, index) in currencyOptions" :key="index" :value="option.value">
                                {{ option.label }}
                            </option>
                        </select>
                    </div>
                    <button class="submit-btn" type="submit" @click="handleMakeOrder()">Pay with PayPal</button>
                    <div class="addtocart-btn" @click="handleAddToCartClick()">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        <span class="addtocart-text">Add to cart</span>
                    </div>

                </form>
            </div>

            <div class="info-coin">

                <div class="info-coin-actual">
                    <img :src="product.imageURL" class="coin-img" alt="product" />

                    <div class="price-container">
                        <h4> Actual price of {{ product.name }}</h4>
                        <p class="price mt-3"> {{ product.price }}$</p>
                    </div>

                </div>

                <div class="order-resume">
                    <h4> Order resume</h4>
                    <p class="price mt-3"> Order price: {{ amount }} {{ currency }}</p>
                    <p class="cripto-amount">Amount of {{ product.name }}: {{ cripto_amount }} </p>

                </div>

            </div>

        </div>


    </div>
</template>


<script>

import store from './../../../store.js';
export default {
    store,
    data() {
        return {
            product: {},
            amount: 0,
            cripto_amount: 0,
            currency: 'EUR',
            currencyOptions: [
                { label: 'Euro (EUR)', value: 'EUR' },
                { label: 'Dólar estadounidense (USD)', value: 'USD' },
                { label: 'Peso mexicano (MXN)', value: 'MXN' },
                { label: 'Libra esterlina (GBP)', value: 'GBP' },
                { label: 'Dólar australiano (AUD)', value: 'AUD' },
                { label: 'Dólar canadiense (CAD)', value: 'CAD' },
                { label: 'Franco suizo (CHF)', value: 'CHF' },
                { label: 'Yuan chino (CNY)', value: 'CNY' },
                { label: 'Yen japonés (JPY)', value: 'JPY' },
                { label: 'Rublo ruso (RUB)', value: 'RUB' }
            ]
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

        handleCriptoAmount() {
            if (this.amount > 0)
                this.cripto_amount = this.amount / this.product.price;
        },

        handleMakeOrder() {
            
            const data =
                [{
                    amount: this.amount,
                    product_id: this.product.id,
                    name: this.product.name,
                    price: this.product.price
                }];

                
            if (this.amount > 0) {
                this.$http.post('http://localhost:3000/api/buy/paypal', data).then((response) => {
                    
                    window.location.href = response.body;
                }, (response) => {

                });
            } else alert('Amount must be greather than 0!')
        },

        handleAddToCartClick() {
            if (this.amount > 0) {
                let order = {
                    price: this.product.price,
                    id: this.product.id,
                    name: this.product.name,
                    amount: this.amount,
                    currency: this.currency,
                    imageURL: this.product.imageURL,
                };
                this.$store.commit('addToCart', order);
                console.log(this.$store.state.cart);

            } else {
                alert('Amount must be greater than 0!');
            }
        }

    }

}

</script>

<style>
#paypal {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    border: 1px solid #b0b0b0;
    padding: 1rem;
    border-radius: 0.2cm;
}

.content {
    display: flex;
}

.paypal-title {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid black;
    font-size: 2.75rem;
}

.info-coin {
    padding: 4rem 0rem 0rem 0rem;
}

.info-coin-actual {
    padding: 2rem 0rem 0rem 0rem;
    margin-left: 2rem;
    display: flex;
    border-bottom: 1px solid black;
}

.price-container {
    padding: 2rem;
}

.price-container h4 {
    font-size: 2rem;
    font-weight: bold;
}

.price-container p {
    font-weight: bold;
    font-size: 1.75rem;
}

.order-resume {
    margin-left: 2rem;
    padding-top: 1rem;
}

.order-resume p {
    font-size: 1.75rem;
}

.coin-img {
    width: 10rem;
    height: 10rem;
}

.paypal-form {
    width: 70%;
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
}

.form-title {
    margin-left: 2rem;
}

form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #f5f5f5;
}

.form-group {
    margin-bottom: 20px;
    width: 100%;
    max-width: 350px;
}

.form-group label {
    font-size: 1.5rem;
    display: block;
    margin-bottom: 10px;
}

input[type="number"],
select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
}

.submit-btn {
    font-family: Arial;
    font-weight: 540;
    height: 3.5rem;
    max-height: 35px;
    max-width: 350px;
    border-radius: 0.2cm;
    color: #fff;
    border-color: #232323;
    background: #0a60a5;
}

.submit-btn:hover {
    background: #094f88;
    outline: none;
}

.addtocart-btn {
    outline: none;
    margin-top: 1.2rem;
    background-color: #cbe149;
    height: 3.5rem;
    margin-top: 1rem;
    max-width: 350px;
    max-height: 35px;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.fa-shopping-cart {
    font-weight: bold;
    font-size: 1.5rem;
    padding-right: 1rem;
    color: rgb(0, 0, 0);
}

.addtocart-text {
    font-family: Arial;
    font-weight: bold;
}

.addtocart-btn:hover {
    background: #b3c741;
    outline: none;
}

/* Media queries */

@media screen and (max-width: 768px) {
    .content {
        display: block;
    }

    .info-coin {
        padding: 0rem;
    }

    .info-coin-actual {
        font-size: 1.25rem;
    }

    .order-resume p {
        font-size: 1.5rem;
    }

    .form-title {
        margin: 0;
        padding-bottom: 1rem;
        font-size: 1.75rem;
    }

    form {
        padding: 0rem;
    }

    .coin-img {
        width: 5rem;
        height: 5rem;
    }

    .price-container {
        padding-left: 1rem;
        padding-top: 0rem;
        margin-top: -0.5rem;
    }

    .price-container h4 {
        font-size: 1.5rem;
    }

    .price-container p {
        font-size: 1.5rem;
    }

    .paypal-title {
        font-size: 2rem;
    }
}

@media screen and (min-width: 1500px) {
    .info-coin {
        padding-right: 5rem;
    }
}
</style>