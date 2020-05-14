import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
/** @jsx jsx */
import { jsx } from "theme-ui";

import { DialogContent, DialogTrigger } from ".";

const Dialog = ({ trigger, position = "left", content, ...props }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dialogRef = useRef(null);

	const closeDialog = (e) => {
		if (!dialogRef.current.contains(e.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", closeDialog, true);

		return () => document.removeEventListener("click", closeDialog, true);
	}, []);

	return (
		<div sx={{ position: "relative" }} ref={dialogRef}>
			<DialogTrigger
				tabIndex="0"
				onKeyPress={(e) => {
					if (e.key === 13 || e.key === "Enter") {
						setIsOpen(!isOpen);
					}
				}}
				onClick={() => setIsOpen(!isOpen)}
				aria-haspopup="true"
				aria-expanded={isOpen}
			>
				{trigger}
			</DialogTrigger>
			<AnimatePresence>
				{isOpen && (
					<DialogContent
						{...props}
						position={position}
						onClose={() => setIsOpen(false)}
					>
						{content}
					</DialogContent>
				)}
			</AnimatePresence>
		</div>
	);
};

Dialog.propTypes = {
	trigger: PropTypes.node,
	position: PropTypes.string,
	content: PropTypes.node,
};

export { Dialog };
