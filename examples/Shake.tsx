import { Component, JSXElement } from 'solid-js';
import { createSignal, createEffect, onCleanup } from 'solid-js';
import { animate, createAnimatable, Scope, utils } from 'animejs';
import googleLogo from '../../assets/google-icon.png';
import Animator from '../animator/animator';

const App: Component<{ children: JSXElement, animationclass: string, shakeNow : boolean}> = (props) => {
  const [animationScope, setAnimationScope] = createSignal<Scope>();

  const handleScopeReady = (scope: Scope) => {
    scope.add((self: Scope | undefined) => {
      self?.add('shake', (i : number) => {
          animate('.' + props.animationclass, {
              y: '10px',
              scale: 1.25, 
              loop: 3,
              alternate: true,
              playbackRate: 2,
          });
      });
      scope.methods.shake();

    });
    setAnimationScope(scope);
  };




  return (
    <Animator onScopeReady={handleScopeReady}>
        {props.children}
    </Animator>
  );
};

export default App;