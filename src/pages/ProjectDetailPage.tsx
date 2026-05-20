  import React from "react";

import { useParams } from "react-router-dom";

import { TaskCreateEdit }
from "../components/TaskCreateEdit";

import { TaskList }
from "../components/TaskList";

import { CommentList }
from "../components/CommentList";

import { CommentForm }
from "../components/CommentForm";

import { FileUploader }
from "../components/FileUploader";

export const ProjectDetailPage:
React.FC = () => {

  // URL se projectId fetch
  const { projectId } = useParams();

  // TEMP taskId
  // Later selected task dynamic hoga
  const taskId = "sample-task-id";

  if (!projectId) {

    return (
      <div>
        Project not found
      </div>
    );
  }

  return (

    <div>

      <h1>
        Project Details
      </h1>

      {/* Create/Edit Task */}
      <TaskCreateEdit
        projectId={projectId}
      />

      <hr />

      {/* Task List */}
      <TaskList
        projectId={projectId}
      />

      <hr />

      {/* Comments Section */}
      <h2>
        Task Comments
      </h2>

      <CommentList
        taskId={taskId}
      />

      <CommentForm
        taskId={taskId}
      />

      <hr />

      {/* Attachments */}
      <h2>
        Attachments
      </h2>

      <FileUploader
        taskId={taskId}
      />

    </div>
  );
};