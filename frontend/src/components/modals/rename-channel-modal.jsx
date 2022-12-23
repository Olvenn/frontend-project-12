import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { selectors } from '../../store/reducers/channels';
import useSocket from '../../hooks/useSocket';
import { actions } from '../../store/reducers/modals';

const RenameCannelModal = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const api = useSocket();
  const channels = useSelector(selectors.selectAll);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, 'Min 3')
      .max(20, 'Max 20')
      .notOneOf(channels.map((channel) => channel.name), 'Such a channel already exists')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      api.createChannel(
        { name: values.name },
        (result) => dispatch(actions.setChannel(result[0].data)),
        () => { console.log('error'); },
      );
      dispatch(actions.hideModal());
    },
  });

  return (
    <Modal.Body>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.name}
          isInvalid={formik.errors.name && formik.touched.name}
          className="mb-2 form-control"
          ref={inputRef}
          id="name"
          name="name"
        />
        <Form.Label htmlFor="name" className="visually-hidden">Имя канала</Form.Label>
        <Form.Control.Feedback type="invalid">
          {formik.errors.name}
        </Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2 btn"
            variant="secondary"
            onClick={() => dispatch(actions.hideModal())}
          >
            Отменить
          </Button>
          <Button
            type="submit"
            variant="primary"
          >
            Отправить
          </Button>
        </div>
      </Form>
    </Modal.Body>
  );
};

export default RenameCannelModal;
