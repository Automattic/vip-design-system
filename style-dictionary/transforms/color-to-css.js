/**
 * Style Dictionary transform for resolving DTCG color tokens.
 *
 * Transforms color tokens with $type: "color" and complex $value objects
 * into valid color strings based on the colorSpace and components.
 * Also handles nested color tokens within composite tokens (e.g., colors within shadow tokens).
 *
 * @since 1.0.0
 */

/**
 * Converts components from 0-1 range to 0-255 range for RGB values.
 *
 * @since 1.0.0
 * @param {number} component - Component value in 0-1 range.
 * @return {number} Component value in 0-255 range.
 */
function componentTo255(component) {
	return Math.round(component * 255);
}

/**
 * Converts components from 0-1 range to percentage for certain color spaces.
 *
 * @since 1.0.0
 * @param {number} component - Component value in 0-1 range.
 * @return {number} Component value as percentage.
 */
function componentToPercent(component) {
	return Math.round(component * 100);
}

/**
 * Normalizes components to array format.
 *
 * Handles both array format and object format with string keys.
 *
 * @since 1.0.0
 * @param {Array|Object} components - Components in array or object format.
 * @return {Array} Components as array.
 */
function normalizeComponents(components) {
	// If it's already an array, return it
	if (Array.isArray(components)) {
		return components;
	}
	
	// If it's an object with string keys, convert to array
	if (typeof components === 'object' && components !== null) {
		// Extract values in order based on keys "0", "1", "2", etc.
		const keys = Object.keys(components).sort((a, b) => parseInt(a) - parseInt(b));
		return keys.map(key => components[key]);
	}
	
	// Fallback - return empty array
	return [];
}

/**
 * Recursively checks if an object contains nested color tokens.
 *
 * @since 1.0.0
 * @param {Object|Array} obj - The object or array to check.
 * @return {boolean} True if nested color tokens are found.
 */
function hasNestedColor(obj) {
	// Handle null or non-object values
	if (!obj || typeof obj !== 'object') {
		return false;
	}
	
	// Handle arrays - but only if they contain objects that could have color tokens
	if (Array.isArray(obj)) {
		return obj.some(item => 
			typeof item === 'object' && 
			item !== null && 
			hasNestedColor(item)
		);
	}
	
	// Check if this object directly is a color token
	if (obj.$type === 'color' && obj.$value) {
		return true;
	}
	
	// Recursively check all properties
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const value = obj[key];
			if (hasNestedColor(value)) {
				return true;
			}
		}
	}
	
	return false;
}

/**
 * Recursively transforms nested color tokens in an object.
 *
 * @since 1.0.0
 * @param {Object|Array} obj - The object or array to transform.
 * @return {Object|Array} The transformed object with color tokens converted to CSS strings.
 */
function transformNestedColor(obj) {
	// Handle null or non-object values
	if (!obj || typeof obj !== 'object') {
		return obj;
	}
	
	// Handle arrays - but only transform if they contain objects that might have color tokens
	if (Array.isArray(obj)) {
		// Check if this array contains objects that could have color tokens
		const hasObjectsWithColor = obj.some(item => 
			typeof item === 'object' && 
			item !== null && 
			hasNestedColor(item)
		);
		
		if (hasObjectsWithColor) {
			return obj.map(item => transformNestedColor(item));
		} else {
			// Return array unchanged if it doesn't contain color tokens
			return obj;
		}
	}
	
	// Check if this object directly is a color token
	if (obj.$type === 'color' && obj.$value) {
		return convertColorValue(obj.$value);
	}
	
	// Transform all properties recursively
	const result = {};
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			result[key] = transformNestedColor(obj[key]);
		}
	}
	
	return result;
}

/**
 * Converts DTCG color token to valid color string.
 *
 * @since 1.0.0
 * @param {Object} colorValue - The $value object from a DTCG color token.
 * @return {string} color string.
 * @throws {Error} When color conversion fails.
 */
function convertColorValue(colorValue) {
	const { colorSpace, components, alpha, hex } = colorValue;
	
	try {
		// Handle different color spaces
		switch (colorSpace) {
			case 'srgb':
			case 'sRGB':
				// Convert 0-1 range to 0-255 for RGB
				const [r, g, b] = components.map(componentTo255);
				
				// Check if alpha exists and is not 1
				if (alpha !== undefined && alpha !== 1) {
					return `rgba(${r}, ${g}, ${b}, ${alpha})`;
				} else {
					return `rgb(${r}, ${g}, ${b})`;
				}
				
			case 'display-p3':
				// Display P3 color space - use color() function
				const [rP3, gP3, bP3] = components;
				
				if (alpha !== undefined && alpha !== 1) {
					return `color(display-p3 ${rP3} ${gP3} ${bP3} / ${alpha})`;
				} else {
					return `color(display-p3 ${rP3} ${gP3} ${bP3})`;
				}
				
			case 'hsl':
				// HSL color space
				const [h, s, l] = components;
				const hDeg = Math.round(h * 360); // Convert 0-1 to 0-360 degrees
				const sPercent = componentToPercent(s);
				const lPercent = componentToPercent(l);
				
				if (alpha !== undefined && alpha !== 1) {
					return `hsla(${hDeg}, ${sPercent}%, ${lPercent}%, ${alpha})`;
				} else {
					return `hsl(${hDeg}, ${sPercent}%, ${lPercent}%)`;
				}
				
			case 'hwb':
				// HWB color space
				const [hHwb, w, bHwb] = components;
				const hHwbDeg = Math.round(hHwb * 360);
				const wPercent = componentToPercent(w);
				const bHwbPercent = componentToPercent(bHwb);
				
				if (alpha !== undefined && alpha !== 1) {
					return `hwb(${hHwbDeg} ${wPercent}% ${bHwbPercent}% / ${alpha})`;
				} else {
					return `hwb(${hHwbDeg} ${wPercent}% ${bHwbPercent}%)`;
				}
				
			case 'lab':
				// LAB color space
				const [lLab, aLab, bLab] = components;
				const lLabPercent = componentToPercent(lLab);
				
				if (alpha !== undefined && alpha !== 1) {
					return `lab(${lLabPercent}% ${aLab} ${bLab} / ${alpha})`;
				} else {
					return `lab(${lLabPercent}% ${aLab} ${bLab})`;
				}
				
			case 'lch':
				// LCH color space
				const [lLch, c, hLch] = components;
				const lLchPercent = componentToPercent(lLch);
				const hLchDeg = Math.round(hLch * 360);
				
				if (alpha !== undefined && alpha !== 1) {
					return `lch(${lLchPercent}% ${c} ${hLchDeg} / ${alpha})`;
				} else {
					return `lch(${lLchPercent}% ${c} ${hLchDeg})`;
				}
				
			case 'oklch':
				// OKLCH color space
				const [lOklch, cOklch, hOklch] = components;
				const hOklchDeg = Math.round(hOklch * 360);
				
				if (alpha !== undefined && alpha !== 1) {
					return `oklch(${lOklch} ${cOklch} ${hOklchDeg} / ${alpha})`;
				} else {
					return `oklch(${lOklch} ${cOklch} ${hOklchDeg})`;
				}
				
			case 'oklab':
				// OKLAB color space
				const [lOklab, aOklab, bOklab] = components;
				
				if (alpha !== undefined && alpha !== 1) {
					return `oklab(${lOklab} ${aOklab} ${bOklab} / ${alpha})`;
				} else {
					return `oklab(${lOklab} ${aOklab} ${bOklab})`;
				}
				
			default:
				// Unknown color space, throw error to fall back to hex
				throw new Error(`Unsupported color space: ${colorSpace}`);
		}
	} catch (error) {
		// Fall back to hex value if available
		if (hex) {
			return hex;
		} else {
			throw new Error(`Color conversion failed: ${error.message}`);
		}
	}
}

/**
 * Style Dictionary transform configuration for color tokens.
 *
 * @since 1.0.0
 * @type {Object}
 */
export const resolveColor = {
	name: 'color/resolve',
	type: 'value',
	transitive: true, // This ensures the transform runs after references are resolved
	filter: (token) => {
		// Check if token is a direct color token
		if (token.$type === 'color' && token.$value) {
			return true;
		}
		
		// Check if token has nested color structures (like in shadow tokens)
		if (token.$value && typeof token.$value === 'object') {
			return hasNestedColor(token.$value);
		}
		
		return false;
	},
	transform: (token) => {
		// Handle direct color token
		if (token.$type === 'color' && token.$value) {
			return convertColorValue(token.$value);
		}
		
		// Handle nested structures
		if (token.$value && typeof token.$value === 'object') {
			return transformNestedColor(token.$value);
		}
		
		return token.$value;
	}
};

export default resolveColor; 