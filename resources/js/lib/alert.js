import Swal from "sweetalert2";

export const AlertSuccess = async (message, title = "Success") => {
    return await Swal.fire({
        "icon": "success",
        "title": title,
        "text": message
    })
}

export const AlertError = async (message, title = "Error") => {
    return await Swal.fire({
        "icon": "error",
        "title": title,
        "text": message
    })
}
