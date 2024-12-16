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

export function formatDateTime(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}

export function formatCurrency(input: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(input);
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function toLabelValues<
  T extends Array<object>,
  K extends keyof T[number],
  V extends keyof T[number],
>(items: T, valueAccessor: K = 'id' as K, labelAccessor: V = 'name' as V) {
  return items.map((item: T[number]) => {
    return {
      value: item[valueAccessor] as string,
      label: item[labelAccessor] as string,
    };
  });
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type Infer<T = unknown> = ComponentProps<T>;
