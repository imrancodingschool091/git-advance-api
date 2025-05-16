import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [productData, setProductData] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10; // same limit as in backend

  const fetchData = async (searchQuery = '', pageNumber = 1) => {
    try {
      let apiUrl = `http://localhost:3000/api/products?page=${pageNumber}`;
      if (searchQuery) {
        apiUrl += `&search=${searchQuery}`;
      }

      const response = await axios.get(apiUrl);
      setProductData(response.data.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(search, page);
  }, [search, page]);

  const handlePrevPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    // Only allow next if received full 'limit' products
    if (productData.length === limit) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <>
      <input
        type="text"
        value={search}
        placeholder="Search..."
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // reset to first page when searching
        }}
      />

      <h1>Product List</h1>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">SR.NO</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {productData.length === 0 ? (
            <tr>
              <td colSpan="4">No products found.</td>
            </tr>
          ) : (
            productData.map((product, index) => (
              <tr key={index}>
                <th scope="row">{(page - 1) * limit + index + 1}</th>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "10px" }}>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button
          onClick={handleNextPage}
          disabled={productData.length < limit}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
