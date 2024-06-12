import {FC, ReactNode} from "react";
import {cn} from "@nextui-org/theme";
import {useNavigate} from "react-router-dom";
import {Button} from "@nextui-org/react";
import {ArrowLeftIcon} from "lucide-react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
}

type ContainerHeaderProps = {
  children: ReactNode;
  goBack?: boolean;
}

type ContainerHeaderTitleProps = {
  children: ReactNode;
  className?: string;
}

type ContainerHeaderButtonProps = {
  children: ReactNode;
  className?: string;
}

export const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <main
      className={cn(`max-w-7xl mx-auto p-4 space-y-6`, className)}
    >
      {children}
    </main>
  )
}

export const ContainerHeader: FC<ContainerHeaderProps> = ({ children, goBack = false }) => {
  return (
    <div className="flex items-center gap-4 md:gap-6">
      {goBack && <ContainerHeaderGoBack/>}
      {children}
    </div>
  )
}

export const ContainerHeaderTitle: FC<ContainerHeaderTitleProps> = ({ children, className }) => {
  return (
    <div
      className={cn(`text-xl md:text-3xl font-medium`, className)}
    >
      {children}
    </div>
  )
}

export const ContainerHeaderButton: FC<ContainerHeaderButtonProps> = ({ children, className }) => {
  return (
    <div
      className={cn(`ms-auto`, className)}
    >
      {children}
    </div>
  )
}

export function ContainerHeaderGoBack() {
  const navigate = useNavigate()
  return (
    <Button
      variant="flat"
      isIconOnly
      onClick={() => navigate(-1)}
    >
      <ArrowLeftIcon className="w-5 h-5"/>
    </Button>
  )
}