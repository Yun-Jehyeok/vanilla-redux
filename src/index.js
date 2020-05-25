import { createStore } from "redux";

//0
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
//0

const addToDo = (text) => {
    return {
        type: ADD_TODO, text
    };
};

const deleteToDo = (id) => {
    return {
        type: DELETE_TODO, id
    };
};

//1
const reducer = (state = [], action) => {
    switch(action.type) {
        //4
        case ADD_TODO:
            const newToDoObj = { text: action.text, id: Date.now() };
            return [newToDoObj, ...state];
        //4

        //8
        case DELETE_TODO:
            const cleaned = state.filter(toDo => toDo.id !== action.id)
            return cleaned;
        //8
        
        default:
            return state;
    }
};

const store = createStore(reducer);
//1

//3
const dispatchAddToDo = (text) => {
    store.dispatch(addToDo(text));
}
//3

//7
const dispatchDeleteToDo = (e) => {
    const id = parseInt(e.target.parentNode.id);

    store.dispatch(deleteToDo(id));
}
//7

//6
const paintToDos = () => {
    const toDos = store.getState();

    ul.innerHTML = "";

    toDos.forEach(toDo => {
        const li = document.createElement("li");
        const btn = document.createElement("button");

        li.id = toDo.id;
        li.innerText = toDo.text;

        ul.appendChild(li);

        btn.innerText = "DEL";
        btn.addEventListener("click", dispatchDeleteToDo);

        li.appendChild(btn);
    })
}
//6

//5
store.subscribe(paintToDos);
//5

const onSubmit = e => {
    e.preventDefault();

    const toDo = input.value;
    input.value = "";

    //2
    dispatchAddToDo(toDo);
    //2
};

form.addEventListener("submit", onSubmit);
