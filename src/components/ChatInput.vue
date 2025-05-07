<script setup lang="ts">
    import { ref } from 'vue';

    const message = ref('');
    const emit = defineEmits(['send']);

    const sendMessage = () => {
        if(!message.value.trim()) return;
        
        emit( 'send', message.value);
        message.value =  '';
    };
</script>

<template>
    <div class="bg-blue-800 p-4 flex">
        <input v-model="message" @keyup.enter="sendMessage"
         placeholder="Type message" type="text" class="flex-1 rounded-lg bg-blue-700 text-gray-300 p-2 focus:outline-none"/>
        <button class="ml-2 px-4 py-2 bg-white rounded-lg text-black" @click="sendMessage">Send</button>
    </div>
</template>