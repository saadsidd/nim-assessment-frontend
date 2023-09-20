import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
  const [confirmedOrder, setConfirmedOrder] = useState({});
  const params = useParams();

  const getConfirmedOrder = async () => {
    const response = await fetch(`/api/orders/${params.id}`);
    const data = await response.json();
    setConfirmedOrder(data);
  };

  useEffect(() => {
    getConfirmedOrder();
  }, []);

  return <OrderConfirmation order={confirmedOrder} />;
}

export default ConfirmationPage;
