import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../store/reducers/channels';
// import { actions as channelsActions } from '../slices/channelsSlice.js';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  console.log(currentChannelId);

  const handleIdClick = (id) => {
    dispatch(actions.setCurrentChannelId(id));
  };

  const generalClass = 'w-100 rounded-0 text-start btn';
  const channelClass = cn(generalClass, {
    'btn-secondary': channel.id === currentChannelId,
  });

  return (
    <li className="nav-item w-100">
      <button
        onClick={() => handleIdClick(channel.id)}
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
