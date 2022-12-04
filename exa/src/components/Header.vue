<template>

  <div class="content mt-6">
    <div class="columns">
      <div class="column is-two-thirds">
        <RouterLink to="/">
          <h1 class="h1">👋🏾 Hey Piano!</h1>
        </RouterLink>
      </div>
      <div class="column is-one-third" style="text-align:right">

        <button class="button is-light mr-2">🚀 Stats</button>

        <RouterLink to="/train">
          <button class=" button is-primary">Train your model!</button>
        </RouterLink>

      </div>
    </div>
  </div>
</template>
