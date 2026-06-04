<template>

<div class="container mt-4">

  <div class="d-flex justify-content-between">

    <h3>User Master</h3>

    <button
      class="btn btn-danger"
      @click="logout"
    >
      Logout
    </button>

  </div>

  <hr>

  <div class="row">

    <div class="col-md-3">
      <input
        v-model="form.name"
        class="form-control"
        placeholder="Name"
      >
    </div>

    <div class="col-md-2">
      <input
        v-model="form.mobile"
        class="form-control"
        placeholder="Mobile"
      >
    </div>

    <div class="col-md-3">
      <input
        v-model="form.email"
        class="form-control"
        placeholder="Email"
      >
    </div>

    <div class="col-md-4">
      <input
        v-model="form.address"
        class="form-control"
        placeholder="Address"
      >
    </div>

  </div>

  <button
    class="btn btn-success mt-3"
    @click="saveUser"
  >
    Save
  </button>

</div>

</template>

<script setup>

import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const form = reactive({
  name: '',
  mobile: '',
  email: '',
  address: ''
})

const saveUser = async () => {

  try {

    await api.post(
      '/users',
      form
    )

    toast.success(
      'User Saved'
    )

  } catch {

    toast.error(
      'Error Saving User'
    )
  }
}

const logout = () => {

  localStorage.removeItem(
    'token'
  )

  router.push('/')
}

</script>