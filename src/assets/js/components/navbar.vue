<template>
    <nav class="navbar">
      <div class="container container-navbar">
        <a class="navbar-brand" href="#">My Website</a>
        <form class="search-form">
          <input type="text" class="form-control" placeholder='Search' v-model="searchTerm">
        </form>
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
          searchTerm:''
        };
      },
      watch: {
        searchTerm(newVal){
            this.$root.$emit('search',newVal)
            console.log('Emited '+newVal)
        }
      }
    };
</script>
  
  <style>

    .container-navbar{
        display: inline-flex;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 400;
      background-color: #ffffff;
      padding: 1rem;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
      display: flex;
      align-items: center;
      width: 30%;
    }

    @media only screen and (max-width: 768px) {
        .search-form {
            width: 100%;
            margin: 0;
        }
    }
  
    .form-control {
      margin: 0rem 0.5rem 0rem 2rem;
      margin-right: 0.5rem;
      margin-left: 2rem;
    }

  </style>
  