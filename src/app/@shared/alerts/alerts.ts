import { EMAIL_PATTERN } from '@admin/core/constants/regex';
import Swal from 'sweetalert2';

const swalWithBasicOptions = (title: string, html: string) =>
  Swal.mixin({
    title,
    html,
    cancelButtonText: 'Cancelar',
    focusConfirm: true,
    showCancelButton: true,
  });

export const basicFormDialog = async (
  title: string,
  html: string,
  property: string
) => {
  return await swalWithBasicOptions(title, html).fire({
    title,
    html,
    focusConfirm: true,
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
    preConfirm: () => {
      const value = (document.getElementById('name') as HTMLInputElement).value;

      if (value) {
        return value;
      }
      Swal.showValidationMessage('El nombre del género no puede estar vacío');
      return;
    },
  });
};

export const useFormBasicFormDialog = async (title: string, html: string) => {
  return await swalWithBasicOptions(title, html).fire({
    title,
    html,
    focusConfirm: true,
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
    preConfirm: () => {
      let error = '';

      const name = (document.getElementById('name') as HTMLInputElement).value;
      const lastName = (document.getElementById('lastName') as HTMLInputElement)
        .value;
      const email = (document.getElementById('email') as HTMLInputElement)
        .value;
      const role = (document.getElementById('role') as HTMLInputElement).value;

      if (!name) {
        error += 'El nombre del usuario es requerido. <br/>';
      }

      if (!lastName) {
        error += 'Los apellidos del usuario son requeridos. <br/>';
      }

      if (!email || EMAIL_PATTERN.test(email)) {
        error += 'Debe ingresar un email válido. <br/>';
      }

      if (error.length > 0) {
        Swal.showValidationMessage(error);
        return;
      }

      return {
        name,
        lastName,
        email,
        role,
        password: '1234',
        active: false,
        birthDate: new Date().toISOString(),
        confirm_password: '1234',
      };
    },
  });
};

export const optionsWithDetails = (
  title: string,
  html: string,
  tipo: string,
  active?: boolean
) => {
  return new Promise((resolve, reject) => {
    let obj = {};

    if (tipo === 'info') {
      console.log({ active });
      obj = {
        title,
        html,
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor:
          active === null || Boolean(active) === true ? '#d33' : '#28a745',
        confirmButtonText: '<i class="fa-solid fa-pen-to-square"></i> Editar',
        cancelButtonText:
          active === null || Boolean(active) === true
            ? '<i class="fa-solid fa-lock"></i> Bloquear'
            : '<i class="fa-solid fa-lock-open"></i> Desbloquear',
      };
    } else {
      obj = {
        title,
        html,
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '<i class="fa-solid fa-ban"></i> Cancelar',
        cancelButtonText: '<i class="fa-solid fa-lock"></i> Bloquear',
      };
    }

    Swal.fire(obj).then((result) => {
      if (result.value) {
        // editar registro
        return resolve(true);
      } else if (result.dismiss.toString() === 'cancel') {
        // bloquear registro
        return resolve(false);
      }
    });
  });
};

export const loadData = (title: string,html: string, timer: number = 400) => {


  return Swal.fire({
    title,
    html,
    timer,
    didOpen: () => {
      Swal.showLoading();
  
    }
  })
};

export const closeAlert = () => {

  Swal.close();
}