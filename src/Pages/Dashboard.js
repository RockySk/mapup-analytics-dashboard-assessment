import React, { useState, useEffect, useCallback } from 'react';
import BarChartByCounty from '../components/BarChartByCounty';
import StackedBarChart from '../components/StackedBarChart';
import LegendChart from '../components/LegendChart';
import '../App.css';
import SearchComponent from '../components/SearchComponent';
import { parseCSV } from '../utils/csvParser';
import PieChartComponent from '../components/PieChartComponent';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [conclusiveFigures, setConclusiveFigures] = useState({
    totalVehicles: 0,
    uniqueMakes: 0,
    uniqueModels: 0,
    uniqueCounties: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parsedData = await parseCSV('/Electric_Vehicle_Population_Data.csv');

        console.log('Parsed Data:', parsedData);

        // Calculate aggregate data
        const uniqueMakes = new Set(parsedData.map(item => item.Make)).size;
        const uniqueModels = new Set(parsedData.map(item => item.Model)).size;
        const uniqueCounties = new Set(parsedData.map(item => item.County)).size;

        setConclusiveFigures({
          totalVehicles: parsedData.length,
          uniqueMakes,
          uniqueModels,
          uniqueCounties,
        });

        setData(parsedData);
        setFilteredData(parsedData);
      } catch (error) {
        console.error('Error fetching and parsing CSV:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = useCallback((searchData) => {
    console.log('Search Data:', searchData);
    setFilteredData(searchData);
  }, []);

  const renderCharts = useCallback(() => {
    if (filteredData.length === 0) {
      return <p className="text-center text-lg text-gray-600 mt-5">No data available for the selected criteria.</p>;
    }

    return (
      <div className="grid grid-cols-2 gap-5 mt-5">
        <BarChartByCounty filteredData={filteredData} />
        <StackedBarChart data={filteredData} />
        <LegendChart data={filteredData} />
        <PieChartComponent data={filteredData} />
      </div>
    );
  }, [filteredData]);

  return (
    <div className="p-5 max-w-screen-xl mx-auto">
      <h1 className="text-center text-blue-800 mb-5 text-3xl font-bold">EV Insights</h1>
      <div class="ag-format-container">
        <div class="ag-courses_box">
          <div class="ag-courses_item">
            <a href="#" class="ag-courses-item_link">
              <div class="ag-courses-item_bg"></div>

              <div class="ag-courses-item_title text-black-400">
                Total Vehicles
                <p className='numbers'>{conclusiveFigures.totalVehicles}</p>
              </div>
            </a>
          </div>

          <div class="ag-courses_item">
            <a href="#" class="ag-courses-item_link">
              <div class="ag-courses-item_bg"></div>

              <div class="ag-courses-item_title text-black-400">
                Total Makes
                <p className='numbers'>{conclusiveFigures.uniqueMakes}</p>
              </div>
            </a>
          </div>

          <div class="ag-courses_item">
            <a href="#" class="ag-courses-item_link">
              <div class="ag-courses-item_bg"></div>

              <div class="ag-courses-item_title text-black-400">
                Total Models
                <p className='numbers'>{conclusiveFigures.uniqueModels}</p>
              </div>
            </a>
          </div>

          <div class="ag-courses_item">
            <a href="#" class="ag-courses-item_link">
              <div class="ag-courses-item_bg"></div>

              <div class="ag-courses-item_title text-black-400">
                Total Countries
                <p className='numbers'>{conclusiveFigures.uniqueCounties}</p>
              </div>
            </a>
          </div>


        </div>
      </div>
      <SearchComponent data={data} onSearch={handleSearch} />
      {renderCharts()}
    </div>
  );
};

export default Dashboard;
