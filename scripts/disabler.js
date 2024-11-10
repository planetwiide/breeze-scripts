/*
name: Disabler
author: Shoffli
*/

breeze.registerModule('Disabler', 'Disables AntiCheats.', {
    noSprint: new BooleanSetting('NoSprint', 'Disables sprinting serversided.', false),
    positionMode: new BooleanSetting('Position', 'Puts you up.', false),
    placeMode: new BooleanSetting('Place', 'Disables some placement stuff.', false),
    enableSpoof: new BooleanSetting('Geyser (REJOIN)', 'Spoofs the brand to Geyser.', false),
    minelandOld: new BooleanSetting('MinelandOld (BIND)', 'Disables the Mineland AntiCheat.', false),

    packetSend: function(event) {
        const packet = event.getPacket();

        if (this.enableSpoof.getValue()) {
            if (packet instanceof C17PacketCustomPayload) {
                event.cancel();

                const spoofedBrand = "Geyser";
                const data = spoofedBrand;

                const spoofPacket = new C17PacketCustomPayload("MC|Brand", data, true);
                breeze.sendPacket(spoofPacket, false);
            }
        }

        if (this.minelandOld.getValue()) {
            if (packet instanceof C0FPacketConfirmTransaction) {
                event.cancel();
            } else if (packet instanceof C03PacketPlayer) {
                if (!(packet instanceof C04PacketPlayerPosition) &&
                    !(packet instanceof C05PacketPlayerLook) &&
                    !(packet instanceof C06PacketPlayerPosLook)) {
                    event.cancel();
                }
            }
        }

        if (this.positionMode.getValue() && packet instanceof C03PacketPlayer) {
            const originalY = packet.getPositionY();
            packet.setPosition(packet.getPositionX(), originalY + 0.125, packet.getPositionZ());
        }

        if (this.placeMode.getValue() && packet instanceof C08PacketBlockPlacement) {
            event.cancel();
            const defaultBlockPos = new BlockPos(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
            const newPacket = new C08PacketBlockPlacement(
                defaultBlockPos,
                packet.getPlacedBlockDirection(),
                packet.getStack(),
                packet.getVec3()
            );
            breeze.sendPacket(newPacket, false);
        }
    },

    preMotion: function() {
        const player = mc.getPlayer();

        if (this.noSprint.getValue()) {
            player.setSprinting(false);
        }
    }
});