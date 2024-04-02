function validateInputWithNumbers(input: string): boolean {
    const regex = /^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,]*$/;
    if (!input.trim()) return false;
    return regex.test(input);
}

function validateInputNoNumbers(input: string): boolean {
    const regex = /^[a-zA-Z\s!@#$%^&*()_+\-=\[\]{};':"\\|,]*$/;
    if (!input.trim()) return false;
    return regex.test(input);
}

function onlyNumbers(input: string): boolean {
    const regex = /^[0-9]+$/;
    return regex.test(input);
}

function validateEmail(email: string): boolean {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
}

export {
    validateInputWithNumbers,
    validateInputNoNumbers,
    onlyNumbers,
    validateEmail
}
