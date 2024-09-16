import React from "react";
import { Star } from "lucide-react";

const StarRating = ({
  rating,
  onRatingChange,
  readonly = false,
  className = "",
}) => {
  const stars = [1, 2, 3, 4, 5];

  const handleStarClick = (starRating) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <div className={`flex ${className}`}>
      {stars.map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 ${
            star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          } ${!readonly ? "cursor-pointer" : ""}`}
          onClick={() => handleStarClick(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
