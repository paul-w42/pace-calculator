<script>
   import deleteIcon from '../assets/delete.svg';
   import { paceNum, paceType, activeComponent } from './stores/stores';

   let {style = ''} = $props();
   // let pace = $state();

   const clearPace = () => {
      $activeComponent = 'pace';
      $paceNum = null;
   };

</script>


   <div class="container" style={style}>

      <h2>Pace</h2>
      <button onclick={clearPace} aria-label='clear pace value'>
         <img src={deleteIcon} alt="delete pace value" />
      </button>

      <input type="number" id="pace" bind:value={$paceNum} />
      
      <select name="pace" id="pace" bind:value={$paceType}>
         <option value="mph">miles/hour</option>
         <option value="kph">km/hour</option>
         <option value="mpm">min/mile</option>
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