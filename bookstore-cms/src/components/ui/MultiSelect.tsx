import {
  SelectProps,
  MultiSelect as ReactMultiSelect,
} from 'react-multi-select-component';

export const MultiSelect = ({
  options = [],
  value = [],
  onChange,
  ...props
}: Omit<SelectProps, 'labelledBy'>) => {
  return (
    <ReactMultiSelect
      options={options}
      value={value}
      onChange={onChange}
      labelledBy="Select"
      {...props}
    />
  );
};
