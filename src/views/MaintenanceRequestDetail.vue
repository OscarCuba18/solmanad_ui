<template>
  <div>
    <h1>Detalle - Solicitud</h1>
    <p><strong>Descripción:</strong> {{ request.description }}</p>
    <p><strong>Estado:</strong> {{ request.state }}</p>
    <p><strong>Fecha solicitada:</strong> {{ request.date_requested }}</p>
    <p><strong>Fecha requerida:</strong> {{ request.date_required }}</p>
    <comment-list :comments="request.comments" :requestId="request.id" @commentAdded="fetchRequest"></comment-list>
  </div>
</template>

<script>
import axios from 'axios';
import CommentList from '../components/CommentList.vue';

export default {
  components: { CommentList },
  data() {
    return {
      request: {
        description: '',
        state: '',
        date_requested: '',
        date_required: '',
        comments: []
      }
    };
  },
  created() {
    this.fetchRequest();
  },
  methods: {
    fetchRequest() {
      axios.get(`http://localhost:3000/maintenanceRequests/${this.$route.params.id}`)
        .then(response => {
          this.request = response.data;
        });
    }
  }
};
</script>
