<template>
    <nav class="navbar">
      <div class="container container-navbar">
       <router-link :to="{ name: 'all_products' }" class="navbar-brand">My Website</router-link>
          <div class="search-bar-container">
            <input type="text" class="form-control" placeholder='Search' v-model="searchTerm">
            <ul v-if="items.length > 0" class="search-results">
              <li v-for="(item, index) in items" :key="index">
                <div class="search-result-item" @click="handleClick(item.id)">
                  <div class="search-result-img">
                    <img :src="item.imageURL" alt="Product image" class="result-img">
                  </div> 
                  <div class="search-result-name">
                    {{ item.name }}
                  </div>
                </div>              
              </li>
            </ul>
          </div>
                  
        <ul class="navbar-nav">
          <li class="nav-item" v-for="(item, index) in navItems" :key="index">
            <a class="nav-link" :href="item.link">{{ item.text }}</a>
          </li>
        </ul> 
      </div>
    </nav>
  </template>
  
<script>
    export default {
      name: 'navbar',
      data() {
        return {
          navItems: [
            { text: 'Home', link: '#' },
            { text: 'About', link: '#' },
            { text: 'Contact', link: '#' },
          ],
          searchTerm:'',
          items:[],
          itemsid:[]
        };
      },
      watch: {
        searchTerm(newVal){
            this.$root.$emit('search',newVal)
            console.log('Emited '+newVal)
            
            this.searchProducts(newVal)
        }
      },
      methods:{
        searchProducts(productSearch) {
          if(productSearch == ''){
            this.items = []
            return
          }
          this.items = []
          this.$http.get('http://localhost:3000/api/products')
          .then(response => {
            response.body.forEach(element => {
              if(element.name.toLowerCase().includes(productSearch.toLowerCase())){
                this.items.push(element)
              }
            });
          })
        },
        handleClick(id){
          this.$router.push({name: 'show_product', params: {id: id}})
        },

      }
    };
</script>
  
<style>

  .container-navbar{
      display: inline-flex;
      margin: 0rem;
      padding: 0.4rem;
      border: 2px green solid;
  }

  .navbar {
    display: block;
    justify-content: space-between;
    align-items: center;
    font-weight: 400;
    margin: -2.7rem;
    background-color: #dfdfdf;
    padding: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 2px black solid;
  }

  .navbar-nav {
    display: flex;
    margin: 0;
    margin-left: 3rem;
    padding: 0;
    list-style: none;
  }

  .nav-item {
    margin: 1.5rem 2rem 0rem 3.5rem;
  }

  .nav-link {
    color: #333;
    text-decoration: none;
    font-weight: bold;
  }

  .nav-link:hover {
    text-decoration: underline;
  }

  .navbar-brand {
    font-weight: bold;
  }
  
  .search-form {
      width: 30%;
  }

  @media only screen and (max-width: 768px) {
        .search-form {
            width: 100%;
            margin: 0;
        }
    }
  
  .search-bar-container {
    position: relative;
    width: 25%;
    margin: 1rem 2rem 0rem 2.2rem;
    /* border: #333 solid 2px; */
  }

  .form-control {
    /* border: green solid 2px; */
    width: 100%;
    font-weight: 600;
  }

  .search-results {
    /* Ajustar el tamaño, la posición y el estilo según sea necesario */
    position: absolute;
    top: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    background-color: #efeeef;
    border: 1px #f2f4f5;
    border-radius: 0.25rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 9999;
  }

  .search-result-item {
    /* Ajustar el estilo según sea necesario */
    display: flex;
    align-items: center;
    padding: 1rem;
    border: 1px solid #f2f4f5;
    cursor: pointer;
  }

  .search-result-item:hover {
    /* Ajustar el estilo según sea necesario */
    background-color: #f8f9fa;
  }

  .search-result-img {
    /* Ajustar el tamaño y el margen según sea necesario */
    margin-right: 1.3rem;
    max-width: 3rem;
    max-height: 3rem;
  }

  .search-result-name {
    /* Ajustar el estilo según sea necesario */
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 3rem;
  }

  .result-img{
    width: 100%;
    height: 100%;
  }

</style>
  