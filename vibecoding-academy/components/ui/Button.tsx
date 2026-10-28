// ЗАЧЕМ: переиспользуемая кнопка. Стили в одном месте — меняем один файл, а не 20.
import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'danger' };
const styles = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-500',
  ghost: 'border border-slate-300 text-slate-700 hover:bg-slate-100',
  danger: 'border border-red-300 text-red-700 hover:bg-red-50',
};

export function Button({ variant = 'primary', className = '', ...props }: Props) {
  return <button className={`rounded-lg px-3 py-1.5 text-sm font-medium transition disabled:opacity-50 ${styles[variant]} ${className}`} {...props} />;
}
