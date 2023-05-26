<template>
    <div id="buy-from-cart">
        <h3 class="paypal-title cart-title"> Process of buying cart products</h3>

        <div class="content-cart">
            <div class="product-list-container">
                <ul v-if="cart_products.length > 0">
                    <li class="product-list-item" v-for="(product, index) in cart_products" :key="index">
                        <div class="cart-item">
                            <img :src="product.imageURL" class="coin-img-item" alt="product" />
                            <div class="cart-item-info">
                                <h4>{{ product.name }}</h4>
                                <div class="item-info-right">
                                    <span class="price mt-3 item-price"> {{ product.amount }} EUR</span>
                                    <span class="remove-button" @click="removeFromCart(product.id)">
                                        <i class="fas fa-trash"></i>
                                    </span>
                                </div>

                            </div>
                        </div>

                    </li>
                </ul>

            </div>

            <div class="container container-resume-order">
                <h3 class="order-title">ORDER RESUME</h3>
                <div class="order-product-list">
                    <ul>
                        <li class="order-product-list-item" v-for="(product, index) in cart_products" :key="index">
                            <div class="order-resume-item">
                                <span class="order-resume-item-name">{{ product.name }}</span>
                                <span class="order-resume-item-price">{{ product.amount }} EUR</span>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="order-total-amount">
                    <span class="total-amount-label">Total Amount</span>
                    <span class="total-amount-value">{{ total_amount }} EUR</span>
                </div>

                <div class="order-buttons">
                    <div class="pay-order-btn">
                        <button class="submit-btn paypal-cart-btn"  type="submit"
                            @click="handleMakeOrderCart()">Pay with PayPal</button>
                    </div>
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
            cart_products: [],
            total_amount: 0
        }
    },
    created() {
        this.cart_products = this.$store.state.cart;
        this.total_amount = this.cart_products.reduce((total, product) => total + product.amount, 0);
    },

    methods: {
        removeFromCart(id) {
            this.$store.commit('removeFromCart', id);
            this.cart_products = this.$store.state.cart;
            if (this.cart_products.length > 0)
                this.total_amount = this.cart_products.reduce((total, product) => total + product.amount, 0);
            else this.total_amount = 0;
        },

        handleMakeOrderCart() {
            const data = this.cart_products.map((item) => {
                    return {
                        amount: item.amount,
                        product_id: item.id,
                        price: item.price,
                        name: item.name,
                    };
                });

            if (this.total_amount > 0) {
                this.$http.post('http://localhost:3000/api/buy/paypal', data).then((response) => {
                    window.location.href = response.body;
                }, (response) => {

                });
            } else alert('Amount must be greather than 0!')
        },

    }
}

</script>


<style>
.content-cart {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.cart-item {
    width: 100%;
    gap: 2rem;
    align-items: center;
    display: flex;
    flex-direction: row;
}

.cart-item-info {
    width: 100%;
    display: flex;
    flex-direction: row;
}

.item-info-right {
    gap: 2rem;
    display: flex;
    align-items: center;
    margin-left: auto;
}

.cart-title {
    font-family: 'Courier New', Courier, monospace;
    font-weight: 550;
}

.product-list-item {
    max-height: 60px;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: -4rem;
    margin-bottom: 0.5rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.product-list-container {
    width: 100%;
}

.coin-img-item {
    max-width: 50px;
    max-height: 40px;
    border-radius: 50%;
    margin-right: 1rem;
}

.cart-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.item-price {
    font-size: 1.5rem;
    font-weight: 500;
}

.container-resume-order {
    border: 1px solid grey;
    max-width: 35%;
}

.order-title {
    font-family: 'Courier New', Courier, monospace;
    font-weight: 550;
    margin-top: 0.5rem;
    border-bottom: 1px solid black;
}

.order-product-list {
    width: 100%;
}

.order-product-list ul {
    padding: 0;
}

.order-product-list-item {
    padding-bottom: 0.5rem;
    list-style-type: none;
}

.order-resume-item {

    width: 100%;
    display: flex;
    flex-direction: row;
}

.order-resume-item-name {
    font-size: 1.5rem;
}

.order-product-list {
    border-bottom: 1px solid black;
}

.order-total-amount {
    padding-top: 1rem;
    display: flex;
}

.total-amount-label {
    margin-left: 0.3rem;
}

.total-amount-value {
    margin-left: auto;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
}

.order-resume-item-price {
    margin-left: auto;
    margin-right: 0.5rem;
}

.paypal-cart-btn{
    background-color: #003087;
    color: white;
    border: none;
    border-radius: 5px;
    margin-top: 5rem;
    padding: 0.5rem;
    margin-left: 1.5rem;
    margin-bottom: 3rem;
    width: 100%;
    font-size: 1.5rem;
    font-weight: 500;
    cursor: pointer;
}



@media screen and (max-width: 768px) {

    .product-list-item {
        max-width: 100%;
    }

    .content-cart {
        flex-direction: column;
    }

    .container-resume-order {
        margin-top: 3rem;
        width: 100%;
        max-width: 100%;
    }
}
</style>