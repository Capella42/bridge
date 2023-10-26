var Text=pc.createScript("text"),resetCount=0,lifeCount=1,hintCount=3,challengeCount=0,clearCount=0,challengeCheck=!0,time=this.timer,gollCheck=!1;Text.prototype.initialize=function(){this.textContent=this.entity.findByName("textTime"),time=0},Text.prototype.update=function(t){0==gollCheck&&(time+=t),this.textContent.element.text=time.toFixed(1);var e=this.app.root.findByName("resetCount"),n=this.app.root.findByName("lifeCount"),i=this.app.root.findByName("hintCount"),o=this.app.root.findByName("challengeCount"),l=this.app.root.findByName("clearCount");e.element.text=resetCount,n.element.text=lifeCount,i.element.text=hintCount,o.element.text=challengeCount,l.element.text=clearCount};var Cm=pc.createScript("cm");Cm.attributes.add("camera",{type:"entity",description:"Optional, assign a camera entity, otherwise one is created"}),Cm.attributes.add("power",{type:"number",default:5,description:"Adjusts the speed of player movement"}),Cm.attributes.add("lookSpeed",{type:"number",default:.25,description:"Adjusts the sensitivity of looking"});const jumpPower=700,straight=150;var playerWorldX,playerWorldY,playerWorldZ,onGround=!1;Cm.prototype.initialize=function(){this.force=new pc.Vec3,this.eulers=new pc.Vec3;var e=this.app;e.mouse.on("mousemove",this._onMouseMove,this),e.mouse.on("mousedown",(function(){e.mouse.enablePointerLock()}),this),this.entity.collision||console.error("First Person Movement script needs to have a 'collision' component"),this.entity.rigidbody&&this.entity.rigidbody.type===pc.BODYTYPE_DYNAMIC||console.error("First Person Movement script needs to have a DYNAMIC 'rigidbody' component"),this.app.keyboard.on(pc.EVENT_KEYDOWN,this.onKeyDown,this),this.entity.collision.on("collisionstart",this.onCollisionStart,this),playerWorldX=this.entity.getPosition().x,playerWorldY=this.entity.getPosition().y,playerWorldZ=this.entity.getPosition().z},Cm.prototype.update=function(e){this.camera||this._createCamera();var t=this.force,i=this.app,o=this.camera.forward,r=this.camera.right,s=0,a=0;if(i.keyboard.isPressed(pc.KEY_A)&&1==onGround&&(s-=r.x,a-=r.z),i.keyboard.isPressed(pc.KEY_D)&&1==onGround&&(s+=r.x,a+=r.z),i.keyboard.isPressed(pc.KEY_W)&&1==onGround&&(s+=o.x,a+=o.z),i.keyboard.isPressed(pc.KEY_S)&&1==onGround&&(s-=o.x,a-=o.z),0!==s||0!==a){let i=this.entity.rigidbody.linearVelocity.y+pc.app.systems.rigidbody.gravity.y*e;const o=t.set(s,0,a).normalize().scale(this.power);o.y=i,this.entity.rigidbody.linearVelocity=o}this.camera.setLocalEulerAngles(this.eulers.y,this.eulers.x,0),this.app.keyboard.wasPressed(pc.KEY_SPACE)&&!0===onGround&&(this.entity.rigidbody.applyImpulse(150,700,0),onGround=!1)},Cm.prototype._onMouseMove=function(e){(pc.Mouse.isPointerLocked()||e.buttons[0])&&(this.eulers.x-=this.lookSpeed*e.dx,this.eulers.y-=this.lookSpeed*e.dy,(this.eulers.x>=360||this.eulers.x<=-360)&&(this.eulers.x=0),this.eulers.y>=90?(this.eulers.y=90,this.eulers.x=this.eulers.x):this.eulers.y<=-90&&(this.eulers.y=-90,this.eulers.x=this.eulers.x))},Cm.prototype._createCamera=function(){this.camera=new pc.Entity,this.camera.setName("First Person Camera"),this.camera.addComponent("camera"),this.camera.name="playerCamera",this.entity.addChild(this.camera),this.camera.translateLocal(0,.5,0)},Cm.prototype.onCollisionStart=function(e){for(e.other.tags.has("ground")&&(onGround=!0),i=0;i<TOTAL_GLASS_NUMBER;i++)e.other.name==`normal${i}`&&e.other.destroy();e.other.tags.has("end")&&(lifeCount--,this.entity.rigidbody.teleport(playerWorldX,playerWorldY,playerWorldZ),this.eulers.x=0,this.eulers.y=0,challengeCheck=!0,onGround=!0,gollCheck=!1,-1==lifeCount&&(lifeCount=1,hintCount=3,resetCount++,pc.app.root.destroy(),this.app.loadSceneHierarchy("1862066.json",(function(e,t){}))));if(e.other.tags.has("goll")){0==gollCheck&&clearCount++,gollCheck=!0,this.power=0;var t=this.app.root.findByName("particle"),o=this.app.root.findByName("particle2"),r=this.app.root.findByName("particle3"),s=this.app.root.findByName("particle4"),a=this.app.root.findByName("particle5");for(i=0;i<t.children.length;i++)t.children[i].particlesystem.play(),o.children[i].particlesystem.play(),r.children[i].particlesystem.play(),s.children[i].particlesystem.play(),a.children[i].particlesystem.play()}("normal0"==e.other.name&&1==challengeCheck||"strong0"==e.other.name&&1==challengeCheck)&&(challengeCount++,challengeCheck=!1)};var Glass=pc.createScript("glass");Glass.attributes.add("material",{type:"asset",assetType:"material"}),Glass.attributes.add("material2",{type:"asset",assetType:"material"}),Glass.prototype.initialize=function(){var t=-58,a=11.25;for(this.isSpoiling=!1,i=0;i<TOTAL_GLASS_NUMBER;i++){var s=new pc.Entity,e=new pc.Entity;s=pc.app.assets.get(152404576).resource.instantiate(),e=pc.app.assets.get(152404626).resource.instantiate(),Math.round(Math.random(1))?(s.setPosition(t,a,-3.5),e.setPosition(t,a,4.5)):(s.setPosition(t,a,4.5),e.setPosition(t,a,-3.5)),s.name=`normal${i}`,e.name=`strong${i}`,this.app.root.addChild(s),this.app.root.addChild(e),s.tags.add("normal"),e.tags.add("ground"),t+=11.5}},Glass.prototype.update=function(t){var a=this.app.keyboard,s=a.wasPressed(pc.KEY_F),e=a.wasPressed(pc.KEY_R);if(s&&!this.isSpoiling&&hintCount>0){const t=this;for(i=0;i<TOTAL_GLASS_NUMBER-1;i++){pc.app.root.findByName(`strong${i}`).render.material=this.material2.resource}this.isSpoiling=!0,setTimeout((()=>{for(t.isSpoiling=!1,i=0;i<TOTAL_GLASS_NUMBER-1;i++){pc.app.root.findByName(`strong${i}`).render.material=this.material.resource}}),200),hintCount--}e&&(resetCount++,challengeCheck=!0,lifeCount=1,hintCount=3,gollCheck=!1,pc.app.root.destroy(),this.app.loadSceneHierarchy("1862066.json",(function(t,i){})))};const TOTAL_GLASS_NUMBER=10;var Particle=pc.createScript("particle");Particle.prototype.initialize=function(){},Particle.prototype.update=function(t){};