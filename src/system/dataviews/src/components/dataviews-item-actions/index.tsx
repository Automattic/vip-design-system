/**
 * External dependencies
 */
import type { MouseEventHandler } from 'react';

/**
 * Adapter dependencies
 */
import { Button, HStack } from '../../adapter/components';
import { __ } from '../../adapter/i18n';
import { useMemo, useState } from '../../adapter/element';
import { getIcon } from '../../adapter/icons';

/**
 * Internal dependencies
 */
import { Menu } from '../../adapter/menu';
import type { Action, ActionModal as ActionModalType } from '../../types';

const kebabCase = (s: string) => s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const MoreVertical = getIcon('moreVertical');

export interface ActionTriggerProps< Item > {
	action: Action< Item >;
	onClick: MouseEventHandler;
	isBusy?: boolean;
	items: Item[];
}

export interface ActionModalProps< Item > {
	action: ActionModalType< Item >;
	items: Item[];
	closeModal: () => void;
}

interface ActionsMenuGroupProps< Item > {
	actions: Action< Item >[];
	item: Item;
	setActiveModalAction: ( action: ActionModalType< Item > | null ) => void;
}

interface ItemActionsProps< Item > {
	item: Item;
	actions: Action< Item >[];
	isCompact?: boolean;
}

interface CompactItemActionsProps< Item > {
	item: Item;
	actions: Action< Item >[];
	isSmall?: boolean;
}

interface PrimaryActionsProps< Item > {
	item: Item;
	actions: Action< Item >[];
}

function ButtonTrigger< Item >( {
	action,
	onClick,
	items,
}: ActionTriggerProps< Item > ) {
	const label =
		typeof action.label === 'string' ? action.label : action.label( items );
	return (
		<Button
			label={ label }
			icon={ action.icon }
			disabled={ !! action.disabled }
			accessibleWhenDisabled
			isDestructive={ action.isDestructive }
			size="compact"
			onClick={ onClick }
		/>
	);
}

function MenuItemTrigger< Item >( {
	action,
	onClick,
	items,
}: ActionTriggerProps< Item > ) {
	const label =
		typeof action.label === 'string' ? action.label : action.label( items );
	return (
		<Menu.Item disabled={ action.disabled } onClick={ onClick }>
			<Menu.ItemLabel>{ label }</Menu.ItemLabel>
		</Menu.Item>
	);
}

export function ActionModal< Item >( {
	action,
	items,
	closeModal,
}: ActionModalProps< Item > ) {
	const label =
		typeof action.label === 'string' ? action.label : action.label( items );
	return (
		<Modal
			title={ action.modalHeader || label }
			__experimentalHideHeader={ !! action.hideModalHeader }
			onRequestClose={ closeModal }
			focusOnMount={ action.modalFocusOnMount ?? true }
			size={ action.modalSize || 'medium' }
			overlayClassName={ `dataviews-action-modal dataviews-action-modal__${ kebabCase(
				action.id
			) }` }
		>
			<action.RenderModal items={ items } closeModal={ closeModal } />
		</Modal>
	);
}

export function ActionsMenuGroup< Item >( {
	actions,
	item,
	setActiveModalAction,
}: ActionsMenuGroupProps< Item > ) {
	return (
		<Menu.Group>
			{ actions.map( ( action ) => (
				<MenuItemTrigger
					key={ action.id }
					action={ action }
					onClick={ () => {
						if ( 'RenderModal' in action ) {
							setActiveModalAction( action );
							return;
						}
						action.callback( [ item ] );
					} }
					items={ [ item ] }
				/>
			) ) }
		</Menu.Group>
	);
}

export default function ItemActions< Item >( {
	item,
	actions,
	isCompact,
}: ItemActionsProps< Item > ) {
	const { primaryActions, eligibleActions } = useMemo( () => {
		// If an action is eligible for all items, doesn't need
		// to provide the `isEligible` function.
		const _eligibleActions = actions.filter(
			( action ) => ! action.isEligible || action.isEligible( item )
		);
		const _primaryActions = _eligibleActions.filter(
			( action ) => action.isPrimary && !! action.icon
		);
		return {
			primaryActions: _primaryActions,
			eligibleActions: _eligibleActions,
		};
	}, [ actions, item ] );

	if ( isCompact ) {
		return (
			<CompactItemActions
				item={ item }
				actions={ eligibleActions }
				isSmall
			/>
		);
	}

	// If all actions are primary, there is no need to render the dropdown.
	if ( primaryActions.length === eligibleActions.length ) {
		return (
			<PrimaryActions
				item={ item }
				actions={ primaryActions }
			/>
		);
	}

	return (
		<HStack
			spacing={ 1 }
			justify="flex-end"
			className="dataviews-item-actions"
			style={ {
				flexShrink: 0,
				width: 'auto',
			} }
		>
			<PrimaryActions
				item={ item }
				actions={ primaryActions }
			/>
			<CompactItemActions
				item={ item }
				actions={ eligibleActions }
			/>
		</HStack>
	);
}

function CompactItemActions< Item >( {
	item,
	actions,
	isSmall,
}: CompactItemActionsProps< Item > ) {
	const [ activeModalAction, setActiveModalAction ] = useState(
		null as ActionModalType< Item > | null
	);
	return (
		<>
			<Menu placement="bottom-end">
				<Menu.TriggerButton
					render={
						<Button
							size={ isSmall ? 'small' : 'compact' }
							icon={ MoreVertical }
							label={ __( 'Actions' ) }
							accessibleWhenDisabled
							disabled={ ! actions.length }
							className="dataviews-all-actions-button"
						/>
					}
				/>
				<Menu.Popover>
					<ActionsMenuGroup
						actions={ actions }
						item={ item }
						setActiveModalAction={ setActiveModalAction }
					/>
				</Menu.Popover>
			</Menu>
			{ !! activeModalAction && (
				<ActionModal
					action={ activeModalAction }
					items={ [ item ] }
					closeModal={ () => setActiveModalAction( null ) }
				/>
			) }
		</>
	);
}

function PrimaryActions< Item >( {
	item,
	actions,
}: PrimaryActionsProps< Item > ) {
	const [ activeModalAction, setActiveModalAction ] = useState( null as any );
	if ( ! Array.isArray( actions ) || actions.length === 0 ) {
		return null;
	}
	return (
		<>
			{ actions.map( ( action ) => (
				<ButtonTrigger
					key={ action.id }
					action={ action }
					onClick={ () => {
						if ( 'RenderModal' in action ) {
							setActiveModalAction( action );
							return;
						}
						action.callback( [ item ] );
					} }
					items={ [ item ] }
				/>
			) ) }
			{ !! activeModalAction && (
				<ActionModal
					action={ activeModalAction }
					items={ [ item ] }
					closeModal={ () => setActiveModalAction( null ) }
				/>
			) }
		</>
	);
}
