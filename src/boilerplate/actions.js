// Functions that return objects with a type, and optionally some payload(s).
// These are later dispatched from components or with put() in a saga.

import types from "./types";

const { BOILER_FOO, BOILER_BAR, BOILER_THING } = types;

// Takes no arguments.
const boilerFoo = () => ({
  type: BOILER_FOO
});

// Takes one argument and puts it into an item called "payload".
const boilerBar = argument => ({
  type: BOILER_BAR,
  payload: argument
});

// Takes two arguments and puts "argument" into "payload" and "thing" in
// "thing". SN: Placing an argument into an object without naming a key uses the
// argument name as key.
const boilerThing = (argument, thing) => ({
  type: BOILER_THING,
  payload: argument,
  thing
});

export default {
  boilerFoo,
  boilerBar,
  boilerThing
};
