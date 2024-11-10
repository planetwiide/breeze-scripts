/*
name: InstantUse
author: Shoffli
*/

breeze.registerModule('InstantUse', 'Allows you to use items instantly.', {
    packets: new IntSetting('Packets', 'The amount of packets sent.', 50, 1, 100),
    sentPacket: false,

    tick: function(event) {
        if (mc.getPlayer().isUsingItem() && !this.sentPacket) {
for (var i = 0; i < this.packets.getValue(); i++) {
  breeze.sendPacket(new C03PacketPlayer(false), false);
}
            this.sentPacket = true;
        } else if (!mc.getPlayer().isUsingItem()) {
            this.sentPacket = false;
        }
    }

});