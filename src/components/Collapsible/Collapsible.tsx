import clsx from 'clsx';
import type { JSX } from 'solid-js/h/jsx-runtime';
import classes from './Collapsible.module.css';

interface CollapsibleProps {
    title: string;
}
export function Collapsible(props: CollapsibleProps & JSX.DetailsHtmlAttributes<HTMLDetailsElement>) {
    return (
        <details {...(props as any)} class={clsx(classes.collapsible, props.class)}>
            <summary class={classes.title}>{props.title}</summary>
            {props.children as any}
        </details>
    );
}
