import {Link} from "@nextui-org/react";
import {ArrowLeftIcon} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {FC} from "react";

type NotFoundProps = {
  title: string;
  message: string;
  goBack?: any;
  goBackText?: string;
}

export const NotFound: FC<NotFoundProps> = ({ title, message, goBack = -1, goBackText = 'back' }) => {
  const navigate = useNavigate();
  return (
    <main className="text-center w-full p-4 my-6">
      <div className="text-3xl">
        {title}
      </div>
      <div className="text-sm opacity-50 my-3">
        {message}
      </div>
      <Link
        className="cursor-pointer"
        onClick={() => navigate(goBack)}
      >
        <ArrowLeftIcon className="w-4 h-4 me-1"/>
        {goBackText}
      </Link>
    </main>
  )
}