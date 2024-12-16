// In ReviewForm.js

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { addReviewToProduct } from '../../Admin/Components/AdminRedux/ProductsSlice';

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const dispatch = useDispatch();
  
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || reviewText.trim() === '') {
      toast.error("Please provide a rating and a review.");
      return;
    }
  
    const newReview = {
      rating,
      comment: reviewText,
      reviewerName: user?.name || "Anonymous",
      reviewerEmail: user?.email || "anonymous@example.com", 
      date: new Date().toISOString(),
    };
  
    // Dispatch the action to add the review
    dispatch(addReviewToProduct({ productId, review: newReview }))
      .then(() => {
        toast.success("Review submitted successfully!");
        setRating(0);
        setReviewText('');
      })
      .catch(() => toast.error("Failed to submit review"));
  };
  

  return (
    <div className="review-form mt-4">
      <h4>Leave a Review</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Rating:</label>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`fa fa-star ${rating >= star ? 'text-warning' : 'text-muted'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label>Review:</label>
          <textarea
            className="form-control"
            rows="4"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit Review</button>
      </form>
    </div>
  );
};

ReviewForm.propTypes = {
  productId: PropTypes.string.isRequired,  
};

export default ReviewForm;
