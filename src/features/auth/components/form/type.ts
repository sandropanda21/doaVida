export type SelectFieldProps = {
  label: string;
  placeholder: string;
  options: string[];
  onValueChange?: (value: string) => void;
};