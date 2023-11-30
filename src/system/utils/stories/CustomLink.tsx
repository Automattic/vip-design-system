import React, { Ref, forwardRef } from 'react';

export const CustomLink = forwardRef< HTMLAnchorElement >(
	// eslint-disable-next-line jsx-a11y/anchor-has-content
	( props, ref: Ref< HTMLAnchorElement > ) => <a { ...props } ref={ ref } />
);
