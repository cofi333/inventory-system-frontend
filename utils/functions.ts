export const userActionMessages = (toast, status) => {
    switch (status) {
        case "1":
            toast("success", "Your account is activated. You can login now.");
            break;

        case "2":
            toast(
                "success",
                "Your password has been changed. You can now log in."
            );
            break;
    }
};

export const getCurrentDateTime = () => {
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    return `${day}.${month}.${year}. ${hours}:${minutes}:${seconds}`;
};

export const handleBodyScroll = (scrollState) => {
    if (scrollState) {
        document.body.classList.add("no-scroll");
    } else {
        document.body.classList.remove("no-scroll");
    }
};

// Custom CRUD table validations

export const roomTableValidator = (rowData) => {
    const { roomNumber, roomDescription, roomName } = rowData;
    let message;
    let isValid = true;

    if (roomNumber.trim() === "" || isNaN(roomNumber)) {
        message = "Room number must be a number and can't be empty.";
        isValid = false;
    }

    if (roomName.trim() === "" || roomName.length < 5) {
        message = "Room name must have at least 5 characters.";
        isValid = false;
    }

    if (roomDescription.trim() === "" || roomDescription.length < 20) {
        message = "Room description must have at least 20 characters.";
        isValid = false;
    }

    return { message, isValid };
};

export const companiesTableValidator = (rowData) => {
    const { company_name, company_mail, company_state, company_address } =
        rowData;
    let message;
    let isValid = true;

    if (company_name.trim() === "" || company_name.length < 3) {
        message = "Company name must have at least 3 characters.";
        isValid = false;
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(company_mail)) {
        message = "Company email is not valid.";
        isValid = false;
    }

    if (company_state.trim() === "" || company_state.length < 3) {
        message = "Company state must have at least 3 characters.";
        isValid = false;
    }

    if (company_address.trim() === "" || company_address.length < 3) {
        message = "Company address must have at least 3 characters.";
        isValid = false;
    }

    return { message, isValid };
};
