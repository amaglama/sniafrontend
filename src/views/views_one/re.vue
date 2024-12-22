<template>
    <div>
      <h1>Registro de Consultor</h1>
      <form @submit.prevent="submitForm">
        <label for="type_identification_document">Tipo de Identificación:</label>
        <select v-model="form.type_identification_document" id="type_identification_document">
          <option value="CI">CI</option>
          <option value="CI EXTRANJERO">CI Extranjero</option>
          <option value="PASSPORT">Pasaporte</option>
        </select>
  
        <label for="identification_document">Número de Identificación:</label>
        <input type="text" v-model="form.identification_document" id="identification_document" required />
  
        <label for="user_name">Nombre:</label>
        <input type="text" v-model="form.user_name" id="user_name" required />
  
        <label for="last_name">Apellido:</label>
        <input type="text" v-model="form.last_name" id="last_name" required />
  
        <label for="address">Dirección:</label>
        <input type="text" v-model="form.address" id="address" />
  
        <label for="email">Correo Electrónico:</label>
        <input type="email" v-model="form.email" id="email" required />
  
        <label for="consultant_type">Tipo de Consultor:</label>
        <select v-model="form.consultant_type" id="consultant_type">
          <option value="UNIPERSONAL NACIONAL">Unipersonal Nacional</option>
          <option value="UNIPERSONAL EXTRANJERA">Unipersonal Extranjera</option>
        </select>
  
        <label for="category">Categoría:</label>
        <select v-model="form.category" id="category">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
  
        <label for="photo">Foto:</label>
        <input type="file" @change="handleFileChange($event, 'photo')" id="photo" accept="image/*" />
  
        <label for="state_certificate_doc">Certificado Estatal (PDF):</label>
        <input type="file" @change="handleFileChange($event, 'state_certificate_doc')" id="state_certificate_doc" accept="application/pdf" />
  
        <label for="identification_document_doc">Documento de Identificación (PDF):</label>
        <input type="file" @change="handleFileChange($event, 'identification_document_doc')" id="identification_document_doc" accept="application/pdf" />
  
        <button type="submit">Enviar</button>
      </form>
      <p v-if="error" style="color: red;">{{ error }}</p>
      <p v-if="success" style="color: green;">{{ success }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          type_identification_document: "CI",
          identification_document: "",
          user_name: "",
          last_name: "",
          address: "",
          email: "",
          consultant_type: "UNIPERSONAL NACIONAL",
          category: "A",
        },
        files: {
          photo: null,
          state_certificate_doc: null,
          identification_document_doc: null,
        },
        error: null,
        success: null,
      };
    },
    methods: {
      handleFileChange(event, fieldName) {
        this.files[fieldName] = event.target.files[0];
      },
      async submitForm() {
        const formData = new FormData();
  
        // Agregar campos del formulario
        for (const key in this.form) {
          formData.append(key, this.form[key]);
        }
  
        // Agregar archivos
        for (const key in this.files) {
          if (this.files[key]) {
            formData.append(key, this.files[key]);
          }
        }
  
        try {
          const response = await fetch("http://127.0.0.1:8000/api/consultants/", {
            method: "POST",
            headers: {
              Authorization: "Bearer YOUR_TOKEN", // Cambia YOUR_TOKEN por tu token real
            },
            body: formData,
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            this.error = "Error al enviar los datos: " + JSON.stringify(errorData);
            this.success = null;
          } else {
            const data = await response.json();
            this.success = "Consultor creado con éxito: " + JSON.stringify(data);
            this.error = null;
          }
        } catch (error) {
          this.error = "Hubo un problema con la solicitud: " + error.message;
          this.success = null;
        }
      },
    },
  };
  </script>