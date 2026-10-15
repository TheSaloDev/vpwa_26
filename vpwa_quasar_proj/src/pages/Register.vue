<template>
  <q-page padding class="flex flex-center column">
    <div class="logreg-box flex-row flex-center">
        <div class="text-h4 q-mb-md column items-center">Registration</div>

        <q-form @submit="onSubmit" class="q-gutter-md column items-center ">
        <div class="row namesurname justify-between">
        <q-input
            class="col namesurname-box"
            outlined color="accent"
            filled
            v-model="name"
            label="Name *"
            lazy-rules
            :rules="[
            (val) => (val && val.trim().length > 0) || 'Please enter your name',
            ]"
        />

        <q-input
            class="col namesurname-box"
            outlined color="accent"
            filled
            v-model="surname"
            label="Surname *"
            lazy-rules
            :rules="[
            (val) => (val && val.trim().length > 0) || 'Please enter your surname',
            ]"
        />
        </div>

        <q-input
            class="col logreg-inpt"
            outlined color="accent"
            filled
            v-model="nickname"
            label="Username *"
            lazy-rules
            :rules="[
            (val) =>
                (val && val.trim().length > 0) || 'Please enter your nickname',
            ]"
        />

        <q-input
            class="col logreg-inpt"
            outlined color="accent"
            filled
            type="email"
            v-model="email"
            label="Email *"
            lazy-rules
            :rules="[
            (val) => !!val || 'Please type your email',
            (val) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
                'Please type a valid email',
            ]"
        />

        <div>
            <q-btn class="logreg-btn" label="Register" type="submit" color="primary" />
            <q-btn class="logreg-btn" label="I already have account" to="/login" color="primary" />
        </div>
        </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const name = ref("");
const nickname = ref("");
const email = ref("");

function onSubmit() {
  localStorage.setItem("nickname", nickname.value.trim());
  router.push("/profile");
}
</script>
