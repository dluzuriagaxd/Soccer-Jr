// Polyfill for node:worker_threads MessageChannel
// This provides MessageChannel for both server and client builds

export class MessageChannel {
    port1: MessagePort;
    port2: MessagePort;

    constructor() {
        if (typeof globalThis.MessageChannel !== 'undefined') {
            const native = new globalThis.MessageChannel();
            this.port1 = native.port1;
            this.port2 = native.port2;
        } else {
            // Fallback implementation for environments without MessageChannel
            this.port1 = {} as MessagePort;
            this.port2 = {} as MessagePort;
        }
    }
}

// Ensure it's globally available
if (typeof globalThis !== 'undefined' && !globalThis.MessageChannel) {
    // @ts-ignore
    globalThis.MessageChannel = MessageChannel;
}
