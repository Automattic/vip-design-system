export interface TokenColorValue {
	type: "color",
	value: string,
};

export interface TokenColorVariant {
	[colorVarientName: string]: TokenColorValue,
};

export interface TokenColors {
	[colorName: string]: TokenColorValue | TokenColorVariant,
}
