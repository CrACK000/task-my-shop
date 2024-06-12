import {Card, CardBody} from "@nextui-org/card";
import {FC} from "react";

type DashboardProductSoldCardProps = {
  count: number;
}

// dashboard card: count sold products
export const DashboardProductSoldCard: FC<DashboardProductSoldCardProps> = ({ count }) => {
  return (
    <Card>
      <CardBody className="space-y-2">
        <div className="uppercase text-sm opacity-50">Products sold</div>
        <span className="text-3xl font-bold">{Number(count).toLocaleString('en-Us')}</span>
      </CardBody>
    </Card>
  )
}