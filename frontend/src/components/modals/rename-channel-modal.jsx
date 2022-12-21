const RenameCannelModal = () => {
  return (
    <div role="dialog" aria-modal="true" style="display: block;" class="fade modal show" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title h4">Переименовать канал</div><button type="button" aria-label="Close"
              data-bs-dismiss="modal" class="btn btn-close"></button>
          </div>
          <div class="modal-body">
            <form class="">
              <div><input name="name" id="name" class="mb-2 form-control" value="olga"><label class="visually-hidden"
                for="name">Имя канала</label>
                <div class="invalid-feedback"></div>
                <div class="d-flex justify-content-end"><button type="button"
                  class="me-2 btn btn-secondary">Отменить</button><button type="submit"
                    class="btn btn-primary">Отправить</button></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};