<template>
    <div id="all-products">
  
      <div class="container container-cripto">
        <div class="col-md-4 mb-4" v-for="product in products">
            <div class="card text-center" >
                <img class="card-img-top" :src="product.imageURL" alt="product" style="width: 75px; height: 75px;" /> 
                <div class="card-body">
                    <h3 class="card-title">{{product.name}}</h3>
                    <p class="price mt-3">{{product.price}}</p>    
                    <button class="btn bg-dark text-white">Get Info</button>
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
          products: [],
          originalProducts: [],
        }
      },
      
      created() {
        this.fetchProductData();
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
        fetchProductData() {
          this.$http.get('http://localhost:3000/api/products').then((response) => {
            this.products = response.body;
            this.originalProducts = this.products;
          }, (response) => {
  
          });
        },
        
        searchProducts(productSearch) {
          console.log('Listening')
          if (productSearch === '') {
            // Si no hay texto de búsqueda, mostrar todos los productos
            this.products = this.originalProducts;
          } else {
            // Filtrar la lista original de productos por el texto de búsqueda
            this.products = this.originalProducts.filter(product => {
              return product.name.toLowerCase().includes(productSearch.toLowerCase());
            });
          }
        }
      },
      
    }
  </script>
  
<style>
    @import url('../../css/style.css');
</style>