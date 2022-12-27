import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions } from '../../store/reducers/modals';
import AddCannelModal from './add-channel-modal';
import RemoveCannelModal from './remove-channel-modal';
import RenameCannelModal from './rename-channel-modal';

const Modals = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modals.isOpen);
  const type = useSelector((state) => state.modals.modalType);
  if (!isOpen) return null;

  const modalsData = {
    add: [AddCannelModal, t('modalAdd.addChannel')],
    remove: [RemoveCannelModal, t('modalRemove.removeChannel')],
    rename: [RenameCannelModal, t('modalRename.renameChannel')],
  };

  const Component = modalsData[type][0];

  const handleClose = () => {
    dispatch(actions.hideModal());
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>
          {modalsData[type][1]}
        </Modal.Title>
      </Modal.Header>
      <Component onClose={handleClose} />
    </Modal>
  );
};

export default Modals;
