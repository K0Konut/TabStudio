<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="space-y-8">
    <div class="space-y-2">
      <p class="text-xs uppercase tracking-[0.3em] text-base-content/60">A propos</p>
      <h1 class="text-3xl font-semibold">Pourquoi TabStudio ?</h1>
      <p class="max-w-2xl text-base-content/70">
        TabStudio est un lecteur de tablatures concu pour une utilisation locale : rapide, lisible,
        sans surcharge. L'objectif du MVP est de prouver la navigation et la lecture, avec un format
        de donnees stable.
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <div class="card tab-card">
        <div class="card-body">
          <h2 class="card-title">Fonctionnalites MVP</h2>
          <ul class="list-disc space-y-2 pl-4 text-sm text-base-content/70">
            <li>Bibliotheque locale avec recherche et filtres simples.</li>
            <li>Lecteur monospace avec zoom, autoscroll et informations d'accordage.</li>
            <li>Import JSON pour ajouter des tablatures en local.</li>
          </ul>
        </div>
      </div>
      <div class="card tab-card">
        <div class="card-body">
          <h2 class="card-title">Format de donnees</h2>
          <p class="text-sm text-base-content/70">
            Chaque tablature contient : `id`, `title`, `artist`, `instrument`, `tuning`, `capo`,
            `difficulty`, `tags`, `content` et optionnellement `source`.
          </p>
          <p class="text-sm text-base-content/70">
            Les donnees importees sont conservees dans le stockage local du navigateur.
          </p>
        </div>
      </div>
    </div>

    <div class="card tab-card">
      <div class="card-body">
        <h2 class="card-title">Prochaines evolutions</h2>
        <div class="flex flex-wrap gap-2 text-sm">
          <span class="badge badge-outline">Favoris</span>
          <span class="badge badge-outline">Transpose</span>
          <span class="badge badge-outline">Sync multi-appareils</span>
        </div>
        <div class="card-actions justify-end">
          <RouterLink class="btn btn-primary shadow-lg shadow-primary/20" to="/library">
            Ouvrir la bibliotheque
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
