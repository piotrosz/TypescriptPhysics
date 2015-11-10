/// <reference path="typings/three.d.ts" />
/// <reference path="typings/cannon.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="Physics.ts" />
/// <reference path="Three.ts" />

module CannonjsThreejsStart { 
  export class Simulation
  {
    public physics: CannonjsStart.Physics;
    public three:ThreejsStart.Three;
    
    private animate() {
      requestAnimationFrame(() => this.animate());
      this.updatePhysics();
      this.three.render();
    }
  
    private updatePhysics() {
      this.physics.stepWorld();
      var body = this.physics.body;
      this.three.setFlyingObjectPosition(
        new THREE.Vector3(body.position.x, body.position.y, body.position.z),
        new THREE.Quaternion(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.z)
      );
    }
    
    public go() {
      this.physics = new CannonjsStart.Physics();
      this.three = new ThreejsStart.Three();
      this.animate();
    }
  }  
}

$(function() {
	new CannonjsThreejsStart.Simulation().go();
});