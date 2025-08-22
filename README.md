# solid-anime-js

A lightweight helper library to seamlessly integrate the powerful [anime.js](https://animejs.com/) animation library with your [SolidJS](https://www.solidjs.com/) applications. This package provides a set of components to manage animation scopes and simplify creating animations in a declarative SolidJS environment.

## Installation


~~npm install @thesilph/solid-anime-js~~
It doesn't work on npm, I don't wanna fight bundlers also right now!

Just follow the examples

## Core Components

This library exports three main helper components from [solid-animejs.js](solid-animejs.js):

### 1. `Animator`

This is the base component that creates an `anime.js` scope. It wraps your components and provides the animation scope via an `onScopeReady` callback, automatically handling cleanup when the component is unmounted.

*   **Source:** [`animator/animator.tsx`](animator/animator.tsx)
*   **Props:**
    *   `children`: The elements to be rendered within the animation scope.
    *   `onScopeReady`: A callback function that receives the `anime.js` scope once it's created.

### 2. `FunctionAnimator`

A wrapper around [`Animator`](animator/animator.tsx) that simplifies adding multiple named animation functions to the scope.

*   **Source:** [`animator/functionanimator.tsx`](animator/functionanimator.tsx)
*   **Props:**
    *   `children`: The elements to be rendered.
    *   `animationFuncs`: An array of tuples, where each tuple is `[string, ScopeMethod]`, representing the function name and the animation function itself.
    *   `setSignal`: A SolidJS `Setter` to store the created scope.

### 3. `SingleFunctionAnimator`

A simplified version of [`FunctionAnimator`](animator/functionanimator.tsx) for adding just one animation function to the scope.

*   **Source:** [`animator/singlefunctionanimator.tsx`](animator/singlefunctionanimator.tsx)
*   **Props:**
    *   `children`: The elements to be rendered.
    *   `animationFunc`: The `ScopeMethod` (animation function) to add to the scope.
    *   `funcName`: An optional name for the animation function (defaults to `'animation'`).
    *   `setSignal`: A SolidJS `Setter` to store the created scope.

## Usage Example

Here is an example of how to use the base [`Animator`](animator/animator.tsx) component, based on [`examples/HappySpinner.tsx`](examples/HappySpinner.tsx).

This component will rotate a "G" logo 360 degrees each time it's clicked.

````tsx
// filepath: examples/HappySpinner.tsx
import { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { animate, Scope } from 'animejs';
import Animator from '../animator/animator';

const App: Component = () => {
  
  const [rotations, setRotations] = createSignal<number>(0);
  const [animationScope, setAnimationScope] = createSignal<Scope>();

  // 1. Get the scope from the Animator component when it's ready
  const handleScopeReady = (scope: Scope) => {
    // 2. Add a named animation method to the scope
    scope.add((self: Scope | undefined) => {
      self?.add('rotateLogo', (i : number) => {
        animate('.logo', {
            rotate: i * 360,
            ease: 'out(4)',
            duration: 1500,
        });
      });
    });
    setAnimationScope(scope);
  };

  const handleClick = (e : Event) => {
    e.preventDefault();
    const newRotations = rotations() + 1;
    
    // 3. Call the animation method from the scope on click
    animationScope()?.methods.rotateLogo(newRotations);
    setRotations(newRotations);
  };

  return (
    <Animator onScopeReady={handleScopeReady}>
      <div class="large centered row">
        <div onClick={handleClick} class="logo" alt="google logo">G</div> 
      </div>
    </Animator>
  );
};

export default App;
````