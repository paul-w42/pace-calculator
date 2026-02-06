<script>
   import deleteIcon from '../assets/delete.svg';
   import { totalTime, activeComponent } from './stores/stores';

   let {style = ''} = $props();

   const clearDistance = () => {
      $activeComponent = 'dist';
      $totalTime = null;
   };

   let hours = $state();
   let mins = $state();
   let secs = $state();

   const timeChange = () => {
      // totalTime is in ms
      $activeComponent = 'dist';
      $totalTime = ((hours * 3600 + mins * 60 + secs) * 1000); // *1000 === time in ms
   }

</script>

   <h2>Time</h2>      

   <div class="grid">
         <span>hrs</span>
         <span>min</span>
         <span>sec</span>

         <input type="number" id="hours" bind:value={$hours} onchange={timeChange} />
         <input type="number" id="mins" bind:value={$mins} onchange={timeChange} />
         <input type="number" id="secs" bind:value={$secs} onchange={timeChange} />
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
      grid-template-columns: repeat(3, max-content);
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