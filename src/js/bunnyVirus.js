import { resetGameState } from './script.js';

export function createBunnyVirusPopup() {
    
    document.getElementById('close-popup-button').addEventListener('click', () => {
        const popup = document.getElementById('bunny-popup');
        popup.classList.add('hidden');

        const message = document.getElementById('message');
        message.innerText = "Quick! Press on the bouncing bunnies to make them disappear before they take over!";
        message.classList.remove('hidden');
        message.style.display = 'block'; 
        setTimeout(() => {
            message.style.display = 'none';
            spawnBunnies(); 
        }, 3000); 
    });

    document.getElementById('close-success-modal').addEventListener('click', () => {
        const modal = document.getElementById('success-modal');
        modal.classList.add('hidden');
        modal.style.display = 'none'; 
        removeGame();
    });
}

let bunnyInterval = null;
let bunnies = [];
let bunnyCount = 0;
let gameActive = true;

function spawnBunnies() {
    if (bunnyInterval !== null) {
        clearInterval(bunnyInterval);
    }

    const spawnBunny = () => {
        if (!gameActive) return;

        const bunny = document.createElement('img');
        bunny.src = './assets/bunnyVirusImages/bunnyVirus.png';
        bunny.className = 'bunny';
        bunny.style.left = Math.random() * (window.innerWidth - 50) + 'px';
        bunny.style.top = Math.random() * (window.innerHeight - 50) + 'px'; 

        let vx = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 2 + 1);
        let vy = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 2 + 1); 

        bunny.onclick = () => {
            bunny.remove(); 
            bunnyCount--;
            bunnies = bunnies.filter(b => b !== bunny); 
            if (bunnies.length === 0) {
                gameActive = false;
                showSuccessModal();
            }
        };

        document.body.appendChild(bunny);
        bunnies.push(bunny);
        bunnyCount++;

        function animate() {
            const rect = bunny.getBoundingClientRect();
            bunny.style.left = rect.left + vx + 'px';
            bunny.style.top = rect.top + vy + 'px';

            const viewportWidth = document.documentElement.clientWidth;
            const viewportHeight = document.documentElement.clientHeight;

            if (rect.left <= 0 || rect.right >= viewportWidth) {
                vx = -vx; 
            }
            if (rect.top <= 0 || rect.bottom >= viewportHeight) {
                vy = -vy; 
            }

            bunny.style.left = rect.left + vx + 'px';
            bunny.style.top = rect.top + vy + 'px';

            requestAnimationFrame(animate); 
        }
        animate(); 

        if (bunnyCount >= 10) {
            bunnies.forEach(bunny => bunny.remove()); 
            bunnies = [];  
            bunnyCount = 0; 
            gameActive = false;
            showBlueScreen();
        }
    };
    bunnyInterval = setInterval(spawnBunny, 3000); 
}

function showSuccessModal() {
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        successModal.classList.remove('hidden');
        successModal.style.display = 'block'; 
    }
}

function showBlueScreen() {
    const blueScreen = document.getElementById('bluescreen-overlay'); 
    blueScreen.classList.remove('hidden');
    blueScreen.style.display = 'flex';
    setTimeout(() => {
        blueScreen.classList.add('hidden');
        blueScreen.style.display = 'none'; 
        removeGame();
    }, 4000);
}

export function showBunnyVirus() {
    const popup = document.getElementById('bunny-popup');
    if (popup) {
        popup.classList.remove('hidden'); 
    }
}

export function removeGame() {
    resetGameState();
}
