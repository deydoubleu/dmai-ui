import { defineStore } from "pinia";
import { ref } from 'vue';
import axios from 'axios';
import { useUserStore } from './user';

interface ChatMessage {
    message: string;
    reply: string;
}

interface FormatedMessage {
    role: 'user' | 'ai';
    content: string;
}

export const useChatStore = defineStore('chat', () => {
    const messages = ref<{ role: string; content: string }[]>([]);
    const loading = ref(false);
    const userStore = useUserStore();

    const loadChatHistory = async () => {
        if ( !userStore.userId) return;

        try{
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/get-messages`, {
                userId: userStore.userId
            });

            messages.value = data.messages
                .flatMap ((msg: ChatMessage): FormatedMessage[] => [
                    { role: 'user', content: msg.message},
                    { role: 'ai', content: msg.reply }
                ])
                .filer((msg: FormatedMessage ) => msg.content.trim());
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    }

    // Send new message
    const sendNewMessage = async (message: string) => {
        if (!message.trim() || !userStore.userId) return;

        messages.value.push({ role: 'user', content: message});
        loading.value = true;

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_AIP_URL}/chat`, {
                message,
                userId: userStore.userId,
            });

            messages.value.push({ role: 'ai', content: data.reply });

        } catch (error) {
            console.error('Error sending message:', error);
            messages.value.push({ role: 'ai', content: "Sorry, I couldn't process your request." });
        } finally {
            loading.value = false;
        }
    }

    return { messages, loading, loadChatHistory, sendNewMessage };
});

