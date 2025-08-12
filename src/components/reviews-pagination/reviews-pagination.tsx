import "./reviews-pagination.css"
import { useState } from "react";
import { Button, Pagination } from "react-bootstrap";
import { FaTrash, FaThumbsUp } from "react-icons/fa";
import ReviewDeleteButtonModal from "../review-delete-button/review-delete-button-modal";

const ReviewsPagination = ({
  reviews,
  reviewsUsers,
  userSession,
  setShowDeleteReviewModal,
  showDeleteReviewModal,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 2;

  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {Array.isArray(reviews) && reviews.length > 0 ? (
        <>
          <ul className="list-group mb-4 shadow-sm">
            {currentReviews.map((review) => (
              <li key={review.id} className="list-group-item">
                <div className="d-flex align-items-start justify-content-between">
                  {/* Avatar + content */}
                  <div className="d-flex align-items-start gap-3">
                    <img
                      src={
                        reviewsUsers.get(review.user_id)?.avatar_url ||
                        "https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/default-avatar-1.png"
                      }
                      alt="avatar"
                      className="rounded-circle"
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <h6 className="mb-1 fw-semibold text-black">
                        {reviewsUsers.get(review.user_id)?.username ||
                          "Usuario desconocido"}
                      </h6>
                      <p className="mb-1 text-dark">{review.comment}</p>
                      <small className="text-muted">
                        {new Date(review.created_at).toLocaleDateString("es-MX", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </small>
                    </div>
                  </div>

                  {/* Actions */}
                  {userSession && (
                    <div className="d-flex">
                      {/* <Button
                        variant="outline-dark"
                        size="sm"
                        className="d-flex align-items-center justify-content-center mx-2"
                      >
                        <FaThumbsUp />
                      </Button> */}
                      {(review.user_id === userSession.sub ||
                        userSession.sub ===
                          "6fc05e5d-4d71-4ce2-a0a5-369aa2ee875a") && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="d-flex align-items-center justify-content-center"
                          onClick={() => setShowDeleteReviewModal(true)}
                        >
                          <FaTrash />
                        </Button>
                      )}
                    </div>
                  )}

                  {showDeleteReviewModal && (
                    <ReviewDeleteButtonModal
                      reviewId={review.id}
                      onClose={() => setShowDeleteReviewModal(false)}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Bootstrap Pagination */}
          <Pagination className="justify-content-center">
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      ) : (
        <p className="text-muted text-center mb-4">
          Este producto no tiene reseñas aún.
        </p>
      )}
    </>
  );
};

export default ReviewsPagination;
