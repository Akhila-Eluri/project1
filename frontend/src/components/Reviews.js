import React, { useState, useEffect } from 'react';
import axiosInstance from '../util/axiosInstance';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    rating: 1,
    message: '',
  });


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get('/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axiosInstance.post('/reviews', newReview);
      const savedReview = response.data;
  
      setReviews([savedReview, ...reviews]);
      setNewReview({
        name: '',
        email: '',
        rating: 1,
        message: '',
      });
    } catch (error) {
      console.error('Failed to submit review:', error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="reviews-section">
      <h2>Client Reviews</h2>

      <form onSubmit={handleSubmit} className="review-form">
        <input
          type="text"
          name="name"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          name="email"
          value={newReview.email}
          onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
          placeholder="Your Email"
          required
        />
        <select
          name="rating"
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
          required
        >
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </select>
        <textarea
          name="message"
          value={newReview.message}
          onChange={(e) => setNewReview({ ...newReview, message: e.target.value })}
          placeholder="Write your review"
          required
        />
        <button type="submit">Submit Review</button>
      </form>

      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-item">
            <p><strong>{review.name}</strong></p>
            <p>{review.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
