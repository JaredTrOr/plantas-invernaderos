function validateInputWithNumbers(input: string): boolean {
    const regex = /^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,]*$/;
    return regex.test(input);
}

function validateInputNoNumbers(input: string): boolean {
    const regex = /^[a-zA-Z\s!@#$%^&*()_+\-=\[\]{};':"\\|,]*$/;
    return regex.test(input);
}

export {
    validateInputWithNumbers,
    validateInputNoNumbers
}
