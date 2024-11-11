uniform float uTime;

void main() {
  float pulse = abs(sin(uTime * 2.0)) * 0.5 + 0.5;
    vec3 glowColor = vec3(1.0, 1.0, 1.0) * pulse;

    gl_FragColor = vec4(glowColor, 1.0);
}