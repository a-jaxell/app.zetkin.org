import {
  CheckBox,
  Description,
  EventNote,
  LocalOffer,
  Person,
} from '@mui/icons-material';

import { ColumnChoice } from './types';
import DoubleIconCardVisual from '../DoubleIconCardVisual';
import getUniqueColumnName from '../../../utils/getUniqueColumnName';
import MultiIconCardVisual from '../MultiIconCardVisual';
import PersonTagConfig from '../PersonTagConfig';
import SingleIconCardVisual from '../SingleIconCardVisual';
import theme from 'theme';
import { COLUMN_TYPE, SelectedViewColumn, ZetkinViewColumn } from '../../types';

const { blue, purple, red } = theme.palette.viewColumnGallery;

export const personTag: ColumnChoice = {
  // isRestricted: true,
  color: blue,
  renderCardVisual: (color: string) => (
    <SingleIconCardVisual color={color} icon={LocalOffer} />
  ),
  renderConfigForm: (props: {
    existingColumns: ZetkinViewColumn[];
    onOutputConfigured: (columns: SelectedViewColumn[]) => void;
  }) => <PersonTagConfig onOutputConfigured={props.onOutputConfigured} />,
};

export const toggle: ColumnChoice = {
  // isRestricted: false,
  color: blue,
  defaultColumns: (intl, columns) => [
    {
      title: getUniqueColumnName(
        intl.formatMessage({
          id: 'misc.views.columnDialog.choices.toggle.columnTitle',
        }),
        columns
      ),
      type: COLUMN_TYPE.LOCAL_BOOL,
    },
  ],
  renderCardVisual: (color: string) => (
    <SingleIconCardVisual color={color} icon={CheckBox} />
  ),
};

export const followUpTemplate: ColumnChoice = {
  // isRestricted: true,
  color: purple,
  defaultColumns: (intl, columns) => [
    {
      title: getUniqueColumnName(
        intl.formatMessage({
          id: 'misc.views.columnDialog.choices.followUp.columnTitleCheckbox',
        }),
        columns
      ),
      type: COLUMN_TYPE.LOCAL_BOOL,
    },
    {
      title: getUniqueColumnName(
        intl.formatMessage({
          id: 'misc.views.columnDialog.choices.followUp.columnTitleNotes',
        }),
        columns
      ),
      type: COLUMN_TYPE.LOCAL_TEXT,
    },
  ],
  renderCardVisual: (color: string) => (
    <DoubleIconCardVisual color={color} icons={[CheckBox, Description]} />
  ),
};

export const localPerson: ColumnChoice = {
  // isRestricted: true,
  color: blue,
  defaultColumns: (intl, columns) => [
    {
      config: {
        field: COLUMN_TYPE.LOCAL_PERSON,
      },
      title: getUniqueColumnName(
        intl.formatMessage({
          id: 'misc.views.columnDialog.choices.localPerson.columnTitle',
        }),
        columns
      ),
      type: COLUMN_TYPE.LOCAL_PERSON,
    },
  ],
  renderCardVisual: (color: string) => {
    return <SingleIconCardVisual color={color} icon={Person} />;
  },
};

export const delegateTemplate: ColumnChoice = {
  // isRestricted: true,
  color: red,
  defaultColumns: (intl, columns) => [
    {
      title: getUniqueColumnName(
        intl.formatMessage({
          id: 'misc.views.columnDialog.choices.delegate.columnTitleAssignee',
        }),
        columns
      ),
      type: COLUMN_TYPE.LOCAL_PERSON,
    },
    {
      title: getUniqueColumnName(
        intl.formatMessage({
          id: 'misc.views.columnDialog.choices.delegate.columnTitleContacted',
        }),
        columns
      ),
      type: COLUMN_TYPE.LOCAL_BOOL,
    },
    {
      title: getUniqueColumnName(
        intl.formatMessage({
          id: 'misc.views.columnDialog.choices.delegate.columnTitleResponded',
        }),
        columns
      ),
      type: COLUMN_TYPE.LOCAL_BOOL,
    },
    {
      title: getUniqueColumnName(
        intl.formatMessage({
          id: 'misc.views.columnDialog.choices.delegate.columnTitleNotes',
        }),
        columns
      ),
      type: COLUMN_TYPE.LOCAL_TEXT,
    },
  ],
  renderCardVisual: (color: string) => {
    return <MultiIconCardVisual color={color} icon={Person} />;
  },
};

export const localText: ColumnChoice = {
  // isRestricted: false,
  color: blue,
  defaultColumns: (intl, columns) => [
    {
      config: {
        field: COLUMN_TYPE.LOCAL_TEXT,
      },
      title: getUniqueColumnName(
        intl.formatMessage({
          id: 'misc.views.columnDialog.choices.localText.columnTitle',
        }),
        columns
      ),
      type: COLUMN_TYPE.LOCAL_TEXT,
    },
  ],
  renderCardVisual: (color: string) => {
    return <SingleIconCardVisual color={color} icon={EventNote} />;
  },
};
