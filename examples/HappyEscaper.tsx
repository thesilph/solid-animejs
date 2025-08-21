import { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { createAnimatable, Scope, utils } from 'animejs';
import SingleFunctionAnimator from '../animator/singlefunctionanimator';

//loosely based on https://animejs.com/documentation/animatable
const HappyEscaper: Component = () => {
  const [animationScope, setAnimationScope] = createSignal<Scope>();

  let animation = (e : MouseEvent) => {
      let animatableSquare = createAnimatable('.square', {
      x: 500, // Define the x duration to be 500ms
      y: 500, // Define the y duration to be 500ms
      ease: 'out(3)',
    });
      const hw = 100*Math.random() / 2;
      const hh = 100*Math.random() / 2;
      const x = utils.clamp(e.clientX - 100*Math.random() - hw, -hw, hw);
      const y = utils.clamp(e.clientY - 100*Math.random() - hh, -hh, hh);
      animatableSquare.x(x); // Animate the x value in 500ms
      animatableSquare.y(y); // Animate the y value in 500ms
  }

  const onMouseMove = (e : any) => {
    animationScope()?.methods.animation(e);
  }


  return (
    <SingleFunctionAnimator animationFunc={animation} setSignal={setAnimationScope}>
      <div onMouseMove={onMouseMove} class="large centered row">
        <div class="square">XXX</div>
      </div>
    </SingleFunctionAnimator>
  );
};

export default HappyEscaper;