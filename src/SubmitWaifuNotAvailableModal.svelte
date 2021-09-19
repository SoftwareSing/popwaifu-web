<script>
  import { i18n } from './i18n/i18n'
</script>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">
          {i18n.helpUsAddMoreWaifu()}
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        {i18n.tooManyWaifuSubmit()}
      </div>
    </div>
  </div>
</div>

<style>
  .modal-body {
    white-space: pre-line;
  }
</style>
