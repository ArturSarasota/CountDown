document.addEventListener('DOMContentLoaded', () => {
    const countDownDate = new Date("July 4, 2026 21:00:00").getTime();

    // FIREWORKS LOGIC
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ['#bf0a30', '#ffffff', '#002868']; // Red, White, Blue

    function launchFirework() {
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { 
                x: Math.random(), // Random horizontal position
                y: Math.random() - 0.2 // Slightly off-screen start
            },
            colors: colors,
            ticks: 200,
            gravity: 1.2,
            shapes: ['circle'],
            scalar: 1.2
        });
    }

    // Launch a firework every 3 to 7 seconds randomly
    (function loop() {
        const rand = Math.round(Math.random() * (7000 - 3000)) + 3000;
        setTimeout(() => {
            launchFirework();
            loop();
        }, rand);
    }());

    // COUNTDOWN LOGIC
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

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("countdown").innerHTML = "<h2 style='font-size: 3rem;'>Happy 250th Anniversary!</h2>";
            // Final big firework finale
            confetti({ particleCount: 500, spread: 160, colors: colors });
        }
    }, 1000);
});
