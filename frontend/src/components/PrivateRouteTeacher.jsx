import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteTeacher = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.role === 'teacher' ? <Outlet /> : <Navigate to='/adminlogin' />;
};

export default PrivateRouteTeacher;
