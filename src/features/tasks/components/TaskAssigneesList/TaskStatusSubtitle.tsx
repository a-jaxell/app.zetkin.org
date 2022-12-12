import { Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import ZUIRelativeTime from 'zui/ZUIRelativeTime';
import {
  ASSIGNED_STATUS,
  ZetkinAssignedTask,
} from 'features/tasks/components/types';
import { Done, NotInterested } from '@mui/icons-material';

const TaskStatusSubtitle = ({
  task,
}: {
  task: ZetkinAssignedTask;
}): JSX.Element => {
  if (task.completed) {
    return (
      <Box alignItems="center" display="flex">
        <Done fontSize="small" />
        <Box>
          <FormattedMessage
            id="misc.tasks.taskAssigneesList.completedStates.completed"
            values={{
              time: <ZUIRelativeTime datetime={task.completed as string} />,
            }}
          />
        </Box>
      </Box>
    );
  } else if (!task.completed && task.status === ASSIGNED_STATUS.IGNORED) {
    return (
      <Box alignItems="center" display="flex">
        <NotInterested fontSize="small" />
        <Box>
          <FormattedMessage
            id="misc.tasks.taskAssigneesList.completedStates.ignored"
            values={{
              time: <ZUIRelativeTime datetime={task.ignored as string} />,
            }}
          />
        </Box>
      </Box>
    );
  } else {
    return (
      <FormattedMessage id="misc.tasks.taskAssigneesList.completedStates.notCompleted" />
    );
  }
};

export default TaskStatusSubtitle;
