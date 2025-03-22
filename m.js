(function () {
  'use strict';

  Lampa.Listener.follow('app', function(e) {
    if (e.type == 'ready') {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 240;
      canvas.style.position = 'fixed';
      canvas.style.top = '50%';
      canvas.style.left = '50%';
      canvas.style.transform = 'translate(-50%, -50%)';
      canvas.style.zIndex = 9999;
      document.body.appendChild(canvas);

      const context = canvas.getContext('2d');

      // Загружаем jsnes асинхронно
      const loadScript = (url) => new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      loadScript('https://lanthar91.github.io/sycbox/jsnes.js').then(() => {
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

        // UI через встроенные компоненты Lampa (Explorer)
        const files = [
          { title: 'Super Mario Bros.', url: 'https://<твой-хостинг>/mario.nes' },
          { title: 'Contra', url: 'https://<твой-хостинг>/contra.nes' },
        ];

        const items = files.map(file => ({
          title: file.title,
          url: file.url,
        }));

        const explorer = new Lampa.Explorer({
          items: items,
          onSelect: (item) => {
            fetch(item.url)
              .then(response => response.arrayBuffer())
              .then(buffer => {
                const binary = String.fromCharCode(...new Uint8Array(buffer));
                nes.loadROM(binary);
                const frameLoop = () => {
                  nes.frame();
                  requestAnimationFrame(frameLoop);
                };
                frameLoop();
              })
              .catch(err => {
                Lampa.Noty.show('Ошибка загрузки ROM: ' + err.message);
              });
          },
        });

        explorer.render(true);
        explorer.toggle(); // отображаем меню
      }).catch(err => {
        Lampa.Noty.show('Ошибка загрузки jsnes: ' + err.message);
      });
    }
  });
})();
