const loadedSections = {};

export async function loadSection(targetId) {
    // Hide all screens
    document.querySelectorAll('.screen-container').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('active');
    });
    
    let screenEl = document.getElementById(targetId);
    
    if (!loadedSections[targetId]) {
        // Fetch HTML content dynamically
        const viewName = targetId.replace('screen-', '');
        try {
            const response = await fetch(`views/${viewName}.html`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            screenEl.innerHTML = await response.text();
            
            // Initialize respective JS module
            if (targetId === 'screen-3d') {
                const { init3D } = await import('./3d-viewer.js');
                init3D();
            } else if (targetId === 'screen-data') {
                const { initAnalytics } = await import('./analytics.js');
                initAnalytics();
            } else if (targetId === 'screen-map') {
                const { initMap } = await import('./map.js');
                initMap();
            }
            loadedSections[targetId] = true;
            
            // Re-initialize icons for newly added DOM elements
            if(window.lucide) {
                lucide.createIcons();
            }
        } catch (error) {
            console.error("Error loading section:", error);
            screenEl.innerHTML = `<div style="padding: 20px; color: var(--red);">Error cargando la sección ${viewName}. Asegúrate de usar un servidor local.</div>`;
        }
    }
    
    // Show the active screen
    screenEl.style.display = 'flex';
    screenEl.classList.add('active');
    screenEl.classList.add('screen'); // Add screen class for animation
    
    // Trigger resize so canvas sizes recalculate correctly
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const targetId = tab.getAttribute('data-target');
            loadSection(targetId);
        });
    });

    // Initialize first section
    loadSection('screen-3d');
    
    if(window.lucide) {
        lucide.createIcons();
    }
});
