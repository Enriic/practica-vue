<template>
  <div id="all-products">

    <div class="container container-cripto">
      <select id="order-select" v-model="selectedOrder" @change="handleOrderChange()">
        <option class="option-order" value="desc" >Descending</option>
        <option class="option-order" value="asc" >Ascending</option>
      </select>
      <div class="row" v-if="productsid.length > 0">
        <div class="col-md-4 col-sm-6 col-lg-3 col-xs-6" v-for="id in productsid" :key="id">
          <coin ref='coinComponent' :id="id"></coin>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import Coin from './coin.vue';

export default {
  components: {
    Coin
  },
  data() {
    return {
      productsid: [],
      selectedOrder: 'desc'  // Ordre per defecte
    };
  },

  created() {
    this.fetchProductIdData();
    setInterval(this.fetchProductIdData, 10000);
  },

  methods: {
    fetchProductIdData() {
      this.$http
        .get('http://localhost:3000/api/productsid', {
          params: { order: this.selectedOrder }   // Ordre seleccionat per l'usuari
        })
        .then(
          (response) => {
            this.productsid = response.body;
          },
          (response) => {
            console.log('Error: ' + response);
          }
        );
    },

    //PREGUNTAR PROFE PERQUE NO S'EXECUTA EL METODE DEL COMPONENT COIN
    handleOrderChange() {
      this.fetchProductIdData();
    },

    
  }
};
</script>


<style>
.row {
  margin-right: -7rem;
}

#order-select {
  max-width: 150px;
  width: 70%;
  margin-bottom: 1rem;
}

.container-cripto {
  float: right;
  width: 83%;
  border-left: 2px rgb(225, 224, 224) solid;
  padding: 1.5rem;
  padding-top: 0rem;
}

.container-filter {
  padding: 1rem;
  float: left;
  width: 15%;
}

/*Media queries*/
@media screen and (max-width: 768px) {
  .container-cripto {
    width: 100%;
    border-left: none;
    border-top: 2px rgb(225, 224, 224) solid;
  }

  #order-select{
    margin-top: 1rem;
    max-height: 35px;
    width: 70%;
    font-size: 1.15rem;
  }

  .option-order{
    font-size: 1rem;
  }

}
</style>