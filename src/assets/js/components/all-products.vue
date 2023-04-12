<template>
    <div id="all-products">
      <div class="container container-cripto">
        <div class="col-md-4 mb-4" v-for="id in productsid">
            <coin :id="id"></coin>
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
    
</style>