import { Input, InputProps } from "ui";
import * as React from "react";
interface InputGroupProps extends InputProps {
  errorMessage: string | undefined;
}

const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(({ errorMessage, className, ...props }, ref) => {
  return (
    <div>
      <Input {...props} ref={ref} className={className} />
      <p className="mt-1 px-1 text-xs text-destructive">{errorMessage}</p>
    </div>
  );
});
InputGroup.displayName = "InputGroup";

export { InputGroup };
