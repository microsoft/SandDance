### Dev notes

The build of vega-deck.gl is meant to satisfy these constraints:

1. JavaScript runtime and bundlers

Specifically, the use of base classes in Vega and Deck.gl which were declared using the `class` keyword, subclasses in vega-deck.gl must also use the `class` keyword when extending these. 

2. TypeScript

We want to leverage TypeScript as much as possible.

3. ES6 module consumers

We want to provide ES6+ modules.

4. UMD module consumers

We want to provide browser-ready builds.

5. PowerBi

This adds an extra issue of not having UMD globals such as `vega` and `deck` available in the global scope. This means that `class`es may not `extend` during the JavaScript compilation phase, but must do so in the JavaScript execution phase where the base class can be brought into scope.

The net result is that this we use dynamic `class`es which `extend` a base class which is passed in during the execution phase. Doing so means that we need to trick the TypeScript compiler and provide a "shadow" class definition. Here is an outline of this technique:

```js

declare class Super {
}

//superRef is the reference implementation of Super, known at runtime
let superRef: typeof Super

//SubConstructor must be a function, so it may still be used with the 'new' keyword
function SubConstructor() {

  //PrivateSub must use the class keyword, if the Super used the class keyword
  class PrivateSub extends superRef {
    subProps: any;  //public property definitions are also defined in ShadowSub below
  }

  const instance = new PrivateSub() as Super;

  return instance;
}

//cast to any so the compiler will allow us to cast Sub as ShadowSub
export const Sub = SubConstructor as any as typeof ShadowSub;

//the exposed Sub declaration, which is not executable, but allows TypeScript to know the shape of Sub
export declare class ShadowSub extends Super {
  subProps: any;
}

```

To invoke, you can just
```js
var sub = new Sub();    //typed as ShadowSub
```
