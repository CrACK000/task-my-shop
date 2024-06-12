import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {FC, ReactNode} from "react";
import {Chip} from "@nextui-org/chip";
import {Search} from "lucide-react";
import {ScrollShadow} from "@nextui-org/react";
import {IoFilterSharp} from "react-icons/io5";

type ProductsFilterProps = {
  children: ReactNode;
  className?: string;
}

type ProductsFilterBadgesProps = {
  searchInput: string;
  categories: string[];
  status: string[];
}

// get all categories from products
export const getProductFilterCategories = (products: Product[]) => {
  return Array.from(products.reduce((categorySet, item) => {
    item.categories.forEach(category => categorySet.add(category));
    return categorySet;
  }, new Set()));
}

// get all status from products
export const getProductFilterStatus = (products: Product[]) => {
  return Array.from(new Set(products.map(item => item.status)));
}

export const ProductsFilter: FC<ProductsFilterProps> = ({children, className}) => {
  return (
    <Card className={className}>
      <CardHeader className="uppercase font-medium text-sm">Filter</CardHeader>
      <CardBody className="space-y-4">
        {children}
      </CardBody>
    </Card>
  )
}

export const ProductsFilterBadges: FC<ProductsFilterBadgesProps> = ({ searchInput, categories, status }) => {
  if (searchInput !== "" || categories.length || status.length)
    return (
      <div className="flex items-center gap-x-4">
        <div className="text-xs uppercase opacity-50 font-medium">
          <IoFilterSharp className="w-4 h-4 md:hidden" />
          <span className="sr-only md:not-sr-only">Filter</span>
        </div>
        <ScrollShadow hideScrollBar orientation="horizontal" className="max-w-full">
          <div className="flex gap-x-1">
            {searchInput && (
              <Chip
                size="sm"
                startContent={<Search
                  className="w-3 h-3 mx-1 opacity-50"/>}
              >
                {searchInput}
              </Chip>
            )}
            {categories.map((cat, key) => (
              <Chip
                size="sm"
                key={key}
              >
                {cat}
              </Chip>
            ))}
            {status.map((item, key) => (
              <Chip
                size="sm"
                key={key}
              >
                {item}
              </Chip>
            ))}
          </div>
        </ScrollShadow>
      </div>
    )
}