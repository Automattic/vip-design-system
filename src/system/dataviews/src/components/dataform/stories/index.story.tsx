/**
 * WordPress dependencies
 */
import { useCallback, useMemo, useState } from '@wordpress/element';
import {
	Button,
	__experimentalVStack as VStack,
	privateApis,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import DataForm from '../index';
import { isItemValid } from '../../../validation';
import type { Field, Form, DataFormControlProps } from '../../../types';
import { unlock } from '../../../lock-unlock';

const { ValidatedTextControl } = unlock( privateApis );

type SamplePost = {
	title: string;
	order: number;
	author: number;
	status: string;
	reviewer: string;
	date: string;
	birthdate: string;
	password?: string;
	filesize?: number;
	dimensions?: string;
	tags?: string[];
	address1?: string;
	address2?: string;
	city?: string;
};

const meta = {
	title: 'DataViews/DataForm',
	component: DataForm,
	argTypes: {
		type: {
			control: { type: 'select' },
			description:
				'Chooses the default layout of each field. "regular" is the default layout.',
			options: [ 'default', 'regular', 'panel', 'card' ],
		},
		labelPosition: {
			control: { type: 'select' },
			description: 'Chooses the label position of the layout.',
			options: [ 'default', 'top', 'side', 'none' ],
		},
		openAs: {
			control: { type: 'select' },
			description: 'Chooses the type of panel to use.',
			options: [ 'default', 'dropdown', 'modal' ],
		},
	},
};
export default meta;

const fields = [
	{
		id: 'title',
		label: 'Title',
		type: 'text' as const,
	},
	{
		id: 'order',
		label: 'Order',
		type: 'integer' as const,
	},
	{
		id: 'date',
		label: 'Date',
		type: 'datetime' as const,
	},
	{
		id: 'birthdate',
		label: 'Date as options',
		type: 'datetime' as const,
		elements: [
			{ value: '', label: 'Select a date' },
			{ value: '1970-02-23T12:00:00', label: "Jane's birth date" },
			{ value: '1950-02-23T12:00:00', label: "John's birth date" },
		],
	},
	{
		id: 'author',
		label: 'Author',
		type: 'integer' as const,
		elements: [
			{ value: 1, label: 'Jane' },
			{ value: 2, label: 'John' },
		],
	},
	{
		id: 'reviewer',
		label: 'Reviewer',
		type: 'text' as const,
		Edit: 'radio' as const,
		elements: [
			{ value: 'fulano', label: 'Fulano' },
			{ value: 'mengano', label: 'Mengano' },
			{ value: 'zutano', label: 'Zutano' },
		],
	},
	{
		id: 'status',
		label: 'Status',
		type: 'text' as const,
		Edit: 'toggleGroup' as const,
		elements: [
			{ value: 'draft', label: 'Draft' },
			{ value: 'published', label: 'Published' },
			{ value: 'private', label: 'Private' },
		],
	},
	{
		id: 'email',
		label: 'Email',
		type: 'email' as const,
	},
	{
		id: 'password',
		label: 'Password',
		type: 'text' as const,
		isVisible: ( item: SamplePost ) => {
			return item.status !== 'private';
		},
	},
	{
		id: 'sticky',
		label: 'Sticky',
		type: 'boolean',
	},
	{
		id: 'can_comment',
		label: 'Allow people to leave a comment',
		type: 'boolean' as const,
		Edit: 'checkbox',
	},
	{
		id: 'filesize',
		label: 'File Size',
		type: 'integer' as const,
		readOnly: true,
	},
	{
		id: 'dimensions',
		label: 'Dimensions',
		type: 'text' as const,
		readOnly: true,
	},
	{
		id: 'tags',
		label: 'Tags',
		type: 'array' as const,
		placeholder: 'Enter comma-separated tags',
		description: 'Add tags separated by commas (e.g., "tag1, tag2, tag3")',
		elements: [
			{ value: 'astronomy', label: 'Astronomy' },
			{ value: 'book-review', label: 'Book review' },
			{ value: 'event', label: 'Event' },
			{ value: 'photography', label: 'Photography' },
			{ value: 'travel', label: 'Travel' },
		],
	},
	{
		id: 'address1',
		label: 'Address 1',
		type: 'text' as const,
	},
	{
		id: 'address2',
		label: 'Address 2',
		type: 'text' as const,
	},
	{
		id: 'city',
		label: 'City',
		type: 'text' as const,
	},
] as Field< SamplePost >[];

export const Default = ( {
	type,
	labelPosition,
	openAs,
}: {
	type: 'default' | 'regular' | 'panel' | 'card';
	labelPosition: 'default' | 'top' | 'side' | 'none';
	openAs: 'default' | 'dropdown' | 'modal';
} ) => {
	const [ post, setPost ] = useState( {
		title: 'Hello, World!',
		order: 2,
		author: 1,
		status: 'draft',
		reviewer: 'fulano',
		email: 'hello@wordpress.org',
		date: '2021-01-01T12:00:00',
		birthdate: '1950-02-23T12:00:00',
		sticky: false,
		can_comment: false,
		filesize: 1024,
		dimensions: '1920x1080',
		tags: [ 'photography' ],
	} );

	const form = useMemo(
		() => ( {
			layout: {
				type,
				labelPosition,
				openAs,
			},
			fields: [
				'title',
				'order',
				'sticky',
				'author',
				'status',
				'reviewer',
				'email',
				'password',
				'date',
				'birthdate',
				'can_comment',
				'filesize',
				'dimensions',
				'tags',
			],
		} ),
		[ type, labelPosition, openAs ]
	) as Form;

	return (
		<DataForm< SamplePost >
			data={ post }
			fields={ fields }
			form={ form }
			onChange={ ( edits ) =>
				setPost( ( prev ) => ( {
					...prev,
					...edits,
				} ) )
			}
		/>
	);
};

const CombinedFieldsComponent = ( {
	type,
	labelPosition,
	openAs,
}: {
	type: 'default' | 'regular' | 'panel' | 'card';
	labelPosition: 'default' | 'top' | 'side' | 'none';
	openAs: 'default' | 'dropdown' | 'modal';
} ) => {
	const [ post, setPost ] = useState< SamplePost >( {
		title: 'Hello, World!',
		order: 2,
		author: 1,
		status: 'draft',
		reviewer: 'fulano',
		date: '2021-01-01T12:00:00',
		birthdate: '1950-02-23T12:00:00',
		filesize: 1024,
		dimensions: '1920x1080',
		tags: [ 'photography' ],
		address1: '123 Main St',
		address2: 'Apt 4B',
		city: 'New York',
	} );

	const form = useMemo(
		() => ( {
			layout: {
				type,
				labelPosition,
				openAs,
			},
			fields: [
				'title',
				{
					id: 'status',
					label: 'Status & Visibility',
					children: [ 'status', 'password' ],
				},
				'order',
				'author',
				'filesize',
				'dimensions',
				'tags',
				{
					id: 'address1',
					label: 'Combined Address',
					children: [ 'address1', 'address2', 'city' ],
				},
			],
		} ),
		[ type, labelPosition, openAs ]
	) as Form;

	return (
		<DataForm< SamplePost >
			data={ post }
			fields={ fields }
			form={ form }
			onChange={ ( edits ) =>
				setPost( ( prev ) => ( {
					...prev,
					...edits,
				} ) )
			}
		/>
	);
};

export const CombinedFields = {
	title: 'DataViews/CombinedFields',
	render: CombinedFieldsComponent,
	argTypes: {
		...meta.argTypes,
	},
	args: {
		type: 'panel',
	},
};

function CustomEditControl< Item >( {
	data,
	field,
	onChange,
	hideLabelFromVision,
}: DataFormControlProps< Item > ) {
	const { id, label, placeholder, description } = field;
	const value = field.getValue( { item: data } );

	const onChangeControl = useCallback(
		( newValue: string ) =>
			onChange( {
				[ id ]: newValue,
			} ),
		[ id, onChange ]
	);

	return (
		<ValidatedTextControl
			required={ !! field.isValid?.required }
			label={ label }
			placeholder={ placeholder }
			value={ value ?? '' }
			help={ description }
			onChange={ onChangeControl }
			__next40pxDefaultSize
			__nextHasNoMarginBottom
			hideLabelFromVision={ hideLabelFromVision }
		/>
	);
}

const DataFormValidationComponent = ( { required }: { required: boolean } ) => {
	type ValidatedItem = {
		text: string;
		email: string;
		integer: number;
		boolean: boolean;
		customEdit: string;
		customValidation: string;
	};

	const [ post, setPost ] = useState< ValidatedItem >( {
		text: 'Hello, World!',
		email: 'hi@example.com',
		integer: 2,
		boolean: true,
		customEdit: 'custom control',
		customValidation: 'potato',
	} );

	const _fields: Field< ValidatedItem >[] = [
		{
			id: 'text',
			type: 'text' as const,
			label: 'Text',
			isValid: {
				required,
			},
		},
		{
			id: 'email',
			type: 'email' as const,
			label: 'e-mail',
			isValid: {
				required,
			},
		},
		{
			id: 'integer',
			type: 'integer' as const,
			label: 'Integer',
			isValid: {
				required,
			},
		},
		{
			id: 'boolean',
			type: 'boolean' as const,
			label: 'Boolean',
			isValid: {
				required,
			},
		},
		{
			id: 'customEdit',
			label: 'Custom Control',
			Edit: CustomEditControl,
			isValid: {
				required,
			},
		},
		{
			id: 'customValidation',
			type: 'text',
			label: 'Custom validation',
			isValid: {
				required,
				custom: ( value: ValidatedItem ) => {
					if (
						! [ 'tomato', 'potato' ].includes(
							value.customValidation
						)
					) {
						return 'Value must be one of "tomato", "potato"';
					}

					return null;
				},
			},
		},
	];

	const form = {
		fields: [
			'text',
			'email',
			'integer',
			'boolean',
			'customEdit',
			'customValidation',
		],
	};

	const canSave = isItemValid( post, _fields, form );

	return (
		<form>
			<VStack alignment="left">
				<DataForm< ValidatedItem >
					data={ post }
					fields={ _fields }
					form={ form }
					onChange={ ( edits ) =>
						setPost( ( prev ) => ( {
							...prev,
							...edits,
						} ) )
					}
				/>
				<Button
					__next40pxDefaultSize
					accessibleWhenDisabled
					disabled={ ! canSave }
					variant="primary"
				>
					Submit
				</Button>
			</VStack>
		</form>
	);
};

export const Validation = {
	title: 'DataForm/Validation',
	render: DataFormValidationComponent,
	argTypes: {
		required: {
			control: { type: 'boolean' },
			description: 'Whether or not the fields are required.',
		},
	},
	args: {
		required: true,
	},
};

const DataFormVisibilityComponent = () => {
	type Post = {
		name: string;
		email: string;
		isActive: boolean;
	};
	const [ data, setData ] = useState( {
		name: '',
		email: '',
		isActive: true,
	} );

	const _fields = [
		{ id: 'isActive', label: 'Is module active?', type: 'boolean' },
		{
			id: 'name',
			label: 'Name',
			type: 'text',
			isVisible: ( post ) => post.isActive === true,
		},
		{
			id: 'email',
			label: 'Email',
			type: 'email',
			isVisible: ( post ) => post.isActive === true,
		},
	] satisfies Field< Post >[];
	const form = {
		fields: [ 'isActive', 'name', 'email' ],
	};
	return (
		<DataForm< Post >
			data={ data }
			fields={ _fields }
			form={ form }
			onChange={ ( edits ) =>
				setData( ( prev ) => ( {
					...prev,
					...edits,
				} ) )
			}
		/>
	);
};

export const Visibility = {
	title: 'DataForm/Visibility',
	render: DataFormVisibilityComponent,
};

const LayoutCardComponent = () => {
	type Customer = {
		name: string;
		email: string;
		phone: string;
		plan: string;
		shippingAddress: string;
		billingAddress: string;
		displayPayments: boolean;
		totalOrders: number;
		totalRevenue: number;
		averageOrderValue: number;
		hasVat: boolean;
		vat: number;
		commission: number;
	};

	const customerFields: Field< Customer >[] = [
		{
			id: 'name',
			label: 'Customer Name',
			type: 'text',
		},
		{
			id: 'phone',
			label: 'Phone',
			type: 'text',
		},
		{
			id: 'email',
			label: 'Email',
			type: 'email',
		},
		{
			id: 'plan',
			label: 'Plan',
			type: 'text',
			Edit: 'toggleGroup',
			elements: [
				{ value: 'basic', label: 'Basic' },
				{ value: 'business', label: 'Business' },
				{ value: 'vip', label: 'VIP' },
			],
		},
		{
			id: 'shippingAddress',
			label: 'Shipping Address',
			type: 'text',
		},
		{
			id: 'billingAddress',
			label: 'Billing Address',
			type: 'text',
		},
		{
			id: 'displayPayments',
			label: 'Display Payments?',
			type: 'boolean',
		},
		{
			id: 'payments',
			label: 'Payments',
			type: 'text',
			readOnly: true, // Triggers using the render method instead of Edit.
			isVisible: ( item ) => item.displayPayments,
			render: ( { item } ) => {
				return (
					<p>
						The customer has made a total of { item.totalOrders }{ ' ' }
						orders, amounting to { item.totalRevenue } dollars. The
						average order value is { item.averageOrderValue }{ ' ' }
						dollars.
					</p>
				);
			},
		},
		{
			id: 'vat',
			label: 'VAT',
			type: 'integer',
		},
		{
			id: 'commission',
			label: 'Commission',
			type: 'integer',
		},
	];

	const [ customer, setCustomer ] = useState< Customer >( {
		name: 'Danyka Romaguera',
		email: 'aromaguera@example.org',
		phone: '1-828-352-1250',
		plan: 'Business',
		shippingAddress: 'N/A',
		billingAddress: 'Danyka Romaguera, West Myrtiehaven, 80240-4282, BI',
		displayPayments: true,
		totalOrders: 2,
		totalRevenue: 1430,
		averageOrderValue: 715,
		hasVat: true,
		vat: 10,
		commission: 5,
	} );

	const form = useMemo(
		() =>
			( {
				layout: {
					type: 'card',
				},
				fields: [
					{
						id: 'customerCard',
						label: 'Customer',
						children: [
							{
								id: 'customerContact',
								label: 'Contact',
								layout: { type: 'panel', labelPosition: 'top' },
								children: [
									{
										id: 'name',
										layout: {
											type: 'regular',
											labelPosition: 'top',
										},
									},
									{
										id: 'phone',
										layout: {
											type: 'regular',
											labelPosition: 'top',
										},
									},
									{
										id: 'email',
										layout: {
											type: 'regular',
											labelPosition: 'top',
										},
									},
								],
							},
							{
								id: 'plan',
								layout: { type: 'panel', labelPosition: 'top' },
							},
							{
								id: 'shippingAddress',
								layout: { type: 'panel', labelPosition: 'top' },
							},
							{
								id: 'billingAddress',
								layout: { type: 'panel', labelPosition: 'top' },
							},
							'displayPayments',
						],
					},
					{
						id: 'payments',
						layout: { type: 'card', withHeader: false },
					},
					{
						id: 'taxConfiguration',
						label: 'Taxes',
						layout: {
							type: 'card',
							isOpened: false,
						},
						children: [ 'vat', 'commission' ],
					},
				],
			} ) satisfies Form,
		[]
	);

	return (
		<DataForm
			data={ customer }
			fields={ customerFields }
			form={ form }
			onChange={ ( edits ) =>
				setCustomer( ( prev ) => ( {
					...prev,
					...edits,
				} ) )
			}
		/>
	);
};

export const LayoutCard = {
	title: 'DataForm/LayoutCard',
	render: LayoutCardComponent,
};

const LayoutMixedComponent = () => {
	const [ post, setPost ] = useState< SamplePost >( {
		title: 'Hello, World!',
		order: 2,
		author: 1,
		status: 'draft',
		reviewer: 'fulano',
		date: '2021-01-01T12:00:00',
		birthdate: '1950-02-23T12:00:00',
		filesize: 1024,
		dimensions: '1920x1080',
	} );

	const form = useMemo(
		() =>
			( {
				fields: [
					{
						id: 'title',
						layout: {
							type: 'panel',
							labelPosition: 'top',
							openAs: 'dropdown',
						},
					},
					'status',
					{ id: 'order', layout: { type: 'card' } },
					{
						id: 'authorDateCard',
						label: 'Author & Date',
						layout: {
							type: 'card',
						},
						children: [ 'author', 'date' ],
					},
				],
			} ) satisfies Form,
		[]
	);

	return (
		<DataForm< SamplePost >
			data={ post }
			fields={ fields }
			form={ form }
			onChange={ ( edits ) =>
				setPost( ( prev ) => ( {
					...prev,
					...edits,
				} ) )
			}
		/>
	);
};

export const LayoutMixed = {
	title: 'DataForm/LayoutMixed',
	render: LayoutMixedComponent,
};
