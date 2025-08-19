import {
	ChevronDownIcon,
	ChevronUpIcon,
	CaretLeftIcon,
	CaretRightIcon,
	EyeNoneIcon,
	DotsVerticalIcon,
	MixerHorizontalIcon,
} from '@radix-ui/react-icons';
import type { ComponentType, SVGProps } from 'react';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const icons: Record<string, IconComponent> = {
	arrowDown: ChevronDownIcon,
	arrowUp: ChevronUpIcon,
	chevronDown: ChevronDownIcon,
	chevronUp: ChevronUpIcon,
	arrowLeft: CaretLeftIcon,
	arrowRight: CaretRightIcon,
	unseen: EyeNoneIcon,
	moreVertical: DotsVerticalIcon,
	funnel: MixerHorizontalIcon,
};

export function getIcon(name: keyof typeof icons): IconComponent {
	return icons[name] ?? ChevronRightFallback;
}

function ChevronRightFallback(props: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...props}>
			<path fill="currentColor" d="M9 6l6 6-6 6" />
		</svg>
	);
}


