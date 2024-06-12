import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Avatar} from "@nextui-org/react";
import {Divider} from "@nextui-org/divider";
import {FC} from "react";
import {TiStarFullOutline} from "react-icons/ti";

type ReviewCardProps = {
  reviews: ProductReviews[];
}

type ProductReviewCardRatingStarProps = {
  rating: number;
  text?: boolean;
}

export const ProductReviewCardRatingStar: FC<ProductReviewCardRatingStarProps> = ({ rating, text = false }) => {
  return (
    <div className="ms-auto flex items-center space-x-1">
      <span className="font-bold text-sm">{rating.toFixed(1)}</span>
      <TiStarFullOutline className="w-4 h-54"/>
      {text && (
        <span className="text-xs font-semibold uppercase">Rating</span>
      )}
    </div>
  )
}

export const ProductReviewCard: FC<ReviewCardProps> = ({ reviews }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
      {reviews.map((review, key) => (
        <Card key={key}>
          <CardHeader className="flex gap-3">
            <Avatar showFallback src='https://localhost:00000' className="w-6 h-6"/>
            <div className="flex flex-col">
              <p className="font-medium">{review.user}</p>
            </div>
            <ProductReviewCardRatingStar rating={review.rating}/>
          </CardHeader>
          <Divider/>
          <CardBody>
            <p>{review.text}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}