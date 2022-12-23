import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useSocket from '../../hooks/useSocket';
import { selectors } from '../../store/reducers/channels';

const AddCannelModal = ({ onClose }) => {
  const socletApi = useSocket();
  const inputRef = useRef();
  const channels = useSelector(selectors.selectAll);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setStatus();
      setSubmitting(true);
      socletApi.createChannel(
        { name: values.name },
        () => {
          onClose();
          setSubmitting(false);
        },
        () => {
          console.log('error');
          setSubmitting(false);
        },
      );
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
            onClick={onClose}
            disabled={formik.isSubmitting}
          >
            Отменить
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={formik.isSubmitting}
          >
            Отправить
          </Button>
        </div>
      </Form>
    </Modal.Body>
  );
};

export default AddCannelModal;
