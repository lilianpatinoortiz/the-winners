import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { useTheme } from "@mui/material/styles";

function ChartLine({ title, data }) {
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
              {title}
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

function ChartArea({ title, data }) {
  const theme = useTheme();

  return (
    <>
      <ResponsiveContainer>
        <AreaChart
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
              {title}
            </Label>
          </YAxis>
          <Tooltip />
          <Area
            fill={theme.palette.primary.main}
            isAnimationActive={true}
            animationDuration={2000}
            animationEasing="ease"
            type="monotone"
            dataKey="value"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}

function ChartBar({ title, data, colors }) {
  const theme = useTheme();

  return (
    <>
      <ResponsiveContainer width="99%" height={200}>
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
              {title}
            </Label>
          </YAxis>
          <Tooltip />
          <Bar
            fill={colors ? colors[0] : theme.palette.primary.main}
            isAnimationActive={true}
            animationDuration={3000}
            animationEasing="ease"
            type="monotone"
            dataKey="value"
            dot={true}
          >
            {colors ? (
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))
            ) : (
              <></>
            )}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export { ChartLine, ChartBar, ChartArea };
