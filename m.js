(function() {
  'use strict';

  Lampa.Listener.follow('app', function(e) {
    if (e.type == 'ready') {
      let canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 240;
      canvas.style.position = 'fixed';
      canvas.style.top = '50%';
      canvas.style.left = '50%';
      canvas.style.transform = 'translate(-50%, -50%)';
      canvas.style.zIndex = 9999;
      document.body.appendChild(canvas);

      let context = canvas.getContext('2d');

      let script = document.createElement('script');
      script.src = 'https://unpkg.com/jsnes@0.7.0/dist/jsnes.min.js';
      document.head.appendChild(script);

      script.onload = function() {
        let nes = new jsnes.NES({
          onFrame(frameBuffer) {
            let imageData = context.getImageData(0, 0, 256, 240);
            for (let i = 0; i < frameBuffer.length; i++) {
              imageData.data[i * 4] = frameBuffer[i] & 0xFF;
              imageData.data[i * 4 + 1] = (frameBuffer[i] >> 8) & 0xFF;
              imageData.data[i * 4 + 2] = (frameBuffer[i] >> 16) & 0xFF;
              imageData.data[i * 4 + 3] = 0xFF;
            }
            context.putImageData(imageData, 0, 0);
          }
        });

        // Простая кнопка запуска ROM
        let btn = document.createElement('div');
        btn.textContent = '▶️ Запустить Mario';
        btn.style.position = 'fixed';
        btn.style.bottom = '20px';
        btn.style.left = '50%';
        btn.style.transform = 'translateX(-50%)';
        btn.style.padding = '10px';
        btn.style.background = 'rgba(0,0,0,0.7)';
        btn.style.color = 'white';
        btn.style.borderRadius = '8px';
        btn.style.cursor = 'pointer';
        btn.style.zIndex = 10000;

        document.body.appendChild(btn);

        btn.onclick = function() {
          fetch('https://<твоя-ссылка-на-rom>/mario.nes')
            .then(res => res.arrayBuffer())
            .then(buffer => {
              let binary = String.fromCharCode(...new Uint8Array(buffer));
              nes.loadROM(binary);

              function frameLoop() {
                nes.frame();
                requestAnimationFrame(frameLoop);
              }
              frameLoop();
            })
            .catch(err => {
              console.log('Ошибка загрузки ROM:', err);
              Lampa.Noty.show('Ошибка загрузки ROM');
            });
        };
      };
    }
  });
})();
