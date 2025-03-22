(function () {
  'use strict';

  function startPlugin() {
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

    const loadScript = (url) => new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

    loadScript('https://lanthar91.github.io/SYIC/jsnes.js').then(() => {
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

      const files = [
        { title: 'Super Mario Bros.', url: 'https://lanthar91.github.io/roms/mario.nes' },
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
      explorer.toggle();
    }).catch(err => {
      Lampa.Noty.show('Ошибка загрузки jsnes: ' + err.message);
    });
  }

  // Используем стандартные подходы Lampa для добавления элемента в меню
  Lampa.Listener.follow('menu', function(e) {
    if (e.type == 'ready') {
      // Корректное создание элемента меню по аналогии с IPTV
      let menuItem = $('<li class="menu__item selector" data-action="nes_emulator">' +
                          '<div class="menu__ico"><span>🎮</span></div>' +
                          '<div class="menu__text">NES Эмулятор</div>' +
                       '</li>');

      menuItem.on('hover:enter', () => {
        Lampa.Activity.push({
          url: '',
          title: 'NES Эмулятор',
          component: {
            create: () => { startPlugin(); },
            destroy: () => {},
          }
        });
      });

      // Добавляем элемент меню через правильный API
      e.data.body.append(menuItem);
    }
  });
})();
