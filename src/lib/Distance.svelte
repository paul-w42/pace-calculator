<!-- Distance is stored in meters, all other types converted as required -->

<script>
   import deleteIcon from '../assets/delete.svg';
   import { distNum, distType, meters, milesToMeters, activeComponent } from './stores/stores';

   let {style = ''} = $props();

   const clearDistance = () => {
      $activeComponent = 'dist';
      $distNum = null;
   };

   const distanceChange = () => {
      // distType === 'miles', 'km', or 'laps'
      if ($distNum) {
         if ($distType === 'miles') {
            $meters = milesToMeters($distNum);
         } else if ($distType === 'km') {
            $meters = $distNum * 1000;
         } else if ($distType === 'laps') {
            $meters = $distNum * 400;
         }
      }
   }

</script>


   <div class="container" style={style}>

      <h2>Distance</h2>

      <button onclick={clearDistance} aria-label='clear distance value'>
         <img src={deleteIcon} alt="delete distance value" />
      </button>

      <input type="number" id="dist" bind:value={$distNum} onkeyup={distanceChange} />

      <select name="dist" id="dist" bind:value={$distType}>
         <option value="miles">miles</option>
         <option value="km">km</option>
         <option value="laps">laps(400m)</option>
      </select>
   
   </div>


<style>

   div.container {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
   }

   h2 {
      display: inline;
      font-size: 1.1rem;
      flex-grow: 1;
      flex-basis: 50%;
   }

   button {
      flex-grow: 0;
      justify-content: flex-end;
      /* border: 1px solid gray; */
      background-color: #d1ffc4;
      padding-right: 0px;
      border: 0px;
   }

   input {
      flex-grow: 1;
      flex-basis: 50%;

      border-top: 1px solid #86d486;
      border-left: 1px solid #86d486;
      border-bottom: 1px solid #86d486;
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