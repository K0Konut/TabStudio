<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content" data-theme="light">
    <div class="navbar bg-base-200">
      <div class="mx-auto flex w-full max-w-5xl items-center px-4">
        <div class="flex-1">
          <RouterLink class="btn btn-ghost text-xl" to="/">TabStudio</RouterLink>
        </div>
        <div class="flex items-center gap-2">
          <RouterLink class="btn btn-ghost" to="/">Accueil</RouterLink>
          <RouterLink class="btn btn-ghost" to="/library">Bibliotheque</RouterLink>
          <RouterLink class="btn btn-ghost" to="/about">A propos</RouterLink>
        </div>
      </div>
    </div>

    <main class="mx-auto w-full max-w-5xl px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>
