import {Tooltip} from "@nextui-org/tooltip";
import {Image, Link} from "@nextui-org/react";
import {FC} from "react";
import {Card, CardBody} from "@nextui-org/card";

type ProductRelated = {
  products: Product[] | null;
}

export const ProductRelated: FC<ProductRelated> = ({ products }) => {

  if (products === null)
    return (
      <Card className={`h-32`}>
        <CardBody className="flex items-center justify-center opacity-50">
          No related products were found
        </CardBody>
      </Card>
    )

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {products.map(product => (
        <Tooltip
          key={product.id}
          content={
            <div className="px-1 py-2">
              <div className="text-sm font-bold">{product.name}</div>
              <div className="text-tiny max-w-44 line-clamp-2">{product.description}</div>
              <Link href={`/products/${product.id}`} className="text-sm">show more</Link>
            </div>
          }
        >
          <Link href={`/products/${product.id}`}>
            <Image
              isBlurred
              isZoomed
              src={product.img}
              alt={product.name}
              className="aspect-square object-cover w-full h-full"
            />
          </Link>
        </Tooltip>
      )).slice(0, 6)}
    </div>
  )
}