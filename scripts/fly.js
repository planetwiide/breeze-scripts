/*
name: Fly
author: Shoffli
*/

const w = new KeyBind(17)
const a = new KeyBind(30)
const s = new KeyBind(31)
const d = new KeyBind(32)
const shift = new KeyBind(42)
const space = new KeyBind(57)

function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

var packets = [];

breeze.registerModule('Fly', 'Allows you to fly.', {
      mode: new ModeSetting('Mode', 'The mode to use.', 'Normal', ['Normal', 'PvPGym', 'Verus']),
      hspeed: new DoubleSetting('HorizontalSpeed', 'The speed used horizontally.', 1, 0, 10),
      vspeed: new DoubleSetting('VerticalSpeed', 'The speed used vertically.', 1, 0, 10),
      jumpDelay: new DoubleSetting('JumpDelay', 'The delay used in Verus mode.', 90, 51, 299),
      lastJumpTime: 0,
      
      motion: function(event) {
         if (this.mode.is('Normal')) {
            hspeed = this.hspeed.getValue()*0.2805
            vspeed = this.vspeed.getValue()*0.2805
            yaw = mc.getPlayer().getLastYaw()
            deg = ((yaw-360*Math.floor(yaw/360)))
            var fb = 0
            var strafe = 0
            var up = 0
            if (w.isDown() &&!mc.isGuiOpen()) fb += 1
            if (s.isDown() &&!mc.isGuiOpen()) fb -= 1
            if (a.isDown() &&!mc.isGuiOpen()) strafe -= 1
            if (d.isDown() &&!mc.isGuiOpen()) strafe += 1
            if (space.isDown() &&!mc.isGuiOpen()) up += 1
            if (shift.isDown() &&!mc.isGuiOpen()) up -= 1
            if (fb == 0 && strafe == 0){
               event.setX(0);
               event.setZ(0);
            }
            if (up == 0){
               event.setY(0);
            }
            if (fb == 1 && strafe == 0){
               event.setX(-Math.sin(degrees_to_radians(deg))*hspeed);
               event.setZ(Math.cos(degrees_to_radians(deg))*hspeed);
            }
            if (fb == -1 && strafe == 0){
               event.setX(-Math.sin(degrees_to_radians(deg+180))*hspeed);
               event.setZ(Math.cos(degrees_to_radians(deg+180))*hspeed);
            }
            if (fb == 1 && strafe == 1){
               event.setX(-Math.sin(degrees_to_radians(deg+45))*hspeed);
               event.setZ(Math.cos(degrees_to_radians(deg+45))*hspeed);
            }
            if (fb == 1 && strafe == -1){
               event.setX(-Math.sin(degrees_to_radians(deg-45))*hspeed);
               event.setZ(Math.cos(degrees_to_radians(deg-45))*hspeed);
            }
            if (fb == -1 && strafe == 1){
               event.setX(-Math.sin(degrees_to_radians(deg+180-45))*hspeed);
               event.setZ(Math.cos(degrees_to_radians(deg+180-45))*hspeed);
            }
            if (fb == -1 && strafe == -1){
               event.setX(-Math.sin(degrees_to_radians(deg+180+45))*hspeed);
               event.setZ(Math.cos(degrees_to_radians(deg+180+45))*hspeed);
            }
            if (fb == 0 && strafe == 1){
               event.setX(-Math.sin(degrees_to_radians(deg+90))*hspeed);
               event.setZ(Math.cos(degrees_to_radians(deg+90))*hspeed);
            }
            if (fb == 0 && strafe == -1){
               event.setX(-Math.sin(degrees_to_radians(deg-90))*hspeed);
               event.setZ(Math.cos(degrees_to_radians(deg-90))*hspeed);
            }
            if (up == 1){
               event.setY(1*vspeed);
            }
            if (up == -1){
               event.setY(-1*vspeed);
            }
         } else if (this.mode.is('PvPGym')) {
            hspeed = 2.805
            vspeed = 2.805
            yaw = mc.getPlayer().getLastYaw()
            deg = ((yaw-360*Math.floor(yaw/360)))
            var fb = 0
            var strafe = 0
            var up = 0
            if (w.isDown() &&!mc.isGuiOpen()) fb += 1
            if (s.isDown() &&!mc.isGuiOpen()) fb -= 1
            if (a.isDown() &&!mc.isGuiOpen()) strafe -= 1
            if (d.isDown() &&!mc.isGuiOpen()) strafe += 1
            if (space.isDown() &&!mc.isGuiOpen()) up += 1
            if (shift.isDown() &&!mc.isGuiOpen()) up -= 1
            if (fb == 0 && strafe == 0){
               event.setX(0);
               event.setZ(0);
            }
            if (up == 0){
               event.setY(0);
            }
            if (fb == 1 && strafe == 0){
               event.setX(-Math.sin(degrees_to_radians(deg))*hspeed);
               event.setZ(Math.cos(degrees_to_radians(deg))*hspeed);
            }
            if (fb == -1 && strafe == 0){
               event.setX(-Math.sin(degrees_to_radians(deg+180))*hspeed);
               event.setZ(Math.cos(degrees_to_radians(deg+180))*hspeed);
            }
            if (fb == 1 && strafe == 1){
               event.setX(-Math.sin(degrees_to_radians(deg+45))*hspeed);
               event.setZ(Math.cos(degrees_to_radians(deg+45))*hspeed);
            }
            if (fb == 1 && strafe == -1){
               event.setX(-Math.sin(degrees_to_radians(deg-45))*hspeed);
               event.setZ(Math.cos(degrees_to_radians(deg-45))*hspeed);
            }
            if (fb == -1 && strafe == 1){
               event.setX(-Math.sin(degrees_to_radians(deg+180-45))*hspeed);
               event.setZ(Math.cos(degrees_to_radians(deg+180-45))*hspeed);
            }
            if (fb == -1 && strafe == -1){
               event.setX(-Math.sin(degrees_to_radians(deg+180+45))*hspeed);
               event.setZ(Math.cos(degrees_to_radians(deg+180+45))*hspeed);
            }
            if (fb == 0 && strafe == 1){
               event.setX(-Math.sin(degrees_to_radians(deg+90))*hspeed);
               event.setZ(Math.cos(degrees_to_radians(deg+90))*hspeed);
            }
            if (fb == 0 && strafe == -1){
               event.setX(-Math.sin(degrees_to_radians(deg-90))*hspeed);
               event.setZ(Math.cos(degrees_to_radians(deg-90))*hspeed);
            }
            if (up == 1){
               event.setY(1*vspeed);
            }
            if (up == -1){
               event.setY(-1*vspeed);
            }
         } else if (this.mode.is('Verus')) {
            speed = 0.36
            yaw = mc.getPlayer().getLastYaw()
            deg = ((yaw - 360 * Math.floor(yaw / 360)))

            var fb = 0
            var strafe = 0
            if (w.isDown() && !mc.isGuiOpen()) fb += 1
            if (s.isDown() && !mc.isGuiOpen()) fb -= 1
            if (a.isDown() && !mc.isGuiOpen()) strafe -= 1
            if (d.isDown() && !mc.isGuiOpen()) strafe += 1
            if (fb == 0 && strafe == 0) {
              event.setX(0);
              event.setZ(0);
            }
            if (fb == 1 && strafe == 0) {
              event.setX(-Math.sin(degrees_to_radians(deg)) * speed);
              event.setZ(Math.cos(degrees_to_radians(deg)) * speed);
            }
            if (fb == -1 && strafe == 0) {
              event.setX(-Math.sin(degrees_to_radians(deg + 180)) * speed);
              event.setZ(Math.cos(degrees_to_radians(deg + 180)) * speed);
            }
            if (fb == 1 && strafe == 1) {
              event.setX(-Math.sin(degrees_to_radians(deg + 45)) * speed);
              event.setZ(Math.cos(degrees_to_radians(deg + 45)) * speed);
            }
            if (fb == 1 && strafe == -1) {
              event.setX(-Math.sin(degrees_to_radians(deg - 45)) * speed);
              event.setZ(Math.cos(degrees_to_radians(deg - 45)) * speed);
            }
            if (fb == -1 && strafe == 1) {
              event.setX(-Math.sin(degrees_to_radians(              deg + 180 - 45)) * speed);
              event.setZ(Math.cos(degrees_to_radians(deg + 180 - 45)) * speed);
            }
            if (fb == -1 && strafe == -1) {
              event.setX(-Math.sin(degrees_to_radians(deg + 180 + 45)) * speed);
              event.setZ(Math.cos(degrees_to_radians(deg + 180 + 45)) * speed);
            }
            if (fb == 0 && strafe == 1) {
              event.setX(-Math.sin(degrees_to_radians(deg + 90)) * speed);
              event.setZ(Math.cos(degrees_to_radians(deg + 90)) * speed);
            }
            if (fb == 0 && strafe == -1) {
              event.setX(-Math.sin(degrees_to_radians(deg - 90)) * speed);
              event.setZ(Math.cos(degrees_to_radians(deg - 90)) * speed);
            }
         }
      },

      packetSend: function(event) {
         if (this.mode.is('PvPGym')) {
            packets.push(event.getPacket());
            event.cancel();
         }
      },
      
tick: function() {
  if (this.mode.is('Verus')) {
    var currentTime = new Date().getTime();
    if (currentTime - this.lastJumpTime >= this.jumpDelay.getValue()) {
      player = mc.getPlayer()
      player.jump()
      this.lastJumpTime = currentTime;
    }
  }
  if (this.mode.is('PvPGym') || this.mode.is('Verus')) {
    this.hspeed.setHidden(true);
    this.vspeed.setHidden(true);
  } else {
    this.hspeed.setHidden(false);
    this.vspeed.setHidden(false);
  }
  if (this.mode.is('PvPGym')) {
    mc.setTimerSpeed(0.2);
  }
  if (this.mode.is('Verus')) {
    this.jumpDelay.setHidden(false);
  } else {
    this.jumpDelay.setHidden(true);
  }
},
      
      disable: function() {
         if (this.mode.is('Normal') || this.mode.is('PvPGym')) {
            mc.getPlayer().setMotion(0, mc.getPlayer().getMotionY(), 0);
            for (var i = 0; i < packets.length; i++) {
               breeze.sendPacket(packets[i], false);
            }
            packets = [];
            mc.setTimerSpeed(1);
         }
      }
});