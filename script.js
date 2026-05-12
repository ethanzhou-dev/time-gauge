document.addEventListener("DOMContentLoaded", () => {
    const progressFill = document.getElementById("progressFill");
    const percentageText = document.getElementById("percentageText");
    const daysText = document.getElementById("daysText");
    const currentYearEl = document.getElementById("currentYear");
    
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

    function updateProgress() {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
        
        const totalMs = endOfYear - startOfYear;
        const elapsedMs = now - startOfYear;
        
        const percentage = (elapsedMs / totalMs) * 100;
        
        const msPerDay = 1000 * 60 * 60 * 24;
        const daysTotal = Math.floor(totalMs / msPerDay);
        const daysElapsed = Math.floor(elapsedMs / msPerDay); 
        const daysLeft = daysTotal - daysElapsed;

        progressFill.style.width = Math.min(percentage, 100) + "%";
        
        percentageText.textContent = percentage.toFixed(6) + "%"; 
        
        daysText.textContent = `今年共 ${daysTotal} 天，已过去 ${daysElapsed} 天，还剩 ${daysLeft} 天`;
        
        requestAnimationFrame(updateProgress);
    }

    requestAnimationFrame(updateProgress);
});
