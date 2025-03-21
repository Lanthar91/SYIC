class NESAudioProcessor extends AudioWorkletProcessor {
    process(inputs, outputs, parameters) {
        const output = outputs[0];
        for (let channel = 0; channel < output.length; ++channel) {
            const channelData = output[channel];
            for (let i = 0; i < channelData.length; ++i) {
                channelData[i] = Math.random() * 2 - 1; // Заглушка (заменим на реальный звук)
            }
        }
        return true;
    }
}

registerProcessor("nes-audio-processor", NESAudioProcessor);
