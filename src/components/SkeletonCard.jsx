function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-shimmer skeleton-img" />
      <div className="skeleton-shimmer skeleton-line-title" />
      <div className="skeleton-shimmer skeleton-line-price" />
    </div>
  );
}

export default SkeletonCard;