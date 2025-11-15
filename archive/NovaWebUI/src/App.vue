<script setup lang="ts">
import { ref } from "vue";
import { askNova } from "./backend";

const userMessage = ref("");
const messages = ref<{ role: string; content: string }[]>([]);

async function send() {
  if (!userMessage.value.trim()) return;

  messages.value.push({ role: "user", content: userMessage.value });
  const prompt = userMessage.value;
  userMessage.value = "";

  const reply = await askNova(prompt);
  messages.value.push({ role: "assistant", content: reply });
}
</script>

<template>
  <div class="chat">
    <div
      v-for="(m, i) in messages"
      :key="i"
      class="message"
      :class="m.role"
    >
      {{ m.content }}
    </div>

    <input
      v-model="userMessage"
      @keyup.enter="send"
      placeholder="Speak to Nova…"
    />
  </div>
</template>

<style>
.chat {
  padding: 20px;
  font-family: sans-serif;
  color: white;
  background-color: #0a0a0a;
  min-height: 100vh;
}

.message {
  margin-bottom: 12px;
  white-space: pre-wrap;
}

.user {
  color: hotpink;
  font-weight: bold;
}

.assistant {
  color: #c9c9c9;
}

input {
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background: #111;
  border: 1px solid #444;
  color: white;
  border-radius: 8px;
}
</style>
