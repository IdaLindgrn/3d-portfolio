import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createSmokeEffect } from './smokeEffect.js';
import { loadFont } from './fontLoader.js'
import { particles, particlesMaterial } from './particles.js'
// import { loadingManager } from './loadingManager.js'; 
import GUI from 'lil-gui';
import { gsap } from 'gsap';


// const gui = new GUI({
//     width: 400
// });


const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const loadingManager = new THREE.LoadingManager()  

const textureLoader = new THREE.TextureLoader(loadingManager);
const gltfLoader = new GLTFLoader();


/**
 * Texturesa
 */

const bakedTextures = {
    texture1: textureLoader.load('./textures2/calc.jpg'),
    texture2: textureLoader.load('./textures2/cup.jpg'),
    texture3: textureLoader.load('./textures2/extra.jpg'),
    texture4: textureLoader.load('./textures2/floor.jpg'),
    texture5: textureLoader.load('./textures2/keyboard.jpg'),
    texture6: textureLoader.load('./textures2/chassis.jpg'),
    texture7: textureLoader.load('./textures2/testing.jpg'),
    texture8: textureLoader.load('./textures2/parts.jpg'),
    texture9: textureLoader.load('./textures2/small.jpg')
};

const screens = {
    screenStart: textureLoader.load('./textures/startScreen.jpg'),
    screenRobot: textureLoader.load('./textures/robotScreen.jpg'),
    screenProjects: textureLoader.load('./textures/projectsScreen.jpg'),
    screenProject: textureLoader.load('./textures/projectScreen.jpg'),
    screenUser: textureLoader.load('./textures/userScreen.jpg'),
    screenNotes: textureLoader.load('./textures/notesScreen.jpg'),
    screenCredits: textureLoader.load('./textures/creditsScreen.jpg'),
    screenPhotos: textureLoader.load('./textures/photosScreen.jpg'),
    screenPhoto: textureLoader.load('./textures/photoScreen.jpg'),
    screenYoshi: textureLoader.load('./textures/yoshiScreen.jpg'),
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
    material9: new THREE.MeshBasicMaterial({ map: bakedTextures.texture9 })
};

const redGlow = new THREE.MeshBasicMaterial({ color: 0xffaa9f });
const orangeGlow = new THREE.MeshBasicMaterial({ color: 0xe6c4a3 });
const yellowGlow = new THREE.MeshBasicMaterial({ color: 0xffeb2a });
const greenGlow = new THREE.MeshBasicMaterial({ color: 0xceffB8 });
const blueGlow = new THREE.MeshBasicMaterial({ color: 0xc5e7e7 });
const purpleGlow = new THREE.MeshBasicMaterial({ color: 0xd2c2ef });
const whiteGlow = new THREE.MeshBasicMaterial({ color: 0xffffe5 });
const whiteGlow2 = new THREE.MeshBasicMaterial({ color: 0xffffe5 });

const cords = new THREE.MeshBasicMaterial({ color: 0x181515 });
const pipes = new THREE.MeshBasicMaterial({ color: 0x0f0e0e });
const string = new THREE.MeshBasicMaterial({ color: 0xa4a3a3 });
const text = new THREE.MeshBasicMaterial({ color: 0x863f0c });

const transparentMaterial = new THREE.MeshBasicMaterial({
    color: 0x000,  
    transparent: true,
    opacity: 0.5    
});

// screen 

const cubeGeometry = new THREE.PlaneGeometry(26, 17);  


const screenCube = new THREE.Mesh(cubeGeometry, greenGlow);

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

scene.add(screenCube);

// screen nav

const robotGeometry = new THREE.PlaneGeometry(3, 2.3)
const userGeometry = new THREE.PlaneGeometry(2.5, 2.8)
const userPopupGeometry = new THREE.PlaneGeometry(10.6, 9.71)
const notesGeometry = new THREE.PlaneGeometry(2.5, 2.9)
const notesPopupGeometry = new THREE.PlaneGeometry(8.7, 7.35)
const projectsGeometry = new THREE.PlaneGeometry(2.7, 2.9)
const projectsPopupGeometry = new THREE.PlaneGeometry(13.8, 8.2)
const creditsGeometry = new THREE.PlaneGeometry(2.5, 2.7)
const creditsPopupGeometry = new THREE.PlaneGeometry(10.74, 6.72)
const photosGeometry = new THREE.PlaneGeometry(2.9, 2.7)
const photosPopupGeometry = new THREE.PlaneGeometry(13.67, 8.16)
const projectDocGeometry = new THREE.PlaneGeometry(3.3, 2.7)
const jpgGeometry = new THREE.PlaneGeometry(3.2, 2.8)
const jpgPopupGeometry = new THREE.PlaneGeometry(8.9, 6.5)
const binGeometry = new THREE.PlaneGeometry(3.5, 3)
const binPopupGeometry = new THREE.PlaneGeometry(13.7, 8.2)

const robotNav = new THREE.Mesh(robotGeometry, transparentMaterial);
const userNav = new THREE.Mesh(userGeometry, transparentMaterial);
const userPopupNav = new THREE.Mesh(userPopupGeometry, transparentMaterial);
const notesNav = new THREE.Mesh(notesGeometry, transparentMaterial);
const notesPopupNav = new THREE.Mesh(notesPopupGeometry, transparentMaterial);
const projectsNav = new THREE.Mesh(projectsGeometry, transparentMaterial);
const projectsPopupNav = new THREE.Mesh(projectsPopupGeometry, transparentMaterial);
const creditsNav = new THREE.Mesh(creditsGeometry, transparentMaterial);
const creditsPopupNav = new THREE.Mesh(creditsPopupGeometry, transparentMaterial);
const photosNav = new THREE.Mesh(photosGeometry, transparentMaterial);
const photosPopupNav = new THREE.Mesh(photosPopupGeometry, transparentMaterial);
const projectDocNav = new THREE.Mesh(projectDocGeometry, transparentMaterial);
const jpgNav = new THREE.Mesh(jpgGeometry, transparentMaterial);
const jpgPopupNav = new THREE.Mesh(jpgPopupGeometry, transparentMaterial);
const binNav = new THREE.Mesh(binGeometry, transparentMaterial);
const binPopupNav = new THREE.Mesh(binPopupGeometry, transparentMaterial);

robotNav.position.set(-7.5, 20.6, 19); 
userNav.position.set(-10, 33.9, 18.4); 
userPopupNav.position.set(-5, 29.5, 7.75);
notesNav.position.set(-10, 33.85, 15.3); 
notesPopupNav.position.set(-5, 31.2, 3.8); 
projectsNav.position.set(-9.5, 30.7, 18.2); 
projectsPopupNav.position.set(-5, 28.9, 9.6);
creditsNav.position.set(-10, 33.9, 0.3); 
creditsPopupNav.position.set(-5, 28, 7.7);
photosNav.position.set(-10, 33.9, -3);
photosPopupNav.position.set(-5, 29.9, 7);  
projectDocNav.position.set(-9.5, 30.9, -2.8); 
jpgNav.position.set(-8.8, 27.6, 18.2); 
jpgPopupNav.position.set(-5, 28.7, 9.1);
binNav.position.set(-8, 24, -2.9);
binPopupNav.position.set(-5, 29.9, 7);

robotNav.quaternion.copy(combinedQuaternion);
userNav.quaternion.copy(combinedQuaternion);
userPopupNav.quaternion.copy(combinedQuaternion);
notesNav.quaternion.copy(combinedQuaternion);
notesPopupNav.quaternion.copy(combinedQuaternion);
projectsNav.quaternion.copy(combinedQuaternion);
projectsPopupNav.quaternion.copy(combinedQuaternion);
creditsNav.quaternion.copy(combinedQuaternion);
creditsPopupNav.quaternion.copy(combinedQuaternion);
photosNav.quaternion.copy(combinedQuaternion);
photosPopupNav.quaternion.copy(combinedQuaternion);
projectDocNav.quaternion.copy(combinedQuaternion);
jpgNav.quaternion.copy(combinedQuaternion);
jpgPopupNav.quaternion.copy(combinedQuaternion);
binNav.quaternion.copy(combinedQuaternion);
binPopupNav.quaternion.copy(combinedQuaternion);



// Test cude for holographic

// const testGeometry = new THREE.BoxGeometry(10, 10, 10);
// const testCube = new THREE.Mesh(testGeometry, greenGlow);
// testCube.position.set(40, 27.8, 7.7);
// scene.add(testCube);  




gltfLoader.load(
    'gameboy.glb',
    (gltf) => 
    {

        const roundFloor = gltf.scene.children.filter(child => child.name === 'round_floor');
        roundFloor.forEach(child => {
            child.material = bakedMaterials.material4; 
        });

        const cordMeshes = ['cords', 'GP_Layer001', 'GP_Layer'];
        const pipeMeshes = ['NurbsPath', 'NurbsPath002'];
        const textMeshes = ['text_idas_gameboy', 'Text'];

        const cordMesh = gltf.scene.children.filter(child => cordMeshes.includes(child.name));
        cordMesh.forEach(child => {
            child.material = cords;
        });

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


        const parts2Cylinder = gltf.scene.children.filter(child => child.name === 'Parts2_Cylinder003');
        parts2Cylinder.forEach(child => {
            const smoke = createSmokeEffect();
            child.add(smoke); 
        });

  

        const button = gltf.scene.children.filter(child => child.name === 'Parts2_Cube066');
        button.forEach(child => {
            objectsToTest.push(child);  
        });

        // const buttonPressed = gltf.scene.children.filter(child => child.name === 'Parts2_Plane.009');
        // buttonPressed.forEach(child => {
        //     objectsToTest.push(child);  
        // });

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


        // const gameboyScreen = gltf.scene.children.filter(child => child.name === 'Green_gameboy_large_screen');
        // gameboyScreen.forEach(child => {
        //     objectsToTest.push(child);  // Add to the raycasting list
        // });

        // console.log(gameboyScreen)

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

        const parts2 = gltf.scene.children.filter(child => child.name.startsWith('Parts2_'));
        parts2.forEach(child => {
            child.material = bakedMaterials.material7;
        });

        const parts = gltf.scene.children.filter(child => child.name.startsWith('Parts_'));
        parts.forEach(child => {
            child.material = bakedMaterials.material8;
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
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 10, 500);
camera.position.set(110, 50, 40);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 170;
controls.minDistance = 1;

const initialCameraPosition = camera.position.clone(); 
const initialControlTarget = controls.target.clone(); 


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//Raycaster:
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => 
    {
        mouse.x = event.clientX / sizes.width * 2 - 1
        mouse.y = - (event.clientY / sizes.height) * 2 + 1
    })


let currentIntersect = null;
const objectsToTest = []

console.log(objectsToTest)

const screenStartMaterial = new THREE.MeshBasicMaterial({ map: screens.screenStart });
const screenRobotMaterial = new THREE.MeshBasicMaterial({ map: screens.screenRobot });
const screenProjectsMaterial = new THREE.MeshBasicMaterial({ map: screens.screenProjects });
const screenProjectMaterial = new THREE.MeshBasicMaterial({ map: screens.screenProject });
const screenUserMaterial = new THREE.MeshBasicMaterial({ map: screens.screenUser });
const screenNotesMaterial = new THREE.MeshBasicMaterial({ map: screens.screenNotes });
const screenYoshiMaterial = new THREE.MeshBasicMaterial({ map: screens.screenYoshi });
const screenCreditsMaterial = new THREE.MeshBasicMaterial({ map: screens.screenCredits });
const screenPhotosMaterial = new THREE.MeshBasicMaterial({ map: screens.screenPhotos });
const screenPhotoMaterial = new THREE.MeshBasicMaterial({ map: screens.screenPhoto });
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

function changeMaterials(scene, newMaterial, duration) {
    scene.traverse((child) => {
        if (child.isMesh) {
            if (!originalMaterials.has(child)) {
                originalMaterials.set(child, child.material);
            }
            child.material = newMaterial;
        }
    });

    setTimeout(() => {
        scene.traverse((child) => {
            if (child.isMesh && originalMaterials.has(child)) {
                child.material = originalMaterials.get(child);  
            }
        });
    }, duration * 1000); 
}


const cameraPositions = {
    button: { positionOffset: { x: -25, y: 5, z: -10 }, targetOffset: { x: 0, y: -5, z: 0 } },
    screen: { positionOffset: { x: 25, y: 5, z: 0 }, targetOffset: { x: 0, y: 0, z: 0 } },
};

function updateRaycastTargets(addObjects) {
    Object.values(navPopupMappings).forEach(([nav, popup]) => {
        if (addObjects) {
            scene.add(nav);
        } else {
            scene.remove(nav);
            scene.remove(popup);  // Ensure both Nav and Popup are removed when hiding
        }
    });
}

const navPopupMappings = {
    2: [robotNav],
    3: [userNav, userPopupNav],
    4: [notesNav, notesPopupNav],
    5: [projectsNav, projectsPopupNav],
    6: [creditsNav, creditsPopupNav],
    7: [photosNav, photosPopupNav],
    8: [projectDocNav],
    9: [jpgNav, jpgPopupNav],
    10: [binNav, binPopupNav]
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
let cameraMoved = false;

function managePopup(caseIndex) {
    const [_, popupToShow] = navPopupMappings[caseIndex] || [];
    const newMaterial = screenMaterials[caseIndex];

    if (activePopup) {
        scene.remove(activePopup);
        objectsToTest.pop();
        activePopup = null;
    }

    if (popupToShow) {
        scene.add(popupToShow);
        objectsToTest.push(popupToShow)
        activePopup = popupToShow;
    }
    if (newMaterial) {
        screenCube.material = newMaterial;
    }
}

window.addEventListener('click', () => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(objectsToTest);

    if (intersects.length) {
        const clickedObject = intersects[0].object;
        const index = objectsToTest.indexOf(clickedObject);
        
        switch (index) {
            case 0:
                console.log('click on button');
                animateCamera(clickedObject.position, 1.5, cameraPositions.button);
                changeMaterials(scene, redGlow, 2);
                cameraMoved = true;
                break;
            case 1:
                console.log('click on screen');
                clickedObject.material = screenStartMaterial;
                animateCamera(clickedObject.position, 1.5, cameraPositions.screen);
                cameraMoved = true;
                updateRaycastTargets(true);
                managePopup(null);
                break;
            case 2:
                console.log('click on robot');
                screenCube.material = screenRobotMaterial;
                managePopup(null);
                break;
            case 8:
                console.log('click on projectsDoc');
                managePopup(null);
                break;
                case 11:
                console.log('click on popup');
 
                break;
            default:
                if (navPopupMappings[index]) {
                    managePopup(index);
                }
                break;
        }
    } else {
        if (cameraMoved) {
            screenCube.material = greenGlow;
            resetCamera(1.5);
            cameraMoved = false; 
            updateRaycastTargets(false);
            managePopup(null);
        }
    }
});

function resetCamera(duration) {
    controls.enableRotate = false; 

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
            controls.enableRotate = true; 
            controls.enableZoom = true;
            controls.update();
        }
    });
}

function animateCamera(targetPosition, duration, cameraSettings) {
    controls.enableRotate = false;
    controls.enableZoom = false;

    const positionOffset = cameraSettings.positionOffset;
    const targetOffset = cameraSettings.targetOffset;

    gsap.to(camera.position, {
        duration: duration,
        x: targetPosition.x + positionOffset.x,
        y: targetPosition.y + positionOffset.y,
        z: targetPosition.z + positionOffset.z,
        ease: 'power1.inOut'
    });

    gsap.to(controls.target, {
        duration: duration,
        x: targetPosition.x + targetOffset.x, 
        y: targetPosition.y + targetOffset.y,
        z: targetPosition.z + targetOffset.z,
        ease: 'power1.inOut',
        onComplete: () => {
            controls.enableRotate = false;
            controls.enableZoom = false;
            controls.update();
        }
    });
}

const clock = new THREE.Clock();

const tick = () => {

    const elapsedTime = clock.getElapsedTime();

    particlesMaterial.uniforms.uTime.value = elapsedTime;

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(objectsToTest)


    if (intersects.length) {
        if(currentIntersect === null) {
            console.log('mouse enter')
        }
        currentIntersect = intersects[0]
    }
    else {
        if(currentIntersect) {
            console.log('mouse leave')
        }
        currentIntersect = null
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
