import { writable, get } from "svelte/store";

type Key = 'pace' | 'dist' | 'time' | '';
let recentList:Key[] = ['', ''];

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


// logs most recently changed item if not already in list
export function trackRecent(mostRecent: Key) {
   // guard against adding mostRecent to the list twice
   if (recentList.indexOf(mostRecent) === -1) {
      recentList.push(mostRecent);
      recentList.shift();
   }
}

// Calculate the required result
export function calculateResult() {
   console.log('recentList: ', recentList);

   // if we are calculating for 'dist
   if (recentList.indexOf('dist') === -1) {
      // we have meters/second and time in seconds
      // distType = miles, km, laps
      const p = get(paceValue);
      const t = get(totalTime);
      let distance = 0;
      if (p != null && t != null) {
         let distance = p * t;
      }
      if (get(distType) === 'miles') {
         meters.set(roundPlace(metersToMiles(distance), 1));
      } else if (get(distType) === 'km') {
         meters.set(roundPlace(distance / 1000, 1));
      } else if (get(distType) === 'laps') {
         meters.set(roundPlace(distance / 400, 1)); // round to single decimal place
      }      

      console.log('calculateResult(): distance set to ' + get(distValue) + ' meters');
   }
   // else if we are calculating for pace
   else if (recentList.indexOf('pace') === -1) {
      const m = get(meters);
      const t = get(totalTime);

      if (m != null && t != null && t !== 0) {
         paceValue.set(roundPlace(m / t, 2));
         console.log('calculateResult(): paceValue set: ' + get(paceValue) + ' m/s');
      }
      
   }
   // else we are calculating for time
   else if (recentList.indexOf('time') == -1) {
      // console.log('calculating time ... ');
      // we have pace in m/s and distance in m
      // i.e. 1 m/2 for 100 meters = 100 seconds
      const m = get(meters);
      const p = paceValue ? get(paceValue) : null;

      if (m != null && p != null) {
         totalTime.set(Math.round(m / p));
      }

      console.log('calculateResult(): totalTime is ' + get(totalTime) + ' seconds');
   }
   // 
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


// Pace calculation functions
// return miles per hour from m/s
function paceMph() {
   const pace = get(paceValue);

   if (pace !== null && pace !== 0) {
      return metersToMiles(pace * 3600)   // meters / second converted to miles/second, then converted to mph
   } else {
      return 0;
   }
}

// return kilometers per hour from m/s
function paceKph() {

}

// return minutes per mile from m/s
function paceMpm() {

}

// return a number rounded to a particular place, i.e. 33.33333 becomes 33.3
export function roundPlace(value: number, place: number) {
   const exp = Math.pow(10, place);    // i.e. place of 2 would return 100
   return (Math.round(value * exp) / exp);
}