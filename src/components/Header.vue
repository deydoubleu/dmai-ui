<script  setup lang="ts">
import robotImg from "../assets/robot.png";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const logout = () => {
    userStore.logout();
    router.push('/');
}

</script>

<template>
    <div class="py-4 px-6 bg-blue-800 flex shadow-md justify-between items-center text-gray-300">
        <img :src="robotImg" alt="robot" class="w-8 h-8" />
        <h1 class="text-lg font-semibold">DMAI</h1>
        <button @click="logout" class="px-4 bg-gray-300 text-gray-900 hover:text-blue-600">Logout</button>
    </div>
</template>