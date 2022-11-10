/**
 * Internal dependencies
 */

import { FormSelect } from './FormSelect';
import { FormAutocomplete } from './FormAutocomplete';
import { Textarea } from '../Form/Textarea';
import { Input } from '../Form/Input';
import { Form } from './Form';
import { Label } from '../Form/Label';

const Select = FormSelect;
const Autocomplete = FormAutocomplete;
const Root = Form;

export { Root, Select, Autocomplete, Textarea, Input, Label };

export default Root;
