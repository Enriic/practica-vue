<template>
    <div id="all-products">
      <div class="container container-cripto">
        <div class="row">
          <div class="col-md-4 col-sm-6 col-lg-3 col-xs-6" v-for="id in productsid">
              <coin :id="id"></coin>
          </div>
        </div>
      </div>
    </div>
</template>
  
 <script>
    export default {

      data() {
        return {
          productsid: []
        }
      },
      
      created() {
        this.fetchProductIdData();
        this.setInterval(this.fetchProductIdData, 10000);
      },
      mounted() {
        console.log('Mounted')
        this.$root.$on('search', this.searchProducts);
      },
      beforeDestroy() {
        console.log('Destroying')
        this.$root.$off('search', this.searchProducts)
      },
      
      methods: {

        fetchProductIdData() {
          this.$http.get('http://localhost:3000/api/productsid').then((response) => {
            this.productsid = response.body;
          }, (response) => {
  
          });
        },
      },
      
    }
</script>
  
<style>
    .row{
      margin-right: -7rem;
    }

    .container-cripto{
      float: right;
      width: 83%;
      border-left: 2px rgb(225, 224, 224) solid;
      padding: 1.5rem;
      padding-top: 0rem;
    }

    .container-filter{
      padding: 1rem;
      float: left;
      width: 15%;
      /* border: 2px rgb(0, 4, 255) solid;*/
    } 


    /* Media queries */

    

    
</style>