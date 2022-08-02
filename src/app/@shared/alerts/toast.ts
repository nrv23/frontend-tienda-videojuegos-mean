import Swal,{SweetAlertIcon} from "sweetalert2";

export const basicAlert =  (icon: SweetAlertIcon = "success", title: string, text: string, confirmButtonText: string,toast: boolean = true) => {
    Swal.fire({
        icon,
        title,
        text,
        confirmButtonText ,
        toast,
        position: "top"
    })
};