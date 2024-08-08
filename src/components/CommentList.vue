<template>
  <div>
    <h2>Comentarios</h2>
    <ul>
      <li v-for="comment in comments" :key="comment.id">
        <div v-if="editingCommentId === comment.id">
          <input v-model="editedComment.text" placeholder="Edit comment" />
          <button @click="saveEdit(comment.id)">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
        <div v-else>
          {{ comment.text }} - {{ comment.date }}
          <button @click="startEdit(comment)">Edit</button>
          <button @click="deleteComment(comment.id)">Delete</button>
        </div>
      </li>
    </ul>
    <form @submit.prevent="addComment">
      <input v-model="newComment" placeholder="Añadir un comentario" required />
      <button type="submit">Añadir Comentario</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['comments', 'requestId'],
  data() {
    return {
      newComment: '',
      editingCommentId: null,
      editedComment: {}
    };
  },
  methods: {
    addComment() {
      const newCommentObj = {
        id: Date.now(),
        text: this.newComment,
        date: new Date().toISOString().split('T')[0]
      };

      const updatedComments = [...this.comments, newCommentObj];

      axios.get(`http://localhost:3000/maintenanceRequests/${this.requestId}`)
        .then(response => {
          const updatedRequest = response.data;
          updatedRequest.comments = updatedComments;

          return axios.put(`http://localhost:3000/maintenanceRequests/${this.requestId}`, updatedRequest);
        })
        .then(() => {
          this.$emit('commentAdded');
          this.newComment = '';
        });
    },
    startEdit(comment) {
      this.editingCommentId = comment.id;
      this.editedComment = { ...comment };
    },
    saveEdit(id) {
      const updatedComments = this.comments.map(comment =>
        comment.id === id ? { ...this.editedComment } : comment
      );

      axios.get(`http://localhost:3000/maintenanceRequests/${this.requestId}`)
        .then(response => {
          const updatedRequest = response.data;
          updatedRequest.comments = updatedComments;

          return axios.put(`http://localhost:3000/maintenanceRequests/${this.requestId}`, updatedRequest);
        })
        .then(() => {
          this.editingCommentId = null;
          this.editedComment = {};
          this.$emit('commentAdded');
        });
    },
    cancelEdit() {
      this.editingCommentId = null;
      this.editedComment = {};
    },
    deleteComment(id) {
      const updatedComments = this.comments.filter(comment => comment.id !== id);

      axios.get(`http://localhost:3000/maintenanceRequests/${this.requestId}`)
        .then(response => {
          const updatedRequest = response.data;
          updatedRequest.comments = updatedComments;

          return axios.put(`http://localhost:3000/maintenanceRequests/${this.requestId}`, updatedRequest);
        })
        .then(() => {
          this.$emit('commentAdded');
        });
    }
  }
};
</script>
