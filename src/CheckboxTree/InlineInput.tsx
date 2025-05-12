import { HTMLAttributes, PropsWithChildren } from "react";

function InlineInput({
  children,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div {...rest}>
      {children}
      {/* <input type="text" placeholder="Inline Input" /> */}
    </div>
  );
}
export default InlineInput;
