import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Autocomplete, { AutocompleteRenderOptionState } from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export interface IMultipleSelectChipItem {
  id: number;
  name: string;
  children?: IMultipleSelectChipItem[];
}

export interface Props {
  items: IMultipleSelectChipItem[];
  label: string;
}

export default function MultipleSelectChip(props: Props) {
  //Const
  const { items, label } = props;

  const renderItem = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: IMultipleSelectChipItem,
    state: AutocompleteRenderOptionState,
  ) => {
    return (
      <>
        <li key={option.id.toString()} {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={state.selected} />
          {option.name}
        </li>
        {!!option.children && <div> {option.children.map(v => renderItem(props, v, state))}</div>}
      </>
    );
  };

  return (
    <Autocomplete
      sx={{ mt: 2 }}
      multiple
      id="checkboxes-tags-demo"
      options={items}
      fullWidth
      disableCloseOnSelect
      getOptionLabel={option => option.name}
      renderOption={renderItem}
      renderInput={params => <TextField {...params} label={label} placeholder={label} />}
    />
  );
}
