import type { ComponentType, SVGProps } from 'react';
import {
	ChevronDownIcon,
	ChevronUpIcon,
	CaretLeftIcon,
	CaretRightIcon,
	EyeNoneIcon,
	DotsVerticalIcon,
	MixerHorizontalIcon,
} from '@radix-ui/react-icons';

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
	return icons[name] ?? ChevronDownIcon;
}


