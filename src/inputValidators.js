const validators = {
    lessThanTwo: string => string.length > 1 || 'გამოიყენე მინიმუმ ორი სიმბოლო',
    georgian: string => /^[ა-ჰ]*$/.test(string) || 'გამოიყენე ქართული ასოები',
    laptopName: string => /^[0-9A-Za-z\-!@#$%^&*()_+=]+$/.test(string) || 'ლათინური ასოები, ციფრები, !@#$%^&*()_+=',
    phone: string => /^(\+995)(5\d{8})$/.test(string.replace(/\s+/g, '')) || 'ქართული მობ-ნომრის ფორმატი',
    email: string => ( string.endsWith('@redberry.ge') && !string.startsWith('@') ) || 'უნდა მთავრდებოდეს @redberry.ge-ით',
}

export default validators;