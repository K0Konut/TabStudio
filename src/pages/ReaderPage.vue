<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getTabById } from '../services/tabLibrary'

const route = useRoute()
const zoom = ref(16)
const isAutoScrollEnabled = ref(false)
const isAutoScrollRunning = ref(false)
const autoScrollSpeed = ref(24)
const scrollContainer = ref(null)
let animationFrameId = null

const tab = computed(() => getTabById(String(route.params.id)))

watch(
  () => route.params.id,
  () => {
    zoom.value = 16
    stopAutoScroll()
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
        <p class="text-sm uppercase tracking-widest text-base-content/60">Lecteur</p>
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

        <div class="flex flex-wrap items-center gap-3 rounded-box border border-base-300 bg-base-100 px-3 py-2">
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
      </div>

      <div ref="scrollContainer" class="max-h-[60vh] overflow-y-auto rounded-box border border-base-300 bg-base-200 p-4">
        <pre
          class="overflow-x-auto whitespace-pre font-mono leading-relaxed"
          :style="{ fontSize: `${zoom}px` }"
        >{{ tab.content }}</pre>
      </div>
    </div>
  </section>
</template>
