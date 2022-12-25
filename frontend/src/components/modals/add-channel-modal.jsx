import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import useSocket from '../../hooks/useSocket';
import { selectors } from '../../store/reducers/channels';

const AddCannelModal = ({ onClose }) => {
  const socletApi = useSocket();
  const inputRef = useRef();
  const { t } = useTranslation();
  const channels = useSelector(selectors.selectAll);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, t('validation.usernameMinMax'))
      .max(20, t('validation.usernameMinMax'))
      .notOneOf(channels.map((channel) => channel.name), t('validation.alreadyExists'))
      .required(t('validation.required')),
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
          toast.success(t('modalAdd.success'));
          setSubmitting(false);
        },
        () => {
          toast.error(t('errors.unknown'));
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
        <Form.Label htmlFor="name" className="visually-hidden">{t('modals.name')}</Form.Label>
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
            {t('modals.cancel')}
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={formik.isSubmitting}
            onKeyDown={formik.handleSubmit}
          >
            {t('modalAdd.send')}
          </Button>
        </div>
      </Form>
    </Modal.Body>
  );
};

export default AddCannelModal;
