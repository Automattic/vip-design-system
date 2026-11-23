import { createRef, forwardRef } from 'react';
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
	type StackProps,
	type BadgeProps,
} from '../../src';

<Stack gap={0} render={<ul ref={createRef<HTMLUListElement>()} />}>
	<li>Item</li>
</Stack>;
<Box padding={13} borderWidth={1.5} surface="inverse" color="text-primary" />;
<Grid columns={3} minItemSize="12rem" />;
<Grid columns="auto-fit" />;
<Sidebar sticky position="end" order="reverse" width="20rem" />;
<Reel scrollbar="hidden" />;
<Repel nowrap={false} />;
<Frame ratio="16/9" />;
<Cluster inlineAlignment="space-between" />;
<Cover minHeight="viewport" />;
<Switcher threshold="30rem" />;
<Wrapper maxInlineSize="60rem" />;
<WithIcon gap="0.5em" />;
<Flow space="none" />;
<Region render={<section />} space={11} />;
<Badge variant="info" />;
<Badge variant="blue" />;
<Stack
	render={
		<button
			type="button"
			onClick={(event) => {
				event.currentTarget.disabled = true;
			}}
		/>
	}
/>;
<Box
	ref={createRef<HTMLElement>()}
	render={<a href="/docs" ref={createRef<HTMLAnchorElement>()} />}
>
	Link
</Box>;
<Box render={<Stack gap={6} />} />;
<Region render={(props) => <article {...props} />} space={4} />;

const stackProps: StackProps = { render: <a href="/" />, gap: 6 };
<Stack {...stackProps} />;
const badgeProps: BadgeProps = { variant: 'success' };
<Badge {...badgeProps} />;
const CustomLink = forwardRef<HTMLAnchorElement, { to: string }>((props, ref) => (
	<a href={props.to} ref={ref}>
		Link
	</a>
));
<Stack render={<CustomLink to="/docs" ref={createRef<HTMLAnchorElement>()} />} />;

// @ts-expect-error Numeric configuration accepts numeric literals, not strings.
<Stack gap="6" />;
// @ts-expect-error Not a declared spacing option.
<Stack gap={99} />;
// @ts-expect-error Fractional spacing is not a declared option.
<Stack gap={1.5} />;
// @ts-expect-error Columns are bounded.
<Grid columns={13} />;
// @ts-expect-error Arbitrary lengths are not allowed.
<Sidebar width="19rem" />;
// @ts-expect-error Sticky is a boolean presence attribute.
<Sidebar sticky="false" />;
// @ts-expect-error Not a declared direction.
<Sidebar position="left" />;
// @ts-expect-error Unknown behavior option.
<Reel scrollbar="invisible" />;
// @ts-expect-error Badge has no padding knob.
<Badge padding={4} />;
// @ts-expect-error Removed badge variant.
<Badge variant="pink" />;
// @ts-expect-error Unknown semantic variant.
<Badge variant="danger" />;
// @ts-expect-error Native color cannot widen Box's configuration union.
<Box color="rebeccapurple" />;
// @ts-expect-error Default div cannot take href.
<Stack href="/" />;
// @ts-expect-error Element-specific props belong on the replacement.
<Stack render={<a />} href="/" />;
// @ts-expect-error The replacement retains native prop checking.
<Stack render={<button href="/" />} />;
// @ts-expect-error The replacement retains native ref checking.
<Stack render={<a ref={createRef<HTMLButtonElement>()} />} />;
// @ts-expect-error Wrong ref for the default div.
<Stack ref={createRef<HTMLAnchorElement>()} />;
// @ts-expect-error The custom component still requires its own prop.
<Stack render={<CustomLink />} />;
// @ts-expect-error render accepts an element or a callback, not a tag string.
<Stack render="section" />;
// @ts-expect-error render does not accept multiple elements.
<Stack render={[<span key="one" />, <span key="two" />]} />;
// @ts-expect-error Render callback must return an element.
<Stack render={() => 'text'} />;
// @ts-expect-error Replaced API is no longer accepted.
<Stack as="section" />;
// @ts-expect-error Replaced API is no longer accepted.
<Stack asChild>
	<span />
</Stack>;
// @ts-expect-error Props are no longer generic over an as target.
const oldProps: StackProps<'a'> = {};
void oldProps;
