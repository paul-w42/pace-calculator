<!-- Distance is stored in meters, all other types converted as required -->

<script>
   import { get } from 'svelte/store';
   import deleteIcon from '../assets/delete.svg';
   import { distValue, distType, distDisp, meters, milesToMeters, 
      trackRecent, calculateResult, 
      metersToMiles} from './stores/stores';

   let {style = ''} = $props();
   
   // if $distValue is changed in store, re-calc displayed distance inside input
   let distance = $derived.by(() => {

      if ($distValue === null || $distValue === 0) {
         return null;
      }
      
      if ($distType === 'miles') {
         return metersToMiles($distValue);
      } else if ($distType === 'km') {
         return $distValue / 1000;
      } else if ($distType === 'laps') {
         return $distValue / 400;
      }

   });

   const clearDistance = () => {
      distance = null;
   };

   const distanceChange = () => {

      // distType === 'miles', 'km', or 'laps'
      if (distance) {
         if ($distType === 'miles') {
            $meters = milesToMeters(distance);
         } else if ($distType === 'km') {
            $meters = distance * 1000;
         } else if ($distType === 'laps') {
            $meters = distance * 400;
         }
      
         console.log('$meters: ', $meters);
         trackRecent('dist');
         
         
         calculateResult();

      }
   }

</script>

   <h2>Distance</h2>

   <div class="container" style={style}>

      <div class="input-div">
         <input type="number" id="pace" bind:value={distance} oninput={distanceChange} />
         <button onclick={clearDistance} aria-label='clear pace value'>X</button>
      </div>
      
      <select name="pace" id="pace" bind:value={$distType} onchange={distanceChange}>
         <option value="miles">miles</option>
         <option value="km">km</option>
         <option value="laps">laps(400m)</option>
      </select>
   
   </div>



<style>

   h2 {
      display: inline;
      font-size: 1.1rem;
      margin: 1em 0 0;
      /* flex-grow: 1;
      flex-basis: 100%; */
   }

   div.container {
      display: flex;
      column-gap: 3px;
      width: 100%;
   }

   div.input-div {
      width: 100%;
      position: relative;
      flex-grow: 1;
   }

   div.input-div input {
      width: 100%;
      padding-right: 1.8em;
      border: 1px solid #86d486;
      /* border-radius: 5px; */
      box-sizing: border-box;
   }

   div.input-div button {
      position: absolute;
      right: 0;
      top: 50%;
      margin-right: -4px;
      transform: translateY(-50%);
      background: none;
      cursor: pointer;
      font-size: 15px;
      /* font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; */
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1;
      color: #8f8f8f;
   }

   div.container input:hover {
      box-shadow: none;
      outline: none;
      background-color: #fffeeb;
   }

   div.container select {
      flex-grow: 0;
      flex-basis: 15em;
      background-color: #fffeeb;
   }

   div.container select:hover {
      box-shadow: none;
      outline: none;
   }
</style>