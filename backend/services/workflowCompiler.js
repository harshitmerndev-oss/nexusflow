export const compileWorkflow = (workflow) => {
  const { nodes, edges } = workflow;

  const compiledSteps = [];

  let currentNode = nodes.find(
    (node) => node.type === "start"
  );

  while (currentNode) {
    compiledSteps.push({
      id: currentNode.id,
      type: currentNode.type,
      data: currentNode.data || {},
    });

    const nextEdge = edges.find(
      (edge) => edge.source === currentNode.id
    );

    if (!nextEdge) break;

    currentNode = nodes.find(
      (node) => node.id === nextEdge.target
    );
  }

  return compiledSteps;
};