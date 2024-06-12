import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/dropdown";
import {Button, Popover, PopoverContent, PopoverTrigger, Selection} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {DashboardProductSoldCard} from "component@/dashboard/DashboardProductSoldCard.tsx";
import {DashBoardProductsCard} from "component@/dashboard/DashBoardProductsCard.tsx";
import {DashboardTotalRevenue} from "component@/dashboard/DashboardTotalRevenue.tsx";
import {isWithinInterval} from "date-fns";
import {DashboardPopularProductCard} from "component@/dashboard/DashboardPopularProductCard.tsx";
import {RangeCalendar} from "@nextui-org/calendar";
import {today, getLocalTimeZone} from '@internationalized/date';
import {fetchStatsDashboard} from "@/features/stats-slice.ts";
import {Container, ContainerHeader, ContainerHeaderButton, ContainerHeaderTitle} from "component@/layout/Container.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store.ts";

function Dashboard() {

  const dispatch = useDispatch<AppDispatch>();
  const { dashboard } = useSelector((state: RootState) => state.statistics)

  useEffect(() => {
    dispatch(fetchStatsDashboard());
  }, [dispatch]);

  const data = dashboard; // select dashboard data
  const [timeRange, setTimeRange] = useState("7"); // default time range is last 7 days
  const [range, setRange] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({days: -Number(timeRange)}),
  })

  // function on set time range for data
  const useTimeRange = (days: number) => {
    setTimeRange(String(days))
    setRange({
      start: today(getLocalTimeZone()),
      end: today(getLocalTimeZone()).add({ days: -Number(days) })
    })
  }

  // function on calculate sum from select data
  const calculateSum = () => {
    const currentDate = new Date(`${range.end.month}-${range.end.day}-${range.end.year}`); // set end date
    const startDate = new Date(`${range.start.month}-${range.start.day}-${range.start.year}`); // set start date

    // filter data
    const filteredData = data.filter((item: any) => {
      const [month, day, year] = item.date.split('/'); // splitting the date into parts
      const itemDate = new Date(`${year}-${month}-${day}`); // new format date
      return isWithinInterval(itemDate, { start: startDate, end: currentDate });
    });

    // Sum
    const salesSum = filteredData.reduce((sum, item: any) => sum + item.sales, 0);
    const revenueSum = filteredData.reduce((sum, item: any) => sum + item.revenue, 0);

    return { salesSum, revenueSum };
  };

  return (
    <Container>
      <ContainerHeader>
        <ContainerHeaderTitle>
          Dashboard
        </ContainerHeaderTitle>
        <ContainerHeaderButton className="flex gap-x-1">
          <Popover placement="bottom">
            <PopoverTrigger>
              <Button variant="light" size="sm">
                {range.end.day}/{range.end.month}/{range.end.year} - {range.start.day}/{range.start.month}/{range.start.year}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <RangeCalendar
                aria-label="Date (Uncontrolled)"
                maxValue={today(getLocalTimeZone())}
                defaultValue={range}
                onChange={setRange}
              />
            </PopoverContent>
          </Popover>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat" size="sm">
                Last {timeRange} days
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Time Range"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={timeRange}
              onSelectionChange={(value: Selection) => useTimeRange(Number([...value][0]))}
            >
              <DropdownItem key={7}>last 7 days</DropdownItem>
              <DropdownItem key={15}>last 15 day</DropdownItem>
              <DropdownItem key={30}>last 30 day</DropdownItem>
              <DropdownItem key={90}>last 90 day</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ContainerHeaderButton>
      </ContainerHeader>
      <div className="grid gap-6 md:gap-8">
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <DashboardProductSoldCard count={calculateSum().salesSum} />
          <DashboardTotalRevenue count={calculateSum().revenueSum} />
          <DashBoardProductsCard/>
          <DashboardPopularProductCard className="lg:col-span-2" />
        </div>
      </div>
    </Container>
  )
}

export default Dashboard