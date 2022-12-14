import { Button, Form } from 'react-bootstrap';

const Auth = () => (
  <div className="h-100" id="chat">
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            Hexlet Chat
          </a>
        </div>
      </nav>
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
                      value=""
                      name="username"
                      id="username"
                      autoComplete="username"
                      required
                      placeholder="Ваш ник"
                      className="form-control"
                    />
                    <Form.Label htmlFor="username">
                      Ваш ник
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      value=""
                      id="password"
                      placeholder="password"
                      name="password"
                      autoComplete="current-password"
                      type="password"
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
    </div>
    <div className="Toastify" />
  </div>
);

export default Auth;
