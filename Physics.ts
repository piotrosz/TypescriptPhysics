/// <reference path="typings/cannon.d.ts" />

module CannonjsStart {
  export class Physics {  
    public world: CANNON.World;
    public body: CANNON.Body;
    private timeStep = 1.0 / 60.0;
    
    constructor()
    {
      this.world = new CANNON.World();
      this.init();
    }
    
    public stepWorld()
    {
      this.world.step(this.timeStep);
    }
    
    private init()
    {
      var ballMaterial = new CANNON.Material("ballMaterial");
    
      var physicsContactMaterial = new CANNON.ContactMaterial(
        ballMaterial, 
        ballMaterial, 
        {
          friction: 0,
          restitution: 0.8	 
        });
        
      this.world.broadphase = new CANNON.NaiveBroadphase();
      this.world.gravity.set(0, 0, -90.82);
      this.world.addContactMaterial(physicsContactMaterial);  
      
      var radius = 1;
      this.body = new CANNON.Body({
        mass: 50,
        position: new CANNON.Vec3(0, 0, window.innerHeight)
      });
      this.body.addShape(new CANNON.Sphere(radius));
      this.body.material = ballMaterial;
      this.world.addBody(this.body);
      
      var groundBody = new CANNON.Body({ mass: 0 });
      var groundShape = new CANNON.Plane();
      groundBody.addShape(groundShape);
      groundBody.material = ballMaterial;
      this.world.addBody(groundBody);    
    }
  }
}
