/**
 * Internal dependencies
 */

import { Fieldset } from './Fieldset';
import { Form } from './Form';
import { FormAutocomplete } from './FormAutocomplete';
import { FormAutocompleteMultiselect } from './FormAutocompleteMultiselect';
import { FormAutocompleteMultiselectSentinel } from './FormAutocompleteMultiselectSentinel';
import { FormSelect } from './FormSelect';
import { Legend } from './Legend';
import { Input } from '../Form/Input';
import { InputWithCopyButton } from '../Form/InputWithCopyButton';
import { Label } from '../Form/Label';
import { Textarea } from '../Form/Textarea';

const Select = FormSelect;
const Autocomplete = FormAutocomplete;
const AutocompleteMulti = FormAutocompleteMultiselect;
const AutocompleteMultiSentinel = FormAutocompleteMultiselectSentinel;
const Root = Form;

export {
	Root,
	Select,
	Autocomplete,
	AutocompleteMulti,
	AutocompleteMultiSentinel,
	Textarea,
	Input,
	InputWithCopyButton,
	Label,
	Fieldset,
	Legend,
};

export default Root;
