# Конфигурация VS Code

## Параметры конфигурации

Основные опции:

- `"*.preferences.importModuleSpecifier": "auto"` - стиль путей для автоматического импорта (абсолютный или относительный) выбирается автоматически
- `"typescript.tsdk": "node_modules/typescript/lib"` - выбор версии typescript из node_modules
- `"editor.formatOnSave": true` - форматировать файл при сохранении
- `"editor.codeActionsOnSave": {"source.fixAll.tslint": true, "source.fixAll.eslint": true}` - выполнение форматирования по правилам линтера при сохранении

Подробнее в документации: https://code.visualstudio.com/docs/getstarted/settings

## Отладчик для Chrome

Для отладки необходимо установите расширение `Debugger for Chrome`.

`.vscode/launch.json` - Конфигурационный файл запуска

Опция `request`:

- Конфигурация `launch` запускает экземпляр Chrome, на котором будет использоваться временный сеанс, предполагающий отсутствие расширений или открытых вкладок.

- Конфигурация `attach` прикрепляет отладчик к работающему экземпляру Chrome. Однако для работы этой опции нужно запустить Chrome с включенной удаленной отладкой.

Подробнее в документации: https://github.com/Microsoft/vscode-chrome-debug
