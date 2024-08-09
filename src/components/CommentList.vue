<template>
  <h2>Comentarios</h2>
  <div>
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
      <button type="submit" class="btnAdd">Añadir Comentario</button>
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
<style scoped>
form {
  padding: 1rem;
  border-radius: 1rem;
}
button {
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 0.5rem;
  margin-inline: 1rem;
  color: #2c3e50;
  border-style: solid;
  border-width: 1px;
  border-color: #2c3e50;
  background-color: transparent;
}
button:hover{
  color: white;
  background-color: #2c3e50;
}
.btnAdd:hover {
  border-style: solid;
  border-width: 1px;
  border-color: #42b983;
  color: white;
  background-color: #42b983;
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
</style>