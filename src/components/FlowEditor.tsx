"use client";

import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  Controls,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// All styles should come from globals.css (tailwind or CSS variables)

const initialNodes: Node[] = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" },
    // Remove inline styles, let globals.css/tailwind handle appearance
  },
  {
    id: "n2",
    position: { x: 0, y: 100 },
    data: { label: "Node 2" },
    // Remove inline styles, let globals.css/tailwind handle appearance
  },
];

const initialEdges: Edge[] = [{ id: "n1-n2", source: "n1", target: "n2" }];

export default function FlowEditor() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-900">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="bg-gray-50 text-black dark:bg-gray-900"
        // Remove inline background, let globals.css/tailwind handle it
        defaultEdgeOptions={{
          // Remove inline edge styles, let globals.css/tailwind handle it
          type: "smoothstep",
        }}
        nodeTypes={{}}
        edgeTypes={{}}
        minZoom={0.1}
        maxZoom={4}
        attributionPosition="bottom-left"
      >
        <Controls />
        <Background /* color and other styles should come from globals.css */ />
      </ReactFlow>
    </div>
  );
}
