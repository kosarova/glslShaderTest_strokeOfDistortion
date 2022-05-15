#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform sampler2D u_video;


float when_gt(float x, float y) {
  return max(sign(x - y), 0.1);
}

void main() {
	vec2 coord = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = vec2(1.0) / u_resolution.xy;
    
    float stepDistance = 8.0 * p.y;
    float speed = 0.2;
    float progress = fract(u_time * speed);
    
    vec2 thresholdCenter = vec2(0.5, (1.0 - progress));
    float slope = 0.0;
    float threshold = (slope * (coord.x - thresholdCenter.x)) + (thresholdCenter.y);
	
    coord.x += (stepDistance * when_gt(coord.y, threshold)); // Shift
    
    
    gl_FragColor = texture2D(u_video, coord);
}