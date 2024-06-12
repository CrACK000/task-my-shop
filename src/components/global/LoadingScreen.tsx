import {Spinner} from "@nextui-org/react";

export const LoadingScreen = () => {
  return (
    <div className="flex h-44 justify-center items-center">
      <Spinner className="mr-4"/>
      <div className="text-primary text-sm">Loading...</div>
    </div>
  )
}