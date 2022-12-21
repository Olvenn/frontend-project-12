import { useContext } from 'react';
import SocketContext from '../contexts/socketContext';

const useSocket = () => {
  const context = useContext(SocketContext);
  return context;
};

export default useSocket;
