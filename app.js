import { db, collection, addDoc, onSnapshot, serverTimestamp, orderBy, query, updateDoc, deleteField, doc, deleteDoc } from "./firebase.js";

let addTodo = async () => {
  let todo_input = document.getElementById("todo-input");
  try {
    const docRef = await addDoc(collection(db, "Todos"), {
      value: todo_input.value,
      time: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

let add_button = document.getElementById("add-button");
add_button.addEventListener("click", addTodo);

let getTodos = () => {
  const q = query(collection(db, "Todos"), orderBy("time", "desc"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let todo_list = document.getElementById("todo-list")
    todo_list.innerHTML = ""
    querySnapshot.forEach((doc) => {
      const todoData = doc.data();
      const todoId = doc.id;

      let listItem = document.createElement("li");
      listItem.classList.add("todo-item")
      listItem.innerHTML += `
      			${todoData.value}
            <button class='complete-button'>Complete</button>
            <button class='delete-button'>Delete</button> 
      `
      todo_list.appendChild(listItem);

      const completeButton = listItem.querySelector(".complete-button")
      completeButton.addEventListener("click", () => markComplete(todoId));

      const deleteButton = listItem.querySelector(".delete-button");
      deleteButton.addEventListener("click", () => deleteTodo(todoId));

    });
  });
}

getTodos()

const markComplete = async (todoId) => {
  try {
    const todoRef = doc(db, "Todos", todoId);
    await updateDoc(todoRef, {
      status: "completed",
      capital: deleteField()
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Todo marked as complete!",
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}


const deleteTodo = async (todoId) => {
  try {
    const todoRef = doc(db, "Todos", todoId);
    await deleteDoc(todoRef);
    Swal.fire({
      icon: "error",
      title: "Done...",
      text: "Todo deleted successfully!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};