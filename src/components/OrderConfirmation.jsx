import styles from "./styles/OrderConfirmation.module.css";

function OrderConfirmation({ order }) {
  const getOrderItems = (items) =>
    items.map((item) => (
      <div key={item.id}>
        <p>
          {item.quantity}x {item.item.name} --- ${item.item.price}
        </p>
      </div>
    ));

  return (
    <div className="page">
      <h1>Thank you for your order</h1>
      <div className={styles.confirmedOrderInfo}>
        <p>
          <b>Order ID: </b>
          {order.id}
        </p>
        <p>
          <b>Name: </b>
          {order.name}
        </p>
        <p>
          <b>Address: </b>
          {order.address}
        </p>
        <div>
          <h3 className={styles.yourOrderHeading}>
            <b>Your order: </b>
          </h3>
          {order.items && getOrderItems(order.items)}
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
