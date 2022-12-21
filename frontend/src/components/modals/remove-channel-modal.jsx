const RemoveCannelModal = () => {
  return (
    <div role="dialog" aria-modal="true" style="display: block;" class="fade modal show" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title h4">Удалить канал</div><button type="button" aria-label="Close" data-bs-dismiss="modal"
              class="btn btn-close"></button>
          </div>
          <div class="modal-body">
            <p class="lead">Уверены?</p>
            <div class="d-flex justify-content-end"><button type="button"
              class="me-2 btn btn-secondary">Отменить</button><button type="button"
                class="btn btn-danger">Удалить</button></div>
          </div>
        </div>
      </div>
    </div>

    
    <div role="dialog" aria-modal="true" style={{ display: 'none' }} className="fade modal show" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title h4">
                Добавить канал
              </div>
              <button
                type="button"
                aria-label="Close"
                data-bs-dismiss="modal"
                className="btn btn-close"
              />
            </div>
            <div className="modal-body">
              <form className="">
                <div>
                  <input name="name" id="name" className="mb-2 form-control" value="" />
                  {/* <label className="visually-hidden" htmlFor="name"> */}
                  Имя канала
                  {/* </label> */}
                  <div className="invalid-feedback" />
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="me-2 btn btn-secondary">
                      Отменить
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Отправить
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  )
}