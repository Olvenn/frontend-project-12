import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import useSocket from '../../hooks/useSocket';

const RemoveCannelModal = ({ onClose }) => {
  const socketApi = useSocket();
  const { t } = useTranslation();
  const removeId = useSelector((state) => state.channels.changedChannelId);

  const handleClick = () => {
    socketApi.removeChannel(
      { id: removeId },
      () => {
        toast.success(t('modalRemove.success'));
        onClose();
      },
      () => {
        toast.error(t('errors.unknown'));
      },
    );
  };

  return (
    <Modal.Body>
      <p className="lead">
        {t('modalRemove.confirm')}
      </p>
      <div className="d-flex justify-content-end">
        <Button
          className="me-2 btn"
          variant="secondary"
          onClick={onClose}
        >
          {t('modals.cancel')}
        </Button>
        <Button
          onClick={handleClick}
          type="submit"
          variant="danger"
        >
          {t('modalRemove.remove')}
        </Button>
      </div>
    </Modal.Body>
  );
};

export default RemoveCannelModal;
