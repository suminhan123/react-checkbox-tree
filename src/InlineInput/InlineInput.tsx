import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

import classes from "./InlineInput.module.css";

interface InlineInputProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  labelPosition?: "left" | "right";
  description?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
}

function InlineInput(_props: PropsWithChildren<InlineInputProps>) {
  const {
    label,
    labelPosition,
    description,
    error,
    disabled,
    children,
    ...rest
  } = _props;
  return (
    <div {...rest}>
      <div className={classes.content}>
        {children}
        <div
          className={classes.labelWrapper}
          data-label-position={labelPosition}
          data-disabled={disabled || undefined}
        >
          {label && <div>{label}</div>}
          {description && <div>{description}</div>}
          {error && <div>{error}</div>}
        </div>
      </div>
    </div>
  );
}
export default InlineInput;
