/*
name: Spin
author: Shoffli
*/

var yaw = 0;
var pitch = 0;

breeze.registerRotationModule('Spin', 'Makes you go round.', -100, {
speed: new IntSetting('Speed', 'The speed of the rotation.', 50, 1, 150),
    enable: function() {
        yaw = mc.getPlayer().getYaw();
        pitch = mc.getPlayer().getPitch();
    },
    rotate: function(rotation) {
        rotation.setInstant(true);
        rotation.setLegitWalk(false);
        yaw += this.speed.getValue();
        rotation.rotate(yaw, pitch, 0);
    },
    updateNoRotate: function() {
    
    }
});