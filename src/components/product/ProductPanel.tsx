import {FC, ReactNode} from "react";
import {cn} from "@nextui-org/theme";

type ProductPanelProps = {
  children: ReactNode;
}

type ProductPanelTitleProps = {
  children: ReactNode;
  className?: string;
}

export const ProductPanel: FC<ProductPanelProps> = ({ children }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-8 xl:gap-10">
      {children}
    </div>
  )
}

export const ProductPanelTitle: FC<ProductPanelTitleProps> = ({ children, className, }) => {
  return (
    <div
      className={cn(
        "text-2xl font-medium",
        className
      )}
    >
      {children}
    </div>
  )
}