import { createRef, forwardRef, type MouseEvent } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { Button as BaseButton } from '@base-ui/react/button';
import { axe } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import {
	Badge,
	Box,
	Cluster,
	Cover,
	Flow,
	Frame,
	Grid,
	Reel,
	Region,
	Repel,
	Sidebar,
	Stack,
	Switcher,
	WithIcon,
	Wrapper,
} from '../index';

describe('generated CSS wrappers', () => {
	it('renders every wrapper with its class and no injected defaults or extra DOM', () => {
		const { container } = render(
			<>
				<Box />
				<Cluster />
				<Cover />
				<Frame />
				<Grid />
				<Reel />
				<Repel />
				<Sidebar />
				<Stack />
				<Switcher />
				<WithIcon />
				<Wrapper />
				<Flow />
				<Region />
				<Badge />
			</>
		);
		expect([...container.children].map((el) => [el.tagName, el.className])).toEqual([
			['DIV', 'box'],
			['DIV', 'cluster'],
			['DIV', 'cover'],
			['DIV', 'frame'],
			['DIV', 'grid'],
			['DIV', 'reel'],
			['DIV', 'repel'],
			['DIV', 'sidebar'],
			['DIV', 'stack'],
			['DIV', 'switcher'],
			['SPAN', 'with-icon'],
			['DIV', 'wrapper'],
			['DIV', 'flow'],
			['DIV', 'region'],
			['SPAN', 'badge type-support-label-xs'],
		]);
		expect([...container.children].every((el) => el.attributes.length === 1)).toBe(true);
	});

	it('serializes numeric options including zero and decimals without leaking configuration props', () => {
		render(
			<Box padding={0} borderWidth={1.5} surface="inverse" color="text-primary" data-testid="box">
				<Grid columns={3} minItemSize="12rem" gap={6} data-testid="grid" />
			</Box>
		);
		expect(screen.getByTestId('box')).toHaveAttribute('data-box-padding', '0');
		expect(screen.getByTestId('box')).toHaveAttribute('data-box-border-width', '1.5');
		expect(screen.getByTestId('box')).toHaveAttribute('data-box-surface', 'inverse');
		expect(screen.getByTestId('box')).toHaveAttribute('data-box-color', 'text-primary');
		expect(screen.getByTestId('box')).not.toHaveAttribute('color');
		expect(screen.getByTestId('grid')).toHaveAttribute('data-grid-columns', '3');
		expect(screen.getByTestId('grid')).toHaveAttribute('data-grid-min-item-size', '12rem');
		expect(screen.getByTestId('grid')).not.toHaveAttribute('gap');
	});

	it('keeps nested instances independent and emits no fallback attributes', () => {
		render(
			<Stack gap={8}>
				<Stack data-testid="nested">
					<Flow space={0}>Content</Flow>
				</Stack>
			</Stack>
		);
		expect(screen.getByTestId('nested')).not.toHaveAttribute('data-stack-gap');
		expect(screen.getByText('Content')).toHaveAttribute('data-flow-space', '0');
	});

	it('uses presence semantics for boolean behaviors and removes them when false', () => {
		const { rerender } = render(
			<Sidebar sticky position="end" order="reverse" data-testid="sidebar" />
		);
		expect(screen.getByTestId('sidebar')).toHaveAttribute('data-sticky', '');
		expect(screen.getByTestId('sidebar')).toHaveAttribute('data-position', 'end');
		expect(screen.getByTestId('sidebar')).toHaveAttribute('data-order', 'reverse');
		rerender(<Sidebar sticky={false} data-sticky="" data-testid="sidebar" />);
		expect(screen.getByTestId('sidebar')).not.toHaveAttribute('data-sticky');
	});

	it('supports the remaining behavior attributes', () => {
		render(
			<Reel scrollbar="hidden">
				<Repel nowrap data-testid="repel" />
			</Reel>
		);
		expect(screen.getByTestId('repel')).toHaveAttribute('data-nowrap', '');
		expect(screen.getByTestId('repel').parentElement).toHaveAttribute('data-scrollbar', 'hidden');
	});

	it('forwards native props, events and refs to the replacement element', () => {
		const ref = createRef<HTMLAnchorElement>();
		const onClick = vi.fn((event: MouseEvent<HTMLAnchorElement>) => event.preventDefault());
		render(
			<Stack
				render={<a href="/docs" ref={ref} onClick={onClick} />}
				aria-label="Documentation"
				className="custom"
			>
				Docs
			</Stack>
		);
		expect(ref.current).toBe(screen.getByRole('link'));
		expect(ref.current).toHaveAttribute('href', '/docs');
		expect(ref.current).toHaveClass('stack', 'custom');
		fireEvent.click(ref.current!);
		expect(onClick).toHaveBeenCalledOnce();
	});

	it('composes one element, merges refs/styles/events and honors explicit attributes', () => {
		const outer = createRef<HTMLElement>();
		const inner = createRef<HTMLButtonElement>();
		const calls: string[] = [];
		const { unmount } = render(
			<Box
				surface="layer-2"
				ref={outer}
				style={{ margin: 4, padding: 8 }}
				onClick={() => calls.push('outer')}
				render={
					<Stack
						gap={6}
						className="custom"
						render={
							<button
								ref={inner}
								style={{ padding: 12 }}
								data-stack-gap="1"
								onClick={() => calls.push('child')}
							/>
						}
					/>
				}
			>
				Action
			</Box>
		);
		const button = screen.getByRole('button');
		expect(button.parentElement?.className).toBe('');
		expect(button).toHaveClass('box', 'stack', 'custom');
		expect(button).toHaveAttribute('data-box-surface', 'layer-2');
		expect(button).toHaveAttribute('data-stack-gap', '6');
		expect(button).toHaveTextContent('Action');
		expect(button).not.toHaveAttribute('render');
		expect(button).not.toHaveAttribute('gap');
		expect(button).toHaveStyle({ margin: '4px', padding: '12px' });
		expect(outer.current).toBe(button);
		expect(inner.current).toBe(button);
		fireEvent.click(button);
		expect(calls).toEqual(['child', 'outer']);
		unmount();
		expect(outer.current).toBeNull();
		expect(inner.current).toBeNull();
	});

	it('gives the innermost wrapper its own typed configuration and handles false and zero', () => {
		render(
			<Stack
				gap={6}
				render={<Stack gap={0} render={<section data-stack-gap="3" />} />}
				data-testid="stack"
			/>
		);
		expect(screen.getByTestId('stack')).toHaveAttribute('data-stack-gap', '0');
		render(
			<Sidebar
				sticky={false}
				data-sticky=""
				render={<aside data-sticky="" />}
				data-testid="sidebar"
			/>
		);
		expect(screen.getByTestId('sidebar')).not.toHaveAttribute('data-sticky');
	});

	it('updates object and callback refs when the rendered element changes', () => {
		const ref = createRef<HTMLElement>();
		const first = vi.fn();
		const second = vi.fn();
		const { rerender, unmount } = render(<Box ref={ref} render={<a href="/" ref={first} />} />);
		expect(first).toHaveBeenLastCalledWith(screen.getByRole('link'));
		rerender(<Box ref={ref} render={<button ref={second} />} />);
		expect(first).toHaveBeenLastCalledWith(null);
		expect(second).toHaveBeenLastCalledWith(screen.getByRole('button'));
		expect(ref.current).toBe(screen.getByRole('button'));
		unmount();
		expect(second).toHaveBeenLastCalledWith(null);
		expect(ref.current).toBeNull();
	});

	it('passes generated attributes, children and refs through a render callback', () => {
		const ref = createRef<HTMLElement>();
		render(
			<Region space={4} ref={ref} render={(props) => <article {...props} aria-label="Release" />}>
				<h2>Release notes</h2>
				<p>Changes</p>
			</Region>
		);
		const article = screen.getByRole('article');
		expect(ref.current).toBe(article);
		expect(article).toHaveClass('region');
		expect(article).toHaveAttribute('data-region-space', '4');
		expect(article).toHaveTextContent('Release notesChanges');
	});

	it('supports Base UI handler cancellation independently of preventDefault', () => {
		const calls: string[] = [];
		const { rerender } = render(
			<Box onClick={() => calls.push('wrapper')} render={(props) => <button {...props} />} />
		);
		// Replacement handlers receive Base UI's augmented synthetic event.
		rerender(
			<Box
				onClick={() => calls.push('wrapper')}
				render={
					<BaseButton
						onClick={(event) => {
							calls.push('replacement');
							event.preventBaseUIHandler();
						}}
					/>
				}
			/>
		);
		fireEvent.click(screen.getByRole('button'));
		expect(calls).toEqual(['replacement']);
		rerender(
			<Box
				onClick={() => calls.push('wrapper')}
				render={
					<button
						onClick={(event) => {
							event.preventDefault();
							calls.push('replacement');
						}}
					/>
				}
			/>
		);
		fireEvent.click(screen.getByRole('button'));
		expect(calls).toEqual(['replacement', 'replacement', 'wrapper']);
	});

	it('forwards through a custom component with its own required props', () => {
		const Link = forwardRef<
			HTMLAnchorElement,
			{ to: string; className?: string; children?: React.ReactNode }
		>(({ to, ...props }, ref) => <a {...props} ref={ref} href={to} />);
		Link.displayName = 'Link';
		const ref = createRef<HTMLAnchorElement>();
		render(
			<Box render={<Link to="/custom" ref={ref} />} padding={4}>
				Custom link
			</Box>
		);
		expect(ref.current).toHaveAttribute('href', '/custom');
		expect(ref.current).toHaveAttribute('data-box-padding', '4');
		expect(ref.current).toHaveTextContent('Custom link');
	});

	it('composes a Base UI interactive component with a wrapper', async () => {
		const onClick = vi.fn();
		const ref = createRef<HTMLElement>();
		const { container, rerender } = render(
			<BaseButton ref={ref} onClick={onClick} render={<Box padding={4} render={<button />} />}>
				Save
			</BaseButton>
		);
		const button = screen.getByRole('button', { name: 'Save' });
		expect(ref.current).toBe(button);
		expect(button).toHaveClass('box');
		expect(button).toHaveAttribute('data-box-padding', '4');
		fireEvent.click(button);
		expect(onClick).toHaveBeenCalledOnce();
		rerender(
			<BaseButton disabled onClick={onClick} render={<Box padding={4} render={<button />} />}>
				Save
			</BaseButton>
		);
		expect(button).toBeDisabled();
		fireEvent.click(button);
		expect(onClick).toHaveBeenCalledOnce();
		expect((await axe(container)).violations).toEqual([]);
	});

	it('renders semantic Badge aliases with fixed typography and supports SSR composition', () => {
		expect(renderToString(<Badge variant="success">Published</Badge>)).toContain(
			'<span data-badge-variant="success" class="badge type-support-label-xs">Published</span>'
		);
		const markup = renderToString(
			<Region space={6} render={<Flow space={4} render={<article />} />}>
				Notes
			</Region>
		);
		expect(markup).toContain('<article');
		expect(markup).toContain('data-region-space="6"');
		expect(markup).toContain('data-flow-space="4"');
		expect(markup).toContain('>Notes</article>');
		expect(markup).not.toContain('<div');
	});

	it('rejects a Fragment replacement that would discard DOM props', () => {
		expect(() => renderToString(<Stack render={<>Invalid fragment</>} />)).toThrow(
			'render requires an element'
		);
	});

	it('preserves native semantics without accessibility violations', async () => {
		const { container } = render(
			<Region render={<main />}>
				<Stack render={<nav aria-label="Primary" />}>
					<Box render={<a href="/docs" />}>Documentation</Box>
					<Badge variant="info">New</Badge>
				</Stack>
			</Region>
		);
		expect((await axe(container)).violations).toEqual([]);
	});
});
