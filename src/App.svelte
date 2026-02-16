<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import appLogo from '/favicon.svg';
  import PWABadge from './lib/PWABadge.svelte'
  import Pace from './lib/Pace.svelte';
  import Distance from './lib/Distance.svelte';
  import Time from './lib/Time.svelte';
  // import { paceValue, paceType, distType, totalTime } from './lib/stores/stores';

  
</script>

  <!-- <h2 style='margin-bottom: 0px;'>Select pace metric</h2> -->
<!-- 
  <p>PaceNum: {$paceNum}</p>
  <p>Pace Unit: {$paceType}</p>
  <p>DistNum: {$distNum}</p>
  <p>Dist Unit: {$distType}</p> -->

  <!-- <input type="radio" name="pace" id="mph"><label for="mph">miles/hour</label>
  <input type="radio" name="pace" id="kph"><label for="kph">km/hour</label>
  <input type="radio" name="pace" id="mpm"><label for="mpm">min/mile</label> -->
<main>

  <h1>Pace Calculator</h1>
  
  <h2>Enter any two values to solve the third</h2>

  <Pace />

  <Distance />

  <Time />


</main>

<PWABadge /><!-- Handles period pwa updates -->

<style>

  main {
    text-align: left;
    width: 100%; padding: 0;
    display: flex;
    row-gap: 1em;
    flex-direction: column;
  }
  h1 {
    width: 80%; 
    margin: 0 auto;
    /* margin-bottom: 2.0em; */
    font-size: 1.6rem;
    text-align: center;
    /* color: black; */
  }

  h2 {
    width: 80%;
    font-size: 1.2rem;
    text-align: center;
    margin: 0 auto;
    /* margin-bottom: 1.2rem; */
    color: darkslategrey
  }


  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
  button {
    background-color: white;
  }

  button:hover {
    border: 0px;
    outline: 0px;
  }

  button:active {
    background-color: #EEE;
    border: 0;
    outline: 0;
  }

</style>
