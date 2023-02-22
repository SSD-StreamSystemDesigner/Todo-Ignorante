<template>
  <div class="badass-todo">
    <div class="title has-text-centered">
      Badass Todo
      <h1> Io sono una prova di pipeline</h1>
    </div>
      
    <form
      @submit.prevent="addTodo"
    >
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input 
            v-model="newTodoContent"
            class="input" 
            type="text" 
            placeholder="Add a ToDo"
          >
        </p>
        <p class="control">
          <button 
          :disabled="!newTodoContent"
          class="button is-info"
        >
            Add
          </button>
        </p>
      </div>
    </form>

    <div
     v-for="todo in todos"
     class="card mb-5"
     :class="{ 'has-background-success-light' : todo.done}"
     >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div
             class="column"
             :class="{ 'has-text-success line-through' : todo.done}"
             >
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button
               @click="toggleDone(todo.id)"
               class="button"
               :class=" todo.done ? 'is-success' : 'is-light' "
               >
                &check;
              </button>
              <button
               @click="deleteTodo(todo.id)"
               class="button is-danger ml-2"
               >
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
/*
imports
*/

 import { ref, onMounted } from 'vue'
 import {
          collection, onSnapshot,
          addDoc, doc, deleteDoc, updateDoc,
          query, orderBy
        } from "firebase/firestore"
 import { db } from '@/firebase'

 /*
  firebase refs
 */

  const todosCollectionRef = collection(db, 'todos')
  const todosCollectionQuery = query(todosCollectionRef, orderBy("date","desc"))
/*
todos
*/ 
 
 const todos = ref([
 /* {
    id: 'id1',
    content: "Le Grafiche annodaM acroP",
    done: false
  },
  {
    id: 'id2',
    content: "Le Graficheeeee",
    done: true
  }*/ 
 ])

 /*
 Get Todos From Firestore
 */ 
 
 onMounted( () => {
   onSnapshot(todosCollectionQuery, (querySnapshot) => {
   const fbTodos = []
   querySnapshot.forEach((doc) => {
    const todo = {
      id: doc.id,
      content: doc.data().content,
      done: doc.data().done,
    }
    fbTodos.push(todo)
    })
    todos.value = fbTodos
  })
 })


/*
  Add Todo
*/

const newTodoContent = ref(" ")

const addTodo = ()=> { 
  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    done:false,
    date: Date.now()
  })
  newTodoContent.value = ''
}

/*
 Delete Todo
*/
const deleteTodo = id =>{
  deleteDoc(doc(todosCollectionRef, id))
}

/*
Toggle Done
*/

const toggleDone = id => {
  
  const index = todos.value.findIndex(todo=> todo.id===id)
  

  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done
  })
}
</script>

<style> 
@import 'vue3-firebase9-tutorial\node_modules\bulma\css';

.badass-todo{
  max-width:400px;
  padding: 20px;
  margin: 0 auto;

}

.line-through {
  text-decoration: line-through;
}
</style>
