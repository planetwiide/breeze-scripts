/*
name: NoFall
author: Shoffli
*/

var falling = false;
var fallDistance = 0;

breeze.registerModule('NoFall', 'Makes you take no fall damage.', {
    mode: new ModeSetting('Mode', 'The mode to use.', 'Spoof', ['Spoof', 'Spam', 'NoGround', 'Vulcan']),

    packetSend: function(event) {
        const packet = event.getPacket();

        if (this.mode.is('Spoof') && packet instanceof C03PacketPlayer && falling && fallDistance >= 3) {
            packet.onGround = true;
        } else if (this.mode.is('NoGround') && packet instanceof C03PacketPlayer) {
            packet.onGround = false;
        } else if (this.mode.is('Vulcan') && packet instanceof C03PacketPlayer && falling && fallDistance >= 3.5) {
            const originalY = packet.getPositionY();
            packet.setPosition(packet.getPositionX(), originalY - 0.07, packet.getPositionZ());
        }
    },

    motion: function(event) {
        const player = mc.getPlayer();
        if (player && !player.onGround() && event.getY() < 0) {
            falling = true;
        }
        if (falling) {
            fallDistance += Math.abs(event.getY());
        }
        if (falling && fallDistance >= 1.75 && this.mode.is('Spam')) {
            breeze.sendPacket(new C03PacketPlayer(true), false);
        }
    },

    tick: function(event) {
        const player = mc.getPlayer();
        if (player && player.onGround()) {
            fallDistance = 0;
            falling = false;
        }
    }
});