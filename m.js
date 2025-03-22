Lampa.Listener.follow('app', function(e) {
    if(e.type == 'ready'){
        let canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 240;
        canvas.style.position = 'absolute';
        canvas.style.zIndex = 9999;
        document.body.appendChild(canvas);

        const context = canvas.getContext('2d');
        
        let script = document.createElement('script');
        script.src = 'https://unpkg.com/jsnes@0.7.0/dist/jsnes.min.js';
        document.head.appendChild(script);

        script.onload = () => {
            const nes = new jsnes.NES({
                onFrame(frameBuffer) {
                    const imageData = context.getImageData(0, 0, 256, 240);
                    for (let i = 0; i < frameBuffer.length; i++) {
                        imageData.data[i * 4] = frameBuffer[i] & 0xFF;
                        imageData.data[i * 4 + 1] = (frameBuffer[i] >> 8) & 0xFF;
                        imageData.data[i * 4 + 2] = (frameBuffer[i] >> 16) & 0xFF;
                        imageData.data[i * 4 + 3] = 0xFF;
                    }
                    context.putImageData(imageData, 0, 0);
                }
            });

            fetch('https://lanthar91.github.io/SYIC/roms/mario.nes') // твой сервер с ROM
                .then(res => res.arrayBuffer())
                .then(buffer => {
                    let binary = String.fromCharCode(...new Uint8Array(buffer));
                    nes.loadROM(binary);
                    function frameLoop() {
                        nes.frame();
                        requestAnimationFrame(frameLoop);
                    }
                    frameLoop();
                });
        };
    }
});
