<script>
   import deleteIcon from '../assets/delete-grey.svg';
   import { totalTime, trackRecent, activeComponent, calculateResult } from './stores/stores';

   let {style = ''} = $props();
   // let hours = $state();
   let hours = $derived.by(() => {
      if ($totalTime) {
         return Math.floor($totalTime / 3600);
      } else {
         return null;
      }
   });

   let mins = $derived.by(() => {
      if ($totalTime) {
         let hrs = Math.floor($totalTime / 3600); 
         // subtract hours from totalTime, determine minutes remaining
         return Math.floor(($totalTime - (hrs * 3600)) / 60)
      }
      else {
         return null;
      }
   });

   let secs = $derived.by(() => {
      if ($totalTime) {
         const mins = Math.floor($totalTime / 60);
         console.log('minutes: ', mins);
         console.log('$totalTime: ', $totalTime);
         console.log('remaining seconds: ', $totalTime - Math.floor($totalTime/60) * 60);
         return Math.floor($totalTime - Math.floor($totalTime/60) * 60);
      } else {
         return null;
      }
   });

   const timeChange = () => {
      // $activeComponent = 'time';
      const h = hours ?? 0;
      const m = mins ?? 0;
      const s = secs ?? 0;

      $totalTime = (h * 3600 + m * 60 + s);  // keeping time in seconds, not ms
      console.log('$totalTime: ', $totalTime);
      trackRecent('time');
      calculateResult();
   }

   const clearTime = () => {
      hours = null;
      mins = null;
      secs = null;
      timeChange();
   }

</script>

   <h2>Time</h2>      

   <div class="grid">
         <span>hrs</span>
         <span>min</span>
         <span>sec</span>
         <span></span>

         <input type="number" id="hours" bind:value={hours} oninput={timeChange} />
         <input type="number" id="mins" bind:value={mins} oninput={timeChange} />
         <input type="number" id="secs" bind:value={secs} oninput={timeChange} />
         <button onclick={clearTime} aria-label='clear time value' >
            <img src={deleteIcon} alt='clear time value'/>
         </button>
   </div>

<style>

   h2 {
      font-size: 1.1rem;
      flex-grow: 1;
      flex-basis: 50%;
      margin: 1em 0 0;
   }

   div.grid {
      display: grid;
      grid-template-columns: repeat(4, max-content);
      grid-template-rows: repeat(2, auto);
      column-gap: 0.4rem;
      justify-items: end;
      margin-left: auto;
      width: max-content;
      /* margin-top: 0; */
   }

   div.grid > span {
      width: 100%;
   }

   div.grid button {
      background: none;
      margin: 0; padding: 0;
   }


   input {
      display: inline;
      width: 3em; margin: 0px;
      border: 1px solid #86d486;
      border-radius: 4px;
   }

   input:hover {
      box-shadow: none;
      outline: none;
      background-color: #fffeeb;
   }

   select {
      flex-grow: 0;
      background-color: #fffeeb;
   }

   select:hover {
      box-shadow: none;
      outline: none;
   }

</style>