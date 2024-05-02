import React, { useState } from "react";
import "@styles/rating.css"; // Assuming you have a CSS file for styles

const StarRating = () => {
  const [rating, setRating] = useState(2); // Default rating set to 2
  const [rated, setRated] = useState(false);

  const handleRatingChange = (value) => {
    setRating(value);
    setRated(true);
  };

  return (
    <div>
      {rated ? (
        <p>Thanks for rating us!</p>
      ) : (
        <div>
          <p>
            {" "}
            <span className="star-rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <React.Fragment key={value}>
                  <input
                    type="radio"
                    name="rating"
                    id={`rate-${value}`}
                    value={value}
                    checked={rating === value}
                    onChange={() => handleRatingChange(value)}
                  />
                  <label htmlFor={`rate-${value}`} style={{ "--i": value }}>
                    <i class="fa-solid fa-star"></i>
                  </label>
                </React.Fragment>
              ))}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default StarRating;
