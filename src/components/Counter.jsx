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
