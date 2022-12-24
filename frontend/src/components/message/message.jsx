const Message = ({ message }) => {
  console.log('auth', message.userName);

  return (
    <div className="text-break mb-2">
      <b>{message.userName}</b>
      {`: ${message.body}`}
    </div>
  );
};

export default Message;
