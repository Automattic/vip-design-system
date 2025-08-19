import React from 'react';
import { Input, Label } from '../../../Form';

type Props = {
	label?: string;
	min?: number;
	max?: number;
	step?: number;
	value: number;
	onChange: (value: number) => void;
};

export default function RangeControl({ label, min, max, step, value, onChange }: Props) {
	return (
		<div>
			{ label && <Label>{label}</Label> }
			<Input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))}
			/>
		</div>
	);
}


