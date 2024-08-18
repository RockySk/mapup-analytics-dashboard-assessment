import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const StackedBarChart = ({ data }) => {
  console.log('StackedBarChart data:', data);

  const chartData = data.map(item => ({
    name: item.County,
    electricRange: item['Electric Range'],
    baseMSRP: item['Base MSRP'],
  }));

  return (
    <div className="chart-box">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="electricRange" stackId="a" fill="#8884d8" />
          <Bar dataKey="baseMSRP" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

StackedBarChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default StackedBarChart;
