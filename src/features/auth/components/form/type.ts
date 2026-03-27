import { Control, FieldError, FieldPath, FieldValues } from 'react-hook-form';

export type Option = {
  label: string;
  value: string;
};

export type SelectFieldProps<T extends FieldValues> = {
  control?: Control<T>;
  label: string;
  placeholder: string;
  options: Option[];
  name: FieldPath<T>;
  value?: string | null;
  onValueChange?: (value: string) => void;
  error?: FieldError;
  disabled?: boolean;
};
