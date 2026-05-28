document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('chartScatter')) return;
    
    Chart.defaults.color = '#8e9590';
    Chart.defaults.font.family = '"Space Mono", monospace';
    Chart.defaults.borderColor = 'rgba(255,255,255,0.05)';

    const timelineData = [
        {
            timeStr: "20:00 - Expectativas Claras",
            scatter: [
                { x: 3, y: 150000, name: "Rojo/Negro" },
                { x: 5, y: 50000, name: "Sectores" },
                { x: 7, y: 0, name: "Martingala" },
                { x: 9, y: -20000, name: "Impulsivas" }
            ],
            line: [4000000, 4500000, 4200000, 4600000, 5000000],
            donut: [100, 0, 0, 0],
            bar: [50000, 150000, 0, -20000]
        },
        {
            timeStr: "22:00 - Estrategia Base",
            scatter: [
                { x: 3, y: 300000, name: "Rojo/Negro" },
                { x: 5, y: 800000, name: "Sectores" },
                { x: 7, y: 100000, name: "Martingala" },
                { x: 9, y: -50000, name: "Impulsivas" }
            ],
            line: [4000000, 6000000, 7500000, 9000000, 10000000],
            donut: [70, 0, 0, 30],
            bar: [800000, 300000, 100000, -50000]
        },
        {
            timeStr: "00:00 - La Racha de Oro",
            scatter: [
                { x: 3, y: 500000, name: "Rojo/Negro" },
                { x: 5, y: 1500000, name: "Sectores" },
                { x: 7, y: -200000, name: "Martingala" },
                { x: 9, y: -100000, name: "Impulsivas" }
            ],
            line: [4000000, 10000000, 15000000, 18000000, 22000000],
            donut: [45, 16, 7, 32],
            bar: [1500000, 500000, -200000, -100000]
        },
        {
            timeStr: "02:00 - Avaricia y Descontrol",
            scatter: [
                { x: 3, y: 100000, name: "Rojo/Negro" },
                { x: 5, y: 500000, name: "Sectores" },
                { x: 7, y: -800000, name: "Martingala" },
                { x: 9, y: -2000000, name: "Impulsivas" }
            ],
            line: [22000000, 18000000, 14000000, 11000000, 8000000],
            donut: [60, 20, 5, 15],
            bar: [500000, 100000, -800000, -2000000]
        },
        {
            timeStr: "04:00 - El Abismo",
            scatter: [
                { x: 3, y: -500000, name: "Rojo/Negro" },
                { x: 5, y: -1000000, name: "Sectores" },
                { x: 7, y: -2500000, name: "Martingala" },
                { x: 9, y: -4000000, name: "Impulsivas" }
            ],
            line: [8000000, 5000000, 2000000, 500000, 0],
            donut: [95, 5, 0, 0],
            bar: [-1000000, -500000, -2500000, -4000000]
        }
    ];

    let globalChartScatter, globalChartLine, globalChartDonut, globalChartBar;
    const initialData = timelineData[0];

    const ctxScatter = document.getElementById('chartScatter').getContext('2d');
    globalChartScatter = new Chart(ctxScatter, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Estrategias',
                data: initialData.scatter,
                backgroundColor: '#D4AF37', 
                pointRadius: 8,
                pointHoverRadius: 11,
                pointBorderColor: '#fff',
                pointBorderWidth: 1
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            animation: { duration: 800, easing: 'easeOutQuart' },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const raw = ctx.raw;
                            return `${raw.name}: $${raw.y.toLocaleString()} (Riesgo: ${raw.x})`;
                        }
                    }
                }
            },
            scales: {
                x: { title: { display: true, text: 'Nivel de Riesgo (1-10)' }, min: 2, max: 10 },
                y: { title: { display: true, text: 'Ganancia promedio ($)' }, min: -4500000, max: 2000000 }
            }
        }
    });

    const ctxLine = document.getElementById('chartLine').getContext('2d');
    globalChartLine = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ["T1", "T2", "T3", "T4", "T5"],
            datasets: [{
                label: 'Dinero total',
                data: initialData.line,
                borderColor: '#D4AF37',
                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#0A4A2F'
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            animation: { duration: 800, easing: 'easeOutQuart' },
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false } },
                y: { 
                    min: 0, max: 25000000,
                    ticks: { callback: (val) => '$' + (val/1000000) + 'M' }
                }
            }
        }
    });

    const ctxDonut = document.getElementById('chartDonut').getContext('2d');
    globalChartDonut = new Chart(ctxDonut, {
        type: 'doughnut',
        data: {
            labels: ["Negocio familiar", "Reinversión", "Ganancias previas", "Ganancia inicial"],
            datasets: [{
                data: initialData.donut,
                backgroundColor: ['#0A4A2F', '#D4AF37', '#B71C1C', '#8e9590'],
                borderWidth: 1,
                borderColor: '#111'
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            animation: { duration: 800, easing: 'easeOutQuart' },
            plugins: {
                legend: { position: 'right', labels: { color: '#ebe8d9', font: { size: 11 } } }
            }
        }
    });

    const ctxBar = document.getElementById('chartBar').getContext('2d');
    globalChartBar = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ["Sectores", "Rojo/Negro", "Martingala", "Impulsivas"],
            datasets: [{
                label: 'Ganancia/Pérdida ($)',
                data: initialData.bar,
                backgroundColor: initialData.bar.map(v => v < 0 ? '#B71C1C' : '#0A4A2F'),
                borderRadius: 4
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            animation: { duration: 800, easing: 'easeOutQuart' },
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false } },
                y: { 
                    min: -4500000, max: 2000000,
                    ticks: { callback: (val) => '$' + (val/1000).toLocaleString() + 'k' }
                }
            }
        }
    });
    
    const timeSlider = document.getElementById('timeSlider');
    const timeDisplay = document.getElementById('timeline-time-display');

    timeSlider.addEventListener('input', (e) => {
        const index = parseInt(e.target.value);
        const snapshot = timelineData[index];
        
        timeDisplay.textContent = snapshot.timeStr;
        
        if (index >= 3) { 
            timeDisplay.style.color = 'var(--red)';
            timeDisplay.style.borderColor = 'var(--red)';
            timeDisplay.style.boxShadow = '0 0 10px rgba(183, 28, 28, 0.5)';
        } else if (index === 2) { 
            timeDisplay.style.color = 'var(--gold)';
            timeDisplay.style.borderColor = 'var(--gold)';
            timeDisplay.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.5)';
        } else { 
            timeDisplay.style.color = 'var(--emerald)';
            timeDisplay.style.borderColor = 'var(--emerald)';
            timeDisplay.style.boxShadow = '0 0 10px rgba(10, 74, 47, 0.5)';
        }

        globalChartScatter.data.datasets[0].data = snapshot.scatter;
        globalChartScatter.update();

        globalChartLine.data.datasets[0].data = snapshot.line;
        globalChartLine.update();

        globalChartDonut.data.datasets[0].data = snapshot.donut;
        globalChartDonut.update();

        globalChartBar.data.datasets[0].data = snapshot.bar;
        globalChartBar.data.datasets[0].backgroundColor = snapshot.bar.map(v => {
            if (v < 0) return '#B71C1C';
            if (v > 1000000) return '#D4AF37';
            return '#0A4A2F';
        });
        globalChartBar.update();
    });

    window.addEventListener('resize', () => {
        Chart.instances.forEach(chart => chart.resize());
    });
});
