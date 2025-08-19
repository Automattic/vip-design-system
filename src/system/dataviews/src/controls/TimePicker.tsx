import React from 'react';
import { Input, Label } from '../../../Form';

type Props = {
	label?: string;
	value?: string; // HH:MM
	onChange: (value?: string) => void;
};

export default function TimePicker({ label, value, onChange }: Props) {
	return (
		<div>
			{ label && <Label>{label}</Label> }
			<Input
				type="time"
				value={value}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value || undefined)}
			/>
		</div>
	);
}


