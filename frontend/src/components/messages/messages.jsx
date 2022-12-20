import { useSelector } from 'react-redux';
import { selectors } from '../../store/reducers/messages';

const Messages = () => {
  const messages = useSelector(selectors.selectAll);
  console.log('message', messages);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      <div className="text-break mb-2">
        <b>hjvf</b>
        : привет
      </div>
      <div className="text-break mb-2">
        <b>hjvf</b>
        : hi
      </div>
    </div>
  );
};

export default Messages;
