/*
name: Fall
author: Shoffli
*/

breeze.registerModule("Fall", "Allows you to set your fall speed.", {
     mode: new ModeSetting('Mode', 'The mode to use.', 'Default', ['Default', 'Timer']),
     speed: new DoubleSetting('Speed', 'The speed you fall at.', 1, 0, 50),
     timerspeed: new DoubleSetting('Timer', 'The speed your game runs at.', 0.5, 0.01, 100),
     falling: false,

     motion: function(event) {
         if (this.mode.is('Default')) {
             if (event.getY()<0 &&!mc.getPlayer().onGround()) {
                 event.setY(this.speed.getValue() * -0.1);
             }
         } else if (this.mode.is('Timer')) {
             if (event.getY()<0 &&!mc.getPlayer().onGround()) {
                 this.falling = true;
             } else {
                 this.falling = false;
             }
         }
     },

     tick: function() {
         if (this.mode.is('Timer')) {
             if (this.falling) {
                 mc.setTimerSpeed(this.timerspeed.getValue());
             } else {
                 mc.setTimerSpeed(1);
             }
             this.timerspeed.setHidden(false);
             this.speed.setHidden(true);
         } else if (this.mode.is('Default')) {
             this.timerspeed.setHidden(true);
             this.speed.setHidden(false);
         }
     },

     disable: function() {
        mc.setTimerSpeed(1);
    }
});