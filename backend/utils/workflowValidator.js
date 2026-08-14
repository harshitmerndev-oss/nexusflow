export const validateWorkflow = (workflow) => {
  const { nodes, edges } = workflow;

  if (!nodes || nodes.length === 0) {
    return {
      valid: false,
      message: "Workflow must contain nodes",
    };
  }

  const startNode = nodes.find(
    (node) => node.type === "start"
  );

  if (!startNode) {
    return {
      valid: false,
      message: "Start node is required",
    };
  }

  return {
    valid: true,
    message: "Workflow is valid",
  };
};