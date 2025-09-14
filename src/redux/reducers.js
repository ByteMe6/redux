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
