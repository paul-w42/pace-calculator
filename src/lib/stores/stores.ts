import { writable } from "svelte/store";

// Pace value and value unit type
export const paceNum = writable<number>();
export const paceType = writable<string>('mph');   //mph, kph, mpm (min/mile)


// distance and distance unit type
export const distNum = writable<number | null>();
export const distType = writable<string>('km');   // miles, km, laps(400m),
export const meters = writable<number>();

// total time in ms
export const totalTime = writable<number>();

// active component
export const priorActiveComp = writable<string>('time');
export const activeComponent = writable<string>('pace'); // pace ,dist, time


// save ActiveComponent to priorActiveComp, set new activeComponent
export function setActiveComponent(newComponent: string) {
   priorActiveComp.set(activeComponent);
   activeComponent.set(newComponent);
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

export function lapsToMeters(laps: number): number {
   return laps * 400;
}

export function metersToLaps(meters: number): number {
   return meters / 400;
}
