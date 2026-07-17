import React, { Ref } from 'react';

import { Link } from '../../Link/Link';

type CustomLinkProps = React.AnchorHTMLAttributes< HTMLAnchorElement > & {
	ref?: Ref< HTMLAnchorElement >;
};

export const CustomLink = ( { ref, ...props }: CustomLinkProps ) => (
	// eslint-disable-next-line jsx-a11y/anchor-has-content
	<a { ...props } ref={ ref } />
);

export const CustomLinkComponentized = ( { ref, ...props }: CustomLinkProps ) => (
	<Link { ...props } ref={ ref } />
);
