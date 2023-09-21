import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [nameWarning, setNameWarning] = useState(false);
  const [phoneWarning, setPhoneWarning] = useState(false);
  const [addressWarning, setAddressWarning] = useState(false);

  const navigate = useNavigate();


  const placeOrder = async () => {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone,
        address,
        items: order
      })
    });
    const data = await response.json();

    if (response.status === 200) {
      navigate(`/order-confirmation/${data.id}`);
    }
  };

  const validateOrder = () => {
    const invalidName = name.length === 0;
    const invalidPhone =
      phone.length === 0 || /^[()\d-]+$/.test(phone) === false;
    const invalidAddress = address.length === 0;

    setNameWarning(invalidName);
    setPhoneWarning(invalidPhone);
    setAddressWarning(invalidAddress);

    if (invalidName || invalidPhone || invalidAddress) {
      return;
    }

    placeOrder();
  };

  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(e.target.value);
                }}
                type="phone"
                id="phone"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="phone"
                id="address"
              />
            </label>
          </div>
        </form>

        <div className={styles.orderModalWarnings}>
          <ul>
            {nameWarning && <li>Please enter a name</li>}
            {phoneWarning && <li>Please enter a valid phone number</li>}
            {addressWarning && <li>Please enter an address</li>}
          </ul>
        </div>

        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              validateOrder();
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
