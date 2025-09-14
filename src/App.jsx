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
