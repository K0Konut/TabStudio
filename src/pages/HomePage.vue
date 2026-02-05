<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getTabs } from '../services/tabLibrary'

const tabs = getTabs()
const totalTabs = tabs.length
const instruments = computed(() => new Set(tabs.map((tab) => tab.instrument)).size)
const difficulties = computed(() => new Set(tabs.map((tab) => tab.difficulty)).size)
const featuredTab = tabs[0]
const quickAccessTabs = tabs.slice(0, 3)
const spotlightTabs = tabs.slice(0, 4)
</script>

<template>
  <section class="space-y-10">
    <div class="card tab-surface">
      <div class="card-body gap-8">
        <div class="space-y-4">
          <p class="text-xs uppercase tracking-[0.3em] text-base-content/60">Accueil</p>
          <h1 class="text-4xl font-semibold leading-tight sm:text-5xl">
            TabStudio, le lecteur de tablatures nocturne et fluide.
          </h1>
          <p class="max-w-2xl text-base-content/70">
            Centralise tes tablatures locales, filtre par instrument et ouvre un lecteur ultra lisible,
            sans friction.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <RouterLink class="btn btn-primary shadow-lg shadow-primary/20" to="/library">
            Voir la bibliotheque
          </RouterLink>
          <RouterLink class="btn btn-ghost" to="/about">En savoir plus</RouterLink>
        </div>
        <div class="grid gap-4 sm:grid-cols-3">
          <div class="rounded-box tab-card p-4 transition hover:-translate-y-0.5 hover:border-primary/50">
            <p class="text-sm text-base-content/60">Tabs disponibles</p>
            <p class="text-2xl font-semibold">{{ totalTabs }}</p>
          </div>
          <div class="rounded-box tab-card p-4 transition hover:-translate-y-0.5 hover:border-primary/50">
            <p class="text-sm text-base-content/60">Instruments</p>
            <p class="text-2xl font-semibold">{{ instruments }}</p>
          </div>
          <div class="rounded-box tab-card p-4 transition hover:-translate-y-0.5 hover:border-primary/50">
            <p class="text-sm text-base-content/60">Difficultes</p>
            <p class="text-2xl font-semibold">{{ difficulties }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <div class="card tab-card transition hover:-translate-y-0.5 hover:border-primary/40">
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
      <div class="card tab-card transition hover:-translate-y-0.5 hover:border-primary/40">
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
      <div class="card tab-card transition hover:-translate-y-0.5 hover:border-primary/40">
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

    <div class="grid gap-6 lg:grid-cols-2">
      <div class="card tab-card">
        <div class="card-body">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="card-title">Acces rapide</h2>
              <p class="text-sm text-base-content/70">
                Ouvre une tablature en un clic pour tester le lecteur.
              </p>
            </div>
            <RouterLink class="btn btn-ghost btn-sm" to="/library">Tout voir</RouterLink>
          </div>

          <div class="grid gap-3 sm:grid-cols-3">
            <RouterLink
              v-for="tab in quickAccessTabs"
              :key="tab.id"
              class="rounded-box tab-card p-3 transition hover:-translate-y-0.5 hover:border-primary/60"
              :to="{ name: 'reader', params: { id: tab.id } }"
            >
              <p class="text-sm font-semibold">{{ tab.title }}</p>
              <p class="text-xs text-base-content/60">{{ tab.artist }}</p>
              <span class="badge badge-outline badge-sm mt-2">{{ tab.instrument }}</span>
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="card tab-card">
        <div class="card-body">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="card-title">Selection du moment</h2>
              <p class="text-sm text-base-content/70">
                Quelques tablatures proposees pour varier les instruments et niveaux.
              </p>
            </div>
            <RouterLink class="btn btn-ghost btn-sm" to="/library">Explorer</RouterLink>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <article
              v-for="tab in spotlightTabs"
              :key="tab.id"
              class="rounded-box tab-card p-4 transition hover:-translate-y-0.5 hover:border-primary/60"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-sm font-semibold">{{ tab.title }}</p>
                  <p class="text-xs text-base-content/60">{{ tab.artist }}</p>
                </div>
                <span class="badge badge-outline badge-sm">{{ tab.difficulty }}</span>
              </div>
              <p class="mt-2 text-xs text-base-content/70">{{ tab.instrument }} · {{ tab.tuning }}</p>
              <RouterLink
                class="btn btn-xs btn-primary mt-3"
                :to="{ name: 'reader', params: { id: tab.id } }"
              >
                Ouvrir
              </RouterLink>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
