import { useSelector } from 'react-redux';
import Message from '../message/message';
import MessageForm from '../message-form/message-form';
import { selectors } from '../../store/reducers/messages';

const Messages = () => {
  const messages = useSelector(selectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              # general
            </b>
          </p>
          <span className="text-muted">
            0 сообщений
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages?.filter((message) => message.channelId === currentChannelId)
            .map((message) => (<Message key={message.id} message={message} />))}
        </div>
        <MessageForm />
      </div>
    </div>
  );
};

export default Messages;
