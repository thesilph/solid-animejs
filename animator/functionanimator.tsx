import { Scope, ScopeMethod } from "animejs"
import { Component, JSXElement, Setter } from "solid-js"
import Animator from "./animator"


const FunctionAnimator: Component<{ children: JSXElement, animationFuncs: [[string, ScopeMethod]], setSignal: Setter<Scope | undefined>}> = (props) =>
{
    const handleScopeReady = (scope: Scope) => {
        scope.add((self: Scope | undefined) => {
            for (const func of props.animationFuncs) {
                self?.add(func[0], func[1]);
            }
        });
        props.setSignal(scope);

    }
    return <Animator onScopeReady={handleScopeReady}>{props.children}</Animator>
}

export default FunctionAnimator