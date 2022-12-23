import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../store/reducers/modals';
import useSocket from '../../hooks/useSocket';
import { actions as channelAction } from '../../store/reducers/channels';

const RemoveCannelModal = () => {
  const dispatch = useDispatch();
  const removeApi = useSocket();
  const removeId = useSelector((state) => state.channels.changedChannelId);
  console.log('removeId', removeId);

  const handleClick = () => {
    removeApi.removeChannel(
      { removeId },
      () => {
        dispatch(channelAction.removeChannel(removeId));
      },
      () => { console.log('error'); },
    );
  };

  return (
    <Modal.Body>
      <p className="lead">
        Уверены?
      </p>
      <div className="d-flex justify-content-end">
        <Button
          className="me-2 btn"
          variant="secondary"
          onClick={() => dispatch(actions.hideModal())}
        >
          Отменить
        </Button>
        <Button
          onClick={handleClick}
          type="submit"
          variant="danger"
        >
          Удалить
        </Button>
      </div>
    </Modal.Body>
  );
};

export default RemoveCannelModal;
