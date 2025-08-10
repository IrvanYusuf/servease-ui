import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type ChartMonthlyRevenueProps = {
  data: { month: string; revenue: number }[];
};

const ChartMonthlyRevenue = ({ data }: ChartMonthlyRevenueProps) => {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `Rp${value / 1000}k`} />
          <Tooltip formatter={(value) => `Rp${value.toLocaleString()}`} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartMonthlyRevenue;
