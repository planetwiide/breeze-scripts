/*
name: Jetpack
author: Shoffli
*/

const space = new KeyBind(57)

breeze.registerModule('Jetpack', 'Makes you a rocket.', {
    speed: new DoubleSetting('Speed', 'The speed used.', 1, 0.1, 5),
    tick: function(event) {
        if (space.isDown() && !mc.isGuiOpen())
        {
            mc.getPlayer().setMotionY(this.speed.getValue())
        }
    }
});