<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen text-base-content" data-theme="tabstudio">
    <div class="navbar sticky top-0 z-20 border-b border-base-300/60 bg-base-200/70 backdrop-blur">
      <div class="mx-auto flex w-full max-w-6xl items-center px-4">
        <div class="flex flex-1 items-center gap-2">
          <div class="dropdown dropdown-bottom">
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
              class="menu dropdown-content z-50 mt-3 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow"
            >
              <li><RouterLink to="/" active-class="active">Accueil</RouterLink></li>
              <li><RouterLink to="/library" active-class="active">Bibliotheque</RouterLink></li>
              <li><RouterLink to="/about" active-class="active">A propos</RouterLink></li>
            </ul>
          </div>
          <RouterLink class="btn btn-ghost gap-3 text-xl tracking-tight" to="/" active-class="btn-active">
            <span class="tab-logo">TS</span>
            <span class="flex flex-col text-left leading-tight">
              <span>TabStudio</span>
              <span class="text-xs uppercase tracking-[0.3em] text-base-content/60">Night Reader</span>
            </span>
          </RouterLink>
        </div>
        <div class="hidden items-center gap-2 lg:flex">
          <RouterLink class="btn btn-ghost" to="/" active-class="btn-active">Accueil</RouterLink>
          <RouterLink class="btn btn-ghost" to="/library" active-class="btn-active">
            Bibliotheque
          </RouterLink>
          <RouterLink class="btn btn-ghost" to="/about" active-class="btn-active">
            A propos
          </RouterLink>
        </div>
      </div>
    </div>

    <main class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>
