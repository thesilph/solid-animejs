import { createScope, Scope } from "animejs";
import { Component, createEffect, JSXElement, onCleanup } from "solid-js";

const Animator: Component<{ children: JSXElement, onScopeReady?: (scope: Scope) => void}> = (props) =>
{
    let scope: Scope;

    let rootDiv: HTMLDivElement | undefined;
    
    createEffect(() => {
        scope = createScope({ root: rootDiv })
        if(props.onScopeReady){
            props.onScopeReady(scope);
        }

        onCleanup(() => scope.revert());
    });

    return (
        <div ref={rootDiv}>
            {props.children}
        </div>
    )   
}

export default Animator;