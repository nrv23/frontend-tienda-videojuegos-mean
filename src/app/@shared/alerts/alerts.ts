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

export const infoDetailsBasic = (title: string, html: string) => {

    Swal.fire({
        title,
        text: html,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '<i class="fa-solid fa-pen-to-square"></i> Editar',
        cancelButtonText: '<i class="fa-solid fa-lock"></i> Bloquear'
    })
    .then(result => {

        if(result.value) { // editar registro

        } else if(result.dismiss.toString() === "cancel") { // bloquear registro

        } 
    })
      
}
