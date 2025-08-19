import React from 'react';
import * as DS from '../../../Dropdown';

type PropsWithChildren<P = {}> = P & { children?: React.ReactNode };

export const Menu = {
	TriggerButton: ({ render, children }: PropsWithChildren<{ render?: React.ReactNode }>) => (
		<DS.Trigger asChild>
			{render || children || <button />}
		</DS.Trigger>
	),
	Popover: ({ children, style }: PropsWithChildren<{ style?: React.CSSProperties }>) => (
		<DS.Content style={style}>{children}</DS.Content>
	),
	Group: ({ children }: PropsWithChildren) => <div role="group">{children}</div>,
	Separator: () => <DS.Separator />,
	Item: ({ children, prefix, onClick, disabled }: PropsWithChildren<{ prefix?: React.ReactNode; onClick?: () => void; disabled?: boolean }>) => (
		<DS.Item onSelect={onClick as any} disabled={disabled}>
			{prefix && <span style={{ marginRight: 8 }}>{prefix}</span>}
			{children}
		</DS.Item>
	),
	ItemLabel: ({ children }: PropsWithChildren) => <span>{children}</span>,
	RadioItem: ({ name, value, checked, onChange, children }: PropsWithChildren<{ name: string; value: string; checked?: boolean; onChange?: () => void }>) => (
		<DS.RadioGroup value={checked ? value : undefined} onValueChange={() => onChange && onChange()}>
			<DS.RadioItem value={value}>{children}</DS.RadioItem>
		</DS.RadioGroup>
	),
};


