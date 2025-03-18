import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, FormControlLabel, IconButton } from '@mui/material';
import Chart from '../components/Chart';
import Filter from '../components/Filter';
import { fetchAPIRequest } from '../store/visualisation/apiSLice';
import { RootState } from '../store';
import { options } from '../utils/options';
import TableComponent from '../components/TableComponent';
import { Download } from 'tabler-icons-react';

const HomePage = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.apiData);
  const [selectedOrbit, setSelectedOrbit] = useState('');
  const [isChartView, setIsChartView] = useState(false);

  useEffect(() => {
    dispatch(fetchAPIRequest());
  }, [dispatch]);

  const filteredData = selectedOrbit
    ? data.filter((item) => item.orbiting_body.includes(selectedOrbit))
    : data;

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen relative">
        <img src="/loading.gif" width={100} alt="loader" />
      </div>
    );

  if (error) return <p className="text-red-500">{error}</p>;

  //convert JSON data to CSV format
  const convertToCSV = (jsonData: any[]) => {
    const headers = Object.keys(jsonData[0]);
    const csvRows = [];
    csvRows.push(headers.join(','));
    jsonData.forEach((row) => {
      const values = headers.map((header) => `"${row[header]}"`);
      csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(filteredData);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'filtered_data.csv';
    link.click();
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="absolute top-2 right-2 z-10 flex items-center gap-4"> 
        {/* Filter Component */}
        <Filter options={options} selectedOrbit={selectedOrbit} onChange={setSelectedOrbit} />
        {/* Download */}
        <IconButton
          onClick={downloadCSV}
          style={{
            backgroundColor: '#2986cc',
            color: '#fff',
          }}
        >
          <Download />
        </IconButton>
      </div>

      {/* Switch Toggle */}
      <div className="absolute top-2 left-2 z-10">
        <FormControlLabel
          control={
            <Switch
              checked={isChartView}
              onChange={() => setIsChartView(!isChartView)}
              name="viewToggle"
              color="primary"
            />
          }
          label={isChartView ? 'Switch to Table View' : 'Switch to Chart View'}
        />
      </div>

      {/* Display Chart or Table */}
      {isChartView ? (
        <Chart data={filteredData} />
      ) : (
        <TableComponent data={filteredData} />
      )}
    </div>
  );
};

export default HomePage;
