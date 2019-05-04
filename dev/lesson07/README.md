**Домашнее задание**

Работа с потоками в NodeJS
Написать приложение, демонстрирующее работу с потоками в `NodeJS`:
- Readable, генерирующий случайные числа,
- Transformable, добавляющий случайное число к первому и
- Writable, выводящий данные в консоль.

Данные должны “течь” readable -> transformable -> writable
Используйте highWaterMark для ограничения внутреннего буффера.  
 
Запуск скрипта
```npm
npm run stream
```
или
```npm
node index.js
```
В консоль будет выведен лог генерации 5-ти случайных чисел, затем их трансформации и вывода результата.
Пример:
```code
Add random number on start: 0.9493737199506758
Add random number on start: 0.8969808820259075
Add random number on start: 0.9215049797837167
Add random number on start: 0.49308532266851013
Add random number on start: 0.42654766745955097
Add random number on transform: 0.5200180454866421
Number as result: 1.4693917654373179
Add random number on transform: 0.8106273660933303
Number as result: 1.7076082481192378
Add random number on transform: 0.16492782263767336
Number as result: 1.08643280242139
Add random number on transform: 0.5332992296021004
Number as result: 1.0263845522706105
Add random number on transform: 0.47567261482650247
Number as result: 0.9022202822860534
```  
