<template>
  <div class="terminal">
    <div v-if="log.length" class="log">
      <div v-for="(line, i) in log" :key="i" class="line">{{ line }}</div>
    </div>

    <q-input
      v-model="text"
      dense
      borderless
      dark
      :placeholder="placeholder"
      class="input"
      @keyup.enter="submit"
    >
      <template #prepend>
        <span class="prompt">&gt;</span>
      </template>
    </q-input>
    
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { channels } from '@/data/channels'
import { Notify, AppVisibility } from 'quasar'

const route = useRoute()
const nickname = localStorage.getItem('nickname') || ''

const text = ref('')
const log = ref([])

// открытый сейчас канал (undefined, если мы не на странице канала)
const channel = computed(() =>
  channels.find((c) => c.id === route.params.id)
)

const placeholder = computed(() =>
  channel.value
    ? `Message #${channel.value.name} (or /help)`
    : 'Type /help'
)

const NOTIFY_DELAY = 4000

const commands = {
  help: () => 'Available commands: /help, /clear, /notify <text>. Plain text is sent to the open channel.',
  clear: () => {
    log.value = []
    return null   // ничего не выводим
  },
  notify: (args) => {
    const message = args.join(' ')
    if (!message) return 'Usage: /notify <text>'

    // разрешение на системные уведомления нужно запросить по действию пользователя
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }

    setTimeout(() => showNotification(message), NOTIFY_DELAY)
    return `Notification will appear in ${NOTIFY_DELAY / 1000}s`
  },
}

function addLog(...lines) {
  log.value.push(...lines)
  log.value = log.value.slice(-8) // последние 8 строк
}

function sendMessage(msg) {
  if (!channel.value) {
    addLog('Open a channel first to send a message')
    return
  }

  const time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  channel.value.messages.push({
    id: Date.now(),      // уникальный id
    author: nickname,
    text: msg,
    time,
    own: true,
  })
}

function submit() {
  const raw = text.value.trim()
  if (!raw) return

  try {
    if (raw.startsWith('/')) {
      const [first, ...args] = raw.slice(1).split(/\s+/)
      const name = first.toLowerCase()
      const cmd = commands[name]

      if (!cmd) {
        addLog(`> ${raw}`, `Unknown command: /${name}. Type /help`)
      } else {
        const answer = cmd(args)            // аргументы передаются здесь
        if (answer !== null) addLog(`> ${raw}`, answer)
      }
    } else {
      sendMessage(raw)
    }
  } catch (e) {
    console.error(e)
    addLog(`> ${raw}`, 'Command failed, see console')
  } finally {
    text.value = ''                         // поле очищается всегда
  }
}


import { isTyping } from '@/data/typing'

watch(text, (t) => {
  const v = t.trim()
  isTyping.value = v.length > 0 && !v.startsWith('/')
})

onBeforeUnmount(() => {
  isTyping.value = false
})

function showNotification(message) {
  const canSystem =
    'Notification' in window && Notification.permission === 'granted'

  if (AppVisibility.appVisible === false && canSystem) {
    // вкладка скрыта и есть разрешение: системное уведомление
    new Notification('New notification', { body: message })
  } else {
    // во всех остальных случаях: уведомление внутри приложения
    Notify.create({
      message,
      caption: 'Notification',
      icon: 'notifications',
      color: 'dark',
      textColor: 'white',
      position: 'top-right',
      timeout: 4000,
    })
  }
}
</script>

<style scoped>
.terminal {
  position: relative;          /* точка отсчёта для лога */
  background: #1d1d1d;
  color: #d0d0d0;
  font-family: monospace;
  padding: 8px 16px;
}

.log {
  position: absolute;          /* не участвует в расчёте высоты футера */
  left: 0;
  right: 0;
  bottom: 100%;                /* сразу над полем ввода */
  max-height: 140px;
  overflow-y: auto;
  padding: 8px 16px;
  background: rgba(29, 29, 29, 0.92);
  border-radius: 12px 12px 0 0;
}

.line {
  font-size: 13px;
  white-space: pre-wrap;
}

.prompt {
  color: #fdb927;
}
</style>