import { PLUS, MINUS } from "./constans";
// делаем экшенсы + и -  из constans.js
// payload - это значение которое мы передаем в функцию. это то сколько мы будем добавлять или отнимать или еще что то
export function PLUSF(payload = 1){
    return {type: PLUS, payload}
}
export function MINUSF(payload = 1){
    return {type: MINUS, payload}
}