import {
  FormField as RHFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form';
import { NumberInput } from './number-input';

interface FormNumberInputProps {
  name: string;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  prefix?: string;
}

export function FormNumberInput({
  name,
  label,
  disabled,
  placeholder,
  prefix,
}: FormNumberInputProps) {
  return (
    <RHFormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormMessage className="inline ml-3" />
          <NumberInput
            id={name}
            prefix={prefix}
            disabled={disabled}
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
          />
        </FormItem>
      )}
    />
  );
}
