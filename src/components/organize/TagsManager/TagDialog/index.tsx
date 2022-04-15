/* eslint-disable jsx-a11y/no-autofocus */
import { TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';

import ColorPicker from './ColorPicker';
// import SubmitCancelButtons from 'components/forms/common/SubmitCancelButtons';
import TagGroupSelect from './TagGroupSelect';
import ZetkinDialog from 'components/ZetkinDialog';
import { ZetkinTag, ZetkinTagGroup } from 'types/zetkin';

interface TagDialogProps {
  open: boolean;
  onClose: () => void;
  // This should be request tag
  onSubmit: (tag: ZetkinTag) => void;
  tag?: Partial<ZetkinTag>;
}

const TagDialog: React.FunctionComponent<TagDialogProps> = ({
  open,
  onClose,
  // onSubmit,
  tag,
}) => {
  const [title, setTitle] = useState(tag?.title || '');
  const [group, setGroup] = useState<ZetkinTagGroup | null | undefined>(
    tag?.group
  );
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    if (tag) {
      setTitle(tag.title || '');
      setGroup(tag.group);
    }
  }, [tag]);

  // const submitForm = () => {
  //   const tag = {
  //     group,
  //     title,
  //   };
  //   onSubmit(tag as ZetkinTag);
  // };

  return (
    <ZetkinDialog onClose={onClose} open={open} title="Create Tag">
      <TextField
        autoFocus
        fullWidth
        label="Tag name"
        margin="normal"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        variant="outlined"
      />
      <TagGroupSelect onChange={(e, value) => setGroup(value)} value={group} />
      <ColorPicker onChange={(value) => setColor(value)} value={color} />
      {/* <SubmitCancelButtons onCancel={onClose} /> */}
    </ZetkinDialog>
  );
};

export default TagDialog;
