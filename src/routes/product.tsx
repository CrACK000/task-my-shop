import {Button, Image} from "@nextui-org/react";
import {useParams} from "react-router-dom";
import {Chip} from "@nextui-org/chip";
import {Divider} from "@nextui-org/divider";
import {ProductReviewCard, ProductReviewCardRatingStar} from "component@/product/ProductReviewCard.tsx";
import {
  ProductContent, ProductContentAction, ProductContentCategories, ProductContentDates, ProductContentDatesItem,
  ProductContentDescription,
  ProductContentGallery,
  ProductContentInfo
} from "component@/product/ProductContent.tsx";
import {ProductPanel, ProductPanelTitle} from "component@/product/ProductPanel.tsx";
import {fetchProductById, fetchRelatedProducts} from "@/features/product-slice.ts";
import {ProductRelated} from "component@/product/ProductRelated.tsx";
import {Tooltip} from "@nextui-org/tooltip";
import {Container, ContainerHeader, ContainerHeaderButton, ContainerHeaderTitle} from "component@/layout/Container.tsx";
import {NotFound} from "component@/global/NotFound.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store.ts";
import {useEffect} from "react";
import {LoadingScreen} from "component@/global/LoadingScreen.tsx";

function formatDate(inputDate: string) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date(inputDate);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

export function Product() {

  const dispatch = useDispatch<AppDispatch>();
  const { productId } = useParams(); // select product ID
  const { product, relatedProducts, loading, error } = useSelector((state: RootState) => state.products); // select product

  useEffect(() => {
    dispatch(fetchProductById(Number(productId)))
    dispatch(fetchRelatedProducts(Number(productId)))
  }, [dispatch]);

  // if data loading
  if (loading)
    return <LoadingScreen/>

  // if product ID not exists
  if (!product || error)
    return <NotFound title="No product found" message="404" />

  const related_products: Product[] | null = relatedProducts
  const total_rating = product.reviews.length // count reviews
  const product_rating = ((Object.values(product.reviews).reduce((acc, value) => acc + value.rating, 0)) / total_rating); // average rating

  return (
    <Container>
      <ContainerHeader goBack>
        <ContainerHeaderTitle>
          {product.name} <span className="opacity-50 text-sm">({product.id})</span>
        </ContainerHeaderTitle>
        <ContainerHeaderButton>
          <Chip>{product.status}</Chip>
        </ContainerHeaderButton>
      </ContainerHeader>
      <ProductContent>
        <ProductContentGallery>
          <Image
            src={product.img}
            className="aspect-square w-full object-cover rounded-lg"
          />
        </ProductContentGallery>
        <ProductContentInfo>
          <ProductContentDescription>{product.description}</ProductContentDescription>
          <ProductContentCategories categories={product.categories}/>
          <div className="mt-auto flex justify-between items-end">
            <ProductContentDates>
              <ProductContentDatesItem heading="Created">
                {formatDate(product.created_at)}
              </ProductContentDatesItem>
              <ProductContentDatesItem heading="Updated">
                {formatDate(product.updated_at)}
              </ProductContentDatesItem>
            </ProductContentDates>
            <ProductContentAction productPrice={product.price}>
              <Tooltip
                color="foreground"
                content={((): string => {
                  switch (product.status) {
                    case "Active":
                      return `Buy now $${product.price}`;
                    case "Draft":
                      return "The product cannot be purchased, is in draft";
                    case "Archived":
                      return "The product cannot be purchased, is archived";
                    default:
                      return "Buy now";
                  }
                })()}
              >
                <Button
                  color="primary"
                  variant={product.status !== "Active" ? "flat" : undefined}
                  disabled={product.status !== "Active"}
                >
                  Buy now
                </Button>
              </Tooltip>
            </ProductContentAction>
          </div>
        </ProductContentInfo>
      </ProductContent>
      <ProductPanel>
        <div>
          <ProductPanelTitle className="flex justify-between items-center">
            <span>Reviews</span>
            <ProductReviewCardRatingStar rating={product_rating} text />
          </ProductPanelTitle>
          <Divider className="my-3"/>
          <ProductReviewCard reviews={product.reviews}/>
        </div>
        <div>
          <ProductPanelTitle className="text-end">Related products</ProductPanelTitle>
          <Divider className="my-3"/>
          <ProductRelated products={related_products}/>
        </div>
      </ProductPanel>
    </Container>
  )
}