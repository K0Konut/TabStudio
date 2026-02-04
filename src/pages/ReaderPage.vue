<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getTabById } from '../services/tabLibrary'

const route = useRoute()
const zoom = ref(16)

const tab = computed(() => getTabById(String(route.params.id)))

watch(
  () => route.params.id,
  () => {
    zoom.value = 16
  }
)
</script>

<template>
  <section class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="text-sm uppercase tracking-widest text-base-content/60">Lecteur</p>
        <h1 class="text-3xl font-semibold">{{ tab ? tab.title : 'Tablature introuvable' }}</h1>
        <p v-if="tab" class="text-sm text-base-content/70">{{ tab.artist }} · {{ tab.instrument }}</p>
      </div>
      <RouterLink class="btn btn-ghost" to="/">Retour a la bibliotheque</RouterLink>
    </div>

    <div v-if="!tab" class="alert alert-warning">
      <span>Cette tablature n'existe pas dans la bibliotheque locale.</span>
    </div>

    <div v-else class="space-y-6">
      <div class="flex flex-wrap items-center gap-4">
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
        <div class="flex flex-wrap gap-2 text-sm">
          <span class="badge badge-outline">{{ tab.difficulty }}</span>
          <span class="badge badge-ghost">{{ tab.tuning }}</span>
          <span class="badge badge-ghost">Capo: {{ tab.capo }}</span>
        </div>
      </div>

      <div class="rounded-box border border-base-300 bg-base-200 p-4">
        <pre
          class="overflow-x-auto whitespace-pre font-mono leading-relaxed"
          :style="{ fontSize: `${zoom}px` }"
        >{{ tab.content }}</pre>
      </div>
    </div>
  </section>
</template>
