import React, { useState } from "react";
import StarRatingComponent from "react-star-rating-component";

const StarRating = () => {
  const [rating, setRating] = useState();

  const onStarClick = (nextValue, prevValue, name) => {
    setRating(nextValue);
  };

  return (
    <div>
      <StarRatingComponent
        name="rate"
        starCount={5}
        value={rating}
        onStarClick={onStarClick}
      />
    </div>
  );
};

export default StarRating;
