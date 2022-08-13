import  Swal  from 'sweetalert2';

export const basicFormDialog = async (
  title: string,
  html: string,
  property: string
) => {
  return await Swal.fire({
    title,
    html,
    focusConfirm: true,
    cancelButtonText: "Cancelar",
    showCancelButton: true,
    preConfirm: () => {
      
        const value = (document.getElementById('name') as HTMLInputElement).value;

        if(value) {

            return value;
        }
        Swal.showValidationMessage("El nombre del género no puede estar vacío");
        return;
    },
  });
};

export const optionsWithDetails =  (title: string, html: string,tipo: string) => {


    return new Promise((resolve,reject) => {

      let obj= {}

    if(tipo=== "info"){
      
      obj = {
        title,
        html,
        showCancelButton: true,
        showCloseButton:true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '<i class="fa-solid fa-pen-to-square"></i> Editar',
        cancelButtonText: '<i class="fa-solid fa-lock"></i> Bloquear'
      }
    }else {

      obj = {
        title,
        html,
        showCancelButton: true,
        showCloseButton:true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '<i class="fa-solid fa-ban"></i> Cancelar',
        cancelButtonText: '<i class="fa-solid fa-lock"></i> Bloquear' 
      }
    }


    Swal.fire(obj)
    .then(result => {

        if(result.value) {   // editar registro
          return resolve(true);
        } else if(result.dismiss.toString() === "cancel") { // bloquear registro
          return resolve(false);
        }
      
     })
    })
      
}
