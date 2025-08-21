import { Scope, ScopeMethod } from "animejs"
import { Component, JSXElement, Setter } from "solid-js"
import Animator from "./animator"


const SingleFunctionAnimator: Component<{ children: JSXElement, funcName ? : string, animationFunc: ScopeMethod, setSignal: Setter<Scope | undefined>}> = (props) =>
{
    const handleScopeReady = (scope: Scope) => {
        scope.add((self: Scope | undefined) => {
            self?.add(props.funcName || 'animation', props.animationFunc);
        });
        props.setSignal(scope);

    }
    return <Animator onScopeReady={handleScopeReady}>{props.children}</Animator>
}

export default SingleFunctionAnimator