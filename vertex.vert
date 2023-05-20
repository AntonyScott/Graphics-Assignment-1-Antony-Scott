precision highp float;
precision highp int;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float time; //time value is declared in vertex shader

varying vec3 vPosition; //varying position
attribute vec3 position; //attribute position

varying vec2 vUv; //varying UV (contains xy coordinates of vertex shader)
attribute vec2 uv; //attribute UV

void main()
{
    vUv = uv; //varying UV passed to UV
    vPosition = position; //varying position is passed to attribute position
    
    //twist code provided by Mark Doughty - CGP3018M Graphics Workshop Week 5
    
    float twist = 4.0;
    float angle = twist *length(position);
    
    //2D black hole effect
    vPosition.x = cos(angle * length(position) - time) * position.x - sin(angle * length(position) - time) * position.y;
    vPosition.y = sin(angle * length(position) - time) * position.x + cos(angle * length(position) - time) * position.y;
    
    //spinning axis black hole effect
    /*vPosition.x = cos(angle * length(position) + time) * position.x - sin(angle * length(position) + time) * position.y;
    vPosition.y = sin(angle * length(position) - time) * position.x + cos(angle * length(position) - time) * position.y;*/
    
    /*vPosition.x = cos(angle * length(position) - time) * position.x - sin(angle * length(position) - time) * position.y;
    vPosition.y = sin(angle * length(position) + time) * position.x + cos(angle * length(position) + time) * position.y;*/
    
    //3D black hole effect
    /*vPosition.x = cos(angle * length(position)) * position.x - sin(angle * length(position) - time) * position.y;
    vPosition.y = sin(angle * length(position)) * position.x + cos(angle * length(position) - time) * position.y;*/
    
    //problem code
    /*vPosition.x = cos(angle * time) * position.x - sin(angle * time) * position.y;
    vPosition.y = sin(angle * time) * position.x + cos(angle * time) * position.y;*/
    
    vPosition.z = 0.0;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 ); //gl_position holds the position of the vertex shader
    
}