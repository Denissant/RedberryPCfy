export async function fetchAndFormat(endpoint) {
    const request = await fetch(`https://pcfy.redberryinternship.ge/api/${endpoint}`);
    const items = await request.json();
    return items.data.map( item => ({value: item.id, label: item.name}));
}
