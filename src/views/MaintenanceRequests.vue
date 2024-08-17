<template>
  <!-- Buscador -->
  <label for="searchDescription">Buscar</label>
    <input type="text" v-model="searchQuery" id="searchDescription" placeholder="Buscar Descripción" />

    <!-- Filtro de Ordenación -->
    <label for="sortOrder">Ordenar por Fecha Requerida:</label>
    <select v-model="sortOrder" id="sortOrder">
      <option value="asc">Ascendente</option>
      <option value="desc">Descendente</option>
    </select>
  <div>
    <h1>Solicitudes - Mantenimiento</h1>
    <router-link to="/create" class="btnCreate">Crear solicitud</router-link>
    <table>
      <thead>
        <tr>
          <th @click="sortByDate">Fecha Requerida</th>
          <th>Usuario</th>
          <th>Descripción</th>
          <th>Estado</th>
          <th style="width: 18rem;">Acciones</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="request in filteredAndSortedRequests" :key="request.id">
            <td>{{ request.date_required }}</td>
            <td>{{ request.user_id }}</td>
            <td>{{ request.description }}</td>
            <td>{{ request.state }}</td>
            <td>
              <router-link :to="`/detail/${request.id}`" style="margin-right: 3rem;">Ver detalles</router-link>
              <router-link :to="`/edit/${request.id}`">Editar</router-link>
              <button @click="deleteRequest(request.id)" class="btnDelete">Eliminar</button>
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
      requests: [],
      searchQuery: '', // Valor para el buscador
      sortOrder: 'asc' // Valor para el filtro de ordenación
    };
  },
  computed: {
    filteredAndSortedRequests() {
      // Filtrar las solicitudes por descripción
      let filteredRequests = this.requests.filter((request) => {
        return request.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      });

      // Ordenar las solicitudes por fecha requerida
      if (this.sortOrder === 'asc') {
        return filteredRequests.sort((a, b) => new Date(a.date_required) - new Date(b.date_required));
      } else if (this.sortOrder === 'desc') {
        return filteredRequests.sort((a, b) => new Date(b.date_required) - new Date(a.date_required));
      }

      return filteredRequests;
    }
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
  border: none;
  padding: 4px 6px;
  cursor: pointer;
  border-radius: 0.5rem;
  margin-inline: 1rem;
}
.btnCreate {
  padding: 4px 6px;
  cursor: pointer;
  border-radius: 0.5rem;
  color: #42b983;
  border-style: solid;
  border-width: 1px;
  border-color: #42b983;
  background-color: transparent;
}
.btnCreate:hover{
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
#searchDescription, #sortOrder {
  margin: 10px;
  padding: 8px;
  font-size: 14px;
}

#sortOrder {
  width: 200px;
}
</style>