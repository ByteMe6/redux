# Документация по Redux-примеру с комментариями

Этот проект — минимальный пример использования Redux в React с подробными комментариями к каждому файлу и функции. Все комментарии из кода сохранены и перефразированы для лучшего понимания.

---

## Структура проекта

```
src/
  components/
    counter.jsx         // компонент счетчика, использует Redux
  redux/
    actions.js          // экшены для изменения состояния
    constans.js         // константы типов экшенов
    reducers.js         // редьюсер для обработки логики
    selectors.js        // селектор для получения значения из стейта
    store.js            // создание Redux store
  App.jsx               // главный компонент, оборачивает все в Provider
```

---

## Описание файлов и комментариев

### `src/redux/selectors.js`

```js
// бесполезная шляпа, укорачиваем код стора
// мы просто здесь берем из стейта, наши значения
export function selectAmount(state){return state.amount} //вместо аммоунт пишем нашу "переменную"
```
**Комментарий:**  
Селектор — просто функция, которая возвращает нужное значение из стейта. Здесь мы берем `amount` из стейта. Можно брать любую переменную.

---

### `src/redux/reducers.js`

```js
import { PLUS, MINUS } from "./constans";
// что мы должны делать с пейлоадом (отнимать или добавлять например)
const initialState = {
  amount: 0, // значение по умолчанию, это по факту имя как в стейте
};

export function reducer(
  state = initialState, // заполняем стейт значением по умолчанию
  action
) {
  // делаем проверку для плюса и минуса
  switch (action.type) {
    case PLUS:
      console.log("plus");
      return {...state, amount: state.amount + action.payload} // возвращаем обьект, то есть уже измененный стейт
      // мы присваиваем значение
      // тут например мы добавляем пейлоад добавляем
      break;
    case MINUS:
      console.log("MINUS");
      return {...state, amount: state.amount - action.payload} // возвращаем обьект, то есть уже измененный стейт
      break;
    default:
      return state;
  }
  //тут сделано свитчом, но можно как угодно писать
}
```
**Комментарий:**  
Редьюсер — функция, которая принимает текущее состояние и экшен, и возвращает новое состояние.  
- `initialState` — начальное значение стейта.  
- Внутри switch-case проверяем тип экшена (`PLUS` или `MINUS`) и изменяем `amount` на нужное значение из `payload`.  
- Можно реализовать не только через switch.

---

### `src/redux/store.js`

```js
// это главный стейт проекта, по факту тут все и хранится
import { createStore } from "redux"; // фукнция редакса для создания стейта
// то что вскод это зачеркивает это нормально
import { reducer } from "./reducers"; // создаем стор по моему редюсеру, он по факту дает указания в стктуре стора
export const store = createStore(reducer) // создаем стор в переменной стор
```
**Комментарий:**  
Store — это главное хранилище состояния приложения.  
- `createStore` — функция из Redux для создания store.  
- Store создается на основе редьюсера.

---

### `src/redux/actions.js`

```js
import { PLUS, MINUS } from "./constans";
// делаем экшенсы + и -  из constans.js
// payload - это значение которое мы передаем в функцию. это то сколько мы будем добавлять или отнимать или еще что то
export function PLUSF(payload = 1){
    return {type: PLUS, payload}
}
export function MINUSF(payload = 1){
    return {type: MINUS, payload}
}
```
**Комментарий:**  
Экшены — функции, возвращающие объект с типом (`type`) и значением (`payload`).  
- `PLUSF` и `MINUSF` — экшены для увеличения и уменьшения значения.  
- `payload` — сколько прибавлять или отнимать.

---

### `src/redux/constans.js`

```js
// тут делаем две переменные которые будут хранить какойто пройес
export const PLUS = 'PLUS';
export const MINUS = 'MINUS'
```
**Комментарий:**  
Константы для типов экшенов. Используются для избежания опечаток и удобства.

---

### `src/components/counter.jsx`

```jsx
import { useSelector, useDispatch } from "react-redux";
import { PLUSF, MINUSF } from "../redux/actions"; // мои экшены
import { selectAmount } from "../redux/selectors";

function Counter() {
  const dispatch = useDispatch(); // юзДиспатч - это то что помогает выбрать экшен и обработать его, потмоу что экшены сами по себе не роботают "из коробки", а вот уже диспатч может их обрабатывать
  // он информирует стор
  let amount = useSelector(selectAmount); // юзСелектор берет значение которые мы писали в файле redux/selectors.js
  // он просто записывает функицю в переменную
  return (
    <>
      <div className="buttons">
        <button className="plus" onClick={() => dispatch(PLUSF())}>
          plus
        </button>
        <p>{amount}</p>

        <button className="minus" onClick={() => dispatch(MINUSF())}>
          minus
        </button>
      </div>
    </>
  );
}

export default Counter;
```
**Комментарий:**  
- `useDispatch` — хук для отправки экшенов в store.  
- `useSelector` — хук для получения значения из store через селектор.  
- Кнопки вызывают экшены через `dispatch`.

---

### `src/App.jsx`

```jsx
import { Provider } from "react-redux"; // провайдер это - коробка которая помогает сразу назодить нужные пропсы и легче находить место куда отправлять, короче типо коробка которая укомплектована сразу
// это надо чтобы сразу передавать между компонентами вне знависимости от их уровня
import { store } from "./redux/store";
import Counter from "./components/counter";

function App() {
  return (
      // стор это ключ которому я прнисваю в стор, это можно еще делать в index.js, главное чтобы провайдер оборачивал ВЕСЬ сайт
    <Provider store={store}>
      <main>
        <Counter />
      </main>
    </Provider>
  );
}

export default App;
```
**Комментарий:**  
- `Provider` — компонент, который делает store доступным для всех компонентов внутри себя.  
- Store можно передавать в любом месте, главное чтобы Provider оборачивал всё приложение.

---

## Кратко

- Все файлы снабжены комментариями для понимания, что и зачем делается.
- Пример максимально упрощён для изучения основ Redux и React-Redux.
- Все ключевые моменты и связи между файлами подробно описаны в комментариях к каждому файлу.