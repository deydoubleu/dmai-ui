<script setup> 
    import { onMounted, nextTick } from "vue";
    import { useUserStore } from '../stores/user';
    import { useChatStore } from '../stores/chat';
    import { useRouter } from 'vue-router';
    import Header from "../components/Header.vue";
    import ChatInput from '../components/ChatInput.vue';

    const userStore = useUserStore();
    const chatStore = useChatStore();
    const router = useRouter();

    //Ensure user is loged in.
    if ( !userStore.userId ) { router.puch('/'); }

    const scrollToBottom = () => {
        nextTick(() => {
            const chatContainer = document.getElementById("chat-container");
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        });
    }

    onMounted(() => {
        chatStore.loadChatHistory().then(() => scrollToBottom());
    });

</script>

<template>
   <div class="flex flex-col h-screen bg-blue-900 text-gray-300">
    <Header />
    <div id="chat-container" class="flex-1 overflow-y-auto p-4 space-y-4">
        <div v-for="(msg, index) in chatStore.messages" :key="index" :class="msg.role == 'user'? 'justify-end' : 'justify-start'" class="flex items-start">
            <div class="max-w-xs px-4 py-2 rounded-lg md:max-w-md"
            :class="ms.role == 'user'? 'bg-gray-200 text-black' : 'bg-gray-900 text-white'">
            {{  msg.content }}
        </div>
        </div>>
        <div v-if="chatStore.loading" class="flex justify-start">
            <div class="bg-blue-700 text-gray-300 px-4 py-2 rounded-lg">
                <span class="animated-pulse">AI is thinking</span>
            </div>

        </div>
    </div>
        <ChatInput @send="chatStore.sendNewMessage" />
   </div>
</template>