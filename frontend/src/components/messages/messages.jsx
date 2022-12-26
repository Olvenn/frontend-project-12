import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Message from '../message/message';
import MessageForm from '../message-form/message-form';
import { selectors } from '../../store/reducers/messages';

const Messages = () => {
  const rawMessages = useSelector(selectors.selectAll);
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannelName = useSelector((state) => state.channels.currentChannelName);
  const messages = rawMessages?.filter((message) => message.channelId === currentChannelId);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {` ${currentChannelName}`}
            </b>
          </p>
          <span className="text-muted">
            {t('messages.counter.key', { count: messages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages?.map((message) => (<Message key={message.id} message={message} />))}
        </div>
        <MessageForm />
      </div>
    </div>
  );
};

export default Messages;
