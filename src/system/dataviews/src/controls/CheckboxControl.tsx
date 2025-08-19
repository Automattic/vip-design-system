import React from 'react';
import { Checkbox, Label } from '../../../Form';

type Props = {
	label?: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
};

export default function CheckboxControl({ label, checked, onChange }: Props) {
	return (
		<label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
			<Checkbox checked={checked} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)} />
			{ label && <Label>{label}</Label> }
		</label>
	);
}


