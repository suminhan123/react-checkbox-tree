import { forwardRef, ReactNode } from "react";

import { CheckboxIcon } from "./CheckboxIcon";
import { useControllableState, useProps } from "../hooks";
import InlineInput from "./InlineInput";

import classes from "./Checkbox.module.css";
import { getStyles } from "./Checkbox.style";

export type CheckedState = boolean | "indeterminate";
export type CheckboxVariant = "filled" | "outline";
export type CheckboxSize = "sm" | "md" | "lg";

interface StyledCheckboxProps {
  color?: string;
  size?: CheckboxSize;
  radius?: CheckboxSize;
  variant?: CheckboxVariant;
}

interface CheckboxProps extends StyledCheckboxProps {
  /**
   * checkbox state properties
   */
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  disabled?: boolean;
  onCheckedChange?(checked: CheckedState): void;
  /**
   *checkbox ui properties
   */
  label?: ReactNode;
  labelPosition?: "left" | "right";
  description?: React.ReactNode;
  error?: React.ReactNode;
}

const CHECKBOX_NAME = "Checkbox";

const defaultProps: Partial<CheckboxProps> = {
  labelPosition: "right",
  defaultChecked: false,
  variant: "filled",
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (_props: CheckboxProps, ref) => {
    const props = useProps<CheckboxProps, Partial<CheckboxProps>>(
      CHECKBOX_NAME,
      defaultProps,
      _props,
    );
    const {
      checked: checkedProp,
      defaultChecked,
      onCheckedChange,
      disabled,
      size,
      radius,
      color,
    } = props;

    const [checked, setChecked] = useControllableState<CheckedState>({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: CHECKBOX_NAME,
    });

    return (
      <InlineInput
        style={
          getStyles({
            size: size ?? "md",
            radius: radius ?? "md",
            color: color ?? "rgb(90, 167, 212)",
          }) as React.CSSProperties
        }
      >
        <div className={classes.inner}>
          <input
            className={classes.input}
            ref={ref}
            type="checkbox"
            disabled={disabled}
            checked={isIndeterminate(checked) ? false : checked}
            data-indeterminate={isIndeterminate(checked) || undefined}
            onChange={(e) => setChecked(e.target.checked)}
          />

          <CheckboxIcon
            className={classes.icon}
            indeterminate={isIndeterminate(checked)}
            size={15}
          />
        </div>
      </InlineInput>
    );
  },
);
Checkbox.displayName = CHECKBOX_NAME;

function isIndeterminate(checked: CheckedState): checked is "indeterminate" {
  return checked === "indeterminate";
}
