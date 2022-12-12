import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { MenuItem, TextField } from '@mui/material';

import getTags from 'features/tags/api/getTags';
import { PersonTagViewColumn } from 'features/views/components/types';
import ZUIQuery from 'zui/ZUIQuery';

interface PersonTagColumnConfigFormProps {
  column: PersonTagViewColumn;
  onChange: (config: PersonTagViewColumn) => void;
}

const PersonTagColumnConfigForm: FunctionComponent<
  PersonTagColumnConfigFormProps
> = ({ column, onChange }) => {
  const intl = useIntl();
  const { orgId } = useRouter().query;
  const tagsQuery = useQuery(['tags', orgId], getTags(orgId as string));

  return (
    <ZUIQuery queries={{ tagsQuery }}>
      {({ queries: { tagsQuery } }) => {
        const onTagChange = (selectedTagId: number) => {
          onChange({
            ...column,
            config: {
              tag_id: selectedTagId,
            },
            title:
              tagsQuery.data.find((tag) => tag.id === selectedTagId)?.title ||
              '',
          });
        };
        return (
          <TextField
            fullWidth
            label={intl.formatMessage({
              id: 'misc.views.columnDialog.editor.fieldLabels.tag',
            })}
            margin="normal"
            onChange={(ev) => onTagChange(ev.target.value as unknown as number)}
            select
            value={column.config?.tag_id || ''}
            variant="standard"
          >
            {tagsQuery.data.map((tag) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.title}
              </MenuItem>
            ))}
          </TextField>
        );
      }}
    </ZUIQuery>
  );
};

export default PersonTagColumnConfigForm;
