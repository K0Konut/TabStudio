<script setup>
import { getTabs } from '../services/tabLibrary'

const tabs = getTabs()
</script>

<template>
  <section class="space-y-6">
    <div class="space-y-2">
      <p class="text-sm uppercase tracking-widest text-base-content/60">Bibliotheque</p>
      <h1 class="text-3xl font-semibold">Tablatures</h1>
      <p class="max-w-2xl text-base-content/70">
        Selection locale pour commencer rapidement. Clique sur une tablature pour ouvrir le lecteur.
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <article v-for="tab in tabs" :key="tab.id" class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="card-title">{{ tab.title }}</h2>
              <p class="text-sm text-base-content/70">{{ tab.artist }}</p>
            </div>
            <span class="badge badge-outline">{{ tab.instrument }}</span>
          </div>

          <div class="flex flex-wrap gap-2 text-sm">
            <span class="badge badge-ghost">{{ tab.difficulty }}</span>
            <span v-for="tag in tab.tags" :key="tag" class="badge badge-ghost">{{ tag }}</span>
          </div>

          <div class="text-sm text-base-content/70">
            <p>Tuning : {{ tab.tuning }}</p>
            <p>Capo : {{ tab.capo }}</p>
          </div>

          <div class="card-actions justify-end">
            <RouterLink class="btn btn-primary" :to="{ name: 'reader', params: { id: tab.id } }">
              Lire
            </RouterLink>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
