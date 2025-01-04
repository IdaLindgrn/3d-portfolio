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

/**
 * Textures
 */

const bakedTextures = {
    texture1: textureLoader.load('./textures3/calcBaked.jpg'),
    texture2: textureLoader.load('./textures3/cupJoystickBaked.jpg'),
    texture3: textureLoader.load('./textures3/extraSmallPartsBaked.jpg'),
    texture4: textureLoader.load('./textures3/floorBaked.jpg'),
    texture5: textureLoader.load('./textures3/keyboardBaked.jpg'),
    texture6: textureLoader.load('./textures3/chassisBaked.jpg'),
    texture7: textureLoader.load('./textures3/gameboyParts2Baked.jpg'),
    texture8: textureLoader.load('./textures3/gameboyPartsBaked.jpg'),
    texture9: textureLoader.load('./textures3/smallPartsBaked.jpg'),
    texture10: textureLoader.load('./textures3/chassis2Baked.jpg'),
    texture11: textureLoader.load('./textures3/cordsBaked.jpg')
};

const screens = {
    screenStart: textureLoader.load('./textures/startScreen.jpg'),
    screenRobot: textureLoader.load('./textures/robotScreen.jpg'),
    screenProjects: textureLoader.load('./textures/projectsScreen.jpg'),
    screen3DPortfolio: textureLoader.load('./textures/project3DPortfolioScreen.jpg'),
    screenMobileApp: textureLoader.load('./textures/projectMobileAppScreen.jpg'),
    screenBrowserExt: textureLoader.load('./textures/projectBrowserExtScreen.jpg'),
    screenRHG: textureLoader.load('./textures/projectRHGScreen.jpg'),
    screenReactPortfolio: textureLoader.load('./textures/projectReactPortfolioScreen.jpg'),
    screenFlexboxGame: textureLoader.load('./textures/projectFlexboxGameScreen.jpg'),
    screenTicTacToe: textureLoader.load('./textures/projectTicTacToeScreen.jpg'),
    screenUser: textureLoader.load('./textures/userScreen.jpg'),
    screenNotes: textureLoader.load('./textures/notesScreen.jpg'),
    screenCredits: textureLoader.load('./textures/creditsScreen.jpg'),
    screenPhotos: textureLoader.load('./textures/photosScreen.jpg'),
    screenEevee: textureLoader.load('./textures/eeveeScreen.jpg'),
    screenEevee2: textureLoader.load('./textures/eeveeScreen2.jpg'),
    screenYoshi: textureLoader.load('./textures/yoshiScreen.jpg'),
    screenYoshi2: textureLoader.load('./textures/yoshiScreen2.jpg'),
    screenBin: textureLoader.load('./textures/binScreen.jpg'),
    screenBinDoc: textureLoader.load('./textures/binDocScreen.jpg'),
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

// const cords = new THREE.MeshBasicMaterial({ color: 0x181515 });
const pipes = new THREE.MeshBasicMaterial({ color: 0x0f0e0e });
const string = new THREE.MeshBasicMaterial({ color: 0xa4a3a3 });
const text = new THREE.MeshBasicMaterial({ color: 0x863f0c });

const transparentMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity:  0,  
});



// screen 

const robotVideo = document.createElement('video');
robotVideo.src = '/videos/robot.mp4';
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
waveVideo.src = '/videos/wave.mp4';
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
heartVideo.src = '/videos/heart.mp4';
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
miniRobotVideo.src = '/videos/robot.mp4';
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
shortVideo.src = '/videos/shortVideo.mp4';
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
const userPopupGeometry = new THREE.PlaneGeometry(10.6, 9.71);
const notesGeometry = new THREE.PlaneGeometry(2.5, 2.9);
const notesPopupGeometry = new THREE.PlaneGeometry(8.7, 7.35);
const projectsGeometry = new THREE.PlaneGeometry(2.7, 2.9);
const projectsPopupGeometry = new THREE.PlaneGeometry(13.8, 8.2);
const projectPopupGeometry = new THREE.PlaneGeometry(9.1, 9.2);
const creditsGeometry = new THREE.PlaneGeometry(2.5, 2.7);
const creditsPopupGeometry = new THREE.PlaneGeometry(10.74, 6.72);
const photosGeometry = new THREE.PlaneGeometry(2.9, 2.7);
const photosPopupGeometry = new THREE.PlaneGeometry(13.67, 8.16);
const photoPopupGeometry = new THREE.PlaneGeometry(7.8, 5.7);
const projectDocGeometry = new THREE.PlaneGeometry(3.3, 2.7);
const jpgGeometry = new THREE.PlaneGeometry(3.2, 2.8);
const jpgPopupGeometry = new THREE.PlaneGeometry(8.9, 6.5);
const binGeometry = new THREE.PlaneGeometry(3.5, 3);
const binPopupGeometry = new THREE.PlaneGeometry(13.7, 8.2);
const closeGeometry = new THREE.PlaneGeometry(0.5, 0.5);
const linksGeometry = new THREE.PlaneGeometry(0.8, 0.8);
const projectsFolderGeometry = new THREE.PlaneGeometry(1.7, 1.9);
const openImageGeometry = new THREE.PlaneGeometry(2.2, 1.8);
const binDocGeometry = new THREE.PlaneGeometry(2, 2.2);
const binDocPopupGeometry = new THREE.PlaneGeometry(8.65, 6.1);
 

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
userPopupNav.position.set(-5, 29.5, 7.75);
userCloseNav.position.set(-4, 33.82, 3.275);
userGithubNav.position.set(-4, 25.65, 11.9);
userLinkedinNav.position.set(-4, 25.65, 10.9);
userMediumNav.position.set(-4, 25.65, 9.85);
userMailNav.position.set(-4, 25.65, 8.83);
notesNav.position.set(-10, 33.85, 15.3); 
notesPopupNav.position.set(-5, 31.2, 3.8); 
notesCloseNav.position.set(-4, 34.37, 0.47);
projectsNav.position.set(-9.5, 30.7, 18.2); 
projectsPopupNav.position.set(-5, 28.9, 9.6);
projectsCloseNav.position.set(-4, 32.54, 3.51);
projectsGameboyNav.position.set(-4, 29.5, 14.06);
projectsMobileAppNav.position.set(-4, 29.5, 11.4);
projectsBrowserExtensionNav.position.set(-4, 29.5, 8.75);
projectsRHGNav.position.set(-4, 29.5, 6.1);
projectsReactPortfolioNav.position.set(-4, 27.3, 14.2);
projectsFlexboxGameNav.position.set(-4, 27.3, 11.5);
projectsTictactoeNav.position.set(-4, 27.3, 8.75);
projectPopupNav.position.set(-3, 29.7, 5.3);
projectPopupCloseNav.position.set(-2, 33.76, 1.69);
creditsNav.position.set(-10, 33.9, 0.3); 
creditsPopupNav.position.set(-5, 28, 7.7);
creditsCloseNav.position.set(-4, 31, 3.15);
photosNav.position.set(-10, 33.9, -3);
photosPopupNav.position.set(-5, 29.9, 7);  
photosCloseNav.position.set(-4, 33.4, 1.17);  
photos1Nav.position.set(-4, 30.3, 11.4);  
photos2Nav.position.set(-4, 30.3, 8.8);  
photos3Nav.position.set(-4, 30.3, 6.1);  
photoPopupNav.position.set(-3, 31.55, 4.64);
photoPopupCloseNav.position.set(-2, 33.95, 1.6);
projectDocNav.position.set(-9.5, 30.9, -2.8); 
jpgNav.position.set(-8.8, 27.6, 18.2); 
jpgPopupNav.position.set(-5, 28.7, 9.1);
jpgCloseNav.position.set(-4, 31.6, 5.285);
binNav.position.set(-8, 24, -2.9);
binPopupNav.position.set(-5, 29.9, 7);
binCloseNav.position.set(-4, 33.41, 1.17);
binDocNav.position.set(-4, 30.2, 11.65);
binDocPopupNav.position.set(-3, 28.35, 4.21);
binDocPopupCloseNav.position.set(-2, 31.07, 0.82);

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
        // Check if movement exceeds threshold
        const dx = Math.abs(event.clientX - startX);
        const dy = Math.abs(event.clientY - startY);
        if (dx > moveThreshold || dy > moveThreshold) {
            // If movement exceeds threshold, stop treating it as a click
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
    
        if (objectsToTest.includes(clickedObject) || specialMeshNames.includes(clickedObject.name)) {
            console.log("Valid object clicked");

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
                    setMinDistance(0);
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
                break;
            case 2:
                console.log('click on robot');
                screenCube.material = screenRobotMaterial;
                active = false;
                managePopup(null);
                break;
            case 8:
                console.log('click on projectsDoc');
                window.open('https://medium.com/@ida-lindgren', '_blank'); 
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
                    window.open('https://github.com/IdaLindgrn', '_blank');
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
                    window.open('https://www.linkedin.com/in/idalindgren/', '_blank');       
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
                    window.open('https://medium.com/@ida-lindgren', '_blank');        
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
else {
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
