import {Card, CardBody} from "@nextui-org/card";
import {FC} from "react";

type DashboardTotalRevenueProps = {
  count: number;
}

// dashboard card: total revenue
export const DashboardTotalRevenue: FC<DashboardTotalRevenueProps> = ({ count }) => {
  return (
    <Card>
      <CardBody className="space-y-2">
        <div className="uppercase text-sm opacity-50">Total revenue</div>
        <span className="text-3xl font-bold">${Number(count).toLocaleString('en-Us')}</span>
      </CardBody>
    </Card>
  )
}