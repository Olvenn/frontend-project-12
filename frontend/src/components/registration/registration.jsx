import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import useAuth from '../../hooks/useAuth';
import routes from '../../routes';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const auth = useAuth();
  const [registration, setRegistration] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required('Required')
      .min(3, 'Min 3')
      .max(20, 'Max 20'),
    password: yup
      .string()
      .trim()
      .required('Required')
      .min(6, 'Min 6'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords don\'t match')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setRegistration(false);

      try {
        const res = await axios.post(routes.registrationPath(), {
          username: values.username,
          password: values.password,
        });
        auth.logIn(res.data);
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setRegistration(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <img src="./images/avatar.jpg" className="rounded-circle" alt="Регистрация" />
            </div>
            <Form
              onSubmit={formik.handleSubmit}
              className="w-50"
            >
              <h1 className="text-center mb-4">
                Регистрация
              </h1>
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  onChange={formik.handleChange}
                  className="form-floating mb-3"
                  placeholder="От 3 до 20 символов"
                  name="username"
                  autoComplete="username"
                  required
                  id="username"
                  isInvalid={
                    (formik.errors.username && formik.touched.username)
                    || registration
                  }
                  value={formik.values.username}
                  ref={inputRef}
                />
                <Form.Label className="form-label" htmlFor="username">
                  Имя пользователя
                </Form.Label>
                <Form.Control.Feedback className="invalid-tooltip" type="invalid">
                  {formik.errors.username}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  onChange={formik.handleChange}
                  placeholder="Не менее 6 символов"
                  name="password"
                  aria-describedby="passwordHelpBlock"
                  required
                  autoComplete="new-password"
                  type="password"
                  id="password"
                  isInvalid={
                    (formik.errors.password && formik.touched.password)
                    || registration
                  }
                  className="form-control"
                  value={formik.values.password}
                />
                <Form.Label className="form-label" htmlFor="password">
                  Пароль
                </Form.Label>
                <Form.Control.Feedback className="invalid-tooltip" type="invalid" tooltip>
                  {formik.errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="form-floating mb-4">
                <Form.Control
                  onChange={formik.handleChange}
                  placeholder="Пароли должны совпадать"
                  name="confirmPassword"
                  required
                  autoComplete="new-password"
                  type="password"
                  id="confirmPassword"
                  isInvalid={
                    (formik.errors.confirmPassword && formik.touched.confirmPassword)
                    || registration
                  }
                  className="form-control"
                  value={formik.values.confirmPassword}
                />
                <div className="invalid-tooltip" />
                <Form.Label className="form-label" htmlFor="confirmPassword">
                  Подтвердите пароль
                </Form.Label>
                <Form.Control.Feedback className="invalid-tooltip" type="invalid" tooltip>
                  {formik.errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="outline-primary" className="w-100 btn">
                Зарегистрироваться
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
