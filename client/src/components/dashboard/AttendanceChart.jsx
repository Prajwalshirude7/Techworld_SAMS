import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", attendance: 82 },
  { day: "Tue", attendance: 90 },
  { day: "Wed", attendance: 86 },
  { day: "Thu", attendance: 95 },
  { day: "Fri", attendance: 88 },
  { day: "Sat", attendance: 97 },
];

export default function AttendanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <XAxis dataKey="day" stroke="#CBD5E1" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="attendance"
          stroke="#14B8A6"
          fill="#14B8A6"
          fillOpacity={0.25}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}