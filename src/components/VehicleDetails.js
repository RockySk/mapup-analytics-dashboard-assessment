import React from 'react';
import PropTypes from 'prop-types';

const VehicleDetails = ({ vehicle }) => {
    if (!vehicle) {
        return <p>No vehicle details available.</p>;
    }

    return (
        <div className="vehicle-details">
            <h2>Vehicle Details</h2>
            <p><strong>County:</strong> {vehicle.County}</p>
            <p><strong>City:</strong> {vehicle.City}</p>
            <p><strong>State:</strong> {vehicle.State}</p>
            <p><strong>Postal Code:</strong> {vehicle['Postal Code']}</p>
            <p><strong>Model:</strong> {vehicle.Model}</p>
            <p><strong>CAFV Eligibility:</strong> {vehicle['CAFV Eligibility']}</p>
            <p><strong>Electric Range:</strong> {vehicle['Electric Range']}</p>
            <p><strong>Legislative District:</strong> {vehicle['Legislative District']}</p>
            <p><strong>DOL Vehicle ID:</strong> {vehicle['DOL Vehicle ID']}</p>
            <p><strong>Electric Utility:</strong> {vehicle['Electric Utility']}</p>
            <p><strong>2020 Census Tract:</strong> {vehicle['2020 Census Tract']}</p>
        </div>
    );
};

VehicleDetails.propTypes = {
    vehicle: PropTypes.shape({
        County: PropTypes.string,
        City: PropTypes.string,
        State: PropTypes.string,
        'Postal Code': PropTypes.string,
        Model: PropTypes.string,
        'CAFV Eligibility': PropTypes.string,
        'Electric Range': PropTypes.number,
        'Legislative District': PropTypes.string,
        'DOL Vehicle ID': PropTypes.string,
        'Electric Utility': PropTypes.string,
        '2020 Census Tract': PropTypes.string,
    }),
};

export default VehicleDetails;
