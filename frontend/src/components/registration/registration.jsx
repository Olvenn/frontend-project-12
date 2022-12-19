import { Button, Form } from 'react-bootstrap';

const Registration = () => {
  const reg = {};
  console.log(reg);

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <img src="/static/media/avatar_1.6084447160acc893a24d.jpg" className="rounded-circle" alt="Регистрация" />
            </div>
            <Form className="w-50">
              <h1 className="text-center mb-4">
                Регистрация
              </h1>
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  className="form-floating mb-3"
                  placeholder="От 3 до 20 символов"
                  name="username"
                  autoComplete="username"
                  required
                  id="username"
                  value=""
                />
                <Form.Label className="form-label" for="username">
                  Имя пользователя
                </Form.Label>
                <Form.Control.Feedback class="invalid-tooltip" type="invalid" tooltip placement="right">
                  Обязательное поле
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="form-floating mb-3">
                <Form.Control
                  placeholder="Не менее 6 символов"
                  name="password"
                  aria-describedby="passwordHelpBlock"
                  required=""
                  autoComplete="new-password"
                  type="password"
                  id="password"
                  className="form-control"
                  value=""
                />
                <Form.Control.Feedback className="invalid-tooltip" type="invalid" tooltip>
                  Обязательное поле
                </Form.Control.Feedback>
                <Form.Label className="form-label" htmlFor="password">
                  Пароль
                </Form.Label>
              </Form.Group>
              <Form.Group className="form-floating mb-4">
                <Form.Control
                  placeholder="Пароли должны совпадать"
                  name="confirmPassword"
                  required=""
                  autoComplete="new-password"
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  value=""
                />
                <div className="invalid-tooltip" />
                <Form.Label className="form-label" htmlFor="confirmPassword">
                  Подтвердите пароль
                </Form.Label>
              </Form.Group>
              <Button
                type="submit"
                className="w-100 btn btn-outline-primary">
                Зарегистрироваться
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
