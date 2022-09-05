const validators = {
    lessThanTwo: string => string.length > 1 || 'გამოიყენე მინიმუმ ორი სიმბოლო',
    georgian: string => /^[ა-ჰ]*$/.test(string) || 'გამოიყენე ქართული ასოები',
    laptopName: string => /^[0-9A-Za-z\-!@#$%^&*()_+=]+$/.test(string) || 'ლათინური ასოები, ციფრები, !@#$%^&*()_+=',
    numbersOnly: string => /^[0-9]*$/.test(string) || 'მხოლოდ ციფრები',
    date: string => dateRegex.test(string.replace(/\s+/g, '')) || 'ვალიდური თარიღი თთ/დდ/წწწწ ფორმატით',
    phone: string => /^(\+995)(5\d{8})$/.test(string.replace(/\s+/g, '')) || 'ქართული მობ-ნომრის ფორმატი',
    email: string => ( string.endsWith('@redberry.ge') && !string.startsWith('@') ) || 'უნდა მთავრდებოდეს @redberry.ge-ით',
}

const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/

export default validators;