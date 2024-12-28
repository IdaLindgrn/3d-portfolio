import { resetGameState } from './script.js';

export function createBunnyVirusPopup() {
    // Popup HTML
    const popupHtml = ` 
    <div id="bunny-popup" class="popup hidden">
        <h1>WARNING</h1>
        <img src="./bunnyVirusWarning.png" class="popup-image"/>
        <div id="bunny-popup-text">
            <h2>Bunny Virus Alert!</h2>
            <p>You've activated the Bunny Virus. Watch out for bouncing bunnies!</p>
        </div>
        <button id="close-popup-button">Clean Virus</button>
    </div>
    <div id="message" class="hidden message"></div>
    <div id="success-modal" class="modal hidden">
        <div class="success-popup-body">
        <img src="./bunnyVirusVictory.jpg" class="virus-victory-image" />
        <div class="success-text">
            <h2 class="success-title">Congratulations</h2>
            <h3>You defeted the virus!</h3>
             <button id="close-success-modal">Continue</button>
        </div>
        </div>
    </div>
    <div id="bluescreen-overlay" class="bluescreen-overlay hidden">
        <h1 class="sad-smile">:(</h1>
        <h2 class="bluescreen-title">Bunny Virus Detected.</h2>
        <h3 class="bluescreen-text">Your system encountered an error and will restart to contain the bunnies.</h3>
        <h3 class="bluescreen-text">ERROR_CODE: 0xBUNNY_RUN</h3>
    </div>
    `;

    // Append the popup HTML to the body
    document.body.insertAdjacentHTML('beforeend', popupHtml);

    const style = document.createElement('style');
    style.textContent = `
        @font-face {
            font-family: 'BrownMedium_Regular';
            src: url('/fonts/BrownMedium Regular.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
        }

        @font-face {
            font-family: 'BrownLight_Regular';
            src: url('/fonts/BrownLight Regular.ttf') format('truetype');
            font-weight: light;
            font-style: light;
        }

        .popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 340px;
            background: linear-gradient(to right,rgb(212, 48, 48), #E21414);
            color: #FFF;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
            z-index: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius: 5px;
            text-align: center;
            font-family: 'BrownMedium_Regular', sans-serif;
        }

        h1 {
            font-size: 30px;
            padding: 13px;
        }

        #bunny-popup-text {
            background-color: #FFFFFF;
            color: #333;
            width: 100%;
            padding: 20px 0;
            font-family: 'BrownMedium_Regular', sans-serif;
        }

        #bunny-popup-text h2 {
            color: #BB1312;
            margin: 0;
        }

        #bunny-popup-text p {
            color: #868686;
            margin: 8px 30px 0 30px;
            font-size: 15px;
        }

        .popup-image {
            margin: 15px 15px;
            position: fixed;
            max-width: 55px;
            height: auto;
            align-self: flex-start;
        }

        button {
            border: none;
            background-color: #991111;
            padding: 5px 20px;
            margin: 10px;
            font-size: 15px;
            border-radius: 3px;
            color: #FFF;
            font-family: 'BrownMedium_Regular', sans-serif;
        }

        button:hover {
            background-color: #891111;
            cursor: pointer;
        }

        .hidden {
            display: none;
        }

        .bunny {
            position: absolute;
            width: 50px; 
            height: auto; 
            cursor: pointer;
            transition: transform 0.2s ease; /* Add some animation */
            user-select: none; /* Prevent text selection on bunny */
        }

        .message, .modal, .bluescreen-overlay {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
            display: none;
            font-family: 'BrownMedium_Regular', sans-serif;
        }

        .message { font-size: 30px; color: #fff; background: rgba(0, 0, 0, 0.7); padding: 10px; width: 80vw; text-align: center; }
        .modal { background: #fff; color:rgb(28, 28, 28); width: 300px; height: 360px; font-family: 'BrownLight_Regular', sans-serif; border-radius: 15px; text-align: center;  letter-spacing: 1px; }
        .close { position: absolute; color: #fff; top: 3px; right: 6px; cursor: pointer; font-size: 15px; background-color: #E14242; padding: 3px 6px; border-radius: 30px;}

        .success-popup-body {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 15px;
        }

        .virus-victory-image {
            width: 250px;
            margin: 10px 0;
        }

        .success-text {
            padding-left: 15px;
            font-size: 15px;
        }

        .success-title {
            padding-bottom: 10px;
            font-size: 28px;
            color: #B15019;
        }

        #close-success-modal {
            border: none;
            background-color: #B15019;
            padding: 10px 40px;
            margin: 30px 0;
            font-size: 20px;
            border-radius: 5px;
            color: #FFF;
        }

        #close-success-modal:hover {
            background-color:rgb(146, 67, 20);
            cursor: pointer;
        }

        /* Blue screen overlay */
        .bluescreen-overlay {
            width: 100vw;
            padding-left: 35vw;
            height: 100vh;
            background: #3596CC;
            color: #FFFFFF;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: left;
            display: none;
        }

        .sad-smile {
            padding-bottom: 30px;
            font-size: 15vh;
        }

        .bluescreen-title {
            font-size: 4.3vh;
            padding-bottom: 20px;
        }

        .bluescreen-text {
            font-size: 4vh;
            padding-bottom: 20px;
            font-family: 'BrownLight_Regular', sans-serif;
            max-width: 65vw; 
            word-break: break-word; 
            line-height: 1.5;
        }
    `;
    document.head.appendChild(style);

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
        bunny.src = './bunnyVirus.png';
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
