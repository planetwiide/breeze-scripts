/*
name: Regen
author: Shoffli
*/

breeze.registerModule("Regen", "Regenerates your health faster.", {
    packets: new IntSetting('Packets', 'The amount of packets sent per tick.', 50, 1, 100),

    tick: function () {
        var player = mc.getPlayer();

        if (player.getHealth() < 20) {
            for (var i = 0; i < this.packets.getValue(); i++) {
                breeze.sendPacket(new C03PacketPlayer(false), false);
            }
        }
    }
});