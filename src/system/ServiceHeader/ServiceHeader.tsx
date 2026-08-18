/** @jsxImportSource theme-ui */

/**
 * External dependencies
 */
import classNames from 'classnames';
import { useTranslate } from 'i18n-calypso';
import React, { useId } from 'react';
import { BiInfoCircle } from 'react-icons/bi';
import { FaCircle } from 'react-icons/fa6';
import { ThemeUIStyleObject } from 'theme-ui';

/**
 * Internal dependencies
 */
import { Badge } from '../Badge/Badge';
import { Box } from '../Box/Box';
import { Card } from '../Card/Card';
import { Flex } from '../Flex/Flex';
import { Heading } from '../Heading/Heading';
import { Spinner } from '../Spinner/Spinner';
import { Text } from '../Text/Text';

/**
 * The statuses every service shares. Keeping the vocabulary here is the point of
 * the pattern: closely related services read the same way instead of each one
 * inventing its own wording.
 */
export type ServiceStatus =
	| 'loading'
	| 'unavailable'
	| 'disabled'
	| 'enabling'
	| 'enabled'
	| 'disabling'
	| 'error';

export type ServiceHeaderProps = {
	/** Lifecycle controls for the service, rendered on the right of the header. */
	actions?: React.ReactNode;
	/** Additional CSS class name(s) appended to the root element. */
	className?: string;
	/** What the service does, in plain language. */
	description: React.ReactNode;
	/** Instruction or notice qualifying the status, shown in the bar below the header. */
	message?: React.ReactNode;
	/** The lifecycle state of the service, shown as a badge next to the title. */
	status: ServiceStatus;
	/** Theme UI style overrides applied to the root element. */
	sx?: ThemeUIStyleObject;
	/** The name of the service. */
	title: React.ReactNode;
};

/**
 * The standard header for a service a customer can enable, check the status of,
 * and control: title and status badge, description, lifecycle actions, and a
 * helper message bar for anything that qualifies the status.
 */
export const ServiceHeader = ( {
	actions,
	className,
	description,
	message,
	status,
	sx = {},
	title,
}: ServiceHeaderProps ) => {
	const translate = useTranslate();
	const headingId = useId();

	const badgeByStatus: Record<
		ServiceStatus,
		{ label: string; variant: React.ComponentProps< typeof Badge >[ 'variant' ] }
	> = {
		loading: { label: translate( 'Loading' ), variant: 'gray' },
		unavailable: { label: translate( 'Unavailable' ), variant: 'orange' },
		disabled: { label: translate( 'Disabled' ), variant: 'gray' },
		enabling: { label: translate( 'Enabling' ), variant: 'blue' },
		enabled: { label: translate( 'Enabled' ), variant: 'green' },
		disabling: { label: translate( 'Disabling' ), variant: 'blue' },
		error: { label: translate( 'Error' ), variant: 'red' },
	};
	const badge = badgeByStatus[ status ];
	const isInTransition = status === 'loading' || status === 'enabling' || status === 'disabling';

	return (
		<Card
			as="section"
			aria-labelledby={ headingId }
			className={ classNames( 'vip-service-header-component', className ) }
			bodyStyles={ { p: 0 } }
			sx={ {
				backgroundColor: 'layer.2',
				borderRadius: 1,
				boxShadow: 'low',
				overflow: 'hidden',
				...sx,
			} }
		>
			<Flex
				sx={ {
					alignItems: [ 'stretch', 'stretch', 'center' ],
					flexDirection: [ 'column', 'column', 'row' ],
					gap: 4,
					justifyContent: 'space-between',
					py: 4,
					px: 5,
				} }
			>
				<Box aria-live="polite">
					<Flex sx={ { alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 1 } }>
						<Heading id={ headingId } variant="h5" sx={ { mb: 0 } }>
							{ title }
						</Heading>
						<Badge
							variant={ badge.variant }
							sx={ { alignItems: 'center', display: 'flex', gap: 1, mb: 0 } }
						>
							{ /* The badge carries the progress, so a service in
							     transition has one spinner and not two. */ }
							{ isInTransition && <Spinner size={ 12 } color="inherit" aria-hidden="true" /> }
							{ status === 'enabled' && (
								<FaCircle
									aria-hidden="true"
									size={ 8 }
									sx={ { color: 'tag.green.icon', mr: 0.5 } }
								/>
							) }
							{ badge.label }
						</Badge>
					</Flex>
					<Text sx={ { mb: 0 } }>{ description }</Text>
				</Box>

				{ actions && (
					<Flex sx={ { alignItems: 'center', flexShrink: 0, gap: 2 } }>{ actions }</Flex>
				) }
			</Flex>

			{ message && (
				<Flex
					sx={ {
						px: 5,
						py: 3,
						background: 'layer.1',
						gap: 2,
						alignItems: 'center',
					} }
				>
					<BiInfoCircle size={ 14 } sx={ { fill: 'texts.helper' } } />
					<Text sx={ { m: 0, fontSize: 'small', color: 'texts.helper' } }>{ message }</Text>
				</Flex>
			) }
		</Card>
	);
};

ServiceHeader.displayName = 'ServiceHeader';
