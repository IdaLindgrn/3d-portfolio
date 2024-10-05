// smokeEffect.js
import * as THREE from 'three';
import teaSmokeVertexShader from './shaders/teaSmoke/vertex.glsl'
import teaSmokeFragmentShader from './shaders/teaSmoke/fragment.glsl'

const textureLoader = new THREE.TextureLoader();

export function createSmokeEffect() {
    // Create smoke geometry
    const smokeGeometry = new THREE.PlaneGeometry(1, 1, 16, 68);
    smokeGeometry.translate(0, 0.5, 0);
    smokeGeometry.scale(1.5, 4, 1.5);    

    // Perlin texture
    const perlinTexture = textureLoader.load('./textures/perlin.png')
    perlinTexture.wrapS = THREE.RepeatWrapping;
    perlinTexture.wrapT = THREE.RepeatWrapping;

    // Create smoke material
    const smokeMaterial = new THREE.ShaderMaterial({
        vertexShader: teaSmokeVertexShader,
        fragmentShader: teaSmokeFragmentShader,
   
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        uniforms: 
        {
            uTime: new THREE.Uniform(0),
            uPerlinTexture: new THREE.Uniform(perlinTexture)
        },
    });

    // Create smoke mesh
    const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial);
    smoke.position.y = 1

    smoke.update = (elapsedTime) => {
        smokeMaterial.uniforms.uTime.value = elapsedTime;
    };
    

    return smoke;
}
