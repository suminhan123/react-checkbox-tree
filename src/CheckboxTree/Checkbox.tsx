import * as React from "react";

import { CheckboxIcon } from "./CheckboxIcon";
import { useControllableState, useProps } from "./hooks";
import InlineInput from "./InlineInput";

import classes from "./Checkbox.module.css";

type CheckedState = boolean | "indeterminate";
interface CheckboxProps {
  /**
   * checkbox style properties
   */
  color?: string;
  size?: string;
  radius?: string;
  variant?: string;

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
  label?: React.ReactNode;
  labelPosition?: "left" | "right";
  description?: React.ReactNode;
  error?: React.ReactNode;
  // Custom icon to be used in the checkbox.
  icon?: React.FC<{
    indeterminate: boolean | undefined;
    size: string | number;
    className: string;
  }>;
  iconColor?: string;
}
const CHECKBOX_NAME = "Checkbox";

const defaultProps: Partial<CheckboxProps> = {
  labelPosition: "right",
  icon: CheckboxIcon,
  defaultChecked: false,
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
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
      icon,
      disabled,
    } = props;
    const Icon = icon!;
    const [checked, setChecked] = useControllableState<CheckedState>({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: CHECKBOX_NAME,
    });

    return (
      <InlineInput className={classes.root}>
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

          <Icon
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
