import { NumericFormat } from 'react-number-format';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { Input } from '../input';

export interface NumberInputProps
  extends Omit<
    React.ComponentProps<typeof NumericFormat>,
    'className' | 'onChange'
  > {
  className?: string;
  onChange?: (value: string) => void;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, onChange, ...props }, ref) => {
    return (
      <NumericFormat
        // customInput={Input}
        getInputRef={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        thousandSeparator="."
        decimalSeparator=","
        prefix="Rp"
        valueIsNumericString
        onValueChange={(values) => {
          onChange?.(values.value);
        }}
        {...props}
      />
    );
  },
);

NumberInput.displayName = 'NumberInput';

export { NumberInput };
