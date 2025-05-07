<script setup> 
    import { ref } from 'vue';
    import robotImage from "../assets/robot.png";
    import { useUserStore } from "../stores/user";
    import { useRouter } from "vue-router";
    import axios from "axios";

    const router = useRouter();
    const userStore = useUserStore();

    const name = ref('');
    const email = ref('');
    const loading = ref(false);
    const error = ref('');

    const createUser = async () => {
        if ( !name.value || !email.value ) {
            error.value = "Name & Email are required";
            return;
        }

        loading.value = true;
        error.value =  '';

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/register-user`, {
                name: name.value,
                email: email.value
            });

            userStore.setUser({
                userId: data.userId,
                name: data.name
            });

            //userStore.logout();

            router.push("/chat");

        } catch ( err ) {
            error.value = err.response?.data?.message || "Something went wrong";
        } finally {
            loading.value = false;
        }
    };

</script>

<template>
    <div class="h-screen flex items-center justify-center bg-blue-900 text-gray-300">
        <div class="p-8 bg-blue-800 rounded-lg shadow-lg w-full max-w-md">
            <img :src="robotImage" alt="A robot" class="mx-auto w-24 h-24 mb-4" />
            <h1 class="text-2xl font-semibold mb-4 text-center">Welcome to DMAI</h1>
            <input type="text" class="w-full p-2 mb-2 bg-gray-400 text-gray-900 rounded-lg focus: outline-none" placeholder="Name" v-model="name" />
            <input type="email" class="w-full p-2 mb-2 bg-gray-400 text-gray-900 rounded-lg focus: outline-none" placeholder="Email" v-model="email" />
            <button @click="createUser" class="p-2 w-full bg-gray-900 text-gray-300"  :disabled="loading">
                {{ loading ? "Loading..." : "Start Chatting" }}
            </button>

            <p v-if="error" class="text-red-500 text-center mt-2">{{ error }}</p>
        </div>
    </div>
</template>