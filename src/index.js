import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

//굳이 이렇게 하는 이유는
//변수 설정 없이 string을 그대로 사용하면
//오타가 있어도 에러가 알려주지 않음
const ADD = "ADD";
const MINUS = "MINUS";

const countModifier = (count = 0, action) => {    
    switch (action.type) {
        case ADD:
            return count + 1
        case MINUS:
            return count -1;
        default:
            return count;
    }
};

const countStore = createStore(countModifier);

const onChange = () => {
    number.innerText = countStore.getState();
}

//변화를 store에서 감지하고 싶을 때 사용
//store가 바뀔 때마다 onChange 실행
countStore.subscribe(onChange);

const handleAdd = () => {
    countStore.dispatch({ type: ADD });
}

const handleMinus = () => {
    countStore.dispatch({ type: MINUS });
}

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);