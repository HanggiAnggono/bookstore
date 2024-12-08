import books from '@/pages/books';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from './form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

type Props = {
  options: Array<{ value: string; label: string }>;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  onValueChange?: (value: string) => void;
  onChange?: Props['onValueChange'];
  value?: Props['defaultValue'];
};

export const SelectOptions = ({
  options = [],
  placeholder,
  defaultValue,
  onValueChange,
  value,
  onChange,
  className,
}: Props) => {
  const selected = options.filter((option) => option.value === value);
  const selectedLabel = selected.map((option) => option.label).toString();

  return (
    <Select
      defaultValue={defaultValue || value}
      onValueChange={onValueChange || onChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={selectedLabel || placeholder || 'Select'}
          className={className}
        />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => {
          return (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

