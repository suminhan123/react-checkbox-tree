import * as React from "react";
import { CheckboxIcon } from "./CheckboxIcon";
import { useControllableState, useProps } from "./hooks";

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

  icon?: React.FC<{ indeterminate: boolean | undefined; className: string }>; // Custom icon to be used in the checkbox.
  iconColor?: string;
}
const CHECKBOX_NAME = "Checkbox";

const defaultProps: Partial<CheckboxProps> = {
  labelPosition: "right",
  icon: CheckboxIcon,
  defaultChecked: false,
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (_props: CheckboxProps, forwardedRef) => {
    const props = useProps<CheckboxProps, Partial<CheckboxProps>>(
      CHECKBOX_NAME,
      defaultProps,
      _props,
    );
    const { checked: checkedProp, defaultChecked, onCheckedChange } = props;
    const [checked, setChecked] = useControllableState<CheckedState>({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: CHECKBOX_NAME,
    });
    return (
      <div>
        <div>
          <input ref={forwardedRef} />
        </div>
      </div>
    );
  },
);
Checkbox.displayName = CHECKBOX_NAME;
