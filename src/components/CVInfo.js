import React from 'react';
import { ResponsiveContainer } from 'recharts';
import SearchComponent from './SearchComponent';

const CVInfo = ({ data }) => {
    return (
        <div>
            <div>
                <ResponsiveContainer width="100%" height={200} className="chart-box xl:container xl:mx-auto ">

                    <div className='flex justify-around'>
                        <div className='flex justify-center'>
                            <p>Name:</p>
                            <p className='info-data ms-5'>NIket</p>
                        </div>
                        <div className='flex justify-center '>
                            <p>Name:</p>
                            <p>NIket</p>
                        </div>
                    </div>
                    <div className='flex justify-around'>
                        <div className='flex justify-center'>
                            <p>Name:</p>
                            <p className='info-data ms-5'>NIket</p>
                        </div>
                        <div className='flex justify-center '>
                            <p>Name:</p>
                            <p>NIket</p>
                        </div>
                    </div>
                
                </ResponsiveContainer> 
            </div>
        </div>
    )
}

export default CVInfo