import { useSelector, useDispatch } from 'react-redux';
// import { actions } from '../../store/reducers/modals';
import { Modal } from 'react-bootstrap';
import { actions } from '../../store/reducers/modals';
import AddCannelModal from './add-channel-modal';
import RemoveCannelModal from './remove-channel-modal';
import RenameCannelModal from './rename-channel-modal';

const modalsData = {
  add: [AddCannelModal, 'Добавить канал'],
  remove: [RemoveCannelModal, 'Удалить канал'],
  rename: [RenameCannelModal, 'Переименовать канал'],
};

const Modals = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modals.isOpen);
  const type = useSelector((state) => state.modals.modalType);
  if (!isOpen) return null;

  const Component = modalsData[type][0];
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => dispatch(actions.hideModal())}>
        <Modal.Title>
          {modalsData[type][1]}
        </Modal.Title>
      </Modal.Header>
      <Component />
    </Modal>
  );
};

export default Modals;
