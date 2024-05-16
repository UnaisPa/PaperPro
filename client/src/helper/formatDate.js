const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    // Options for formatting the date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    // Format the date
    const formattedDate = date.toLocaleDateString('en-GB', options);
    return formattedDate
}

export default formatDate