import React from 'react';
import {
	Button as DSButton,
	Card as DSCard,
	Card as Card,
	Card as CardBody,
	Card as CardHeader,
	Dropdown as DSDropdown,
	Flex as DSFlex,
	Grid as DSGrid,
	ScreenReaderText as DSScreenReaderText,
	Spinner as DSSpinner,
	Text as DSText,
} from '../../../index';

// Map common WP component names to DS components (approximate)
export const Button = DSButton;
export const Spinner = DSSpinner;
export const Text = DSText as any;
export const Grid = DSGrid as any;
export const Dropdown = DSDropdown as any;
export const Card = DSCard as any;

// Simple HStack/VStack using DS Flex
type StackProps = React.ComponentProps<typeof DSFlex> & { spacing?: number };

export function HStack({ spacing = 2, children, ...rest }: StackProps) {
	return (
		<DSFlex direction="row" gap={ spacing } {...rest}>
			{children}
		</DSFlex>
	);
}

export function VStack({ spacing = 2, children, ...rest }: StackProps) {
	return (
		<DSFlex direction="column" gap={ spacing } {...rest}>
			{children}
		</DSFlex>
	);
}

// VisuallyHidden
export const VisuallyHidden = DSScreenReaderText;


