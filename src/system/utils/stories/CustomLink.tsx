import React, { Ref, forwardRef } from 'react';

import { Link } from '../../Link/Link';

export const CustomLink = forwardRef< HTMLAnchorElement >(
	// eslint-disable-next-line jsx-a11y/anchor-has-content
	( props, ref: Ref< HTMLAnchorElement > ) => <a { ...props } ref={ ref } />
);

export const CustomLinkComponentized = forwardRef< HTMLAnchorElement >(
	( props, ref: Ref< HTMLAnchorElement > ) => <Link { ...props } ref={ ref } />
);
