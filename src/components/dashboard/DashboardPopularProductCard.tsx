import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Link} from "react-router-dom";
import {fetchProducts} from "@/features/product-slice.ts";
import {FC, useEffect} from "react";
import {ProductReviewCardRatingStar} from "component@/product/ProductReviewCard.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store.ts";
import {LoadingScreen} from "component@/global/LoadingScreen.tsx";

type DashboardPopularProductCardProps = {
  className?: string;
}

// select most popular product top total_sales
const getMostPopularProduct = (products: Product[]) => {
  return products.reduce((topProduct, currentProduct) => {
    return (currentProduct.total_sales > topProduct.total_sales) ? currentProduct : topProduct;
  }, products[0]);
};

export const DashboardPopularProductCard: FC<DashboardPopularProductCardProps> = ({ className }) => {

  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products); // products

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);

  if (loading)
    return (
      <Card className={className}>
        <CardBody>
          <LoadingScreen />
        </CardBody>
      </Card>
    )

  if (error)
    return (
      <Card className={`${className} h-44`}>
        <CardBody className="flex items-center justify-center text-danger">
          An error occurred while loading products
        </CardBody>
      </Card>
    )

  // data the most popular product
  const popular_product: Product | null = products.length > 0 ? getMostPopularProduct(products) : null

  if (!popular_product)
    return (
      <Card className={`${className} h-44`}>
        <CardBody className="flex items-center justify-center opacity-50">
          No products available
        </CardBody>
      </Card>
    )

  return (
    <Card className={`${className} group`}>
      <CardHeader>
        <div className="flex justify-between w-full">
          <span className="text-lg font-medium">Most popular product</span>
          <div className="text-end">
            <span className="uppercase text-sm font-medium opacity-50 me-2">Total sales</span>
            <span className="text-2xl font-bold">{popular_product.total_sales}</span>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex gap-4 md:gap-6">
          <img
            src={popular_product.img}
            alt={popular_product.name}
            className="w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44 aspect-square object-cover rounded-lg"
          />
          <div className="flex flex-col w-full">
            <div>
              <span className="text-lg md:text-2xl font-medium">{popular_product.name}</span>
              <p className="opacity-50 line-clamp-2 md:line-clamp-4 text-sm md:text-base">{popular_product.description}</p>
            </div>
            <div className="mt-auto hidden md:flex w-full justify-between items-end">
              <div className="flex gap-x-4">
                <div>
                  <span className="text-xs uppercase opacity-50 me-1">Reviews: </span>
                  <span className="text-sm font-medium">{popular_product.reviews.length}</span>
                </div>
                <div>
                  <span className="text-xs uppercase opacity-50 me-1">Earnings: </span>
                  <span className="text-sm font-medium">${(popular_product.total_sales * popular_product.price).toLocaleString('en-US')}</span>
                </div>
                <div className="flex gap-x-0.5 items-end">
                  <span className="text-xs uppercase opacity-50 me-1">Rating: </span>
                  <ProductReviewCardRatingStar rating={1}/>
                </div>
              </div>
              <Link to={`/products/${popular_product.id}`} className="text-sm opacity-0 group-hover:opacity-100 transition">
                Show product
              </Link>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}