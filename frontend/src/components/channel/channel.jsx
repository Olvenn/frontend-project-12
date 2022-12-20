import cn from 'classnames';
import { useSelector } from 'react-redux';

const Channel = ({ channel }) => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  console.log(currentChannelId);

  const generalClass = 'w-100 rounded-0 text-start btn';
  const channelClass = cn(generalClass, {
    'btn-secondary': channel.id === currentChannelId,
  });

  return (
    <li className="nav-item w-100">
      <button
        type="button"
        className={channelClass}
      >
        <span className="me-1">
          #
        </span>
        {channel.name}
      </button>
    </li>
  );
};

export default Channel;
