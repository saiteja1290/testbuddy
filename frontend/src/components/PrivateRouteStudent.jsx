import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteStudent = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.role === 'student' ? <Outlet /> : <Navigate to='/studentlogin' />;
};

export default PrivateRouteStudent;
