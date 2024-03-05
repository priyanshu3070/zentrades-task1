import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Importing external CSS file

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <p>Subcategory: {product.subcategory}</p>
      <p>Price: ${product.price}</p>
      <p>Popularity: {product.popularity}</p>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json');
        const productsData = response.data.products;
        const productsArray = Object.keys(productsData).map(key => {
          const product = productsData[key];
          return {
            title: product.title,
            subcategory: product.subcategory,
            price: parseFloat(product.price),
            popularity: parseInt(product.popularity)
          };
        });
        // Order products by popularity
        productsArray.sort((a, b) => b.popularity - a.popularity);
        setProducts(productsArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="product-container">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
}

export default App;
