import React from 'react';
import { Toggle, Label } from '../../../Form';

type Props = {
	label?: string;
	checked: boolean;
	onChange: (value: boolean) => void;
};

export default function ToggleControl({ label, checked, onChange }: Props) {
	return (
		<label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
			{ label && <Label>{label}</Label> }
			<Toggle checked={checked} onChange={() => onChange(!checked)} />
		</label>
	);
}


