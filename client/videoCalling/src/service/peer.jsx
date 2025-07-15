class PeerService {
    constructor() {
        if(!this.peer)
        {
            this.peer = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: [
                            "styn.l.google.com:19302",
                            "stun:global.stun.twilio.com:3478",
                        ],
                    },
                ],
            });
        }
    }

    async getOffer() {
        if(this.peer) {
            const Offer = await this.peer.createOffer();
            await this.peer.setLocalDescription(new RTCSessionDescription(Offer))
            return Offer;
        }
    }
}