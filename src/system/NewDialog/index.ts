/**
 * Internal dependencies
 */

import { DialogClose, DialogCloseDefault } from './DialogClose';
import { DialogDescription } from './DialogDescription';
import { DialogOverlay } from './DialogOverlay';
import { DialogTitle } from './DialogTitle';
import { NewDialog } from './NewDialog';

const Root = NewDialog;
const Close = DialogClose;
const CloseDefault = DialogCloseDefault;
const Overlay = DialogOverlay;
const Title = DialogTitle;
const Description = DialogDescription;

export { NewDialog, Root, Close, CloseDefault, Overlay, Title, Description };

export default NewDialog;
