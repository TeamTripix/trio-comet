export default function generateSKUNumber() {
    let uniqueNumber = '';

    // Generate 10 digits from timestamp
    const timestamp = new Date().getTime().toString();
    uniqueNumber += timestamp.substr(timestamp.length - 10);

    // Generate 3 random digits
    for (let i = 0; i < 3; i++) {
        uniqueNumber += Math.floor(Math.random() * 10);
    }

    return uniqueNumber;
}