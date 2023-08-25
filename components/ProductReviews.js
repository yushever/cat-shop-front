import styled from "styled-components";
import WhiteBox from "./WhiteBox";
import Input from "./Input";
import StarsRating from "./StartsRating";
import Textarea from "./Textarea";
import Button from "./Button";
import { useEffect, useState } from "react";
import axios from "axios";
import CatLoader from "./CatLoader";

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;
const Subtitle = styled.h3`
  font-size: 1rem;
  margin-top: 5px;
`;
const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
`;
const ReviewWrapper = styled.div`
  margin-bottom: 10px;
  border-top: 1px solid #ccc;
  padding: 10px 0;
  h3 {
    margin: 3px 0;
    font-size: 1rem;
    color: #555;
    font-weight: normal;
  }
  p {
    margin: 0;
    font-size: 0.8rem;
    color: #777;
  }
`;
const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  time {
    font-size: 14px;
    font-weight: normal;
    color: #aaa;
  }
`;

export default function ProductReviews({ product }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  function submitReview() {
    const data = {
      title,
      description,
      stars,
      product: product._id,
    };
    axios.post("/api/reviews", data).then((res) => {
      setTitle("");
      setDescription("");
      setStars(0);
      loadReviews();
    });
  }

  useEffect(() => {
    loadReviews();
  }, []);

  function loadReviews() {
    setReviewsLoading(true);
    axios.get("/api/reviews?product=" + product._id).then((res) => {
      setReviews(res.data);
      setReviewsLoading(false);
    });
  }

  return (
    <div>
      <Title>Reviews</Title>
      <ColsWrapper>
        <div>
          {" "}
          <WhiteBox>
            {" "}
            <Subtitle>Add review</Subtitle>
            <div>
              <StarsRating onChange={setStars} />
            </div>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Do you like this product?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
              <Button primary={true} onClick={submitReview}>
                Submit
              </Button>
            </div>
          </WhiteBox>
        </div>
        <div>
          {" "}
          <WhiteBox>
            {" "}
            <Subtitle>All reviews</Subtitle>
            {reviewsLoading && <CatLoader />}
            {reviews.length === 0 && <p>No reviews😿</p>}
            {reviews.length > 0 &&
              reviews.map((review) => (
                <ReviewWrapper key={review._id}>
                  <ReviewHeader>
                    <div>
                      <StarsRating
                        size={"sm"}
                        disabled={true}
                        defaultHowMany={review.stars}
                      />
                    </div>
                    <div>
                      {" "}
                      <time>
                        {new Date(review.createdAt).toLocaleDateString("ru-RU")}
                      </time>
                    </div>
                  </ReviewHeader>
                  <h3> {review.title}</h3>
                  <p>{review.description}</p>
                </ReviewWrapper>
              ))}
          </WhiteBox>
        </div>
      </ColsWrapper>
    </div>
  );
}
