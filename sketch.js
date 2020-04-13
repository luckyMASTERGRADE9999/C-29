

    var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Events = Matter.Events,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
    world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            ackground:"cyan",
            showAngleIndicator: true,
            wireframes:false,
            mousePositon:true
        }
    });
    
    var runner = Runner.create();// create runner
    Runner.run(runner, engine);

    var mouse = Mouse.create(render.canvas);// add mouse control
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness:0.2,
            render: {
            visible: false
            }
        }
    });
    World.add(world, mouseConstraint);
   
    render.mouse = mouse;// keep the mouse in sync with rendering

    Render.run(render);// create renderer
    Render.lookAt(render, {// fit the render viewport to the scene
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
    });

//************************************* 
    // add bodies
    groundOptions={
        isStatic:true,
        fill:("green")
    }  
    var ground1 = Bodies.rectangle(400, 590, 800, 20, groundOptions );
    var pyramid1 = Composites.pyramid(400, 300, 11, 8, 2, 2, function(x, y) {
        return Bodies.rectangle(x, y, 20, 40);
    })
    var ground2 = Bodies.rectangle(550, 275, 250, 20, groundOptions);
    var pyramid2 = Composites.pyramid(460,100, 12, 6, 1, 1, function(x, y) {
        return Bodies.rectangle(x, y, 15, 30);
    });
    ground3Options={
        isStatic:true,
        fill:("red")
        }  
    var ground3 = Bodies.rectangle(675, 350, 200, 20, ground3Options);
    
    rockOptions = { 
        density: 0.0001
        }
    var holder=Bodies.rectangle(155,175,45,10,{isStatic:false});
    var rock = Bodies.polygon(155, 175, 7, 20, rockOptions),
        anchor1 = { x:100, y:150 };
        anchor2 = { x:125, y:125 };
        anchor3 = {x:160,y:365};
    elastic1 = Constraint.create({ 
        pointA: anchor1, 
        bodyB:holder, 
        length:70,
        //  pointB:{x:-10,y:-7},
        stiffness:0.2,
        //    damping:0.10
    })
        
    elastic2 = Constraint.create({ 
            pointA: anchor2, 
            bodyB: holder, 
            length:70,
        // pointB:{x:-10,y:-10},
            stiffness:0.2,
        //    damping:0.10
    })
 
    elastic3 = Constraint.create({ 
        bodyA:holder, 
        bodyB: rock, 
        length:0,
        stiffness:0.01,
      //  damping:0.001
    })
  
    World.add(world,[ground1, pyramid1, ground2,ground3, pyramid2 ]);
    World.add(world,[rock,holder,elastic1,elastic2,elastic3]);

 
    Events.on(engine, 'afterUpdate', function() {
        //if (mouseConstraint.mouse.button === -1 && (rock.position.x > 200 || rock.position.y < 330)) {
        if (mouseConstraint.mouse.button === -1 && rock.position.x > 220) {
            rock = Bodies.polygon(155, 175, 7, 20, rockOptions);
            World.add(world, rock);
            elastic3.bodyB = rock;
        }
    })
    
    World.add(world, [
        Bodies.rectangle(400, 0, 800, 20, { isStatic: true }),//top wall
      //  Bodies.rectangle(400, 600, 800, 20, { isStatic: true }),
        Bodies.rectangle(800, 300, 20, 600, { isStatic: true }),//Right side
        Bodies.rectangle(0, 300, 20, 600, { isStatic: true })//Left side
    ]);

/*

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    }

if (typeof module !== 'undefined') {
    module.exports = Example[Object.keys(Example)[0]];
}*/
