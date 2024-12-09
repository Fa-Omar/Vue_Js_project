<script setup>
import { onMounted, ref } from 'vue';
const name = ref('John Doe');
const status = ref('active');
const tasks = ref(['task 1', 'task 2', 'task 3']);
const link = 'https://google.com'
const newTask = ref('')

const toggleStatus = () => {
  if(status.value === 'active') {
    status.value = 'pending'
  }
  else if (status.value === 'pending'){
    status.value = 'inactive'
  }
  else {
    status.value = 'active'
  }
};  

const addTask = () => {
  if(newTask.value.trim() != ''){
    tasks.value.push(newTask.value)
    newTask.value = ''
  }
}

const deleteTask = (index) => {
  tasks.value.splice(index, 1)
}

onMounted(async() => {
  try {
    const respons = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await respons.json();
    tasks.value = data.map((task) => task.title)
  } catch (error) {
    console.log("Error appeared")
  }
});

</script>

<template>
  <h1>{{ name }}</h1>
  <p v-if="status === 'active'">User is Active</p>
  <p v-else-if="status === 'pending'">User not active</p>
  <p v-else="status">User is not Here</p>

  <form @submit.prevent="addTask">
    <label for="newTask">Add task</label>
    <input type="text" id="newTask" name="newTask" v-model="newTask">
    <button type="submit">Submit</button>
  </form>

  <h3>Tasks:</h3>
  <ul>
    <li v-for="(task, index) in tasks":key="task">
      <span>
        {{ task }}
      </span>
      <button @click="deleteTask(index)">X</button>
    </li>
  </ul>
  <a v-bind:href="link">Click For Google</a>

  <!-- <button v-on:click="toggleStatus">Change Status</button> -->
  <button @click="toggleStatus">Change Status</button>
</template>