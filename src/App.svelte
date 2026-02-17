<script lang="ts">
  import PWABadge from './lib/PWABadge.svelte'
  import Pace from './lib/Pace.svelte';
  import Distance from './lib/Distance.svelte';
  import Time from './lib/Time.svelte';
  
  const version = __APP_VERSION__;
  
</script>

<header></header>

<main>

  <h1>Pace Calculator</h1>
  
  <h2>Enter any two values to solve the third</h2>

  <Pace />

  <Distance />

  <Time />

</main>


<footer>v{version}</footer>


<PWABadge /><!-- Handles period pwa updates -->

<style>

  main {
    flex: 1;
    display: flex;
    /* align-items: center; */
    text-align: left;
    width: 100%; padding: 0;
    row-gap: 1em;
    flex-direction: column;
    /* border: 1px solid green; */
  }


  header, footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    text-align: end;
    flex-grow: 1;
  }

  h1 {
    width: 80%; 
    margin: 0 auto;
    font-size: 1.6rem;
    text-align: center;
    color: black;
  }

  h2 {
    width: 80%;
    font-size: 1.2rem;
    text-align: center;
    margin: 0 auto;
    color: black;
  }

</style>
