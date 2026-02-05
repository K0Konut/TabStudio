<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getTabById } from '../services/tabLibrary'

const route = useRoute()
const zoom = ref(16)
const isAutoScrollEnabled = ref(false)
const isAutoScrollRunning = ref(false)
const isFocusMode = ref(false)
const autoScrollSpeed = ref(24)
const scrollContainer = ref(null)
let animationFrameId = null

const tab = computed(() => getTabById(String(route.params.id)))

watch(
  () => route.params.id,
  () => {
    zoom.value = 16
    stopAutoScroll()
    isFocusMode.value = false
  }
)

function stopAutoScroll() {
  isAutoScrollRunning.value = false
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

function startAutoScroll() {
  if (!scrollContainer.value) {
    return
  }

  isAutoScrollRunning.value = true
  let lastTime = performance.now()

  const tick = (time) => {
    if (!isAutoScrollRunning.value || !scrollContainer.value) {
      return
    }

    const deltaSeconds = (time - lastTime) / 1000
    lastTime = time
    const pixelsPerSecond = autoScrollSpeed.value
    scrollContainer.value.scrollTop += pixelsPerSecond * deltaSeconds

    animationFrameId = requestAnimationFrame(tick)
  }

  animationFrameId = requestAnimationFrame(tick)
}

function toggleAutoScroll() {
  if (!isAutoScrollEnabled.value) {
    stopAutoScroll()
    return
  }

  if (isAutoScrollRunning.value) {
    stopAutoScroll()
  } else {
    startAutoScroll()
  }
}

function toggleFocusMode() {
  isFocusMode.value = !isFocusMode.value
}

watch(isAutoScrollEnabled, (enabled) => {
  if (!enabled) {
    stopAutoScroll()
  }
})

onBeforeUnmount(() => {
  stopAutoScroll()
})
</script>

<template>
  <section class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="text-xs uppercase tracking-[0.3em] text-base-content/60">Lecteur</p>
        <h1 class="text-3xl font-semibold">{{ tab ? tab.title : 'Tablature introuvable' }}</h1>
        <p v-if="tab" class="text-sm text-base-content/70">{{ tab.artist }} · {{ tab.instrument }}</p>
      </div>
      <RouterLink class="btn btn-ghost" to="/library">Retour a la bibliotheque</RouterLink>
    </div>

    <div v-if="!tab" class="alert alert-warning">
      <span>Cette tablature n'existe pas dans la bibliotheque locale.</span>
    </div>

    <div v-else class="space-y-6">
      <div class="flex flex-wrap items-center gap-6">
        <div class="flex items-center gap-3">
          <label class="text-sm font-medium" for="zoom">Zoom</label>
          <input
            id="zoom"
            v-model.number="zoom"
            class="range range-primary"
            type="range"
            min="12"
            max="24"
            step="1"
          />
          <span class="text-sm text-base-content/70">{{ zoom }}px</span>
        </div>

        <div class="flex flex-wrap items-center gap-3 rounded-box tab-card px-3 py-2">
          <label class="flex items-center gap-2 text-sm font-medium">
            <input v-model="isAutoScrollEnabled" class="toggle toggle-primary" type="checkbox" />
            Auto-scroll
          </label>

          <div class="flex items-center gap-2">
            <label class="text-xs text-base-content/70" for="autoscroll-speed">Vitesse</label>
            <input
              id="autoscroll-speed"
              v-model.number="autoScrollSpeed"
              class="range range-xs range-primary"
              type="range"
              min="8"
              max="80"
              step="2"
              :disabled="!isAutoScrollEnabled"
            />
            <span class="text-xs text-base-content/70">{{ autoScrollSpeed }} px/s</span>
          </div>

          <button
            class="btn btn-xs btn-primary"
            type="button"
            :disabled="!isAutoScrollEnabled"
            @click="toggleAutoScroll"
          >
            {{ isAutoScrollRunning ? 'Pause' : 'Demarrer' }}
          </button>
        </div>

        <div class="flex flex-wrap gap-2 text-sm">
          <span class="badge badge-outline">{{ tab.difficulty }}</span>
          <span class="badge badge-ghost">{{ tab.tuning }}</span>
          <span class="badge badge-ghost">Capo: {{ tab.capo }}</span>
        </div>

        <button
          class="btn btn-outline btn-sm"
          type="button"
          :aria-pressed="isFocusMode"
          @click="toggleFocusMode"
        >
          {{ isFocusMode ? 'Quitter focus' : 'Mode focus' }}
        </button>
      </div>

      <div
        v-if="isFocusMode"
        class="fixed inset-0 z-40 bg-base-100/70 backdrop-blur"
        role="button"
        aria-label="Quitter le mode focus"
        tabindex="0"
        @click="toggleFocusMode"
        @keydown.enter.prevent="toggleFocusMode"
        @keydown.space.prevent="toggleFocusMode"
      ></div>

      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-base-content/60">
          <span class="inline-flex h-2 w-2 rounded-full bg-primary"></span>
          Console
        </div>
        <div class="text-xs text-base-content/60">Lecture optimisee pour les passages longs</div>
      </div>

      <div
        ref="scrollContainer"
        :class="[
          'overflow-y-auto rounded-box tab-reader p-4 transition-all',
          isFocusMode ? 'fixed inset-6 z-50 max-h-none h-[calc(100vh-3rem)]' : 'max-h-[60vh]',
        ]"
      >
        <pre
          class="tab-mono overflow-x-auto whitespace-pre leading-relaxed"
          :style="{ fontSize: `${zoom}px` }"
        >{{ tab.content }}</pre>
      </div>
    </div>
  </section>
</template>
