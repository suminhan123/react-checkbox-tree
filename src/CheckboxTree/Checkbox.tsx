import { CheckboxIcon } from "./CheckboxIcon";

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
  indeterminate?: boolean; // Indeterminate state of the checkbox. If set, checked prop is ignored.
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;

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

const defaultProps: Partial<CheckboxProps> = {
  labelPosition: "right",
  icon: CheckboxIcon,
};

export function Checkbox(props: CheckboxProps) {
  return <div>checkbox</div>;
}
