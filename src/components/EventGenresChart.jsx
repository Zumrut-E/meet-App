import React from "react";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from "recharts";

const EventGenresChart = ({ events }) => {
  const [data, setData] = React.useState([]);

  // Slices (and label text) will follow this order
  const genres = ["React", "JavaScript", "Node", "jQuery", "Angular"];
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  // Build chart data: [{ name, value }, ...]
  const getData = () => {
    const data = genres.map((genre) => {
      const filteredEvents = events.filter((event) =>
        event.summary.includes(genre)
      );
      return { name: genre, value: filteredEvents.length };
    });
    return data;
  };

  // Custom label renderer that prints "Genre 50%" near each slice
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius; // distance from center
    // Position label a bit outside the arc (×1.07 gives some breathing room)
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;

    return percent ? (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  React.useEffect(() => {
    setData(getData());
  }, [events]);

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
  data={data}
  dataKey="value"
  labelLine={false}
  label={renderCustomizedLabel}
  outerRadius={150}
>
  {data.map((entry, index) => (
    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ))}
</Pie>
  <Legend verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
