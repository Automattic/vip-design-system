/**
 * Tracks the user's most recent input modality (keyboard vs pointer).
 *
 * This mirrors the heuristic browsers use for `:focus-visible`, and exists
 * because some focus decisions cannot be expressed in CSS. When focus is moved
 * programmatically — restoring it to a trigger after a menu closes, say —
 * browsers match `:focus-visible` regardless of how the user was actually
 * interacting, so a mouse user is left with a focus ring. Deciding that in
 * JavaScript is the only way to tell the two apart.
 *
 * Listeners are attached once, at module load, so the event that triggered an
 * interaction has already been observed by the time the modality is read.
 */

type InputModality = 'keyboard' | 'pointer';

// Default to 'keyboard': with no observed input yet, err toward showing focus.
// Hiding it from someone navigating by keyboard or assistive technology is a
// worse failure than briefly showing it to someone using a mouse.
let lastInputModality: InputModality = 'keyboard';

if ( typeof window !== 'undefined' ) {
	window.addEventListener(
		'keydown',
		() => {
			lastInputModality = 'keyboard';
		},
		{ capture: true, passive: true }
	);
	window.addEventListener(
		'pointerdown',
		() => {
			lastInputModality = 'pointer';
		},
		{ capture: true, passive: true }
	);
}

/**
 * Whether the most recent input came from the keyboard — and so, by proxy,
 * from keyboard-driven assistive technology — rather than a mouse or touch.
 */
export function wasKeyboardInput(): boolean {
	return lastInputModality === 'keyboard';
}
