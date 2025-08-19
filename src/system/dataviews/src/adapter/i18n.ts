export const __ = (text: string) => text;
export const _x = (text: string) => text;
export const _n = (singular: string, plural: string, count: number) =>
	count === 1 ? singular : plural;
export const sprintf = (format: string, ...args: any[]) => {
	let i = 0;
	return format.replace(/%s/g, () => String(args[i++] ?? ''));
};
export const isRTL = () => false;


