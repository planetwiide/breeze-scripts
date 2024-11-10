/*
name: NoSlow
author: Shoffli
*/

var noSneakEnabled = false;

breeze.registerModule('NoSlow', 'Stops you from slowing down when using items.', {
      advantage: new DoubleSetting('Advantage', 'How much you get affected.', 1, 0.01, 1),

    preMotion: function(event) {
        if (mc.getPlayer().isUsingItem()) {
            if (mc.getPlayer().isSneaking()) {
                if (event.getForward() > 0) event.setForward(this.advantage.getValue()*0.8*0.294+0.2*0.294)
                if (event.getForward() < 0) event.setForward(this.advantage.getValue()*0.8*-0.294-0.2*0.294)
                if (event.getStrafe() > 0) event.setStrafe(this.advantage.getValue()*0.8*0.294+0.2*0.294)
                if (event.getStrafe() < 0) event.setStrafe(this.advantage.getValue()*0.8*-0.294-0.2*0.294)
                } else {
                    if (event.getForward() > 0) event.setForward(this.advantage.getValue()*0.8*0.98+0.2*0.98)
                    if (event.getForward() < 0) event.setForward(this.advantage.getValue()*0.8*-0.98-0.2*0.98)
                    if (event.getStrafe() > 0) event.setStrafe(this.advantage.getValue()*0.8*0.98+0.2*0.98)
                    if (event.getStrafe() < 0) event.setStrafe(this.advantage.getValue()*0.8*-0.98-0.2*0.98)
            }
        }
    }
});