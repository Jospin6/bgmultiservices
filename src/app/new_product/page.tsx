"use client"
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { addProduct } from "../features/productSlice";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const dispatch = useDispatch();

//   const handleAddProduct = (e) => {
//     e.preventDefault();
//     dispatch(addProduct({ name, price, stock })); onSubmit={handleAddProduct}
//   };

  return (
    <div>
      <h2>Ajouter un Produit</h2>
      <form>
        <input type="text" placeholder="Nom" onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Prix" onChange={(e) => setPrice(Number(e.target.value))} />
        <input type="number" placeholder="Stock" onChange={(e) => setStock(Number(e.target.value))} />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}