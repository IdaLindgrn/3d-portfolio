import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createSmokeEffect } from './smokeEffect.js'
import { loadFont, loadClockTexts, removeClockTexts } from './fontLoader.js'
import { particles, particlesMaterial } from './particles.js'
import { createGlowingEdges } from './glowingEdges.js';
import { createBunnyVirusPopup, showBunnyVirus } from './bunnyVirus.js'
import { loadingManager } from './loadingManager/loadingManager.js'; 
import { gsap } from 'gsap';


// videos

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader(loadingManager);
const gltfLoader = new GLTFLoader(loadingManager)

let screenCubeGlowingEdges;
let buttonGlowingEdges;

document.getElementById('nav').addEventListener('click', () => {
    const nav = document.getElementById('nav');
    const navIcon = document.getElementById('nav-icon');
    
    nav.classList.toggle('open');
    navIcon.classList.toggle('fa-bars');
    navIcon.classList.toggle('fa-xmark');
});

const projectButton = document.getElementById('projects');
const aboutMeButton = document.getElementById('about-me');
const creditsButton = document.getElementById('credits');



/**
 * Textures
 */

const bakedTextures = {
    texture1: textureLoader.load('./assets/bakedImages/calcBaked.jpg'),
    texture2: textureLoader.load('./assets/bakedImages/cupJoystickBaked.jpg'),
    texture3: textureLoader.load('./assets/bakedImages/extraSmallPartsBaked.jpg'),
    texture4: textureLoader.load('./assets/bakedImages/floorBaked.jpg'),
    texture5: textureLoader.load('./assets/bakedImages/keyboardBaked.jpg'),
    texture6: textureLoader.load('./assets/bakedImages/chassisBaked.jpg'),
    texture7: textureLoader.load('./assets/bakedImages/gameboyParts2Baked.jpg'),
    texture8: textureLoader.load('./assets/bakedImages/gameboyPartsBaked.jpg'),
    texture9: textureLoader.load('./assets/bakedImages/smallPartsBaked.jpg'),
    texture10: textureLoader.load('./assets/bakedImages/chassis2Baked.jpg'),
    texture11: textureLoader.load('./assets/bakedImages/cordsBaked.jpg')
};

const screens = {
    screenStart: textureLoader.load('./assets/screensImages/startScreen.jpg'),
    screenRobot: textureLoader.load('./assets/screensImages/robotScreen.jpg'),
    screenProjects: textureLoader.load('./assets/screensImages/projectsScreen.jpg'),
    screen3DPortfolio: textureLoader.load('./assets/screensImages/project3DPortfolioScreen.jpg'),
    screenMobileApp: textureLoader.load('./assets/screensImages/projectMobileAppScreen.jpg'),
    screenBrowserExt: textureLoader.load('./assets/screensImages/projectBrowserExtScreen.jpg'),
    screenRHG: textureLoader.load('./assets/screensImages/projectRHGScreen.jpg'),
    screenReactPortfolio: textureLoader.load('./assets/screensImages/projectReactPortfolioScreen.jpg'),
    screenFlexboxGame: textureLoader.load('./assets/screensImages/projectFlexboxGameScreen.jpg'),
    screenTicTacToe: textureLoader.load('./assets/screensImages/projectTicTacToeScreen.jpg'),
    screenUser: textureLoader.load('./assets/screensImages/userScreen.jpg'),
    screenNotes: textureLoader.load('./assets/screensImages/notesScreen.jpg'),
    screenCredits: textureLoader.load('./assets/screensImages/creditsScreen.jpg'),
    screenPhotos: textureLoader.load('./assets/screensImages/photosScreen.jpg'),
    screenEevee: textureLoader.load('./assets/screensImages/eeveeScreen.jpg'),
    screenEevee2: textureLoader.load('./assets/screensImages/eeveeScreen2.jpg'),
    screenYoshi: textureLoader.load('./assets/screensImages/yoshiScreen.jpg'),
    screenYoshi2: textureLoader.load('./assets/screensImages/yoshiScreen2.jpg'),
    screenBin: textureLoader.load('./assets/screensImages/binScreen.jpg'),
    screenBinDoc: textureLoader.load('./assets/screensImages/binDocScreen.jpg'),
};


for (const key in screens) {
    screens[key].colorSpace = THREE.SRGBColorSpace; 
}


for (const key in bakedTextures) {
    bakedTextures[key].flipY = false;
    bakedTextures[key].colorSpace = THREE.SRGBColorSpace; 
}

/**
 * Materials
 */

const bakedMaterials = {
    material1: new THREE.MeshBasicMaterial({ map: bakedTextures.texture1 }),
    material2: new THREE.MeshBasicMaterial({ map: bakedTextures.texture2 }),
    material3: new THREE.MeshBasicMaterial({ map: bakedTextures.texture3 }),
    material4: new THREE.MeshBasicMaterial({ map: bakedTextures.texture4 }),
    material5: new THREE.MeshBasicMaterial({ map: bakedTextures.texture5 }),
    material6: new THREE.MeshBasicMaterial({ map: bakedTextures.texture6 }),
    material7: new THREE.MeshBasicMaterial({ map: bakedTextures.texture7 }),
    material8: new THREE.MeshBasicMaterial({ map: bakedTextures.texture8 }),
    material9: new THREE.MeshBasicMaterial({ map: bakedTextures.texture9 }),
    material10: new THREE.MeshBasicMaterial({ map: bakedTextures.texture10 }),
    material11: new THREE.MeshBasicMaterial({ map: bakedTextures.texture11 })
};

const redGlow = new THREE.MeshBasicMaterial({ color: 0xffaa9f });
const orangeGlow = new THREE.MeshBasicMaterial({ color: 0xe6c4a3 });
const yellowGlow = new THREE.MeshBasicMaterial({ color: 0xffeb2a });
const greenGlow = new THREE.MeshBasicMaterial({ color: 0xceffB8 });
const blueGlow = new THREE.MeshBasicMaterial({ color: 0xc5e7e7 });
const purpleGlow = new THREE.MeshBasicMaterial({ color: 0xd2c2ef });
const whiteGlow = new THREE.MeshBasicMaterial({ color: 0xffffe5 });
const whiteGlow2 = new THREE.MeshBasicMaterial({ color: 0xffffe5 });

const pipes = new THREE.MeshBasicMaterial({ color: 0x0f0e0e });
const string = new THREE.MeshBasicMaterial({ color: 0xa4a3a3 });
const text = new THREE.MeshBasicMaterial({ color: 0x863f0c });

const transparentMaterial = new THREE.MeshBasicMaterial({
    transparent: true, 
    opacity: 0,
});



// screen 

const robotVideo = document.createElement('video');
robotVideo.src = 'assets/videos/robot.mp4';
robotVideo.loop = true;
robotVideo.muted = true;
robotVideo.playsInline = true;
robotVideo.autoplay = true; 

const robotVideoTexture = new THREE.VideoTexture(robotVideo);

const cubeGeometry = new THREE.PlaneGeometry(26, 17); 

robotVideoTexture.colorSpace = THREE.SRGBColorSpace; 

const cubeScreenMaterial = new THREE.MeshBasicMaterial({
    map: robotVideoTexture, 
  });

const screenCube = new THREE.Mesh(cubeGeometry, cubeScreenMaterial);

screenCube.position.set(-9, 27.8, 7.7); 

const yAxis = new THREE.Vector3(0, 1, 0);
const yRot = Math.PI / 2; 
const yQuaternion = new THREE.Quaternion();
yQuaternion.setFromAxisAngle(yAxis, yRot);

const xAxis = new THREE.Vector3(1, 0, 0);
const xRot = Math.PI / -17; 
const xQuaternion = new THREE.Quaternion();
xQuaternion.setFromAxisAngle(xAxis, xRot);

const combinedQuaternion = new THREE.Quaternion();
combinedQuaternion.multiplyQuaternions(yQuaternion, xQuaternion);

screenCube.quaternion.copy(combinedQuaternion);


screenCubeGlowingEdges = createGlowingEdges(screenCube);
screenCubeGlowingEdges.position.set(-8.7, 27.8, 7.7);
scene.add(screenCubeGlowingEdges);

scene.add(screenCube);

// smaller screen

const waveVideo = document.createElement('video');
waveVideo.src = 'assets/videos/wave.mp4';
waveVideo.loop = true;
waveVideo.muted = true;
waveVideo.playsInline = true;
waveVideo.autoplay = true; 

const waveVideoTexture = new THREE.VideoTexture(waveVideo);

const smallScreenGeometry = new THREE.PlaneGeometry(6.5, 2.4);  

const smallScreenMaterial = new THREE.MeshBasicMaterial({
    map: waveVideoTexture, 
  });


const smallScreenCube = new THREE.Mesh(smallScreenGeometry, smallScreenMaterial);
smallScreenCube.position.set(-6.85, 16.1, 7.6);  
smallScreenCube.quaternion.copy(combinedQuaternion);
scene.add(smallScreenCube);

// mini screens

const heartVideo = document.createElement('video');
heartVideo.src = 'assets/videos/heart.mp4';
heartVideo.loop = true;
heartVideo.muted = true;
heartVideo.playsInline = true;
heartVideo.autoplay = true; 

const heartVideoTexture = new THREE.VideoTexture(heartVideo);

const miniScreenGeometry = new THREE.PlaneGeometry(3.2, 2.3);  
const miniScreenMaterial = new THREE.MeshBasicMaterial({
    map: heartVideoTexture, 
  });


const miniScreenCube = new THREE.Mesh(miniScreenGeometry, miniScreenMaterial);
miniScreenCube.position.set(-17.5, 24.2, -44);  
miniScreenCube.rotation.y = (65 * Math.PI) / 180;
scene.add(miniScreenCube);


const miniRobotVideo = document.createElement('video');
miniRobotVideo.src = 'assets/videos/robot.mp4';
miniRobotVideo.loop = true;
miniRobotVideo.muted = true;
miniRobotVideo.playsInline = true;
miniRobotVideo.autoplay = true; 

const miniRobotVideoTexture = new THREE.VideoTexture(miniRobotVideo);

miniRobotVideoTexture.colorSpace = THREE.SRGBColorSpace; 

const mini2ScreenMaterial = new THREE.MeshBasicMaterial({
    map: miniRobotVideoTexture, 
    side: THREE.FrontSide, 
    toneMapped: false
  });

const mini2ScreenCube = new THREE.Mesh(miniScreenGeometry, mini2ScreenMaterial);
mini2ScreenCube.position.set(-15.6, 30.8, -47.85);  
mini2ScreenCube.rotation.y = (34.5 * Math.PI) / 180;
scene.add(mini2ScreenCube);

//medium screen

const shortVideo = document.createElement('video');
shortVideo.src = 'assets/videos/shortVideo.mp4';
shortVideo.loop = true;
shortVideo.muted = true;
shortVideo.playsInline = true;
shortVideo.autoplay = true; 

const shortVideoTexture = new THREE.VideoTexture(shortVideo);

shortVideoTexture.colorSpace = THREE.SRGBColorSpace; 

const shortScreenMaterial = new THREE.MeshBasicMaterial({
    map: shortVideoTexture, 
  });

  
const shortScreenGeometry = new THREE.PlaneGeometry(12, 7.5); 
const shortScreenCube = new THREE.Mesh(shortScreenGeometry, shortScreenMaterial);
shortScreenCube.position.set(-17.2, 35.2, -30.85);  
shortScreenCube.rotation.y = (63.5 * Math.PI) / 180;
scene.add(shortScreenCube);

document.addEventListener('click', () => {
    robotVideo.play();
    waveVideo.play();
    heartVideo.play();
    miniRobotVideo.play();
    shortVideo.play();
}, { once: true }); 

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        robotVideo.pause();
        waveVideo.pause();
        heartVideo.pause();
        miniRobotVideo.pause();
        shortVideo.pause();
    } else if (document.visibilityState === 'visible') {
        robotVideo.play();
        waveVideo.play();
        heartVideo.play();
        miniRobotVideo.play();
        shortVideo.play();
    }
});



// screen nav

const robotGeometry = new THREE.PlaneGeometry(3, 2.3);
const userGeometry = new THREE.PlaneGeometry(2.5, 2.8);
const userPopupGeometry = new THREE.PlaneGeometry(12.6, 11.6);
const notesGeometry = new THREE.PlaneGeometry(2.5, 2.9);
const notesPopupGeometry = new THREE.PlaneGeometry(10.68, 8.98);
const projectsGeometry = new THREE.PlaneGeometry(2.7, 2.9);
const projectsPopupGeometry = new THREE.PlaneGeometry(16.52, 9.72);
const projectPopupGeometry = new THREE.PlaneGeometry(11.8, 11.8);
const creditsGeometry = new THREE.PlaneGeometry(2.5, 2.7);
const creditsPopupGeometry = new THREE.PlaneGeometry(12.7, 7.9);
const photosGeometry = new THREE.PlaneGeometry(2.9, 2.7);
const photosPopupGeometry = new THREE.PlaneGeometry(16.25, 9.7);
const photoPopupGeometry = new THREE.PlaneGeometry(10.35, 7.6);
const projectDocGeometry = new THREE.PlaneGeometry(3.3, 2.7);
const jpgGeometry = new THREE.PlaneGeometry(3.2, 2.8);
const jpgPopupGeometry = new THREE.PlaneGeometry(10.45, 7.58);
const binGeometry = new THREE.PlaneGeometry(3.5, 3);
const binPopupGeometry = new THREE.PlaneGeometry(16.3, 9.75);
const closeGeometry = new THREE.PlaneGeometry(0.8, 0.8);
const linksGeometry = new THREE.PlaneGeometry(0.8, 0.8);
const projectsFolderGeometry = new THREE.PlaneGeometry(2.5, 2.7);
const openImageGeometry = new THREE.PlaneGeometry(2.85, 2.3);
const binDocGeometry = new THREE.PlaneGeometry(2.2, 2.7);
const binDocPopupGeometry = new THREE.PlaneGeometry(11.2, 7.8);
 

const robotNav = new THREE.Mesh(robotGeometry, transparentMaterial);
const userNav = new THREE.Mesh(userGeometry, transparentMaterial);
const userPopupNav = new THREE.Mesh(userPopupGeometry, transparentMaterial);
const userCloseNav = new THREE.Mesh(closeGeometry, transparentMaterial);
const userGithubNav = new THREE.Mesh(linksGeometry, transparentMaterial);
const userLinkedinNav = new THREE.Mesh(linksGeometry, transparentMaterial);
const userMediumNav = new THREE.Mesh(linksGeometry, transparentMaterial);
const userMailNav = new THREE.Mesh(linksGeometry, transparentMaterial);
const notesNav = new THREE.Mesh(notesGeometry, transparentMaterial);
const notesPopupNav = new THREE.Mesh(notesPopupGeometry, transparentMaterial);
const notesCloseNav = new THREE.Mesh(closeGeometry, transparentMaterial);
const projectsNav = new THREE.Mesh(projectsGeometry, transparentMaterial);
const projectsPopupNav = new THREE.Mesh(projectsPopupGeometry, transparentMaterial);
const projectsCloseNav = new THREE.Mesh(closeGeometry, transparentMaterial);
const projectsGameboyNav = new THREE.Mesh(projectsFolderGeometry, transparentMaterial);
const projectsMobileAppNav = new THREE.Mesh(projectsFolderGeometry, transparentMaterial);
const projectsBrowserExtensionNav = new THREE.Mesh(projectsFolderGeometry, transparentMaterial);
const projectsRHGNav = new THREE.Mesh(projectsFolderGeometry, transparentMaterial);
const projectsReactPortfolioNav = new THREE.Mesh(projectsFolderGeometry, transparentMaterial);
const projectsFlexboxGameNav = new THREE.Mesh(projectsFolderGeometry, transparentMaterial);
const projectsTictactoeNav = new THREE.Mesh(projectsFolderGeometry, transparentMaterial);
const projectPopupNav = new THREE.Mesh(projectPopupGeometry, transparentMaterial);
const projectPopupCloseNav = new THREE.Mesh(closeGeometry, transparentMaterial);
const creditsNav = new THREE.Mesh(creditsGeometry, transparentMaterial);
const creditsPopupNav = new THREE.Mesh(creditsPopupGeometry, transparentMaterial);
const creditsCloseNav = new THREE.Mesh(closeGeometry, transparentMaterial);
const photosNav = new THREE.Mesh(photosGeometry, transparentMaterial);
const photosPopupNav = new THREE.Mesh(photosPopupGeometry, transparentMaterial);
const photosCloseNav = new THREE.Mesh(closeGeometry, transparentMaterial);
const photos1Nav = new THREE.Mesh(openImageGeometry, transparentMaterial);
const photos2Nav = new THREE.Mesh(openImageGeometry, transparentMaterial);
const photos3Nav = new THREE.Mesh(openImageGeometry, transparentMaterial);
const photoPopupNav = new THREE.Mesh(photoPopupGeometry, transparentMaterial);
const photoPopupCloseNav = new THREE.Mesh(closeGeometry, transparentMaterial);
const projectDocNav = new THREE.Mesh(projectDocGeometry, transparentMaterial);
const jpgNav = new THREE.Mesh(jpgGeometry, transparentMaterial);
const jpgPopupNav = new THREE.Mesh(jpgPopupGeometry, transparentMaterial);
const jpgCloseNav = new THREE.Mesh(closeGeometry, transparentMaterial);
const binNav = new THREE.Mesh(binGeometry, transparentMaterial);
const binPopupNav = new THREE.Mesh(binPopupGeometry, transparentMaterial);
const binCloseNav = new THREE.Mesh(closeGeometry, transparentMaterial);
const binDocNav = new THREE.Mesh(binDocGeometry, transparentMaterial);
const binDocPopupNav = new THREE.Mesh(binDocPopupGeometry, transparentMaterial);
const binDocPopupCloseNav = new THREE.Mesh(closeGeometry, transparentMaterial);

robotNav.position.set(-7.5, 20.6, 19); 
userNav.position.set(-10, 33.9, 18.4); 
userPopupNav.position.set(-9, 28.8, 7.75);
userCloseNav.position.set(-9.9, 34.05, 1.97);
userGithubNav.position.set(-8, 24.12, 12.75);
userLinkedinNav.position.set(-8, 24.12, 11.58);
userMediumNav.position.set(-8, 24.12, 10.257);
userMailNav.position.set(-8, 24.12, 9.07);
notesNav.position.set(-10, 33.85, 15.3); 
notesPopupNav.position.set(-9.4, 30.88, 2.94); 
notesCloseNav.position.set(-9.8, 34.9, -1.65);
projectsNav.position.set(-9.5, 30.7, 18.2); 
projectsPopupNav.position.set(-8.8, 28.15, 9.98);
projectsCloseNav.position.set(-9.5, 32.51, 2.3);
projectsGameboyNav.position.set(-8.8, 28.55, 15.6);
projectsMobileAppNav.position.set(-8.8, 28.55, 12.3);
projectsBrowserExtensionNav.position.set(-8.8, 28.55, 8.95);
projectsRHGNav.position.set(-8.8, 28.55, 5.73);
projectsReactPortfolioNav.position.set(-8, 25.9, 15.6);
projectsFlexboxGameNav.position.set(-8, 25.9, 12.3);
projectsTictactoeNav.position.set(-8, 25.9, 8.95);
projectPopupNav.position.set(-8, 28.9, 4.55);
projectPopupCloseNav.position.set(-8.5, 34.2, -0.66);
creditsNav.position.set(-10, 33.9, 0.3); 
creditsPopupNav.position.set(-8.7, 27.1, 7.75);
creditsCloseNav.position.set(-9.2, 30.56, 1.95);
photosNav.position.set(-10, 33.9, -3);
photosPopupNav.position.set(-9, 29.3, 6.9);  
photosCloseNav.position.set(-9.8, 33.63, -0.7);  
photos1Nav.position.set(-9, 29.7, 12.4);  
photos2Nav.position.set(-9, 29.7, 9.05);  
photos3Nav.position.set(-9, 29.7, 5.65);  
photoPopupNav.position.set(-9.2, 31.2, 3.67);
photoPopupCloseNav.position.set(-9.5, 34.49, -0.95);
projectDocNav.position.set(-9.5, 30.9, -2.8); 
jpgNav.position.set(-8.8, 27.6, 18.2); 
jpgPopupNav.position.set(-8.5, 28, 9.32);
jpgCloseNav.position.set(-9, 31.35, 4.7);
binNav.position.set(-8, 24, -2.9);
binPopupNav.position.set(-9, 29.35, 6.9);
binCloseNav.position.set(-9.75, 33.6, -0.71);
binDocNav.position.set(-8.5, 29.6, 12.6);
binDocPopupNav.position.set(-8.5, 27, 3.1);
binDocPopupCloseNav.position.set(-9, 30.38, -1.85);

robotNav.quaternion.copy(combinedQuaternion);
userNav.quaternion.copy(combinedQuaternion);
userPopupNav.quaternion.copy(combinedQuaternion);
userCloseNav.quaternion.copy(combinedQuaternion);
userGithubNav.quaternion.copy(combinedQuaternion);
userLinkedinNav.quaternion.copy(combinedQuaternion);
userMediumNav.quaternion.copy(combinedQuaternion);
userMailNav.quaternion.copy(combinedQuaternion);
notesNav.quaternion.copy(combinedQuaternion);
notesPopupNav.quaternion.copy(combinedQuaternion);
notesCloseNav.quaternion.copy(combinedQuaternion);
projectsNav.quaternion.copy(combinedQuaternion);
projectsPopupNav.quaternion.copy(combinedQuaternion);
projectsCloseNav.quaternion.copy(combinedQuaternion);
projectsGameboyNav.quaternion.copy(combinedQuaternion);
projectsMobileAppNav.quaternion.copy(combinedQuaternion);
projectsBrowserExtensionNav.quaternion.copy(combinedQuaternion);
projectsRHGNav.quaternion.copy(combinedQuaternion);
projectsReactPortfolioNav.quaternion.copy(combinedQuaternion);
projectsFlexboxGameNav.quaternion.copy(combinedQuaternion);
projectsTictactoeNav.quaternion.copy(combinedQuaternion);
projectPopupNav.quaternion.copy(combinedQuaternion);
projectPopupCloseNav.quaternion.copy(combinedQuaternion);
creditsNav.quaternion.copy(combinedQuaternion);
creditsPopupNav.quaternion.copy(combinedQuaternion);
creditsCloseNav.quaternion.copy(combinedQuaternion);
photosNav.quaternion.copy(combinedQuaternion);
photosPopupNav.quaternion.copy(combinedQuaternion);
photosCloseNav.quaternion.copy(combinedQuaternion);
photos1Nav.quaternion.copy(combinedQuaternion);
photos2Nav.quaternion.copy(combinedQuaternion);
photos3Nav.quaternion.copy(combinedQuaternion);
photoPopupNav.quaternion.copy(combinedQuaternion);
photoPopupCloseNav.quaternion.copy(combinedQuaternion);
projectDocNav.quaternion.copy(combinedQuaternion);
jpgNav.quaternion.copy(combinedQuaternion);
jpgPopupNav.quaternion.copy(combinedQuaternion);
jpgCloseNav.quaternion.copy(combinedQuaternion);
binNav.quaternion.copy(combinedQuaternion);
binPopupNav.quaternion.copy(combinedQuaternion);
binCloseNav.quaternion.copy(combinedQuaternion);
binDocNav.quaternion.copy(combinedQuaternion);
binDocPopupNav.quaternion.copy(combinedQuaternion);
binDocPopupCloseNav.quaternion.copy(combinedQuaternion);

gltfLoader.load(
    'gameboy.glb',
    (gltf) => 
    {

        const roundFloor = gltf.scene.children.filter(child => child.name === 'round_floor');
        roundFloor.forEach(child => {
            child.material = bakedMaterials.material4; 
        });

        
        const parts2Cylinder = gltf.scene.children.filter(child => child.name === 'Parts2_Cylinder003');
        parts2Cylinder.forEach(child => {
            const smoke = createSmokeEffect();
            child.add(smoke); 
        });

        const pipeMeshes = ['NurbsPath', 'NurbsPath002'];
        const textMeshes = ['text_idas_gameboy', 'Text'];

        const pipeMesh = gltf.scene.children.filter(child => pipeMeshes.includes(child.name));
        pipeMesh.forEach(child => {
            child.material = pipes;
        });

        const textMesh = gltf.scene.children.filter(child => textMeshes.includes(child.name));
        textMesh.forEach(child => {
            child.material = text;
        });

        const stringMesh = gltf.scene.children.filter(child => child.name === 'tea_bag_string');
        stringMesh.forEach(child => {
            child.material = string;
        });

        const button = gltf.scene.children.filter(child => child.name === 'Parts2_Cube066');
        button.forEach(child => {
            objectsToTest.push(child);
            buttonGlowingEdges = createGlowingEdges(child); 
            scene.add(buttonGlowingEdges);
        });


        objectsToTest.push(screenCube)

        objectsToTest.push(robotNav)
        objectsToTest.push(userNav)
        objectsToTest.push(notesNav)
        objectsToTest.push(projectsNav)
        objectsToTest.push(creditsNav)
        objectsToTest.push(photosNav)
        objectsToTest.push(projectDocNav)
        objectsToTest.push(jpgNav)
        objectsToTest.push(binNav)

        const calc = gltf.scene.children.filter(child => child.name.startsWith('Calc_'));
        calc.forEach(child => {
            child.material = bakedMaterials.material1; 
        });

        const cup = gltf.scene.children.filter(child => child.name.startsWith('Cup_'));
        cup.forEach(child => {
            child.material = bakedMaterials.material2;
        });

        const extra = gltf.scene.children.filter(child => child.name.startsWith('Extra_'));
        extra.forEach(child => {
            child.material = bakedMaterials.material3;
        });

        const keyboard = gltf.scene.children.filter(child => child.name.startsWith('Keyboard_'));
        keyboard.forEach(child => {
            child.material = bakedMaterials.material5;
        });

        const chassis = gltf.scene.children.filter(child => child.name.startsWith('Chassis_'));
        chassis.forEach(child => {
            child.material = bakedMaterials.material6;
        });

        const chassis2 = gltf.scene.children.filter(child => child.name.startsWith('Chassis2_'));
        chassis2.forEach(child => {
            child.material = bakedMaterials.material10;
        });

        const parts2 = gltf.scene.children.filter(child => child.name.startsWith('Parts2_'));
        parts2.forEach(child => {
            child.material = bakedMaterials.material7;
        });

        const parts = gltf.scene.children.filter(child => child.name.startsWith('Parts_'));
        parts.forEach(child => {
            child.material = bakedMaterials.material8;
        });

        const cordMesh = gltf.scene.children.filter(child => child.name.startsWith('Cords_'));
        cordMesh.forEach(child => {
            child.material = bakedMaterials.material11;
        });

        const small = gltf.scene.children.filter(child => child.name.startsWith('Small_'));
        small.forEach(child => {
            child.material = bakedMaterials.material9;
        });

        const red = gltf.scene.children.filter(child => child.name.startsWith('Red_'));
        red.forEach(child => {
            child.material = redGlow;  
        });

        const orange = gltf.scene.children.filter(child => child.name.startsWith('Orange_'));
        orange.forEach(child => {
            child.material = orangeGlow;  
        });

        const yellow = gltf.scene.children.filter(child => child.name.startsWith('Yellow_'));
        yellow.forEach(child => {
            child.material = yellowGlow;  
        });

        const green = gltf.scene.children.filter(child => child.name.startsWith('Green_'));
        green.forEach(child => {
            child.material = greenGlow;  
        });

        const blue = gltf.scene.children.filter(child => child.name.startsWith('Blue_'));
        blue.forEach(child => {
            child.material = blueGlow;  
        });

        const purple = gltf.scene.children.filter(child => child.name.startsWith('Purple_'));
        purple.forEach(child => {
            child.material = purpleGlow;  
        });

        const white = gltf.scene.children.filter(child => child.name.startsWith('White_'));
        white.forEach(child => {
            child.material = whiteGlow;  
        });

        const white2 = gltf.scene.children.filter(child => child.name.startsWith('White2_'));
        white2.forEach(child => {
            child.material = whiteGlow2;  
        });

        scene.add(gltf.scene);
    }
);

loadFont(scene);
particles(scene);

// Resize event listener

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};


window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    //Update particles
    if (particlesMaterial) {
        particlesMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    }

    cameraPositions = updateCameraPositions();

})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 10, 500);

const isMobile = window.innerWidth < 768;

if (isMobile) {
    camera.position.set(140, 80, 60);
} else {
    camera.position.set(110, 50, 40);
}

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 170;
controls.minDistance = 80;

controls.minPolarAngle = Math.PI / 4; 
controls.maxPolarAngle = Math.PI / 2.2;

controls.enablePan = false;
controls.enableTouch = true;

function setMinDistance(distance) {
    controls.minDistance = distance;
}

function setMaxDistance(distance) {
    controls.maxDistance = distance;
}


const initialCameraPosition = camera.position.clone(); 
const initialControlTarget = controls.target.clone(); 

// Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//Raycaster:
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isTouchActive = false;
let startX = 0;
let startY = 0;
let moveThreshold = 30;

window.addEventListener('pointerdown', (event) => {
    console.log("hhiii down")
    isTouchActive = true;
    startX = event.clientX;
    startY = event.clientY;
    updateMousePosition(event);
});

window.addEventListener('pointermove', (event) => {
    if (isTouchActive) {
        console.log("Pointer move");
        const dx = Math.abs(event.clientX - startX);
        const dy = Math.abs(event.clientY - startY);
        if (dx > moveThreshold || dy > moveThreshold) {
            isTouchActive = false;
        }
        updateMousePosition(event);
    }
});

function updateMousePosition(event) {
    console.log("Updated mouse position: ", event.clientX, event.clientY);
    mouse.x = (event.clientX / sizes.width) * 2 - 1;
    mouse.y = - (event.clientY / sizes.height) * 2 + 1;
}

// function showConsoleMessage(message) {
//     const debugMessagesContainer = document.getElementById('debug-messages');
//     const newMessage = document.createElement('div');
//     newMessage.textContent = message;
//     debugMessagesContainer.appendChild(newMessage);

//     // Ensure the overlay is visible
//     const debugOverlay = document.getElementById('debug-overlay');
//     debugOverlay.style.display = 'block'; // Keep it always visible
// }

// // Temporarily replace console.log with showConsoleMessage for debugging
// const originalConsoleLog = console.log;
// console.log = function(...args) {
//     // Show the message in the overlay
//     args.forEach(arg => showConsoleMessage(arg));
//     // Call the original console.log for the browser console
//     originalConsoleLog.apply(console, args);
// };



let currentIntersect = null;
let objectsToTest = []

console.log(objectsToTest)

const screenStartMaterial = new THREE.MeshBasicMaterial({ map: screens.screenStart });
const screenRobotMaterial = new THREE.MeshBasicMaterial({ map: screens.screenRobot });
const screenProjectsMaterial = new THREE.MeshBasicMaterial({ map: screens.screenProjects });
const screenProject3DPortfolioMaterial = new THREE.MeshBasicMaterial({ map: screens.screen3DPortfolio });
const screenProjectMobileAppMaterial = new THREE.MeshBasicMaterial({ map: screens.screenMobileApp });
const screenProjectBrowserExtensionMaterial = new THREE.MeshBasicMaterial({ map: screens.screenBrowserExt });
const screenProjectRHGMaterial = new THREE.MeshBasicMaterial({ map: screens.screenRHG });
const screenProjectReactPortfolioMaterial = new THREE.MeshBasicMaterial({ map: screens.screenReactPortfolio });
const screenProjectFlexboxGameMaterial = new THREE.MeshBasicMaterial({ map: screens.screenFlexboxGame });
const screenProjectTicTacToeMaterial = new THREE.MeshBasicMaterial({ map: screens.screenTicTacToe });
const screenUserMaterial = new THREE.MeshBasicMaterial({ map: screens.screenUser });
const screenNotesMaterial = new THREE.MeshBasicMaterial({ map: screens.screenNotes });
const screenCreditsMaterial = new THREE.MeshBasicMaterial({ map: screens.screenCredits });
const screenPhotosMaterial = new THREE.MeshBasicMaterial({ map: screens.screenPhotos });
const screenEeveeMaterial = new THREE.MeshBasicMaterial({ map: screens.screenEevee });
const screenEevee2Material = new THREE.MeshBasicMaterial({ map: screens.screenEevee2 });
const screenYoshiMaterial = new THREE.MeshBasicMaterial({ map: screens.screenYoshi });
const screenYoshi2Material = new THREE.MeshBasicMaterial({ map: screens.screenYoshi2 });
const screenBinMaterial = new THREE.MeshBasicMaterial({ map: screens.screenBin });
const screenBinDocMaterial = new THREE.MeshBasicMaterial({ map: screens.screenBinDoc });

const originalMaterials = new Map();

function storeOriginalMaterials(scene) {
    scene.traverse((child) => {
        if (child.isMesh) {
            originalMaterials.set(child, child.material);  
        }
    }); 
}

let clickCount = 0; 
createBunnyVirusPopup();

const breakpoints = {
    desktop: 1224, 
    tablet: 768    
};

function updateCameraPositions() {
    const { buttonPositionX, screenPositionX, buttonPositionY, screenPositionY, buttonTargetY, screenTargetY } = getDynamicPositions(sizes.width);

    return {
        button: { positionOffset: { x: buttonPositionX, y: buttonPositionY, z: -10 }, targetOffset: { x: 0, y: buttonTargetY, z: 0 } },
        screen: { positionOffset: { x: screenPositionX, y: screenPositionY, z: 0 }, targetOffset: { x: 0, y: screenTargetY, z: 0 } }
    };
}


function getDynamicPositions(width) {
    if (width >= breakpoints.desktop) {
        return { buttonPositionX: -25, screenPositionX: 25, buttonPositionY: 5, screenPositionY: 5, buttonTargetY: -5, screenTargetY: 0 };
    } else if (width >= breakpoints.tablet) {
        return { buttonPositionX: -32, screenPositionX: 40, buttonPositionY: 7, screenPositionY: 8, buttonTargetY: -5, screenTargetY: 0 };
    } else {
        return { buttonPositionX: -40, screenPositionX: 52, buttonPositionY: 8, screenPositionY: 12, buttonTargetY: -7, screenTargetY: -5 };
    }
}

let cameraPositions = updateCameraPositions();


function updateRaycastTargets(addObjects) {
    Object.values(navPopupMappings).forEach(([nav, popup, close, extra1, extra2, extra3, extra4, extra5, extra6, extra7]) => {
        if (addObjects) {
            scene.add(nav);
        } else {
            scene.remove(nav);
            scene.remove(popup);  
            scene.remove(close);
            scene.remove(extra1);
            scene.remove(extra2);
            scene.remove(extra3);
            scene.remove(extra4);
            scene.remove(extra5);
            scene.remove(extra6);
            scene.remove(extra7); 
        }
    });
}

const navPopupMappings = {
    2: [robotNav],
    3: [userNav, userPopupNav, userCloseNav, userGithubNav, userLinkedinNav, userMediumNav, userMailNav],
    4: [notesNav, notesPopupNav, notesCloseNav],
    5: [projectsNav, projectsPopupNav, projectsCloseNav, projectsGameboyNav, projectsMobileAppNav, projectsBrowserExtensionNav, projectsRHGNav, projectsReactPortfolioNav, projectsFlexboxGameNav, projectsTictactoeNav, projectPopupNav, projectPopupCloseNav],
    6: [creditsNav, creditsPopupNav, creditsCloseNav],
    7: [photosNav, photosPopupNav, photosCloseNav, photos1Nav, photos2Nav, photos3Nav, photoPopupNav, photoPopupCloseNav],
    8: [projectDocNav],
    9: [jpgNav, jpgPopupNav, jpgCloseNav],
    10: [binNav, binPopupNav, binCloseNav, binDocNav, binDocPopupNav, binDocPopupCloseNav]
};

const screenMaterials = {
    3: screenUserMaterial,
    4: screenNotesMaterial,
    5: screenProjectsMaterial,
    6: screenCreditsMaterial,
    7: screenPhotosMaterial,
    9: screenYoshiMaterial,
    10: screenBinMaterial
};


let activePopup = null;
let activeClose = null;
let activeExtra1 = null;
let activeExtra2 = null;
let activeExtra3 = null;
let activeExtra4 = null;
let activeExtra5 = null;
let activeExtra6 = null;
let activeExtra7 = null;
let activeExtra8 = null;
let activeExtra9 = null;
let cameraMoved = false;

let active = false;

function managePopup(caseIndex) {
    const [_, popupToShow, closePopup, extra1Popup, extra2Popup, extra3Popup, extra4Popup, extra5Popup, extra6Popup, extra7Popup, extra8Popup, extra9Popup] = navPopupMappings[caseIndex] || [];
    const newMaterial = screenMaterials[caseIndex];

    if (activePopup) {
        scene.remove(activePopup);
        scene.remove(activeClose);
        scene.remove(activeExtra1);
        scene.remove(activeExtra2);
        scene.remove(activeExtra3);
        scene.remove(activeExtra4);
        scene.remove(activeExtra5);
        scene.remove(activeExtra6);
        scene.remove(activeExtra7);
        scene.remove(activeExtra8);
        scene.remove(activeExtra9);
        activePopup = null;
        activeClose = null;
        activeExtra1 = null;
        activeExtra2 = null;
        activeExtra3 = null;
        activeExtra4 = null;
        activeExtra5 = null;
        activeExtra6 = null;
        activeExtra7 = null;
        activeExtra8 = null;
        activeExtra9 = null;
        objectsToTest.splice(11, 11);
        console.log(objectsToTest)

    }
    if (popupToShow) {
        scene.add(popupToShow);
        objectsToTest.push(popupToShow)
        activePopup = popupToShow;
    }
    if (closePopup) {
        scene.add(closePopup);
        objectsToTest.push(closePopup) 
        activeClose = closePopup;
    }
    if (extra1Popup) {
        scene.add(extra1Popup);
        objectsToTest.push(extra1Popup) 
        activeExtra1 = extra1Popup;
    }
    if (extra2Popup) {
        if(caseIndex === 10) {
            if(active === true) {
                scene.add(extra2Popup);
                objectsToTest.push(extra2Popup) 
                activeExtra2 = extra2Popup;
            }
        } else {
            scene.add(extra2Popup);
            objectsToTest.push(extra2Popup) 
            activeExtra2 = extra2Popup;
        }
    }
    if (extra3Popup) {
        if(caseIndex === 10) {
            if(active === true) {
                scene.add(extra3Popup);
                objectsToTest.push(extra3Popup) 
                activeExtra3 = extra3Popup;
            }
        } else {
            scene.add(extra3Popup);
            objectsToTest.push(extra3Popup) 
            activeExtra3 = extra3Popup;
        }
    }
    if (extra4Popup) {
        if(caseIndex === 7) {
            if(active === true) {
                scene.add(extra4Popup);
                objectsToTest.push(extra4Popup) 
                activeExtra4 = extra4Popup;
            }
        } else {
            scene.add(extra4Popup);
            objectsToTest.push(extra4Popup) 
            activeExtra4 = extra4Popup;
        }
       
    }
    if (extra5Popup) {
        if(caseIndex === 7) {
            if(active === true) {
                scene.add(extra5Popup);
                objectsToTest.push(extra5Popup) 
                activeExtra5 = extra5Popup;
            }
        } else {
            scene.add(extra5Popup);
            objectsToTest.push(extra5Popup) 
            activeExtra5 = extra5Popup;
        }
     
    }
    if (extra6Popup) {
        scene.add(extra6Popup);
        objectsToTest.push(extra6Popup) 
        activeExtra6 = extra6Popup;
    }
    if (extra7Popup) {
        scene.add(extra7Popup);
        objectsToTest.push(extra7Popup) 
        activeExtra7 = extra7Popup;
    }
    if (extra8Popup && active === true) {
        scene.add(extra8Popup);
        objectsToTest.push(extra8Popup) 
        activeExtra8 = extra8Popup;
    }
    if (extra9Popup && active === true) {
        scene.add(extra9Popup);
        objectsToTest.push(extra9Popup) 
        activeExtra9 = extra9Popup;
    }
    
    if (newMaterial) {
        screenCube.material = newMaterial;
    }
}

let virusGame = false;

let originalObjectsToTest = [];

function storeOriginalObjects() {
    originalObjectsToTest = [...objectsToTest];
    console.log("storeObjects", originalObjectsToTest)
}

export function resetGameState() {
    location.reload();
}

let isAnimatingCamera = false;

let backArrow;

function createBackArrow() {
    backArrow = document.createElement("img");
    backArrow.src = "assets/backArrow.png"; 
    backArrow.style.position = "absolute";
    backArrow.style.bottom = "30px";
    backArrow.style.left = "30px";
    backArrow.style.width = "auto"; 
    backArrow.style.height = "50px";
    backArrow.style.cursor = "pointer";
    backArrow.style.display = "none"; 
    document.body.appendChild(backArrow);
    backArrow.id = "backArrow";
}

createBackArrow();

backArrow.addEventListener("click", () => {
    console.log("heyy")
     if (cameraMoved) {
        if (isAnimatingCamera) return;
        else {
        buttonGlowingEdges.visible = true;
        screenCubeGlowingEdges.visible = true;
        screenCube.material = cubeScreenMaterial;
        removeClockTexts(scene);
        resetCamera(1.5);
        cameraMoved = false; 
        updateRaycastTargets(false);
        clickCount = 0; 
        managePopup(null)
        backArrow.style.display = "none";
        document.getElementById('nav').style.display = 'flex';
        }
    }
});


function leaveSite(index) {
    const leavePopup = document.getElementById('leave-site-popup');
    
    leavePopup.classList.remove('hidden');
    leavePopup.style.display = 'flex'; 

    console.log("heelo")


    const urlMapping = {
        8: 'https://medium.com/@ida-lindgren/from-inspiration-to-creation-how-i-built-my-3d-interactive-portfolio-856182f255c9',
        13: 'https://github.com/IdaLindgrn',
        14: 'https://www.linkedin.com/in/idalindgren/',
        15: 'https://medium.com/@ida-lindgren'
    };

    const resetState = () => {
        leavePopup.classList.add('hidden');
        leavePopup.style.display = 'none';
        index = null;
    };

    document.getElementById('leave-site-button').addEventListener('click', () => {
        if (urlMapping[index]) {
            window.open(urlMapping[index], '_blank');
        } else {
            console.warn('No URL mapped for index:', index);
        }
        resetState();
    });

    document.getElementById('stay-site-button').addEventListener('click', () => {
        resetState();
    });
};


window.addEventListener('pointerup', (event) => {
    console.log("Pointer up");

if (isTouchActive) {

    console.log("Click event triggered");

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length) {
        intersects.sort((a, b) => a.distance - b.distance);
        const clickedObject = intersects[0].object;

        const specialMeshNames = [
            "Parts2_Plane007",
            "Parts2_Plane009",
            "Plane006",
            "Text001"
        ];

        const targetButtonMesh = screenCube;

        projectButton.addEventListener('click', () => {
            document.getElementById('nav').style.display = 'none';
            setMinDistance(20);
            screenCubeGlowingEdges.visible = false;
            console.log('click on screen');
            loadClockTexts(scene);
            targetButtonMesh.material = screenProjectsMaterial;  
            animateCamera(targetButtonMesh.position, 1.5, cameraPositions.screen);
            cameraMoved = true;
            updateRaycastTargets(true);
            active = false;
            managePopup(5);
            backArrow.style.display = "block";
        });
        
        aboutMeButton.addEventListener('click', () => {
            document.getElementById('nav').style.display = 'none';
            setMinDistance(20);
            screenCubeGlowingEdges.visible = false;
            console.log('click on screen');
            loadClockTexts(scene);
            targetButtonMesh.material = screenUserMaterial;  
            animateCamera(targetButtonMesh.position, 1.5, cameraPositions.screen);
            cameraMoved = true;
            updateRaycastTargets(true);
            active = false;
            managePopup(3);
            backArrow.style.display = "block";
        });
        
        creditsButton.addEventListener('click', () => {
            document.getElementById('nav').style.display = 'none';
            setMinDistance(20);
            screenCubeGlowingEdges.visible = false;
            console.log('click on screen');
            loadClockTexts(scene);
            targetButtonMesh.material = screenCreditsMaterial;  
            animateCamera(targetButtonMesh.position, 1.5, cameraPositions.screen);
            cameraMoved = true;
            updateRaycastTargets(true);
            active = false;
            managePopup(6);
            backArrow.style.display = "block";
        });
    
        if (objectsToTest.includes(clickedObject) || specialMeshNames.includes(clickedObject.name)) {
            console.log("Valid object clicked");
            document.getElementById('nav').style.display = 'none';

            const index = objectsToTest.includes(clickedObject)
            ? objectsToTest.indexOf(clickedObject)
            : (specialMeshNames.includes(clickedObject.name) ? 0 : -1);


        console.log(`Clicked object index: ${index}`);
        console.log(`Object position:`, clickedObject.position);

        let caseIndex = null;
        for (const [key, value] of Object.entries(navPopupMappings)) {
            if (value.includes(clickedObject)) {
                caseIndex = parseInt(key);
                break;
            }
    }

        console.log(`Case Index: ${caseIndex}`);
        const targetMesh = scene.getObjectByName("Parts2_Cube066");
        
        switch (index) {
            case 0:
            if (isAnimatingCamera) {
                console.log("Camera animation in progress. Ignoring click.");
                return; 
            }
                clickCount++;
                if (!cameraMoved && clickCount < 2) {
                    console.log('click on button');
                    buttonGlowingEdges.visible = false;
                    animateCamera(targetMesh.position, 1.5, cameraPositions.button);
                    cameraMoved = true;
                    setMinDistance(20);
                    backArrow.style.display = "block";
                    // let checkAnimationInterval = setInterval(() => {
                    //     if (!isAnimatingCamera) {
                    //         clearInterval(checkAnimationInterval); 
                    //         setMaxDistance(50);
                    //     }
                    // }, 100);
                } else if (clickCount === 2) { 
                    storeOriginalObjects(); 
                    virusGame = true;
                    cameraMoved = false;
                    updateRaycastTargets(false);
                    clickCount = 0; 
                    managePopup(null);
                    objectsToTest = [];
                    showBunnyVirus();  
                    resetCamera(1.5);  
                    backArrow.style.display = "none";
                } 
                break;
            case 1:
                setMinDistance(20);
                screenCubeGlowingEdges.visible = false;
                console.log('click on screen');
                loadClockTexts(scene);
                clickedObject.material = screenStartMaterial;
                animateCamera(clickedObject.position, 1.5, cameraPositions.screen);
                cameraMoved = true;
                updateRaycastTargets(true);
                active = false;
                managePopup(null);
                backArrow.style.display = "block";

                // let checkAnimationInterval = setInterval(() => {
                //     if (!isAnimatingCamera) {
                //         clearInterval(checkAnimationInterval); 
                //         setMaxDistance(55);
                //     }
                // }, 100);
                break;
            case 2:
                console.log('click on robot');
                screenCube.material = screenRobotMaterial;
                active = false;
                managePopup(null);
                break;
            case 8:
                console.log('click on projectsDoc');
                leaveSite(index);
                break;
            case 11:
                console.log('click on popup');
                active = false;
                managePopup(caseIndex);
                break;
            case 12:
                console.log('click on close');
                screenCube.material = screenStartMaterial;
                active = false;
                managePopup(null);
                break;
            case 13:
                if (caseIndex === 3) {
                    console.log('click on Github');
                    leaveSite(index);
                }
                if (caseIndex === 5) {
                    console.log('click on Gameboy');
                    active = true;
                    managePopup(caseIndex);
                    screenCube.material = screenProject3DPortfolioMaterial;
                }
                if (caseIndex === 7) {
                    console.log('click on Photo 1');
                    active = true;
                    managePopup(caseIndex);
                    screenCube.material = screenEeveeMaterial;
                    
                }
                if (caseIndex === 10) {
                    console.log('click on binDoc');  
                    active = true;
                    managePopup(caseIndex);
                    screenCube.material = screenBinDocMaterial;  
                }
                break;
            case 14:
                if (caseIndex === 3) {
                    console.log('click on Linkedin');    
                    leaveSite(index); 
                }
                if (caseIndex === 5) {
                    console.log('click on MobileApp');
                    active = true;
                    managePopup(caseIndex);
                    screenCube.material = screenProjectMobileAppMaterial;       
                }
                if (caseIndex === 7) {
                    console.log('click on Photo 2');
                    active = true;
                    managePopup(caseIndex);
                    screenCube.material = screenYoshi2Material;     
                }
                if (caseIndex === 10) {
                    console.log('click on binDocPopup'); 
                }
                break;
            case 15:
                if (caseIndex === 3) {
                    console.log('click on Medium');  
                    leaveSite(index);   
                }
                if (caseIndex === 5) {
                    console.log('click on BrowserExtension');
                    active = true;
                    managePopup(caseIndex);
                    screenCube.material = screenProjectBrowserExtensionMaterial;            
                }
                if (caseIndex === 7) {
                    console.log('click on Photo 3');
                    active = true;
                    managePopup(caseIndex);
                    screenCube.material = screenEevee2Material;       
                }
                if (caseIndex === 10) {
                    console.log('click on binDocClosePopup'); 
                    active = false;
                    managePopup(caseIndex);
                    screenCube.material = screenBinMaterial;
                }
                break;
            case 16:
                if (caseIndex === 3) {
                    console.log('click on Mail');
                    window.location.href = 'mailto:ida-lindgren@hotmail.com';       
                }
                if (caseIndex === 5) {
                    console.log('click on RHG');
                    active = true;
                    managePopup(caseIndex);
                    screenCube.material = screenProjectRHGMaterial;               
                }
                if (caseIndex === 7) {
                    console.log('click on Photo opened');                            
                }
                break;
            case 17:
                if (caseIndex === 5) {
                    console.log('click on React Portolio');
                    active = true;
                    managePopup(caseIndex);
                    screenCube.material = screenProjectReactPortfolioMaterial;             
                }
                if (caseIndex === 7) {
                    console.log('click on Photo close');
                    active = false;
                    managePopup(caseIndex);
                    screenCube.material = screenPhotosMaterial;
                            
                }
                break;
            case 18:
                if (caseIndex === 5) {
                    console.log('click on Flexbox Game');
                    active = true;
                    managePopup(caseIndex);
                    screenCube.material = screenProjectFlexboxGameMaterial;
                                                                  
                }
                break;
            case 19:
                if (caseIndex === 5) {
                    console.log('click on Tictactoe');
                    active = true;
                    managePopup(caseIndex);
                    screenCube.material = screenProjectTicTacToeMaterial;                         
                }
                break;
            case 20:
                if (caseIndex === 5) {
                    console.log('click on opened project');
                        
                }
                break;
            case 21:
                if (caseIndex === 5) {
                    console.log('click on close project');
                    screenCube.material = screenProjectsMaterial;
                    active = false;                    
                    managePopup(caseIndex);
                }
                break;
            default:
                if (navPopupMappings[index]) {
                    active = false;
                    managePopup(caseIndex);
                }
                break;
        }
    }
}
}
isTouchActive = false;
});

function resetCamera(duration) {
    console.log("hii")

    if (isAnimatingCamera) return;
    
    controls.enableRotate = false; 
    console.log("hii")
    

    gsap.to(camera.position, {
        duration: duration,
        x: initialCameraPosition.x,
        y: initialCameraPosition.y,
        z: initialCameraPosition.z,
        ease: 'power1.inOut'
    });

    gsap.to(controls.target, {
        duration: duration,
        x: initialControlTarget.x, 
        y: initialControlTarget.y,
        z: initialControlTarget.z,
        ease: 'power1.inOut',
        onComplete: () => {
            if (virusGame === true) return;
            else {
                if (isAnimatingCamera) return;
                
                setMinDistance(80);
                console.log("hello")
                controls.reset();
                controls.enableRotate = true; 
                controls.enableZoom = true;
                controls.update();
            }
        }
    });
}

function animateCamera(targetPosition, duration, cameraSettings) {
    console.log("animateCamera called");
    console.log(`Target position:`, targetPosition);
    console.log(`Duration: ${duration}`);
    console.log(`Camera Settings:`, cameraSettings);

    if (isAnimatingCamera) {
        console.log("Animation already in progress, returning early");
        return;
    }

    isAnimatingCamera = true;

    controls.enableRotate = false;
    controls.enableZoom = false;

    const positionOffset = cameraSettings.positionOffset;
    const targetOffset = cameraSettings.targetOffset;

    console.log(`Position Offset:`, positionOffset);
    console.log(`Target Offset:`, targetOffset);

    gsap.to(camera.position, {
        duration: duration,
        x: targetPosition.x + positionOffset.x,
        y: targetPosition.y + positionOffset.y,
        z: targetPosition.z + positionOffset.z,
        ease: 'power1.inOut',
        onUpdate: () => {
            console.log("Camera position update:", camera.position);
        }
    });

    gsap.to(controls.target, {
        duration: duration,
        x: targetPosition.x + targetOffset.x, 
        y: targetPosition.y + targetOffset.y,
        z: targetPosition.z + targetOffset.z,
        ease: 'power1.inOut',
        onUpdate: () => {
            console.log("Controls target update:", controls.target);
        },
        onComplete: () => {
            console.log("Camera animation complete");
            isAnimatingCamera = false;
            controls.enableRotate = false;
            controls.enableZoom = true;
            controls.update();
        }
    });
}

const clock = new THREE.Clock();

const tick = () => {

    const elapsedTime = clock.getElapsedTime();

    particlesMaterial.uniforms.uTime.value = elapsedTime;

    if (buttonGlowingEdges) {
        buttonGlowingEdges.update(elapsedTime);
    }
    if (screenCubeGlowingEdges) {
        screenCubeGlowingEdges.update(elapsedTime);
    }

if (!isTouchActive) {
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(objectsToTest)


    if (intersects.length) {
        if(currentIntersect === null) {
            console.log('Mouse enter:', intersects[0].object);
        }
        currentIntersect = intersects[0]
    }
    else {
        if(currentIntersect) {
            console.log('Mouse leave:', currentIntersect.object);
        }
        currentIntersect = null
    }
}
 
    controls.update();

    scene.traverse((child) => {
        if (child.update) {
            child.update(elapsedTime);
        }
    });

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();
