import { Add } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { FormattedMessage } from 'react-intl';
import { Box, IconButton, List, ListItem, ListSubheader } from '@mui/material';

import TagChip from '../TagChip';
import { ZetkinTag } from 'utils/types/zetkin';

const TagSelectList: React.FC<{
  disableEditTags: boolean;
  disabledTags: ZetkinTag[];
  groupedTags: { id: number | 'ungrouped'; tags: ZetkinTag[]; title: string }[];
  inputValue: string;
  listProps: React.HTMLAttributes<HTMLUListElement>;
  onEdit: (tag: ZetkinTag | Pick<ZetkinTag, 'title'>) => void;
  onSelect: (tag: ZetkinTag) => void;
}> = ({
  disableEditTags,
  disabledTags,
  groupedTags,
  inputValue,
  listProps,
  onEdit,
  onSelect,
}) => {
  return (
    <List {...listProps} style={{ maxHeight: '400px', overflowY: 'scroll' }}>
      {groupedTags.map((group) => {
        // Groups
        return (
          <List
            key={group.id}
            subheader={
              <ListSubheader disableSticky>{group.title}</ListSubheader>
            }
            title={group.title}
          >
            {/* Tags */}
            {group.tags.map((tag) => {
              return (
                <ListItem key={tag.id} dense={!disableEditTags}>
                  <Box
                    alignItems="center"
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <TagChip
                      disabled={disabledTags
                        .map((disabledTags) => disabledTags.id)
                        .includes(tag.id)}
                      onClick={() => onSelect(tag)}
                      tag={tag}
                    />
                    {/* Edit tag button, only show if enabled (it's enabled by default) */}
                    {!disableEditTags && (
                      <IconButton
                        data-testid={`TagManager-TagSelect-editTag-${tag.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(tag);
                        }}
                        size="large"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </ListItem>
              );
            })}
          </List>
        );
      })}
      <ListItem
        button
        data-testid="TagManager-TagSelect-createTagOption"
        dense
        onClick={() =>
          onEdit({
            title: inputValue,
          })
        }
      >
        <Add />
        {inputValue ? (
          <FormattedMessage
            id="misc.tags.tagManager.createNamedTag"
            values={{
              b: (...chunks) => (
                <>
                  &nbsp;<b>{chunks}</b>
                </>
              ),
              name: inputValue,
            }}
          />
        ) : (
          <FormattedMessage id="misc.tags.tagManager.createTag" />
        )}
      </ListItem>
    </List>
  );
};

export default TagSelectList;
