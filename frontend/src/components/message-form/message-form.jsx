import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useAuth from '../../hooks/useAuth';
import useSocket from '../../hooks/useSocket';

const MessageForm = () => {
  const inputRef = useRef();
  const auth = useAuth();
  const user = auth.userName?.username;
  const socketApi = useSocket();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  console.log('adgas', auth);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    body: yup
      .string()
      .trim()
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setStatus();
      setSubmitting(true);
      const text = values.body;
      const channelId = currentChannelId;
      const username = user;
      console.log('user', user);
      const data = {
        body: text,
        channelId,
        username,
      };
      socketApi.sendMessage(
        data,
        () => {
          setSubmitting(false);
        },
        () => {
          console.log('error');
          setSubmitting(false);
        },
      );
      formik.resetForm();
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <InputGroup>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.body}
            ref={inputRef}
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2 form-control"

          />
          <Button
            type="submit"
            className="btn btn-group-vertical"
            disabled={formik.isSubmitting}
            onKeyDown={formik.handleSubmit}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
