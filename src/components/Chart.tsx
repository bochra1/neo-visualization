import React from 'react';
import { Bar, BarChart, Label, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { NearEarthObject } from '../store/visualisation/types';

interface ChartProps {
  data: NearEarthObject[];
}

const Chart = ({ data }: ChartProps) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-64 bg-gray-100 text-gray-500">
        <span>No Data Available</span>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="70%" height={500}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" domain={[0, 'dataMax']}>
          <Label value="Min Estimated Diameter (KM)" offset={0} position="insideBottom" />
        </XAxis>
        <YAxis dataKey="name" type="category" width={200} >
          <Label
            value="Neo Name" 
            angle={-90}
            position="insideLeft" 
            dx={2}  
          />
        </YAxis>
        <Tooltip />
        <Legend verticalAlign="top" height={30} />
        <Bar dataKey="estimated_diameter_min" fill="#2986cc" name="Min Estimated Diameter (km)" />
        <Bar dataKey="estimated_diameter_max" fill="#f44336" name="Max Estimated Diameter (km)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
