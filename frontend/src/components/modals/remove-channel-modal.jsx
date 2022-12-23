import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import useSocket from '../../hooks/useSocket';

const RemoveCannelModal = ({ onClose }) => {
  const socketApi = useSocket();
  const removeId = useSelector((state) => state.channels.changedChannelId);
  console.log('removeId', removeId);

  const handleClick = () => {
    console.log('remove');
    socketApi.removeChannel(
      { id: removeId },
      () => {
        onClose();
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
          onClick={onClose}
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
