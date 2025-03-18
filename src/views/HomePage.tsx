import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, FormControlLabel } from '@mui/material';
import Chart from '../components/Chart';
import Filter from '../components/Filter';
import { fetchAPIRequest } from '../store/visualisation/apiSLice';
import { RootState } from '../store';
import { options } from '../utils/options';
import TableComponent from '../components/TableComponent';

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

  return (
    <div className="flex justify-center items-center h-screen relative">
      {/* Filter Component */}
      <div className="absolute top-2 right-2 z-10">
        <Filter options={options} selectedOrbit={selectedOrbit} onChange={setSelectedOrbit} />
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
      {isChartView ? (
        <Chart data={filteredData} />
      ) : (
        <TableComponent data={filteredData} />
      )}

    </div>
  );
};

export default HomePage;
