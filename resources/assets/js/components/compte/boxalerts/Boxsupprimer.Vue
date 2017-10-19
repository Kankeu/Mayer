<template>

  <div class="modal fade" tabindex="-1" id="messagedeconfirmation" role="dialog">
      <div class="modal-dialog modal-sm" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title">Confirmer</h4>
              </div>
              <div class="modal-body">
                  <p>Voulez-vous vraiment supprimer cette ligne?</p>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-dismiss="modal">non</button>
                  <button type="button" class="btn btn-success" index="" id="accepter" data-dismiss="modal">oui</button>
              </div>
          </div>
      </div>
 </div>

</template>

<script>

 export default{

 }

</script>

<style scoped>

</style>
