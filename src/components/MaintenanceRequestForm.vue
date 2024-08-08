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
      <button @click="cancel" type="submit">Cancelar</button>
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
  background-color: antiquewhite;
  padding: 1rem;
  border-radius: 1rem;
}
button {
  border: none;
  color: black;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 0.5rem;
  margin-inline: 1rem;
  background-color: gray;
}
</style>
