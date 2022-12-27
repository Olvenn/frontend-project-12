import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Message from '../message/message';
import MessageForm from '../message-form/message-form';
import { selectors as channelsSelector } from '../../store/reducers/channels';
import { selectors as messagesSelector } from '../../store/reducers/messages';

const Messages = () => {
  const lastRef = useRef();
  const { t } = useTranslation();

  const rawMessages = useSelector(messagesSelector.selectAll);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channels = useSelector(channelsSelector.selectAll);
  console.log(channels.find((channel) => channel.id === currentChannelId));
  const currentChannelName = channels.find((channel) => channel.id === currentChannelId);

  const messages = rawMessages?.filter((message) => message.channelId === currentChannelId);

  useEffect(() => {
    lastRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {` ${currentChannelName?.name}`}
            </b>
          </p>
          <span className="text-muted">
            {t('messages.counter.key', { count: messages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messages?.map((message) => (<Message key={message.id} message={message} />))}
          <span ref={lastRef} />
        </div>
        <MessageForm />
      </div>
    </div>
  );
};

export default Messages;
