export function getCurrentTime() {
    const date = new Date();
    
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
    const formattedTime = `${hours}:${formattedMinutes} ${ampm}`;

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1; 
    const formattedDate = `${day}.${dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth}.${month < 10 ? '0' + month : month}`;

    return { formattedTime, formattedDate };
}
