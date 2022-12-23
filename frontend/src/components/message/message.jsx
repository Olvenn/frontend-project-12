import useAuth from '../../hooks/useAuth';

const Message = ({ message }) => {
  const auth = useAuth();
  console.log('auth', auth);

  return (
    <div className="text-break mb-2">
      <b>{auth.username}</b>
      {`: ${message.body}`}
    </div>
  );
};

export default Message;
