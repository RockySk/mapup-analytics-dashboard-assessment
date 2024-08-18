import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const PieChartComponent = ({ data }) => {
    const [selectedModel, setSelectedModel] = useState('All');
    const [pieData, setPieData] = useState([]);

    useEffect(() => {
        const filteredData = selectedModel === 'All' ? data : data.filter(item => item.Model === selectedModel);

        const aggregatedData = filteredData.reduce((acc, curr) => {
            const make = curr.Make;
            if (make) {
                const existing = acc.find(item => item.name === make);
                if (existing) {
                    existing.value += 1;
                } else {
                    acc.push({ name: make, value: 1 });
                }
            }
            return acc;
        }, []);

        setPieData(aggregatedData);
    }, [data, selectedModel]);

    const models = Array.from(new Set(data.map(item => item.Model)));
    models.unshift('All');

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    if (pieData.length === 0) {
        return <p>No data available for the selected criteria.</p>;
    }

    return (
        <div className="chart-box">
            <div className="mb-5">
                <label htmlFor="model-select" className="mr-2 ml-8">Select Model:</label>
                <select
                    id="model-select"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="border p-2 rounded"
                >
                    {models.map((model, index) => (
                        <option key={index} value={model}>{model}</option>
                    ))}
                </select>
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Tooltip />
                    <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={150}
                        label
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

PieChartComponent.propTypes = {
    data: PropTypes.array.isRequired,
};

export default PieChartComponent;
