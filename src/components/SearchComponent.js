import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer } from 'recharts';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const SearchComponent = ({ data = [], onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('County');
    const [searchResult, setSearchResult] = useState(null);

    console.log('Rendering SearchComponent');

    const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms delay

    const handleSearch = useCallback(() => {
        console.log('Executing handleSearch');
        if (Array.isArray(data)) {
            const term = debouncedSearchTerm.trim().toLowerCase();
            const filtered = data.find(item => {
                const fieldValue = item[searchField];
                return fieldValue && typeof fieldValue === 'string' &&
                    fieldValue.trim().toLowerCase() === term;
            });

            console.log('Search Result:', filtered);
            setSearchResult(filtered || null);
            onSearch(filtered ? [filtered] : []);
        } else {
            console.error('Data is not an array or is undefined.');
        }
    }, [data, debouncedSearchTerm, searchField, onSearch]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            handleSearch();
        }
    }, [debouncedSearchTerm, handleSearch]);

    return (
        <div className="p-5">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search by ${searchField}`}
                className="border p-2 rounded"
            />
            <button
                onClick={handleSearch}
                className="ml-2 bg-blue-600 text-white p-2 rounded"
            >
                Search
            </button>
            <select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                className="ml-2 border p-2 rounded"
            >
                <option value="County">County</option>
                <option value="VIN (1-10)">VIN</option>
                <option value="Make">Make</option>
                <option value="Model">Model</option>
            </select>

            {searchResult && (
                <div className="mt-5">
                    <h2 className="text-lg font-semibold">Vehicle Details</h2>



                    <div className="border p-3 mb-3 rounded bg-gray-100 chart-box">

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                            <div class="flex flex-col space-y-2 ml-8">
                                <p><strong>County:</strong> {searchResult.County}</p>
                                <p><strong>City:</strong> {searchResult.City}</p>
                                <p><strong>State:</strong> {searchResult.State}</p>
                                <p><strong>Postal Code:</strong> {searchResult['Postal Code']}</p>
                                <p><strong>Model:</strong> {searchResult.Model}</p>
                                <p><strong>CAFV Eligibility:</strong> {searchResult['CAFV Eligibility']}</p>
                            </div>
                            <div class="flex flex-col space-y-2 ml-8">
                                <p><strong>Electric Range:</strong> {searchResult['Electric Range']}</p>
                                <p><strong>Legislative District:</strong> {searchResult['Legislative District']}</p>
                                <p><strong>DOL Vehicle ID:</strong> {searchResult['DOL Vehicle ID']}</p>
                                <p><strong>Electric Utility:</strong> {searchResult['Electric Utility']}</p>
                                <p><strong>2020 Census Tract:</strong> {searchResult['2020 Census Tract']}</p>
                                <p><strong>VIN (1-10):</strong> {searchResult['VIN (1-10)']}</p>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

SearchComponent.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            County: PropTypes.string,
            City: PropTypes.string,
            State: PropTypes.string,
            'Postal Code': PropTypes.string,
            Model: PropTypes.string,
            'CAFV Eligibility': PropTypes.string,
            'Electric Range': PropTypes.string,
            'Legislative District': PropTypes.string,
            'DOL Vehicle ID': PropTypes.string,
            'Electric Utility': PropTypes.string,
            '2020 Census Tract': PropTypes.string,
            'VIN (1-10)': PropTypes.string,
        })
    ),
    onSearch: PropTypes.func.isRequired,
};

SearchComponent.defaultProps = {
    data: [],
};

export default SearchComponent;
