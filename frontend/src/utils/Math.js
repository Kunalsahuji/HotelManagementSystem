export const calculateAvgRating = (ratings) => {
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return sum / ratings.length;
};

export const calculateDuration = (date) => {
    const currentDate = new Date();
    const createdAtDate = new Date(date);
    const differenceTime = Math.abs(currentDate - createdAtDate);
    const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
    const differenceWeeks = Math.floor(differenceDays / 7);
    const differenceMonths = Math.floor(differenceDays / 30);
    const differenceYears = Math.floor(differenceDays / 365);

    if (differenceYears > 0) {
        return `${differenceYears} year${differenceYears > 1 ? 's' : ''} ago`;
    } else if (differenceMonths > 0) {
        return `${differenceMonths} month${differenceMonths > 1 ? 's' : ''} ago`;
    } else if (differenceWeeks > 0) {
        return `${differenceWeeks} week${differenceWeeks > 1 ? 's' : ''} ago`;
    } else if (differenceDays > 0) {
        return `${differenceDays} day${differenceDays > 1 ? 's' : ''} ago`;
    } else {
        return 'Today';
    }
};