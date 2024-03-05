import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Importing external CSS file

function ProductTable({ products }) {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Subcategory</th>
          <th>Price</th>
          <th>Popularity</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.title}</td>
            <td>{product.subcategory}</td>
            <td>${product.price}</td>
            <td>{product.popularity}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
    <div className='bg-white'>
     
      <ProductTable products={products} />
    </div>
  );
}

export default App;
