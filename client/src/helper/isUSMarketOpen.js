 import moment from "moment-timezone"; 

function isUSMarketOpen() {
    // Get the current time in Eastern Time (ET)
    const now = moment().tz('America/New_York');
    
    // Get the current day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
    const dayOfWeek = now.day();
    
    // Check if the current day is a weekday (Monday to Friday)
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;

    // Get the current hour and minute in ET
    const currentHour = now.hours();
    const currentMinute = now.minutes();

    // Create moment objects for the market open and close times
    const marketOpen = moment.tz(`${now.format('YYYY-MM-DD')} 09:30`, 'YYYY-MM-DD HH:mm', 'America/New_York');
    const marketClose = moment.tz(`${now.format('YYYY-MM-DD')} 16:00`, 'YYYY-MM-DD HH:mm', 'America/New_York');

    // Check if the current time is within market hours
    const isMarketOpen = now.isBetween(marketOpen, marketClose, null, '[]');

    // Return true if today is a weekday and the current time is within market hours
    return isWeekday && isMarketOpen;
}
export default isUSMarketOpen