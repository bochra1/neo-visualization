import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from '../components/Chart';
import { fetchAPIRequest } from '../store/visualisation/apiSLice';
import { RootState } from '../store';

const HomePage = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.apiData);

  useEffect(() => {
    dispatch(fetchAPIRequest());
  }, [dispatch]);

  if (loading) return ( <div className="flex justify-center items-center h-screen relative">
<img src="/loading.gif" width={100} alt="loader" /></div>);
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex justify-center items-center h-screen relative">
<div className="absolute left-[50px] top-1/2 transform -translate-y-1/2 text-gray-500" style={{ writingMode: 'sideways-lr' }}>
        <span>Neo Name</span>
      </div>
       <Chart data={data} /> 
    </div>
  );
};

export default HomePage;
