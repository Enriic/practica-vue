<template>
  <div id="order-resume">
    <p>{{ order }}</p>
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
      this.$http.get('http://localhost:3000/api/order/' + this.$route.params.id).then((response) => {
        this.order = response.body;
      }, (response) => {

      });
    },

  },

};

</script>


<style></style>