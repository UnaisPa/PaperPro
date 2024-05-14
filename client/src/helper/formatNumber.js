const formatNumber = (number) =>{
    const formattedNumber = new Intl.NumberFormat().format(number);
    return formattedNumber;
}

export default formatNumber