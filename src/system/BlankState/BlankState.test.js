/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { MdContentCopy } from 'react-icons/md';

/**
 * Internal dependencies
 */
import { BlankState } from './BlankState';
import { Link } from '../Link';

// eslint-disable-next-line max-len
const image =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='79' height='79' viewBox='0 0 79 79' fill='none'%3E%3Cpath d='M66.3001 15.9C66.3001 15.9 66.3 15.8 66.2 15.8C66.1 15.7 66 15.5 65.9001 15.4C65.9001 15.4 65.9001 15.4 65.9001 15.3L44.4001 0.2C44.3001 0.0999998 44.2 0.0999994 44.1 0.0999994C44 0.0999994 44.0001 0 43.9001 0H43.3C43.2 0 43.1 0.0999994 43.1 0.0999994C43 0.0999994 42.9 0.2 42.8 0.2L28.2001 10.3C28.1 10.4 28.0001 10.5 27.9001 10.6C27.9001 10.6 27.9001 10.6 27.9001 10.7C27.8001 10.8 27.7001 11 27.7001 11.2C27.7001 11.2 27.7001 11.2 27.7001 11.3V31.1L13.9 40.8L13.7001 41C13.6001 41.1 13.6 41.1 13.6 41.2L13.5 41.3C13.5 41.4 13.4 41.5 13.4 41.5V41.6C13.4 41.7 13.3 41.8 13.3 42V62.2C13.3 62.4 13.3 62.6 13.4 62.7V62.8C13.5 62.9 13.6001 63.1 13.7001 63.2C13.7001 63.2 13.7 63.2 13.8 63.3L13.9 63.4L35.3 78.6H35.4001C35.4001 78.6 35.5 78.6 35.5 78.7H35.6C35.8 78.8 36 78.8 36.2001 78.8C36.3001 78.8 36.5 78.8 36.6 78.7H36.7001C36.8001 78.7 36.8001 78.7 36.9001 78.6C36.9001 78.6 37 78.6 37 78.5H37.1L66 58.3C66.1 58.2 66.2001 58.1 66.3001 58V15.9ZM34.6 74.5L16.1 61.3V44.7L34.6 57.8V74.5ZM36 55.3L17.2001 41.9L29 33.5L47.9001 46.9L36 55.3ZM49 44.1L30.5 31V14.4L49 27.5V44.1ZM50.5 24.9L31.6 11.5L43.5 3.2L62.4001 16.6L50.5 24.9Z' fill='%23BD9D70'/%3E%3C/svg%3E";

const defaultProps = {
	body: "Sorry, there's nothing here yet.",
	cta: <Link as="a">Explore add-ons →</Link>,
	image,
	imageAlt: 'This is the image alt',
	title: 'Power up your application',
};

describe('<BlankState />', () => {
	it('renders the BlankState component', async () => {
		const { container } = render(<BlankState {...defaultProps} />);

		expect(screen.getByText(defaultProps.body)).toBeInTheDocument();
		expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
		expect(screen.getByText('Explore add-ons →')).toBeInTheDocument();
		expect(screen.getByAltText(defaultProps.imageAlt)).toBeInTheDocument();

		// Check for accessibility issues
		await expect(await axe(container)).toHaveNoViolations();
	});

	it('renders the BlankState component with default alt text for the given image', async () => {
		const props = { ...defaultProps, imageAlt: undefined };
		const { container } = render(<BlankState {...props} />);

		expect(screen.getByAltText('Image representing the blank state')).toBeInTheDocument();

		// Check for accessibility issues
		await expect(await axe(container)).toHaveNoViolations();
	});

	it('renders the BlankState component with an icon', async () => {
		const icon = <MdContentCopy title="this is an icon" />;
		const props = { ...defaultProps, icon };
		const { container } = render(<BlankState {...props} />);

		expect(screen.getByTitle('this is an icon')).toBeInTheDocument();

		// Check for accessibility issues
		await expect(await axe(container)).toHaveNoViolations();
	});
});
