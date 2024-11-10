/*
name: CustomSpeed
author: Shoffli
*/

const w = new KeyBind(17)
const a = new KeyBind(30)
const s = new KeyBind(31)
const d = new KeyBind(32)

function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

breeze.registerModule("CustomSpeed", "A customisable speed.", {
      mode: new ModeSetting('Mode', 'The mode to use.', 'Motion', ['Motion', 'Friction']),
      applyMode: new ModeSetting('ApplyMode', 'When to apply the speed.', 'Both', ['Both', 'Ground', 'Air']),
      speed: new DoubleSetting('Speed', 'The speed used.', 1, 0.1, 20),
      friction: new DoubleSetting('Friction', 'The friction used divided by 10.', 2, 0.1, 20),
      jump: new BooleanSetting('Jump','Jumps when on ground.', true),
      customJump: new BooleanSetting('CustomJump', 'Jumps with a custom height.', false),
      customJumpHeight: new DoubleSetting('Height', 'The height of the jumps divided by 10.', 2, 0.01, 10),
      groundStuck: new BooleanSetting('GroundStuck', 'Stucks horizontally on ground.', false),
      airStuck: new BooleanSetting('AirStuck', 'Stucks horizontally mid air.', false),
      heightStuck: new BooleanSetting('HeightStuck', 'Stucks vertically mid air.', false),

      preMotion: function(event) {
         if (this.applyMode.is('Both') || (this.applyMode.is('Ground') && mc.getPlayer().onGround()) || (this.applyMode.is('Air') && !mc.getPlayer().onGround())) {
            if (this.mode.is('Friction')) {
               event.setFriction(this.friction.getValue() / 10)
            }
         }
      },

      motion: function(event) {
         if (this.applyMode.is('Both') || (this.applyMode.is('Ground') && mc.getPlayer().onGround()) || (this.applyMode.is('Air') && !mc.getPlayer().onGround())) {
            if (this.mode.is('Motion')) {
               speed = this.speed.getValue()*0.2805
               yaw = mc.getPlayer().getLastYaw()
               deg = ((yaw-360*Math.floor(yaw/360)))

               var fb = 0
               var strafe = 0
               if (w.isDown() &&!mc.isGuiOpen()) fb += 1
               if (s.isDown() &&!mc.isGuiOpen()) fb -= 1
               if (a.isDown() &&!mc.isGuiOpen()) strafe -= 1
               if (d.isDown() &&!mc.isGuiOpen()) strafe += 1
               if (fb == 0 && strafe == 0){
                  event.setX(0);
                  event.setZ(0);
               }
               if (fb == 1 && strafe == 0){
                  event.setX(-Math.sin(degrees_to_radians(deg))*speed);
                  event.setZ(Math.cos(degrees_to_radians(deg))*speed);
               }
               if (fb == -1 && strafe == 0){
                  event.setX(-Math.sin(degrees_to_radians(deg+180))*speed);
                  event.setZ(Math.cos(degrees_to_radians(deg+180))*speed);
               }
               if (fb == 1 && strafe == 1){
                  event.setX(-Math.sin(degrees_to_radians(deg+45))*speed);
                  event.setZ(Math.cos(degrees_to_radians(deg+45))*speed);
               }
               if (fb == 1 && strafe == -1){
                  event.setX(-Math.sin(degrees_to_radians(deg-45))*speed);
                  event.setZ(Math.cos(degrees_to_radians(deg-45))*speed);
               }
               if (fb == -1 && strafe == 1){
                  event.setX(-Math.sin(degrees_to_radians(deg+180-45))*speed);
                  event.setZ(Math.cos(degrees_to_radians(deg+180-45))*speed);
               }
               if (fb == -1 && strafe == -1){
                  event.setX(-Math.sin(degrees_to_radians(deg+180+45))*speed);
                  event.setZ(Math.cos(degrees_to_radians(deg+180+45))*speed);
               }
               if (fb == 0 && strafe == 1){
                  event.setX(-Math.sin(degrees_to_radians(deg+90))*speed);
                  event.setZ(Math.cos(degrees_to_radians(deg+90))*speed);
               }
               if (fb == 0 && strafe == -1){
                  event.setX(-Math.sin(degrees_to_radians(deg-90))*speed);
                  event.setZ(Math.cos(degrees_to_radians(deg-90))*speed);
               }
            }
         }
         if (this.customJump.getValue() && mc.getPlayer().onGround() && !mc.isGuiOpen() && (w.isDown() || a.isDown() || s.isDown() || d.isDown())) {
            event.setY(this.customJumpHeight.getValue() / 10);
         }
         if (this.heightStuck.getValue() && event.getY()>0 && !mc.getPlayer().onGround()) {
            event.setY(0);
         }
         if (this.groundStuck.getValue() && mc.getPlayer().onGround()) {
            event.setX(0);
            event.setZ(0);
         }
         if (this.airStuck.getValue() && !mc.getPlayer().onGround()) {
            event.setX(0);
            event.setZ(0);
         }
      },

      tick: function() {
         if (this.jump.getValue() && mc.getPlayer().onGround() && !mc.isGuiOpen() && (w.isDown() || a.isDown() || s.isDown() || d.isDown())) {
            player = mc.getPlayer()
            player.jump()
         }
         if (this.mode.is('Motion')) {
            this.speed.setHidden(false);
            this.friction.setHidden(true);
         } else if(this.mode.is('Friction')) {
            this.speed.setHidden(true);
            this.friction.setHidden(false);
         }
         if (this.customJump.getValue()) {
            this.customJumpHeight.setHidden(false);
         } else {
            this.customJumpHeight.setHidden(true);
         }
      }
});