uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;

attribute float aScale;

void main() 
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(uTime * 1.5 + modelPosition.x * 100.0) * aScale * 0.9;


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    gl_PointSize = uSize * aScale * uPixelRatio;
    gl_PointSize *= (15.0 / - viewPosition.z);
}