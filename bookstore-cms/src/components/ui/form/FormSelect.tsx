import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../form';
import { SelectOptions } from '../SelectOptions';

export const FormSelect = ({
  control,
  label,
  options = [],
  description,
}: any) => {
  return (
    <FormField
      control={control}
      name="book_id"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {/* TODO: create shared helper for converting to options */}
              <SelectOptions options={options} {...field} />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
          </FormItem>
        );
      }}
    />
  );
};
