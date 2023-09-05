/**
 * Internal dependencies
 */

import { FormSelect } from './FormSelect';
import { FormAutocomplete } from './FormAutocomplete';
import { FormAutocompleteMultiselect } from './FormAutocompleteMultiselect';
import { Textarea } from '../Form/Textarea';
import { Input } from '../Form/Input';
import { InputWithCopyButton } from '../Form/InputWithCopyButton';
import { Form } from './Form';
import { Fieldset } from './Fieldset';
import { Legend } from './Legend';
import { Label } from '../Form/Label';

const Select = FormSelect;
const Autocomplete = FormAutocomplete;
const AutocompleteMulti = FormAutocompleteMultiselect;
const Root = Form;

export {
	Root,
	Select,
	Autocomplete,
	AutocompleteMulti,
	Textarea,
	Input,
	InputWithCopyButton,
	Label,
	Fieldset,
	Legend,
};

export default Root;
