export const renderStars = (rating) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // Full star
      stars.push(<i key={i} className="fas fa-star text-yellow-400" />);
    } else if (rating >= i - 0.5) {
      // Half star
      stars.push(
        <i key={i} className="fas fa-star-half-alt text-yellow-400" />
      );
    } else {
      // Empty star
      stars.push(<i key={i} className="far fa-star text-yellow-400" />);
    }
  }

  return stars;
};
