function startPlugin() {
    // Код инициализации плагина
    
    Lampa.Template.add('название_шаблона', `
        <!-- HTML шаблон -->
    `);
    
    // Добавление нового раздела в меню
    Lampa.Listener.follow('app', function(e) {
        if (e.type == 'ready') {
            // Добавление вашего раздела
        }
    });
}

Lampa.Plugin({
    id: 'название_плагина',
    name: 'Отображаемое название',
    version: '1.0.0',
    description: 'Описание плагина',
    start: startPlugin
});
