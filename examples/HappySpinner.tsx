import { Component } from 'solid-js';
import { createSignal, createEffect, onCleanup } from 'solid-js';
import { animate, Scope } from 'animejs';
import Animator from '../animator/animator';

const App: Component = () => {
  
  const [rotations, setRotations] = createSignal<number>(0);
  
  const [animationScope, setAnimationScope] = createSignal<Scope>();

  const handleScopeReady = (scope: Scope) => {
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