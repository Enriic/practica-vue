<template>
  <nav class="navbar">
    <div class="container container-navbar">
      <router-link :to="{ name: 'all_products' }" class="navbar-brand">LOGO</router-link>
      <ul class="navbar-nav">

        <li class="nav-item" v-for="(item, index) in navItems" :key="index" v-on:click="handleNavItemClick()">
          <router-link :to="{ name: 'all_products' }" class="nav-link">{{ item.text }}</router-link>
        </li>

      </ul>

      <div class="search">
        <span v-on:click="handleSpanClick()">
          <i class="fas fa-search"></i>
        </span>

        <div :class="{ 'search-bar-container': true, 'search-bar-container--active': showSearchBar }">
          <input type="text" placeholder="Search" v-model="searchTerm" />
          <ul v-if="items.length > 0" class="search-results">
            <li v-for="(item, index) in items" :key="index">
              <div class="search-result-item" @click="handleClick(item.id)">
                <div class="search-result-img">
                  <img :src="item.imageURL" alt="Product image" class="result-img" />
                </div>
                <div class="search-result-name">{{ item.name }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="nav-item cart" @mouseover="showCartItems = true" @mouseleave="showCartItems = false" @click="handleCartClick()">
        <i class="fa fa-shopping-cart" aria-hidden="true" ></i>
        <div class="cart-popup" v-if="showCartItems" @mouseover="showCartItems = true">
          <h4>Your Cart</h4>
          <ul>
            <li v-for="(product,i) in cartItems" :key="i" class="cart-item">
              <div class="item-info">
                <div class="item-details">
                  <h5>{{ product.name }}</h5>
                  <span class="item-price">{{ product.amount }} EUR</span>
                </div>
                <span class="remove-button" @click="removeFromCart(product.id)">
                  <i class="fas fa-trash"></i>
                </span>
              </div>
            </li>
          </ul>
          <div v-if="cartItems.length === 0" class="empty-cart">
            Your cart is empty.
          </div>
        </div>
      </div>



      <span class="toggle-span" v-on:click="handleSideBarClick()">
        <i class="fas fa-bars"></i>
      </span>

      <div :class="{ 'sidebar': true, 'sidebar--active': showSidebar }">
        <ul class="sidebar-menu">
          <li class="nav-item" v-for="(item, index) in navItems" :key="index" v-on:click="handleNavItemClick()">
            <router-link :to="{ name: 'all_products' }" class="nav-link">{{ item.text }}</router-link>
          </li>
        </ul>
      </div>


    </div>
  </nav>

  <!-- Set toogle nav with items -->
</template>

<script>

import store from './../../../store.js';

export default {
  name: 'navbar',
  store,
  data() {
    return {
      navItems: [
        { text: 'Home', link: '#' },
        { text: 'About', link: '#' },
        { text: 'Contact', link: '#' },
      ],
      searchTerm: '',
      items: [],
      showSearchBar: true,
      showSidebar: false,
      showCartItems: false,
      cartItems: [],
    };
  },
  created() {
    this.cartItems = this.$store.state.cart
  },
  watch: {
    searchTerm(newVal) {
      this.searchProducts(newVal)
    }
  },
  methods: {
    searchProducts(productSearch) {
      if (productSearch == '') {
        this.items = []
        return
      }
      this.items = []
      this.$http.get('http://localhost:3000/api/products')
        .then(response => {
          response.body.forEach(element => {
            if (element.name.toLowerCase().includes(productSearch.toLowerCase())) {
              this.items.push(element)
            }
          });
        })
    },
    handleClick(id) {
      this.$router.push({ name: 'show_product', params: { id: id } })
    },
    handleSpanClick() {
      this.showSearchBar = !this.showSearchBar
      const input = document.querySelector('input')
      if (this.showSearchBar) {
        input.focus()
      } else {
        input.blur()
      }
    },
    handleSideBarClick() {
      this.showSidebar = !this.showSidebar
    },
    handleNavItemClick() {
      this.showSidebar = false
    },
    removeFromCart(id) {
      this.$store.commit('removeFromCart', id)
      this.cartItems = this.$store.state.cart
    },
    handleCartClick() {
      this.$router.push({ name: 'buy_from_cart' })
    }
    

  }
};
</script>

<style>

/* Navbar */

.container-navbar {
  display: flex;
  margin: 0rem;
  width: 100%;
  padding: 1.5rem;
}

.container-navbar ul li {
  list-style: none;
}

.container-navbar ul li a {
  position: relative;
  font-family: system-ui, 'Open Sans', 'Helvetica Neue', sans-serif;
  text-decoration: none;
  color: #2c2c2c;
  font-weight: bold;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}

.navbar {
  margin: -2.7rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  gap: 2rem;
}

.navbar-nav {
  width: 100%;
  display: flex;
  margin-left: 0rem;
  padding: 0;
  list-style: none;
}

.nav-item {
  margin: 1.5rem 2rem 0rem 3rem;
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
  color: #333;
  text-decoration: none;
  font-size: 2rem;
  letter-spacing: 0.2rem;
}

.navbar-brand:hover {
  color: #000000;
}


/* Search */

.search {
  position: relative;
  display: flex;
  width: 200%;
}

.fa-search {
  margin-top: 2rem;
  position: relative;
  color: #000000;
  font-size: 1.5rem;
}

.fa-search:hover {
  cursor: pointer;
  font-size: 1.75rem;
}

.search-bar-container {
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
  margin: 1rem 1.5rem;
}

.search-bar-container--active {
  transform: scaleX(1);
  transition: transform 0.3s ease-in-out;
  z-index: 2;
  width: 40%;
  height: 100%;
  position: relative;
}

input {
  border: none;
  background: none;
  width: 100%;
  font-size: 1.8rem;
  padding-left: 1rem;
  text-transform: uppercase;
  border-bottom: 2px solid black;
}

input:focus {
  outline: none;
}


/* Search Results */

.search-results {
  position: absolute;
  width: 100%;
  margin: 0;
  margin-top: 0.75rem;
  padding: 0;
  list-style: none;
  border: 1px solid #090909;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Search Result Item */

.search-result-item {
  display: flex;
  align-items: center;
  background-color: #f6f6f6;
  padding: 1rem;
  border-bottom: 1px solid #cecece;
  cursor: pointer;
}

.search-result-item:hover {
  background-color: #e9e9e9;
}

.search-result-img {
  margin-right: 1.3rem;
  max-width: 3rem;
  max-height: 3rem;
}

.search-result-name {
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 3rem;
}

.result-img {
  width: 100%;
  height: 100%;
}

/* Toogle Icon*/

.fa-bars {
  position: relative;
  display: none;
}

.fa-bars:hover {
  cursor: pointer;
  font-size: 2.25rem;
}

/* SideBar */

.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  max-width: 350px;
  height: 100%;
  transform: translateX(-100%);
  background-color: #f5f5f5;
  z-index: 1;
}

.sidebar-menu {
  padding-top: 1rem;
}

.sidebar-menu .nav-item {
  padding-bottom: 1rem;
}

.fa-shopping-cart {
  transition: all 0.2s ease-in-out;
  margin-right: 0.5rem;
}

.fa-shopping-cart:hover {
  cursor: pointer;
  transform: scale(1.3);
}

/* PopUp Cart */

.cart{
  display: flex;
  flex-direction: column;
}

.cart-popup {
  border-radius: 0.2cm;
  margin-top: 2rem;
  position: absolute;
  top: 20;
  right: 6%;
  width: 100%;
  max-width: 300px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 10;
}

.item-details {
  display: flex;
  gap: 3rem;
  align-items: center;
  float: left;
  margin-bottom: 1rem;
}

.item-info{
  margin-bottom: 1px solid black;
}

.remove-button {
  align-items: center;
  margin-right: 1rem;
  float: right;
  margin-left: 1rem;
  font-size: 1.5rem;
  color: #000000;
}


/* Media Queries */

@media screen and (max-width: 768px) {

  .container-navbar {
    flex-direction: row;
    align-items: center;
  }

  .navbar-nav {
    position: absolute;
    margin-left: 0;
    gap: 1.5rem;
    display: none;
  }

  .fa-bars {
    display: flex;
    font-size: 2rem;
    position: relative;
    margin-left: 1rem;
    margin-top: 1rem;
  }

  .nav-item {
    margin: 1.5rem 0rem 0rem 0rem;
  }

  .search {
    margin-bottom: 1rem;
    position: relative;
    width: 70%;
    gap: 0rem;
  }

  .fa-search {
    position: absolute;
    display: none;
  }

  .search-bar-container {
    width: 100%;
    position: absolute;
  }

  .search-results {
    width: 100%;
  }

  .search-bar-container--active {
    width: 100%;
    position: relative;
  }

  .nav-container {
    transform: scaleX(1);
  }

  .sidebar {
    display: none;
  }

  .sidebar--active {
    font-size: 1rem;
    margin-left: -2rem;
    padding-right: 1rem;
    display: flex;
    margin-top: 10rem;
    position: fixed;
    transform: translateX(0);
    transition: transform 0.3s ease-in-out;
    z-index: 2;
    border-top: 2px solid grey;
    border-right: 2px solid grey;
  }

}
</style>
