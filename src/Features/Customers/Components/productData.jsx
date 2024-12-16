import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import ProductCard from "./productItem";
import Pagination from "./pagination"; 
import { fetchProducts } from "../../Admin/Components/AdminRedux/ProductsSlice"; 
import "../../../styles/productCard.css";

const Data = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products); 
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("relavent");
  const itemsPerPage = 12;

  useEffect(() => {
    // Dispatch the thunk to fetch products
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let sortedData = [...products];

    // Filter out products with stock = 0
    sortedData = sortedData.filter((item) => item.stock > 0);

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
    setCurrentPage(1); // Reset to the first page when filtering or sorting
  }, [selectedCategory, sortOption, products]);

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
          <div className="d-flex justify-content-between align-items-between text-base mb-4">
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

Data.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};

export default Data;
