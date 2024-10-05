import * as THREE from 'three';
import particlesVertexShader from './shaders/particles/vertex.glsl'
import particlesFragmentShader from './shaders/particles/fragment.glsl'

export let particlesMaterial;

export function particles(scene) {

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 50;
    const positionArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount)


    const outerRadius = 100; 
    const innerRadius = 20;

    for(let i = 0; i < particlesCount; i++) {
        const angle = Math.random() * Math.PI * 2;  
        const distance = Math.random() * (outerRadius - innerRadius) + innerRadius; 

        positionArray[i * 3 + 0] = Math.cos(angle) * distance;  // X position
        positionArray[i * 3 + 1] = Math.random() * 50;
        positionArray[i * 3 + 2] = Math.sin(angle) * distance;  // Z position

        scaleArray[i] = Math.random()
    
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
    particlesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

    particlesMaterial = new THREE.ShaderMaterial({
        uniforms: 
        {
            uTime: { value: 0},
            uPixelRatio: { value: Math.min(window.devicePixelRatio, 2)},
            uSize: { value: 100}
        },
       vertexShader: particlesVertexShader,
       fragmentShader: particlesFragmentShader,
       transparent: true,
       blending: THREE.AdditiveBlending, // bad performance
       depthWrite: false,
    });

    // gui.add(particlesMaterial.uniforms.uSize, 'value').min(0).max(500).step(1).name('particlesSize')

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)

    scene.add(particles)


}