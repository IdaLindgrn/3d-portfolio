import * as THREE from 'three';

const loadingManager = new THREE.LoadingManager();

const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = '#000';
document.body.appendChild(overlay);

let startTime = Date.now();
const MIN_DISPLAY_TIME = 3000; 

loadingManager.onStart = () => {
    startTime = Date.now(); 
};

loadingManager.onLoad = () => {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsedTime);

    setTimeout(() => {
        overlay.style.display = 'none';
    }, remainingTime); 
};

export { loadingManager };
