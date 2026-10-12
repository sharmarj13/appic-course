export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

export function getCleanWhatsApp(phone?: string, defaultNumber = '919887354080'): string {
  if (!phone) return defaultNumber;
  const cleaned = phone.replace(/[^0-9]/g, '');
  return cleaned.length >= 10 ? cleaned : defaultNumber;
}

