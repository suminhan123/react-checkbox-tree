import { CheckboxSize } from "../Checkbox/Checkbox";

const sizeMap = {
  sm: "20px",
  md: "24px",
  lg: "30px",
};
const radiusMap = {
  sm: "2px",
  md: "4px",
  lg: "6px",
};

function getStyles({
  size,
  radius,
  color,
}: {
  size: CheckboxSize;
  radius: CheckboxSize;
  color: string;
}) {
  return {
    "--checkbox-size": sizeMap[size],
    "--checkbox-radius": radiusMap[radius],
    "--checkbox-color": color,
    "--checkbox-icon-color": "white",
    "--primary-color-outlined": "rgb(181, 181, 181)",
    "--disabled-color": "rgb(235, 235, 235)",
    "--disabled-border-color": "rgb(181, 181, 181)",
  };
}

export { sizeMap, radiusMap, getStyles };
