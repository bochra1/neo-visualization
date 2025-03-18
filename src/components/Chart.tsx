import React from 'react';
import { Bar, BarChart, Label, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { NearEarthObject } from '../store/visualisation/types';

interface ChartProps {
  data: NearEarthObject[];
}

const Chart = ({ data }: ChartProps) => {
  return (
    <ResponsiveContainer width="70%" height={500}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" domain={[0, 'dataMax']} >
          <Label value="Min Estimated Diameter (KM)" offset={0} position="insideBottom" />
        </XAxis>
        <YAxis dataKey="name" type="category" width={200} />
        <Tooltip />
        <Legend 
            verticalAlign="top"  
            height={40}  
          />
        <Bar dataKey="estimated_diameter_min" fill="#2986cc" name="Min Estimated Diameter (km)" />
        <Bar dataKey="estimated_diameter_max" fill="#f44336" name="Max Estimated Diameter (km)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
