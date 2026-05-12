document.addEventListener("DOMContentLoaded", () => {
    const progressFill = document.getElementById("progressFill");
    const percentageText = document.getElementById("percentageText");
    const daysText = document.getElementById("daysText");
    const currentYearEl = document.getElementById("currentYear");
    
    const monthProgressFill = document.getElementById("monthProgressFill");
    const monthPercentageText = document.getElementById("monthPercentageText");
    const monthDaysText = document.getElementById("monthDaysText");
    
    const weekProgressFill = document.getElementById("weekProgressFill");
    const weekPercentageText = document.getElementById("weekPercentageText");
    const weekDaysText = document.getElementById("weekDaysText");
    
    const dayProgressFill = document.getElementById("dayProgressFill");
    const dayPercentageText = document.getElementById("dayPercentageText");
    const dayHoursText = document.getElementById("dayHoursText");
    
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    function updateThemeIcon() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        themeIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
    }
    
    updateThemeIcon();
    
    themeToggleBtn.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon();
    });

    const currentYear = new Date().getFullYear();
    if (currentYearEl) {
        currentYearEl.textContent = currentYear;
    }

    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear + 1, 0, 1);
    const totalMs = endOfYear - startOfYear;
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysTotal = Math.floor(totalMs / msPerDay);
    
    let lastDaysElapsed = -1;

    function updateProgress() {
        const now = new Date();
        const elapsedMs = now - startOfYear;
        const percentage = (elapsedMs / totalMs) * 100;
        
        progressFill.style.width = Math.min(percentage, 100) + "%";
        
        percentageText.textContent = percentage.toFixed(6) + "%"; 
        
        const daysElapsed = Math.floor(elapsedMs / msPerDay); 
        if (daysElapsed !== lastDaysElapsed) {
            const daysLeft = daysTotal - daysElapsed;
            daysText.textContent = `今年共 ${daysTotal} 天，已过去 ${daysElapsed} 天，还剩 ${daysLeft} 天`;
            lastDaysElapsed = daysElapsed;
        }
        
        const currentMonth = now.getMonth();
        const startOfMonth = new Date(currentYear, currentMonth, 1);
        const endOfMonth = new Date(currentYear, currentMonth + 1, 1);
        const monthTotalMs = endOfMonth - startOfMonth;
        const monthElapsedMs = now - startOfMonth;
        const monthPercentage = (monthElapsedMs / monthTotalMs) * 100;
        const monthDaysTotal = Math.floor(monthTotalMs / msPerDay);
        const monthDaysElapsed = Math.floor(monthElapsedMs / msPerDay);
        const monthDaysLeft = monthDaysTotal - monthDaysElapsed;
        
        monthProgressFill.style.width = Math.min(monthPercentage, 100) + "%";
        monthPercentageText.textContent = monthPercentage.toFixed(4) + "%";
        monthDaysText.textContent = `剩 ${monthDaysLeft} 天`;

        const dayOfWeek = now.getDay() === 0 ? 7 : now.getDay();
        const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek + 1);
        startOfWeek.setHours(0, 0, 0, 0);
        const weekTotalMs = 7 * msPerDay;
        const weekElapsedMs = now - startOfWeek;
        const weekPercentage = (weekElapsedMs / weekTotalMs) * 100;
        const weekDaysLeft = 7 - dayOfWeek;
        
        weekProgressFill.style.width = Math.min(weekPercentage, 100) + "%";
        weekPercentageText.textContent = weekPercentage.toFixed(4) + "%";
        weekDaysText.textContent = `剩 ${weekDaysLeft} 天`;
        
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const dayTotalMs = msPerDay;
        const dayElapsedMs = now - startOfDay;
        const dayPercentage = (dayElapsedMs / dayTotalMs) * 100;
        const hoursLeft = Math.floor((dayTotalMs - dayElapsedMs) / (1000 * 60 * 60));
        
        dayProgressFill.style.width = Math.min(dayPercentage, 100) + "%";
        dayPercentageText.textContent = dayPercentage.toFixed(4) + "%";
        dayHoursText.textContent = `剩 ${hoursLeft} 小时`;
        
        requestAnimationFrame(updateProgress);
    }

    requestAnimationFrame(updateProgress);
});
