import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from '../components/Chart';
import Filter from '../components/Filter';
import { fetchAPIRequest } from '../store/visualisation/apiSLice';
import { RootState } from '../store';
import { options } from '../utils/options';

const HomePage = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.apiData);
  const [selectedOrbit, setSelectedOrbit] = useState('');
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
  
      {/* Chart */}
      {filteredData.length > 0 && (
        <div
          className="absolute left-[50px] top-1/2 transform -translate-y-1/2 text-gray-500"
          style={{ writingMode: "sideways-lr" }}
        >
          <span>Neo Name</span>
        </div>
      )}
      <Chart data={filteredData} />
    </div>
  );
  
};

export default HomePage;
