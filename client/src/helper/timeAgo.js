function timeAgo(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date(timestamp);
    const diff = currentDate - targetDate;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return `${targetDate.toLocaleString('default', { month: 'long' })} ${targetDate.getFullYear()}`;
    }
    if (months > 0) {
        return months === 1 ? '1 month ago' : `${months} months ago`;
    }
    if (days > 0) {
        return days === 1 ? '1 day ago' : `${days} days ago`;
    }
    if (hours > 0) {
        return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    }
    if (minutes > 0) {
        return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    }
    return 'just now';
}

export default timeAgo