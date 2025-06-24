import clsx from 'clsx';
import type { JSX } from 'solid-js/jsx-runtime';
import classes from './Field.module.css';

export function Label(props: JSX.HTMLAttributes<HTMLLabelElement>) {
    return (
        <label {...props} class={clsx(classes.label, props.class)}>
            {props.children}
        </label>
    );
}

export function Input(props: JSX.InputHTMLAttributes<HTMLInputElement>) {
    return <input {...props} class={clsx(classes.input, props.class)} />;
}

export function Select(props: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select {...props} class={clsx(classes.select, props.class)}>
            {props.children}
        </select>
    );
}

export function Field(props: JSX.HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} class={clsx(classes.field, props.class)}>
            {props.children}
        </div>
    );
}

Field.Label = Label;
Field.Input = Input;
Field.Select = Select;

export default Field;
