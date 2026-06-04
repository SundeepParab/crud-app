<template>
  <div class="container mt-5">

    <div class="row justify-content-center">

      <div class="col-md-4">

        <div class="card">

          <div class="card-header">
            Login
          </div>

          <div class="card-body">

            <input
              v-model="username"
              class="form-control mb-3"
              placeholder="Username" value="admin"
            />

            <input
              type="password"
              v-model="password"
              class="form-control mb-3"
              placeholder="Password" value="admin123"
            />

            <button
              class="btn btn-primary w-100"
              @click="login"
            >
              Login
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

const username = ref('admin')
const password = ref('admin123')

const login = async () => {

  try {

    const response = await api.post(
      '/auth/login',
      {
        username: username.value,
        password: password.value
      }
    )

    localStorage.setItem(
      'token',
      response.data.token
    )

    toast.success('Login Successful')

    router.push('/users')

  } catch (error) {
    console.error('Login Failed', error)
    toast.error('Invalid Credentials')
  }
}
</script>