<template>
  <div>
    <h1>Solicitudes - Mantenimiento</h1>
    <router-link to="/create">Crear solicitud</router-link>
    <table>
      <thead>
        <tr>
          <th>Fecha Requerida</th>
          <th>Usuario</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="request in requests" :key="request.id">
            <td>{{ request.date_required }}</td>
            <td>{{ request.user_id }}</td>
            <td>{{ request.description }}</td>
            <td>{{ request.state }}</td>
            <td>
              <router-link :to="`/edit/${request.id}`">Editar</router-link>
              <button @click="deleteRequest(request.id)">Eliminar</button>
              <router-link :to="`/detail/${request.id}`">Ver detalles</router-link>
            </td>
          </tr>
        </tbody>
    </table>
  </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
  data() {
    return {
      requests: []
    };
  },
  mounted() {
    this.fetchRequests();
  },
  methods: {
    fetchRequests() {
      axios.get('http://localhost:3000/maintenanceRequests')
        .then(response => {
          this.requests = response.data;
        });
    },
    deleteRequest(id) {
      axios.delete(`http://localhost:3000/maintenanceRequests/${id}`)
        .then(() => {
          this.fetchRequests();
        });
    }
  }
};
</script>
<style scoped>
/* Estilos generales para el contenedor de la tabla */
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  text-align: center;
}

/* Estilo para el encabezado de la tabla */
thead {
  background-color: #333; /* Gris oscuro */
  color: white;
}

th {
  padding: 12px;
}

/* Estilo para el cuerpo de la tabla */
tbody tr:nth-child(even) {
  background-color: #f2f2f2; /* Gris claro para filas pares */
}

tbody tr:nth-child(odd) {
  background-color: #ffffff; /* Blanco para filas impares */
}

td {
  padding: 12px;
}

/* Estilo para los enlaces y botones en la tabla */
a, button {
  margin-right: 10px;
  text-decoration: none;
  color: #007bff; /* Color azul para enlaces */
}

button {
  background-color: #ff4d4d; /* Rojo para botones */
  border: none;
  color: white;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 0.5rem;
}

button:hover {
  background-color: #e60000; /* Rojo oscuro para hover */
}

</style>