import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createSmokeEffect } from './smokeEffect.js';
import { loadFont } from './fontLoader.js'
import { particles, particlesMaterial } from './particles.js'
import GUI from 'lil-gui';
import { gsap } from 'gsap';


const gui = new GUI({
    width: 400
});


const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const loadingManager = new THREE.LoadingManager()  

const textureLoader = new THREE.TextureLoader(loadingManager);
const gltfLoader = new GLTFLoader();


/**
 * Textures
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
    screenStart: textureLoader.load('./textures/GroupTest2.png'),
    screenRobot: textureLoader.load('./textures/screenRobot.png'),
    screenProjects: textureLoader.load('./textures/screenProjects.png'),
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

// transparent screen navigation

const transparentMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,  
    transparent: true,
    opacity: 0.5    
});

const robotGeometry = new THREE.BoxGeometry(3, 2.3, 3)
const userGeometry = new THREE.BoxGeometry(2.5, 2.5, 2.5)
const notesGeometry = new THREE.BoxGeometry(2.5, 2.5, 2.5)
const projectsGeometry = new THREE.BoxGeometry(2.5, 2.7, 3)
const creditsGeometry = new THREE.BoxGeometry(2.5, 2.5, 2.5)
const photosGeometry = new THREE.BoxGeometry(2.5, 2.7, 3)
const projectDocGeometry = new THREE.BoxGeometry(2.5, 2.7, 3.2)
const jpgGeometry = new THREE.BoxGeometry(2.5, 2.7, 3)
const binGeometry = new THREE.BoxGeometry(3, 3, 3)

const robotNav = new THREE.Mesh(robotGeometry, transparentMaterial);
const userNav = new THREE.Mesh(userGeometry, transparentMaterial);
const notesNav = new THREE.Mesh(notesGeometry, transparentMaterial);
const projectsNav = new THREE.Mesh(projectsGeometry, transparentMaterial);
const creditsNav = new THREE.Mesh(creditsGeometry, transparentMaterial);
const photosNav = new THREE.Mesh(photosGeometry, transparentMaterial);
const projectDocNav = new THREE.Mesh(projectDocGeometry, transparentMaterial);
const jpgNav = new THREE.Mesh(jpgGeometry, transparentMaterial);
const binNav = new THREE.Mesh(binGeometry, transparentMaterial);

robotNav.position.set(-8, 20.7, 19); 
userNav.position.set(-10.8, 34, 18.4); 
notesNav.position.set(-10.8, 34, 15.2); 
projectsNav.position.set(-10, 30.8, 18.1); 
creditsNav.position.set(-10.8, 34, 0.3); 
photosNav.position.set(-10.8, 34, -3); 
projectDocNav.position.set(-10, 31, -2.8); 
jpgNav.position.set(-9, 27.9, 18.1); 
binNav.position.set(-9, 24, -3);

scene.add(robotNav);
scene.add(userNav);
scene.add(notesNav);
scene.add(projectsNav);
scene.add(creditsNav);
scene.add(photosNav);
scene.add(projectDocNav)
scene.add(jpgNav)
scene.add(binNav)




// screen 

const cubeGeometry = new THREE.PlaneGeometry(26, 17);  


const screenCube = new THREE.Mesh(cubeGeometry, greenGlow);

screenCube.position.set(-9, 28, 7.7);  

const yAxis = new THREE.Vector3(0, 1, 0);
const yRot = Math.PI / 2; // 90 degrees
const yQuaternion = new THREE.Quaternion();
yQuaternion.setFromAxisAngle(yAxis, yRot);

const xAxis = new THREE.Vector3(1, 0, 0);
const xRot = Math.PI / -17; // Tilt back
const xQuaternion = new THREE.Quaternion();
xQuaternion.setFromAxisAngle(xAxis, xRot);

const combinedQuaternion = new THREE.Quaternion();
combinedQuaternion.multiplyQuaternions(yQuaternion, xQuaternion);

screenCube.quaternion.copy(combinedQuaternion);

scene.add(screenCube);




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

  

        const button = gltf.scene.children.filter(child => child.name === 'Parts2_Cube066');
        button.forEach(child => {
            objectsToTest.push(child);  // Add to the raycasting list
           
        });

        objectsToTest.push(screenCube)

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

const initialCameraPosition = camera.position.clone(); // Store initial position
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


const newScreenMaterial = new THREE.MeshBasicMaterial({ map: screens.screenStart });


const cameraPositions = {
    button: { positionOffset: { x: -25, y: 5, z: -10 }, targetOffset: { x: 0, y: -5, z: 0 } },
    screen: { positionOffset: { x: 25, y: 5, z: 0 }, targetOffset: { x: 0, y: 0, z: 0 } },
};

let cameraMoved = false;

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
                cameraMoved = true;
                break;
            case 1:
                console.log('click on screen');
                clickedObject.material = newScreenMaterial;
                animateCamera(clickedObject.position, 1.5, cameraPositions.screen);
                cameraMoved = true;
                break;
        }
    } else {
        if (cameraMoved) {
            screenCube.material = greenGlow;
            resetCamera(1.5);
            cameraMoved = false; 
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
