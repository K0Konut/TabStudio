<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getTabs } from '../services/tabLibrary'

const tabs = getTabs()
const totalTabs = tabs.length
const instruments = computed(() => new Set(tabs.map((tab) => tab.instrument)).size)
const difficulties = computed(() => new Set(tabs.map((tab) => tab.difficulty)).size)
const featuredTab = tabs[0]
</script>

<template>
  <section class="space-y-10">
    <div class="card bg-base-200 shadow-sm">
      <div class="card-body gap-6">
        <div class="space-y-3">
          <p class="text-sm uppercase tracking-widest text-base-content/60">Accueil</p>
          <h1 class="text-4xl font-semibold">TabStudio, lecteur de tablatures simple et rapide.</h1>
          <p class="max-w-2xl text-base-content/70">
            Centralise tes tablatures locales, filtre par instrument, et ouvre un lecteur lisible pour
            jouer sans friction.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <RouterLink class="btn btn-primary" to="/library">Voir la bibliotheque</RouterLink>
          <RouterLink class="btn btn-ghost" to="/about">En savoir plus</RouterLink>
        </div>
        <div class="grid gap-4 sm:grid-cols-3">
          <div class="rounded-box border border-base-300 bg-base-100 p-4">
            <p class="text-sm text-base-content/60">Tabs disponibles</p>
            <p class="text-2xl font-semibold">{{ totalTabs }}</p>
          </div>
          <div class="rounded-box border border-base-300 bg-base-100 p-4">
            <p class="text-sm text-base-content/60">Instruments</p>
            <p class="text-2xl font-semibold">{{ instruments }}</p>
          </div>
          <div class="rounded-box border border-base-300 bg-base-100 p-4">
            <p class="text-sm text-base-content/60">Difficultes</p>
            <p class="text-2xl font-semibold">{{ difficulties }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <div class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">Recherche rapide</h2>
          <p class="text-sm text-base-content/70">
            Accede a la bibliotheque et filtre par instrument, niveau ou style en quelques clics.
          </p>
          <div class="card-actions justify-end">
            <RouterLink class="btn btn-outline" to="/library">Explorer</RouterLink>
          </div>
        </div>
      </div>
      <div class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">Lecteur confortable</h2>
          <p class="text-sm text-base-content/70">
            Un affichage monospace, du zoom, et les informations essentielles pour jouer serein.
          </p>
          <div class="card-actions justify-end">
            <RouterLink v-if="featuredTab" class="btn btn-outline" :to="{ name: 'reader', params: { id: featuredTab.id } }">
              Ouvrir un exemple
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">Import local</h2>
          <p class="text-sm text-base-content/70">
            Importe tes JSON et garde tes tablatures disponibles hors-ligne.
          </p>
          <div class="card-actions justify-end">
            <RouterLink class="btn btn-outline" to="/library">Importer</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
