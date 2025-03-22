(function () {
  'use strict';

  function registerNESPlugin() {
    const manifest = {
      type: 'video',
      version: '1.0.0',
      name: 'NES Эмулятор',
      description: 'Запуск NES игр через jsnes',
      component: 'nes_emulator'
    };

    // Вот это критически важная строка!
    Lampa.Manifest.plugins = manifest;
    Lampa.Component.add('iptv', Component);
    Lampa.Component.add('nes_emulator', function(){
      let component = new Lampa.Component();

      component.create = function(){
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
            { title: 'Super Mario Bros.', url: 'https://lanthar91.github.io/SYIC/roms/mario.nes' },
            { title: 'Contra', url: 'https://<твой-хостинг>/contra.nes' },
          ];

          const explorer = new Lampa.Explorer({
            items: files,
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
      };

      component.destroy = function(){};

      return component;
    });

    // Добавление пункта в меню
    Lampa.Listener.follow('menu', function(e){
      if(e.type === 'ready'){
        let menu_item = $(`
          <li class="menu__item selector" data-component="nes_emulator">
            <div class="menu__ico"><span>🎮</span></div>
            <div class="menu__text">NES Эмулятор</div>
          </li>
        `);

        menu_item.on('hover:enter', function(){
          Lampa.Activity.push({
            component: 'nes_emulator',
            title: 'NES Эмулятор'
          });
        });

        e.data.body.append(menu_item);
      }
    });
  }

  if(window.appready) registerNESPlugin();
  else Lampa.Listener.follow('app', function(e){
    if(e.type === 'ready') registerNESPlugin();
  });

})();
