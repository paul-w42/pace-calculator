<script>
   import deleteIcon from '../assets/delete.svg';
   import { paceValue, paceType, paceDisp, trackRecent, activeComponent, calculateResult } from './stores/stores';

   let {style = ''} = $props();
   // let pace = $state();
   // let pace = $derived($paceNum);

   const clearPace = () => {
      // $activeComponent = 'pace';
      $paceValue = null;
      $paceDisp = null;
   };

   // save pace as meters/second
   const setPace = () => {
      // if pace is kph
      if ($paceType === 'kph' && $paceDisp) {
         $paceValue = $paceDisp * 1000 / 3600; // i.e. 1 kph =  3,600,000 m/s
      } 
      // else if pace is mph
      else if ($paceType === 'mph' && $paceDisp) {
         $paceValue = $paceDisp * 0.44704;
      } 
      // pace is min/mile
      else if ($paceDisp) {
         $paceValue = 1609.344 / ($paceDisp * 60);
      }
      
      console.log('$paceNum: ', $paceValue);
      trackRecent('pace');
      calculateResult();
   }

</script>


   <h2>Pace</h2>

   <div class="container" style={style}>

      <div class="input-div">
         <input type="number" id="pace" bind:value={$paceDisp} oninput={setPace} />
         <button onclick={clearPace} aria-label='clear pace value'>X</button>
      </div>
      
      <select name="pace" id="pace" bind:value={$paceType} onchange={setPace}>
         <option value="mph">miles/hour</option>
         <option value="kph">km/hour</option>
         <option value="mpm">min/mile</option>
      </select>
   
   </div>


<style>

   h2 {
      /* display: inline; */
      font-size: 1.1rem;
      margin: 0;
      margin: 1em 0 0;
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