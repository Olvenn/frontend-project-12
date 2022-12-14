import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Required'),
  password: yup
    .string()
    .required('Required'),
});

const Auth = () => {
  const [validated, setValidated] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const initialValues = {
    username: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setValidated(false);

      try {
        console.log(values);
      } catch (err) {
        console.log(err);
        if (err.isAxiosError && err.response.status === 401) {
          setValidated(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="./images/avatar.jpg" className="rounded-circle" alt="Войти" />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    name="username"
                    id="username"
                    className="form-control"
                    autoComplete="username"
                    placeholder="Ваш ник"
                    isInvalid={validated}
                    required
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">
                    Ваш ник
                  </Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    id="password"
                    placeholder="password"
                    name="password"
                    autoComplete="current-password"
                    type="password"
                    isInvalid={validated}
                    required
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Control.Feedback class="invalid-tooltip" type="invalid">
                    Неверные имя пользователя или пароль
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="w-100 mb-3 btn" variant="outline-primary">Войти</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  Нет аккаунта?
                </span>
                <a href="/signup">
                  Регистрация
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
// https://formik.org/docs/api/errormessage
// https://formik.org/docs/api/useFormik
// https://react-bootstrap.github.io/forms/validation/
// https://formik.org/docs/guides/validation
// https://www.smashingmagazine.com/2020/10/react-validation-formik-yup/
// https://formik.org/docs/guides/validation
