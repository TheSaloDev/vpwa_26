<template>
  <q-page class="channel">
    <template v-if="channel">
      <div class="channel-header row items-center">
        <q-icon name="tag" size="24px" class="q-mr-sm" />
        <div class="column">
          <span class="text-subtitle1 text-weight-bold">{{ channel.name }}</span>
          <span class="text-caption text-grey-7">{{ channel.topic }}</span>
        </div>
        <q-space />
        <MembersMenu :users="channel.users" />
        <span class="text-caption">{{ channel.members }}</span>
      </div>

      <div class="messages">
        <div
            v-for="m in channel.messages"
            :key="m.id"
            class="message-row"
            :class="{ mention: isMention(m.text) }"
        >
            <q-chat-message
            :name="isOwn(m) ? 'Me' : m.author"
            :text="[m.text]"
            :stamp="m.time"
            :sent="isOwn(m)"
            :bg-color="isOwn(m) ? 'primary' : 'grey-3'"
            text-color="black"
            />
        </div>
            <div class="typing" :class="{ visible: isTyping }">
                <span>{{ nickname }} is typing</span>
                <span class="dots"><i></i><i></i><i></i></span>
            </div>
        </div>
    </template>

    <div v-else class="text-center text-grey-7 q-pt-xl">Channel not found</div>
  </q-page>
</template>

<script setup>
import { isTyping } from '@/data/typing'

function isOwn(m) {
  return m.own || m.author === nickname
}

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { channels } from '@/data/channels'
import MembersMenu from '@/components/MembersMenu.vue'

const route = useRoute()
const nickname = localStorage.getItem('nickname') || ''

const channel = computed(() =>
  channels.find((c) => c.id === route.params.id)
)

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function isMention(text) {
  if (!nickname) return false
  const re = new RegExp(`(^|\\s)@${escapeRegExp(nickname)}(?=$|[\\s.,!?;:])`, 'i')
  return re.test(text)
}
</script>

<style scoped>
.channel-header {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 12px 16px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.messages {
  padding: 16px 16px 100px;
}

.message-row {
  padding: 2px 12px;
  border-radius: 8px;
  border-left: 4px solid transparent;
}

.message-row.mention {
  background: #fff6d6;
  border-left-color: #fdb927;
}


.typing {
  height: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  font-size: 12px;
  color: black;
  opacity: 0;
  transition: opacity 0.2s;
}

.typing.visible {
  opacity: 1;
}

.dots {
  display: inline-flex;
  gap: 3px;
}

.dots i {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: black;
  animation: bounce 1.2s infinite ease-in-out;
}

.dots i:nth-child(2) { animation-delay: 0.2s; }
.dots i:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-4px); opacity: 1; }
}
</style>