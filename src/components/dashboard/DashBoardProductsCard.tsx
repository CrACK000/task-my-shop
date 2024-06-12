import {Card, CardBody} from "@nextui-org/card";
import {fetchProducts} from "@/features/product-slice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store.ts";
import {useEffect} from "react";

// dashboard card: products count
export const DashBoardProductsCard = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products); // products
  const product_count = products.length; // product count

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch]);

  return (
    <Card>
      <CardBody className="space-y-2">
        <div className="uppercase text-sm opacity-50">Products</div>
        <span className="text-3xl font-bold">{product_count.toLocaleString('en-Us')}</span>
      </CardBody>
    </Card>
  )
}