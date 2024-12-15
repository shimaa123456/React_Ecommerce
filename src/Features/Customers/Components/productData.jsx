import React, { useEffect, useState } from "react";
import ProductCard from "./productItem";
import Pagination from "./pagination";  // Import the Pagination component
import '../../../styles/productCard.css';

const Data = ({ selectedCategory }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("relavent");  // State to handle sort option
  const itemsPerPage = 12;

  // Fetch data when component mounts
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=194")
      .then((response) => response.json())
      .then((data) => {
        setData(data.products);
        setFilteredData(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setLoading(false);
      });
  }, []);

  // Update filtered data when selectedCategory or sortOption changes
  useEffect(() => {
    let sortedData = [...data];
    
    if (selectedCategory !== "all") {
      sortedData = sortedData.filter((item) => item.category === selectedCategory);
    }

    // Sorting based on selected option
    if (sortOption === "low-high") {
      sortedData = sortedData.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      sortedData = sortedData.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      sortedData = sortedData.sort((a, b) => b.rating - a.rating);
    }

    setFilteredData(sortedData);
    setCurrentPage(1);  // Reset to the first page when filtering or sorting
  }, [selectedCategory, sortOption, data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-10">
          <div className="d-flex justify-content-between  align-items-between text-base mb-4 ">
            <h1>{selectedCategory === "all" ? "All Collection" : selectedCategory}</h1>
            <select
              className="form-select form-select-sm border-2 rounded border-gray-300 w-auto"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="relavent">Sort by Relevant</option>
              <option value="low-high">Sort by Low to High Price</option>
              <option value="high-low">Sort by High to Low Price</option>
              <option value="rating">Sort by Highest Rating</option>
            </select>
          </div>

          <div className="row">
            {currentItems.map((item) => (
              <div className="col-md-3 col-sm-6 col-12 mb-4" key={item.id}>
                <ProductCard item={item} />
              </div>
            ))}
          </div>

          {/* Include the Pagination component */}
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Data;
