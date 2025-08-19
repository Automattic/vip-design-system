import { useEffect, useRef } from 'react';

// Lightweight throttle using requestAnimationFrame; avoids new deps.
export function throttle<Args extends any[]>(fn: (...args: Args) => void, wait = 100) {
	let last = 0;
	let timer: number | null = null;
	function throttled(...args: Args) {
		const now = Date.now();
		const remaining = wait - ( now - last );
		if ( remaining <= 0 ) {
			if ( timer ) {
				window.clearTimeout( timer );
				timer = null;
			}
			last = now;
			fn( ...args );
		} else if ( ! timer ) {
			timer = window.setTimeout( () => {
				last = Date.now();
				timer = null;
				fn( ...args );
			}, remaining );
		}
	}
	throttled.cancel = () => {
		if ( timer ) {
			window.clearTimeout( timer );
			timer = null;
		}
	};
	return throttled as ((...args: Args) => void) & { cancel: () => void };
}

export function usePrevious<T>(value: T): T | undefined {
	const ref = useRef<T>();
	useEffect(() => {
		ref.current = value;
	}, [value]);
	return ref.current;
}

export function useInstanceId(prefix = 'id'): string {
	// React 18's useId provides a unique, deterministic id for hydration.
	// For simplicity, fall back to a random suffix if useId is not available.
	try {
		// Dynamically import to avoid circular dep with element.ts re-exports
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		const React = require('react') as typeof import('react');
		const id = (React as any).useId ? (React as any).useId() : Math.random().toString(36).slice(2);
		return `${prefix}-${id}`;
	} catch {
		return `${prefix}-${Math.random().toString(36).slice(2)}`;
	}
}

export function useResizeObserver(
	callback: (entries: ReadonlyArray<ResizeObserverEntry>) => void,
	options?: ResizeObserverOptions
) {
	const targetRef = useRef<Element | null>(null);
	const observerRef = useRef<ResizeObserver | null>(null);

	useEffect(() => {
		if (!targetRef.current) {
			return;
		}
		observerRef.current = new ResizeObserver((entries) => callback(entries));
		observerRef.current.observe(targetRef.current, options);
		return () => {
			observerRef.current?.disconnect();
			observerRef.current = null;
		};
	}, [callback, options]);

	return (node: Element | null) => {
		targetRef.current = node ?? null;
	};
}


