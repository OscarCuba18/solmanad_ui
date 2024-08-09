<template>
  <h1>{{ isEditMode ? 'Editar' : 'Crear' }} Solicitud</h1>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label>Descripción:</label>
        <input v-model="request.description" required />
      </div>
      <div>
        <label>Estado:</label>
        <input v-model="request.state" required />
      </div>
      <div>
        <label>Fecha solicitada:</label>
        <input type="date" v-model="request.date_requested" required />
      </div>
      <div>
        <label>Fecha requerida:</label>
        <input type="date" v-model="request.date_required" required />
      </div>
      <button @click="cancel" type="submit" class="btnCancel">Cancelar</button>
      <button type="submit" class="btnSave">Guardar</button>
      <button v-if="isEditMode" type="button" @click="deleteRequest" class="btnDelete">Eliminar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      request: {
        description: '',
        state: '',
        date_requested: '',
        date_required: '',
        comments: []
      },
      isEditMode: false
    };
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.isEditMode = true;
      axios.get(`http://localhost:3000/maintenanceRequests/${id}`)
        .then(response => {
          this.request = response.data;
        });
    }
  },
  methods: {
    submitForm() {
      if (this.isEditMode) {
        axios.put(`http://localhost:3000/maintenanceRequests/${this.$route.params.id}`, this.request)
          .then(() => {
            this.$router.push('/');
          });
      } else {
        axios.post('http://localhost:3000/maintenanceRequests', this.request)
          .then(() => {
            this.$router.push('/');
          });
      }
    },
    deleteRequest() {
      axios.delete(`http://localhost:3000/maintenanceRequests/${this.$route.params.id}`)
        .then(() => {
          this.$router.push('/');
        });
    },
    cancel() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
div {
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  margin: 20px;
}
form {
  border-color: #d0d7deb3;
  border-width: 1px;
  border-style: solid;
  padding: 1rem;
  border-radius: 1rem;
}
button {
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 0.5rem;
  margin-inline: 1rem;
}
input {
  width: 15rem;
  border-radius: 0.5rem;
  border-color: #d0d7deb3;
  padding: 5px;
}
label {
  width: 10rem;
  text-align: right;
  margin-right: 1rem;
}
.btnCancel {
  color: #2c3e50;
  border-style: solid;
  border-width: 1px;
  border-color: #2c3e50;
  background-color: transparent;
}
.btnCancel:hover{
  color: white;
  background-color: #2c3e50;
}
.btnSave {
  color: #42b983;
  border-style: solid;
  border-width: 1px;
  border-color: #42b983;
  background-color: transparent;
}
.btnSave:hover{
  color: white;
  background-color: #42b983;
}
.btnDelete {
  color: #ff4141;
  border-style: solid;
  border-width: 1px;
  border-color: #ff4141;
  background-color: transparent;
}
.btnDelete:hover{
  color: white;
  background-color: #ff4141;
}
</style>
