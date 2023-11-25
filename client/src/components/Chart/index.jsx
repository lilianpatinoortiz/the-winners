import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTheme } from "@mui/material/styles";

function ChartLine({ data }) {
  const theme = useTheme();

  return (
    <>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="key"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              No. Tasks Completed
            </Label>
          </YAxis>
          <Tooltip />
          <Line
            fill={theme.palette.primary.main}
            isAnimationActive={true}
            animationDuration={2000}
            animationEasing="ease"
            type="monotone"
            dataKey="value"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

function ChartBar({ data }) {
  const theme = useTheme();

  return (
    <>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="key"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              No. Tasks Completed
            </Label>
          </YAxis>
          <Tooltip />
          <Bar
            fill={theme.palette.primary.main}
            isAnimationActive={true}
            animationDuration={2000}
            animationEasing="ease"
            type="monotone"
            dataKey="value"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

function ChartPie({ data }) {
  return (
    <>
      <ResponsiveContainer>
        <PieChart width={700} height={700}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
export { ChartLine, ChartBar, ChartPie };
