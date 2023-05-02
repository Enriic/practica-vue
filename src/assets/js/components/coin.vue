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
                <button class="btn bg-dark text-white flip-btn" id="getInfoBtn" ref="btn" @click.stop="flipCard()">See transactions</button>
            </div>

            <div class="card-back">
                <h4 class="card-title mb-3">Last Transaction</h4>
                <div class="card-body" v-if="transactions.length > 0 && (flipped = true)">
                    <p class="price mt-3"> Order price:</p>
                    <p class="price mt-3"> {{ transactions[0].crypto_price }}$</p>
                    <p class="price mt-3"> Order timestamp:</p>
                    <p class="price mt-3"> {{ transactions[0].timestamp }}</p>
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
            transactions: [],
            flipped: false,
        };
    },
    created() {
        this.getCoin();
        this.getTransactions();
        setInterval(this.refreshCoin, 10000); // refresh every 10 seconds
    },
    methods: {
        getCoin() {
            this.$http
                .get("http://localhost:3000/api/product/" + this.id)
                .then(
                    (response) => {
                        this.coin = response.body;
                    },
                    (response) => { }
                );
        },

        getTransactions() {
            this.$http
                .get("http://localhost:3000/api/transaction/" + this.id)
                .then(
                    (response) => {
                        this.transactions = response.body;
                        this.transactions.sort(function (a, b) {
                            return b.date - a.date;
                        });
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
            
            cardCoin.classList.toggle("is-flipped");
            
        },

    },
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

.card-back .card-body{
    font-size: 1.3rem;
}
.card-coin div{
    position: absolute;
    width: 100%;
    backface-visibility: hidden;
    transition: 0.5s;
}

.btn-container{
    position: absolute;
    bottom: 0;
    margin-bottom: 0.5rem;
    width: 100%;
    padding: 0.5rem;
}


.flip-btn:focus{
    outline: none;
}

/* Media Queries */

@media (max-width: 768px) {
   .card-coin{
    width: 15rem;
    height: 19rem;
   }  
   
   .card-back .card-title{
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: -1rem;
    }

    .card-back .card-body{
        font-size: 1.1rem;
    }

}

</style>