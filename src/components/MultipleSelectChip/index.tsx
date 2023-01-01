import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props {
  items: { id: number; name: string }[];
  label: string;
}

export default function MultipleSelectChip(props: Props) {
  const { items, label } = props;

  return (
    <Autocomplete
      sx={{ mt: 2 }}
      multiple
      id="checkboxes-tags-demo"
      options={items}
      fullWidth
      disableCloseOnSelect
      getOptionLabel={option => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          {option.name}
        </li>
      )}
      renderInput={params => <TextField {...params} label={label} placeholder={label} />}
    />
  );
}
