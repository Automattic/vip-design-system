/**
 * Internal dependencies
 */

import { Fieldset } from './Fieldset';
import { Form } from './Form';
import { FormAutocomplete } from './FormAutocomplete';
import { FormAutocompleteMultiselect } from './FormAutocompleteMultiselect';
import { FormSelect } from './FormSelect';
import { Legend } from './Legend';
import { Checkbox } from '../Form/Checkbox/Checkbox';
import { Input } from '../Form/Input';
import { InputWithCopyButton } from '../Form/InputWithCopyButton';
import { Label } from '../Form/Label';
import { Radio } from '../Form/Radio/Radio';
import { RadioBoxGroup } from '../Form/RadioBoxGroup';
import { RadioGroupChip } from '../Form/RadioGroupChip';
import { Textarea } from '../Form/Textarea';
import { Toggle } from '../Form/Toggle';
import { ToggleRow } from '../Form/ToggleRow';
import { Validation } from '../Form/Validation';

const Select = FormSelect;
const Autocomplete = FormAutocomplete;
const AutocompleteMulti = FormAutocompleteMultiselect;
const Root = Form;

export {
	Root,
	Select,
	Autocomplete,
	AutocompleteMulti,
	Checkbox,
	Fieldset,
	Input,
	InputWithCopyButton,
	Label,
	Legend,
	Radio,
	RadioBoxGroup,
	RadioGroupChip,
	Textarea,
	Toggle,
	ToggleRow,
	Validation,
};

export default Root;
