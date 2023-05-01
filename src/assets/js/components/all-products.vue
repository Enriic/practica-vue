<template>
    <div id="all-products">

      <!-- <div class="container container-filter">
        <h3>Filtrar por:</h3>
        
        <div class="filter-group">
          <h4>Categoría</h4>
          <ul>
            <li><input type="checkbox" id="category1"><label for="category1">Categoría 1</label></li>
            <li><input type="checkbox" id="category2"><label for="category2">Categoría 2</label></li>
            <li><input type="checkbox" id="category3"><label for="category3">Categoría 3</label></li>
            <li><input type="checkbox" id="category4"><label for="category4">Categoría 4</label></li>
          </ul>
        </div>
        
       
        
        <button class="btn btn-primary btn-block mt-4">Aplicar filtros</button>
      </div> -->

      <div class="container container-cripto">
        <div class="row">
          <div class="col-md-4 col-sm-6 col-lg-3" v-for="id in productsid">
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

    
</style>