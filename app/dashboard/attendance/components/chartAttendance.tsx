import { useSubscription } from '@apollo/client';
import { BarChart } from '@mantine/charts';
import { GET_ATT_WEEK } from '../queries/get_total_empl';

export const data = [
    { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
    { month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
    { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
    { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
    { month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
    { month: 'June', Smartphones: 750, Laptops: 600, Tablets: 1000 },
  ];

export default function AttendanceBarChart() {
    const {data: dataBars, loading, error } = useSubscription(GET_ATT_WEEK)
  return (
    <>
       { loading || error ? <></> :
        <BarChart
      h={300}
      data={dataBars?.get_attendance_weekly}
      dataKey="weekday"
      orientation='vertical'
      series={[
        { name: 'on_time_count', color: 'violet.6' },
        { name: 'total_attendance', color: 'blue.6' },
      ]}
      tickLine="y"
      barProps={{
        radius: 5
      }}
    />}
    </>
  );
}