<template>
    <div id="all-products">
      <h1 class="text-center mb-5">All Products</h1>
  
      <div class="d-flex justify-content-end mb-3">
        <router-link :to="{ name: 'create_product' }" class="btn btn-primary">Create Product</router-link>
      </div>
  
      <div class="form-group mb-3">
        <input type="text" name="search" v-model="productSearch" placeholder="Search products" class="form-control" v-on:keyup="searchProducts">
      </div>
  
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
          productSearch: ''
        }
      },
  
      created() {
        this.fetchProductData();
      },
  
      methods: {
        fetchProductData() {
          this.$http.get('http://localhost:3000/api/products').then((response) => {
            this.products = response.body;
            this.originalProducts = this.products;
          }, (response) => {
  
          });
        },
  
        searchProducts() {
          if(this.productSearch == '') {
            this.products = this.originalProducts;
            return;
          }
  
          var searchedProducts = [];
          for(var i = 0; i < this.originalProducts.length; i++) {
            var productName = this.originalProducts[i]['name'].toLowerCase();
            if(productName.indexOf(this.productSearch.toLowerCase()) >= 0) {
              searchedProducts.push(this.originalProducts[i]);
            }
          }
  
          this.products = searchedProducts;
        }
      }
    }
  </script>
  
<style>
    @import url('../../css/style.css');
</style>