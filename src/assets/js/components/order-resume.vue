<template>

<div id="order-resume">
    <p>HOLA</p>
</div>


</template>

<script>

export default {
  data() {
    return {
      order: {}
    };
  },
  created() {
    this.getOrder();
  },
  methods: {
    getOrder: function () {
      this.$http.get('http://localhost:3000/api/transaction/' + this.$route.params.order_paypal_id).then((response) => {
        this.order = response.body;
      }, (response) => {

      });
    },

  },
    
};

</script>


<style>


</style>