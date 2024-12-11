import { clsx, type ClassValue } from 'clsx';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function toLabelValues(
  items: Array<any>,
  valueAccessor: string,
  labelAccessor: string,
) {
  return items.map((item) => {
    return {
      value: item[valueAccessor] as string,
      label: item[labelAccessor] as string,
    };
  });
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type Infer<T = unknown> = ComponentProps<T>;
