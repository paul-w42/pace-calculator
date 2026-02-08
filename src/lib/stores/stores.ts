import { writable, get } from "svelte/store";

type Key = 'pace' | 'dist' | 'time' | '';
let recentList:Key[] = ['', ''];

export function trackRecent(mostRecent: Key) {
   if (recentList.indexOf(mostRecent) === -1) {
      recentList.push(mostRecent);
      recentList.shift();
   }
   // console.log('trackRecent, saving ', mostRecent);
}

// Pace value and value unit type
export const paceDisp = writable<number | null>(null);
export const paceType = writable<string>('mph');   //mph, kph, mpm (min/mile)
export const paceValue = writable<number | null>(null);


// distance and distance unit type
export const distDisp = writable<number | null>();
export const distValue = writable<number | null>();
export const distType = writable<string>('km');   // miles, km, laps(400m),
export const meters = writable<number>(0);

// total time in seconds (ms?)
export const hrsDisp = writable<number | null>();
export const minsDisp = writable<number | null>();
export const secsDisp = writable<number | null>();
export const totalTime = writable<number | null>();   // seconds

// active component
export const priorActiveComp = writable<string>('time');
export const activeComponent = writable<string>('pace'); // pace ,dist, time

export function calculateResult() {
   console.log('recentList: ', recentList);

   // if we are calculating for 'dist
   if (recentList.indexOf('dist') === -1) {
      console.log('calculating distance ... ');
   }
   // else if we are calculating for pace
   else if (recentList.indexOf('pace') === -1) {
      console.log('calculating pace ... ');
   }
   // else we are calculating for time
   else {
      console.log('calculating time ... ');
      // we have pace in m/s and distance in m
      // i.e. 1 m/2 for 100 meters = 100 seconds
      const m = get(meters);
      const p = paceValue ? get(paceValue) : null;

      if (m != null && p != null) {
         totalTime.set(Math.round(m / p));
      }
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
