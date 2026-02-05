<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content" data-theme="light">
    <div class="navbar bg-base-200">
      <div class="mx-auto flex w-full max-w-5xl items-center px-4">
        <div class="flex flex-1 items-center gap-2">
          <div class="dropdown">
            <button
              class="btn btn-ghost lg:hidden"
              type="button"
              tabindex="0"
              aria-label="Ouvrir le menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <ul
              tabindex="0"
              class="menu dropdown-content mt-3 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow"
            >
              <li><RouterLink to="/">Accueil</RouterLink></li>
              <li><RouterLink to="/library">Bibliotheque</RouterLink></li>
              <li><RouterLink to="/about">A propos</RouterLink></li>
            </ul>
          </div>
          <RouterLink class="btn btn-ghost text-xl" to="/">TabStudio</RouterLink>
        </div>
        <div class="hidden items-center gap-2 lg:flex">
          <RouterLink class="btn btn-ghost" to="/">Accueil</RouterLink>
          <RouterLink class="btn btn-ghost" to="/library">Bibliotheque</RouterLink>
          <RouterLink class="btn btn-ghost" to="/about">A propos</RouterLink>
        </div>
      </div>
    </div>

    <main class="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>
