import { writable, get } from "svelte/store";

type Key = 'pace' | 'dist' | 'time' | '';
let recentList:Key[] = ['', ''];

export function trackRecent(mostRecent: Key) {
   recentList.push(mostRecent);
   recentList.shift();
   console.log('trackRecent, saving ', mostRecent);
}

// Pace value and value unit type
export const paceNum = writable<number | null>(null);
export const paceType = writable<string>('mph');   //mph, kph, mpm (min/mile)


// distance and distance unit type
export const distNum = writable<number | null>();
export const distType = writable<string>('km');   // miles, km, laps(400m),
export const meters = writable<number>(0);

// total time in ms
export const totalTime = writable<number | null>();

// active component
export const priorActiveComp = writable<string>('time');
export const activeComponent = writable<string>('pace'); // pace ,dist, time


// save ActiveComponent to priorActiveComp, set new activeComponent
// export function setActiveComponent(newComponent: Key) {
//    if (get(activeComponent) !== newComponent) {
//       priorActiveComp.set(get(activeComponent));
//       activeComponent.set(newComponent);
//    }
// }

export function setCalculatedValue(newComponent: string | number) {
   // if we are calculating for 'dist
   if (recentList.indexOf('dist') === -1) {

   }
   // else if we are calculating for pace
   else if (recentList.indexOf('pace') === -1) {

   }
   // else we are calculating for time
   else {

   }
}

/*
* - Result is calculated using meters(distance), seconds(time), and meters/second(pace)
* - Use activeComponent and priorActiveComp to determine which component to solve for
*/
export function calculateResult() {
   // solve for 'pace'
   if (get(activeComponent) !== 'pace' && get(priorActiveComp) !== 'pace') {
      // const metersSecond = 
   } 
   // solve for dist
   else if (get(activeComponent) !== 'dist' && get(priorActiveComp) !== 'dist') {

   }
   // solve for time
   else {

   }
}

// DISTANCE CONVERSION FUNCTIONS .........................

// convert miles to meters
export function milesToMeters(miles: number): number {
   return miles * 1609.344;
}

// convert meters to miles
export function metersToMiles(meters: number): number {
   return meters / 1609.344;
}

export function metersToYards(meters: number): number {
   return meters / 0.9144;
}

export function yardsToMeters(yards: number): number {
   return yards * 0.9144;
}

// export function lapsToMeters(laps: number): number {
//    return laps * 400;
// }

export function metersToLaps(meters: number): number {
   return meters / 400;
}
