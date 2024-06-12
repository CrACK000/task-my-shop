import {FC, ReactNode} from "react";
import {Chip} from "@nextui-org/chip";

type ProductContentProps = {
  children: ReactNode;
}

type ProductContentCategoriesProps = {
  categories: string[]
}

type ProductContentActionProps = {
  children: ReactNode;
  productPrice: number;
}

type ProductContentDatesItemProps = {
  children: ReactNode;
  heading: string;
}

export const ProductContent: FC<ProductContentProps> = ({children}) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-10">
      {children}
    </div>
  )
}

export const ProductContentGallery: FC<ProductContentProps> = ({children}) => {
  return (
    <div className="lg:col-span-2">
      {children}
    </div>
  )
}

export const ProductContentInfo: FC<ProductContentProps> = ({children}) => {
  return (
    <div className="lg:col-span-3 flex flex-col gap-6">
      {children}
    </div>
  )
}

export const ProductContentDescription: FC<ProductContentProps> = ({children}) => {
  return (
    <p className="max-w-lg">
      {children}
    </p>
  )
}

export const ProductContentCategories: FC<ProductContentCategoriesProps> = ({ categories }) => {
  return (
    <div className="space-y-1">
      <p className="opacity-50 text-xs uppercase">Categories</p>
      <div className="space-x-1 space-y-1">
        {categories.map((cat, key) => (
          <Chip key={key} className="text-sm font-medium">{cat}</Chip>
        ))}
      </div>
    </div>
  )
}

export const ProductContentDates: FC<ProductContentProps> = ({children}) => {
  return (
    <div className="flex flex-col gap-y-4">
      {children}
    </div>
  )
}

export const ProductContentDatesItem: FC<ProductContentDatesItemProps> = ({ children, heading }) => {
  return (
    <div>
      <p className="opacity-50 text-xs uppercase">{heading}</p>
      <span>{children}</span>
    </div>
  )
}

export const ProductContentAction: FC<ProductContentActionProps> = ({ children, productPrice }) => {
  return (
    <div className="flex flex-col items-end">
      <div className="opacity-50 text-xs uppercase text-end">PRICE</div>
      <div className="font-bold text-2xl my-2">${productPrice.toLocaleString("en-US")}</div>
      {children}
    </div>
  )
}