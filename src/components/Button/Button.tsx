import clsx from "clsx";
import type { JSX } from "solid-js/jsx-runtime";
import classes from "./Button.module.css";
type ButtonType = "primary" | "secondary" | "danger";

export interface ButtonProps {
  kind?: ButtonType;
  outline?: boolean;
  ghost?: boolean;
}

export function Button(props: ButtonProps & JSX.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      class={clsx(classes.button, {
        [classes.primary]: props.kind === "primary",
        [classes.secondary]: props.kind === "secondary",
        [classes.danger]: props.kind === "danger",
        [classes.outline]: props.outline,
        [classes.ghost]: props.ghost,
      })}
    >
      {props.children}
    </button>
  );
}
