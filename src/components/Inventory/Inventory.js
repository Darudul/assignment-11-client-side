import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const Inventory = () => {
  const { inventoryId } = useParams();
  const [fruit, setFruit] = useState({});

  useEffect(() => {
    const url = `http://localhost:5000/fruit/${inventoryId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setFruit(data));
  }, [fruit]);

  const deliveredFruit = () => {
    // let quant=1
    const newQuantity = parseInt(fruit?.quantity) - 1;
    const quantityy = { newQuantity };
    if (newQuantity < 0) {
      alert("quantity can not be negative");
    } else {
      const url = `http://localhost:5000/fruit/${inventoryId}`;
      console.log(url);
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(quantityy),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("success", data);
        });
    }
  };

  const handleUpdateUser = (event) => {
    event.preventDefault();
    const numbers = event.target.items.value;
    const newQuantity = parseInt(fruit.quantity) + parseInt(numbers);
    const quantityy = { newQuantity };
    if (newQuantity < 0) {
      alert("quantity can not be negative");
    } else {
      const url = `http://localhost:5000/fruit/${inventoryId}`;
      console.log(url);
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(quantityy),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("success", data);
          event.target.reset();
        });
    }
  };
  return (
    <div className="container">
      <div className="mb-5">
        <h3>this is inventory:{inventoryId}</h3>
        <p>{fruit.name}</p>
        <p>quantity: {fruit?.quantity} </p>
        <button onClick={deliveredFruit}>Delivered</button>
      </div>

      <>
        <form onSubmit={handleUpdateUser}>
          <input type="text" name="items" placeholder="Name" required />
          <br />
          <input type="submit" value="Update User" />
        </form>
      </>
    </div>
  );
};

export default Inventory;
