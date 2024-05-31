const convertToReadableTime = (isoString) => {
    const date = new Date(isoString);

    // Extract hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine AM/PM suffix
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour time to 12-hour time
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Pad minutes with leading zero if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${formattedMinutes} ${ampm}`;
};

export default convertToReadableTime