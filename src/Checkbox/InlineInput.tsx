import { HTMLAttributes, PropsWithChildren } from "react";

function InlineInput({
  children,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return <div {...rest}>{children}</div>;
}
export default InlineInput;
