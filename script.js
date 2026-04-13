// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Set the exact date and time (July 4, 2026 at 21:00:00)
    const countDownDate = new Date("July 4, 2026 21:00:00").getTime();

    // Update the countdown every 1 second
    const timerInterval = setInterval(function() {

        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const formatTime = (time) => time < 10 ? `0${time}` : time;

        document.getElementById("days").innerText = formatTime(days);
        document.getElementById("hours").innerText = formatTime(hours);
        document.getElementById("minutes").innerText = formatTime(minutes);
        document.getElementById("seconds").innerText = formatTime(seconds);

        // If the countdown finishes
        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("countdown").innerHTML = "<h2 style='font-size: 3.5rem;'>Happy 250th Anniversary!</h2>";
        }
    }, 1000);
});
