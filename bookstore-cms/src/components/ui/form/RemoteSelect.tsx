'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn, toLabelValues } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useQuery } from '@tanstack/react-query';
import { UseFormSetValue } from 'react-hook-form';
import { PopoverClose } from '@radix-ui/react-popover';

type Props = {
  fetcher: () => Promise<Array<{ value: string; label: string }>>;
  control: any;
  setValue: UseFormSetValue<any>;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
};

export function RemoteSelect({
  fetcher,
  control,
  name,
  setValue,
  label,
  description,
  placeholder,
}: Props) {
  const { data = [], isLoading } = useQuery({
    queryKey: [name],
    queryFn: async () => {
      return await fetcher();
    },
  });

  const options = isLoading ? [{ label: 'Loading', value: 'loading' }] : data;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <div className="flex">
            <FormLabel>{label}</FormLabel>
            <FormMessage className="ml-3" />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'justify-between',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  {(field.value ? field.value.label : placeholder) || 'Select'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]">
              <Command>
                <CommandInput placeholder={`Search ${label} ...`} />
                <CommandList>
                  <CommandEmpty>No {label} found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          setValue(name, option);
                        }}
                      >
                        <PopoverClose className="w-full h-full flex">
                          {option.label}
                          <Check
                            className={cn(
                              'ml-auto',
                              option.value === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                        </PopoverClose>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
