<!-- Distance is stored in meters, all other types converted as required -->

<script lang="ts">
   import { untrack } from 'svelte';
   import { get } from 'svelte/store';
   import { distType, meters, milesToMeters, type DistanceType,
      trackRecent, calculateResult, roundPlace, isRecent,
      metersToMiles} from './stores/stores';



   let {style = ''} = $props();
   // let priorDistType = $distType;
   
   // if $distValue is changed in store, re-calc displayed distance inside input
   let distance = $derived.by(() => {

      console.log('');
      console.log('Distance, $meters: ', $meters);
      
      if ($meters === null) {
         return null;
      } else if ($meters === 0) {
         return 0;
      }
      
      let distanceType: DistanceType = untrack(() => $distType);

      // return distance formatted per selected metric
      return formatDistance(distanceType);
   });

   // determine correct value per the given distance metric (i.e. km = meters / 1000)
   const formatDistance = (distanceType: DistanceType): number => {
      switch (distanceType) {
         case 'miles':
            return roundPlace(metersToMiles($meters), 2);
         case 'km':
            return roundPlace($meters / 1000, 2);
         case 'laps':
            return roundPlace($meters / 400, 2);
      }
   };

   const clearDistance = () => {
      distance = null;
   };

   // per distType, set appropriate value for $meters
   // w/ $meters, calculateResult as required
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

      console.log('');
      console.log('Distance, distanceChange()');
      console.log("Distance, distance = ", distance);
      console.log('$meters: ', $meters);
   };

   // metric is changed per select element
   const changeMetric = () => {
      console.log('\nDistance: changeMetric()');
      if (!isRecent('dist')) {
         // value is re-calculated, re-format output to correct type
         console.log('displayout dist in correct type');
         distance = roundPlace(formatDistance($distType), 2);
      } 
      else {
         // value is entered, re-calculate result based on new type
         console.log('calculating new result per dist type');
         distanceChange();
      }      
   }

</script>

   <h2>Distance</h2>

   <div class="container" style={style}>

      <div class="input-div">
         <input type="number" id="pace" bind:value={distance} oninput={distanceChange} />
         <button onclick={clearDistance} aria-label='clear pace value'>X</button>
      </div>
      
      <select name="pace" id="pace" bind:value={$distType} onchange={changeMetric}>
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