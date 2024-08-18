import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const BarChartByCounty = React.memo(({ filteredData }) => {
  console.log('BarChartByCounty filteredData:', filteredData);

  const countyData = filteredData.reduce((acc, curr) => {
    const county = curr.County;
    if (county) {
      const existing = acc.find(item => item.County === county);
      if (existing) {
        existing.Count += 1;
      } else {
        acc.push({ County: county, Count: 1 });
      }
    }
    return acc;
  }, []);

  if (countyData.length === 0) {
    return <p>No data available for the selected criteria.</p>;
  }

  return (
    <div className="chart-box">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={countyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="County" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

BarChartByCounty.propTypes = {
  filteredData: PropTypes.array.isRequired,
};

export default BarChartByCounty;
