import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { actions as channelAction } from '../../store/reducers/channels';
import { actions } from '../../store/reducers/modals';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const handleIdClick = (id) => {
    dispatch(channelAction.setCurrentChannelId(id));
  };

  const handleRemoveClick = () => {
    dispatch(channelAction.setChangedChannelId(channel.id));
    dispatch(actions.showModal({ modalType: 'remove', itemId: channel.id }));
  };

  const handleRenameClick = () => {
    dispatch(channelAction.setChangedChannelId(channel.id));
    dispatch(actions.showModal({ modalType: 'rename', itemId: channel.id }));
  };

  const generalClass = 'w-100 rounded-0 text-start btn';
  const channelClass = cn(generalClass, {
    'btn-secondary': channel.id === currentChannelId,
  });

  return (
    <Dropdown as={ButtonGroup} className="nav-item w-100">
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
      {channel.removable
        && (
          <>
            <Dropdown.Toggle
              split
              variant={channel.id === currentChannelId ? 'secondary' : 'light'}
              className="flex-grow-0 text-end"
            >
              <span className="visually-hidden">
                Управление каналом
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleRemoveClick}>
                Удалить
              </Dropdown.Item>
              <Dropdown.Item onClick={handleRenameClick}>
                Переименовать
              </Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
    </Dropdown>
  );
};

export default Channel;
