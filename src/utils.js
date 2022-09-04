export async function fetchAndFormat(endpoint) {
    const request = await fetch(`https://pcfy.redberryinternship.ge/api/${endpoint}`);
    const items = await request.json();
    return items.data.map( item => ({value: item.id, label: item.name}));
}


export function bytesToSizeString(bytes) {
    const sizes = ['b', 'kb', 'mb'];
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}


export function truncate(string, maxLength){
    return (string.length > maxLength) ? string.slice(0, maxLength-1) + '...' : string;
}


export function dateStringFormatter(string) {
    const cleanString = string.replace(/\//g, '').replace(/\s+/g, '');
    let finalString = '';
    let numberCount = 0;
    let slashCount = 0;

    for (const char of cleanString) {
        if (/\d/.test(char)) numberCount++;
        finalString += char;
        if (numberCount === 2 && slashCount < 2) {
            slashCount++;
            numberCount = 0;
            finalString += ' / ';
        }
    }

    return finalString.replace(/ \/ $/, '');
}
