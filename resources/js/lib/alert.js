import Swal from "sweetalert2";

export const alertSuccess = async (message, title = "Success") => {
    return await Swal.fire({
        "icon": "success",
        "title": title,
        "text": message
    })
}

export const alertError = async (message, title = "Error") => {
    return await Swal.fire({
        "icon": "error",
        "title": title,
        "text": message
    })
}
