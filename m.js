(function () {
  'use strict';

  function registerNESPlugin() {
    const manifest = {
      type: 'video',
      version: '1.0.0',
              icon: '<svg fill="currentColor" width="800px" height="800px" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M36.78125 0C36.230469 0.0703125 35.835938 0.574219 35.90625 1.125C35.976563 1.675781 36.480469 2.070313 37.03125 2C37.03125 2 37.820313 1.960938 39.1875 2.40625C40.554688 2.851563 42.402344 3.757813 44.28125 5.6875C46.171875 7.625 47.105469 9.480469 47.5625 10.84375C48.019531 12.207031 48 13 48 13C47.996094 13.359375 48.183594 13.695313 48.496094 13.878906C48.808594 14.058594 49.191406 14.058594 49.503906 13.878906C49.816406 13.695313 50.003906 13.359375 50 13C50 13 49.980469 11.832031 49.4375 10.21875C48.894531 8.605469 47.828125 6.476563 45.71875 4.3125C43.597656 2.140625 41.445313 1.03125 39.8125 0.5C38.179688 -0.03125 36.96875 0 36.96875 0C36.9375 0 36.90625 0 36.875 0C36.84375 0 36.8125 0 36.78125 0 Z M 28.6875 6C27.625 6 26.554688 6.382813 25.71875 7.15625C25.707031 7.167969 25.699219 7.175781 25.6875 7.1875L1.1875 31.78125C-0.40625 33.375 -0.390625 36.011719 1.15625 37.6875C1.167969 37.699219 1.175781 37.707031 1.1875 37.71875L12.40625 48.90625C14 50.5 16.605469 50.484375 18.28125 48.9375C18.292969 48.925781 18.300781 48.917969 18.3125 48.90625L42.8125 24.40625C42.824219 24.386719 42.835938 24.363281 42.84375 24.34375C44.351563 22.585938 44.40625 20 42.8125 18.40625L31.59375 7.1875C30.796875 6.390625 29.75 6 28.6875 6 Z M 36.8125 6C36.261719 6.050781 35.855469 6.542969 35.90625 7.09375C35.957031 7.644531 36.449219 8.050781 37 8C37 8 37.3125 7.980469 37.9375 8.1875C38.5625 8.394531 39.398438 8.835938 40.28125 9.71875C41.164063 10.601563 41.605469 11.4375 41.8125 12.0625C42.019531 12.6875 42 13 42 13C41.996094 13.359375 42.183594 13.695313 42.496094 13.878906C42.808594 14.058594 43.191406 14.058594 43.503906 13.878906C43.816406 13.695313 44.003906 13.359375 44 13C44 13 43.980469 12.3125 43.6875 11.4375C43.394531 10.5625 42.835938 9.398438 41.71875 8.28125C40.601563 7.164063 39.4375 6.605469 38.5625 6.3125C37.6875 6.019531 37 6 37 6C36.96875 6 36.9375 6 36.90625 6C36.875 6 36.84375 6 36.8125 6 Z M 28.6875 8C29.25 8 29.785156 8.191406 30.1875 8.59375L41.40625 19.8125C42.214844 20.621094 42.238281 22.019531 41.34375 23.0625L16.90625 47.46875C15.980469 48.320313 14.621094 48.308594 13.8125 47.5L2.625 36.3125C2.613281 36.300781 2.605469 36.292969 2.59375 36.28125C1.769531 35.355469 1.796875 34.015625 2.59375 33.21875L27.09375 8.625C27.554688 8.199219 28.125 8 28.6875 8 Z M 28 14C23.59375 14 20 17.59375 20 22C20 26.40625 23.59375 30 28 30C32.40625 30 36 26.40625 36 22C36 17.59375 32.40625 14 28 14 Z M 28 16C31.324219 16 34 18.675781 34 22C34 25.324219 31.324219 28 28 28C24.675781 28 22 25.324219 22 22C22 18.675781 24.675781 16 28 16 Z M 28 20C26.894531 20 26 20.894531 26 22C26 23.105469 26.894531 24 28 24C29.105469 24 30 23.105469 30 22C30 20.894531 29.105469 20 28 20 Z M 15 27C13.894531 27 13 27.894531 13 29C13 30.105469 13.894531 31 15 31C16.105469 31 17 30.105469 17 29C17 27.894531 16.105469 27 15 27 Z M 10 32C8.894531 32 8 32.894531 8 34C8 35.105469 8.894531 36 10 36C11.105469 36 12 35.105469 12 34C12 32.894531 11.105469 32 10 32 Z M 21 33C19.894531 33 19 33.894531 19 35C19 36.105469 19.894531 37 21 37C22.105469 37 23 36.105469 23 35C23 33.894531 22.105469 33 21 33 Z M 16 38C14.894531 38 14 38.894531 14 40C14 41.105469 14.894531 42 16 42C17.105469 42 18 41.105469 18 40C18 38.894531 17.105469 38 16 38Z"/></svg>',
      name: 'NES Эмулятор',
      description: 'Запуск NES игр через jsnes',
      component: 'nes_emulator'
    };

    // Вот это критически важная строка!
    Lampa.Manifest.plugins = manifest;
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
