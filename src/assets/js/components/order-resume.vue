<template>
  <div id="order-resume">
    <h3 class="title-order-resume">Order Resume</h3>
    <hr>
    <div class="container-order">
      <div class="order-details">
        <div class="order-detail">
          <span class="detail-label">Buyer Name:</span>
          <span class="detail-value">{{ order.payer_info.first_name }} {{ order.payer_info.last_name }}</span>
        </div>
        <div class="order-detail">
          <span class="detail-label">Item Purchased:</span>
          <span class="detail-value">{{ order.product.name }}</span>
        </div>
        <div class="order-detail">
          <span class="detail-label">Purchase Price:</span>
          <span class="detail-value">{{ order.total_amount }} {{ order.currency }}</span>
        </div>
        <div class="order-detail">
          <span class="detail-label">Product Price:</span>
          <span class="detail-value">{{ order.product.price }} {{ order.currency }}</span>
        </div>
        <div class="order-detail">
          <span class="detail-label">Amount:</span>
          <span class="detail-value">{{ product_amount }} of {{ order.product.name }}</span>
        </div>
        <div class="order-detail">
          <span class="detail-label">Shipping Address:</span>
          <span class="detail-value">{{ order.payer_info.shipping_address.line1 }}, {{
            order.payer_info.shipping_address.city }} </span>
        </div>
        <div class="order-detail">
          <span class="detail-label">Order Date:</span>
          <span class="detail-value">{{ order.order_timestamp }}</span>
        </div>
      </div>
    </div>


  </div>
</template>

<script>

export default {
  data() {
    return {
      order: {},
      product_amount: 0,
    };
  },
  created() {
    this.getOrder();
  },
  methods: {
    getOrder: function () {
      this.$http.get('http://localhost:3000/api/order/' + this.$route.params.id).then((response) => {
        this.order = response.body;
        this.order.order_timestamp = new Date(this.order.order_timestamp).toLocaleString();
        this.product_amount = this.order.total_amount / this.order.product.price;
      }, (response) => {

      });
    },

  },

};

</script>


<style>
#order-resume {
  width: 100%;
  margin-top: 3rem;
}

.container-order {
  width: 100%;
  display: flex;
  font-size: 1.75rem;
}

.order-detail {
  position: relative;
  margin-bottom: 1.75rem;
}

.detail-label {
  font-weight: bold;
  margin-right: 1rem;
}

@media screen and (max-width: 768px) {

  .title-order-resume{
    margin-top: -1rem;
    font-size: 1.75rem;
  }

  .order-detail{
    font-size: 1.25rem;
  }
}
  



</style>