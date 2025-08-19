import { parseISO } from 'date-fns';

export function getDate(value: string | number | Date): Date {
	if (value instanceof Date) return value;
	if (typeof value === 'number') return new Date(value);
	// Attempt ISO parsing; fallback to Date
	try {
		return parseISO(value);
	} catch {
		return new Date(value);
	}
}

export function dateI18n(format: string, date: Date): string {
	// Minimal placeholder: leverage toLocaleString for now
	try {
		return date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
	} catch {
		return date.toString();
	}
}

export function getSettings() {
	return { l10n: { locale: (typeof navigator !== 'undefined' ? navigator.language : 'en-US') } } as const;
}


