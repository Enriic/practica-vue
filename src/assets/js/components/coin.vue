<template>
    <div id="coin">
        <div class="card card-coin" ref="card" @click="handleClick">
            <div class="card-front">
                <img class="card-img-top" :src="coin.imageURL" alt="product" style="width: 75px; height: 75px;" />
                <div class="card-body">
                    <h3 class="card-title">{{ coin.name }}</h3>
                    <p class="price mt-3">{{ coin.price }}$</p>
                </div>
            </div>

            <div class="btn-container" id="btn-info">
                <button class="btn bg-dark text-white flip-btn" id="getInfoBtn" ref="btn" @click.stop="flipCard()">See
                    transactions</button>
            </div>

            <div class="card-back">
                <h4 class="card-title mb-3">Last Transaction</h4>
                <div class="card-body" v-if="coin.last_transaction && (flipped = true)">
                    <!-- <p class="price mt-3"> Order price:</p> -->
                    <p class="price mt-3"> {{ coin.last_transaction.total_amount }}$</p>
                    <!-- <p class="price mt-3"> Order timestamp:</p> -->
                    <p class="price mt-3"> {{ coin.last_transaction.order_timestamp }}</p>
                </div>
                <div v-else>
                    <p class="card-text">No transactions yet.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["id"],
    data() {
        return {
            coin: {},
            flipped: false,
        };
    },
    created() {
        this.getCoin();
        setInterval(this.refreshCoin, 10000); // refresh every 10 seconds
    },
   
    methods: {
        getCoin() {
            this.$http
                .get("http://localhost:3000/api/product/" + this.id)
                .then(
                    (response) => {
                        this.coin = response.body;
                        //console.log(this.coin.last_transaction.order_timestamp);
                        if(this.coin.last_transaction)
                        this.coin.last_transaction.order_timestamp = new Date(this.coin.last_transaction.order_timestamp).toLocaleString();
                    },
                    (response) => { }
                );
        },

        handleClick() {
            this.$router.push({ name: "show_product", params: { id: this.id } });
        },

        refreshCoin() {
            this.getCoin();
        },

        flipCard() {
            this.flipped = !this.flipped;
            const cardCoin = this.$refs.card;
            cardCoin.classList.toggle("is-flipped")
        },

    }
};
</script>

<style>
.card-coin {
    position: relative;
    text-align: center;
    border-radius: 2px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
    margin-top: 3rem;
    width: 18rem;
    height: 23rem;
    padding: 2.5rem 0.5rem 0.5rem 0.5rem;
    cursor: pointer;
    z-index: 1;
}

.card-body {
    padding: 0.5rem;
    overflow: hidden;
}

.card img {
    width: 100%;
}

.card-title {
    font-size: 1.7rem;
    font-weight: bold;
}

.card-text {
    margin-top: 2px;
    font-size: 1.1rem;
    font-weight: 800;
}

.card-coin.is-flipped .card-front {
    transform: rotateY(-180deg);
}

.card-coin.is-flipped .card-back {
    transform: rotateY(0deg);
}

.card-front {
    transform: rotateY(0deg);
}

.card-back {
    transform: rotateY(180deg);
}

.card-back .card-body {
    font-size: 1.3rem;
}

.card-coin div {
    position: absolute;
    width: 100%;
    backface-visibility: hidden;
    transition: 0.5s;
}

.btn-container {
    position: relative;
    bottom: 0;
    margin-bottom: 0.5rem;
    width: 100%;
    padding: 0.5rem;
}


.flip-btn:focus {
    outline: none;
}

/* Media Queries */

@media screen and (max-width: 768px) {
    .card-coin {
        width: 10rem;
        height: 14rem;
    }

    .card-back {
        font-size: 0.8rem;
        font-weight: normal;
        margin-top: -1.5rem;
    }

    .card-title {
        margin-top: 0rem;
        font-size: 1.2rem;
    }

    .card-text{
        font-size: 0.8rem;
    }

    .btn-container{
        padding: 0.2rem;
    }

    .card-back .card-body {
        font-size: 1rem;
    }
    
    .card-img-top {
        margin-top: 0.5rem;
        max-width: 4rem;
        max-height: 4rem;
    }

    .btn-container{
        width: 80%;
        position: relative;
    }

    #getInfoBtn{
        padding: 0.4rem;
        margin-right: 0.5rem;
        font-size: 0.95rem;
    }

    .card-front{
        margin-top: -1.75rem;
    }

    .card-body > p{
        font-size: 1rem;
    }

}
</style>