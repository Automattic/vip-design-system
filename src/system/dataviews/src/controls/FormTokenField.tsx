import React, { useState } from 'react';
import { Input, Label } from '../../../Form';
import { Button } from '../../../Button';

type Props = {
	label?: string;
	value: string[];
	onChange: (value: string[]) => void;
	placeholder?: string;
};

export default function FormTokenField({ label, value, onChange, placeholder }: Props) {
	const [draft, setDraft] = useState('');
	function addToken() {
		const t = draft.trim();
		if (!t) return;
		if (!value.includes(t)) onChange([...value, t]);
		setDraft('');
	}
	function removeToken(t: string) {
		onChange(value.filter(v => v !== t));
	}
	return (
		<div>
			{ label && <Label>{label}</Label> }
			<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
				{value.map((t) => (
					<span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '2px 8px', borderRadius: 12, background: '#eee' }}>
						{t}
						<Button variant="secondary" onClick={() => removeToken(t)}>×</Button>
					</span>
				))}
			</div>
			<div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
				<Input value={draft} placeholder={placeholder} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft(e.target.value)} />
				<Button variant="primary" onClick={addToken}>Add</Button>
			</div>
		</div>
	);
}


