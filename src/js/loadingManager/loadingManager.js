import * as THREE from 'three';


const loadingManager = new THREE.LoadingManager();

const loadingOverlay = document.getElementById('loading-overlay');
const progressBar = document.getElementById('progress-bar');
const loadingContent = document.querySelector('.loading-content');
const progressBarContainer = document.querySelector('.progress-bar-container');

let startTime = Date.now();
const MIN_DISPLAY_TIME = 3000; 

loadingManager.onStart = (url, item, total) => {
    console.log(`Started loading ${url}`);
};

loadingManager.onProgress = (url, loaded, total) => {
    progressBar.value = (loaded / total) * 100;
 
};


loadingManager.onLoad = () => {
    
    console.log('Finished loading all resources');
    
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsedTime);

    setTimeout(() => {
        progressBarContainer.style.display = 'none';
        loadingContent.innerHTML = `
            <h1 class="read-header">QUICK START GUIDE</h2>
            <ol class="instructions">
                <li>Drag and click to move around.</li>
                <li>Glowing boxes are interactive.</li>
            </ol>
            <button id="start-button" class="start-button">START</button>
    `;
    const startButton = document.getElementById('start-button');
        startButton.addEventListener('click', () => {
            loadingOverlay.style.display = 'none';
        });
    }, remainingTime);
};

loadingManager.onError = (url) => {
    console.log(`Error loading: ${url}`);
};

export { loadingManager };
