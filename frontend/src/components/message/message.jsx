import useAuth from '../../hooks/useAuth';

const Message = ({ message }) => {
  const auth = useAuth();
  console.log('auth', message.userName);

  return (
    <div className="text-break mb-2">
      <b>{auth.userName?.username}</b>
      {`: ${message.body}`}
    </div>
  );
};

export default Message;
