import Swal,{SweetAlertIcon,SweetAlertArrayOptions} from "sweetalert2";

export const basicAlert =  (icon: SweetAlertIcon = "success", title: string, text: string, confirmButtonText: string,toast: boolean = true) => {
    Swal.fire({
        icon,
        title,
        text,
        showConfirmButton: false,
        toast,
        position: "top",
        timer: 3000,
        timerProgressBar: true
    })
};