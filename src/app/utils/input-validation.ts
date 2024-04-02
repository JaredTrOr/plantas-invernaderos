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

export {
    validateInputWithNumbers,
    validateInputNoNumbers
}
