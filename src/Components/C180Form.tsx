import { FormEvent, ReactNode } from "react";

interface IProps {
  id?: string;
  name?: string;
  children?: ReactNode;
  onSubmit?: (event?: FormEvent<HTMLFormElement>) => void;
  onReset?: (event?: FormEvent<HTMLFormElement>) => void;
  className?: string;
}



function C180Form({ children, onSubmit, onReset, ...props }: IProps) {
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(event);
  };


  const handleFormReset = () => {
    onReset?.();
  };


  return (
    <form noValidate onSubmit={handleFormSubmit} onReset={handleFormReset} {...props}>
      {children}
    </form>
  );
}



export default C180Form;