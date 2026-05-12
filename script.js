document.addEventListener("DOMContentLoaded", () => {
    const progressFill = document.getElementById("progressFill");
    const percentageText = document.getElementById("percentageText");
    const daysText = document.getElementById("daysText");
    const currentYearEl = document.getElementById("currentYear");
    
    // 初始化当前年份
    const currentYear = new Date().getFullYear();
    if (currentYearEl) {
        currentYearEl.textContent = currentYear;
    }

    function updateProgress() {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        // 下一年的1月1日
        const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
        
        const totalMs = endOfYear - startOfYear;
        const elapsedMs = now - startOfYear;
        
        // 计算百分比
        const percentage = (elapsedMs / totalMs) * 100;
        
        // 计算天数
        const msPerDay = 1000 * 60 * 60 * 24;
        const daysTotal = Math.floor(totalMs / msPerDay);
        // 使用 Math.floor 得到完整过去的整天数
        const daysElapsed = Math.floor(elapsedMs / msPerDay); 
        const daysLeft = daysTotal - daysElapsed;

        // 更新 UI
        // 为保证视觉效果不至于溢出，最大限制为100%
        progressFill.style.width = Math.min(percentage, 100) + "%";
        
        // 显示保留6位小数的百分比，营造时间在不断流逝的紧张感和精确感
        percentageText.textContent = percentage.toFixed(6) + "%"; 
        
        daysText.textContent = `今年共 ${daysTotal} 天，已过去 ${daysElapsed} 天，还剩 ${daysLeft} 天`;
        
        // 使用 requestAnimationFrame 实现极其流畅的刷新
        requestAnimationFrame(updateProgress);
    }

    // 首次调用并启动循环
    requestAnimationFrame(updateProgress);
});
