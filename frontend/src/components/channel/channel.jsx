import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions as channelAction } from '../../store/reducers/channels';
import { actions } from '../../store/reducers/modals';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channels = useSelector((state) => state.channels.setNew);
  console.log('channels', channels);

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
                {t('channels.manage')}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleRemoveClick}>
                {t('channels.remove')}
              </Dropdown.Item>
              <Dropdown.Item onClick={handleRenameClick}>
                {t('channels.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
    </Dropdown>
  );
};

export default Channel;
