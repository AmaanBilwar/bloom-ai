"use client";

import React, { useState, useCallback } from "react";
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
  Panel,
  useReactFlow,
  ReactFlowProvider,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// All styles should come from globals.css (tailwind or CSS variables)

// Start with empty nodes and edges - users will create their own
const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

// Counter for generating unique node IDs
let nodeId = 0;
const getId = () => `node_${++nodeId}`;

// Custom node component with delete button
function CustomNode({
  id,
  data,
  selected,
}: {
  id: string;
  data: any;
  selected: boolean;
}) {
  const onDelete = useCallback(() => {
    // This will be handled by the parent component
    const event = new CustomEvent("deleteNode", { detail: { nodeId: id } });
    window.dispatchEvent(event);
  }, [id]);

  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 min-w-[120px] relative ${selected ? "border-blue-500" : ""}`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      {/* Delete button positioned in top-right corner */}
      <button
        onClick={onDelete}
        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-md transition-colors duration-200 z-10"
        title="Delete node"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="text-sm font-medium text-gray-700 text-center">
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}

function FlowEditorInner() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const reactFlowInstance = useReactFlow();

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

  const addNode = useCallback(() => {
    const id = getId();
    const newNode: Node = {
      id,
      type: "custom",
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
      },
      data: {
        label: `${id}`,
      },
    };

    setNodes((nds) => [...nds, newNode]);
  }, []);

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  }, []);

  const deleteAllNodes = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, []);

  // Listen for delete events from custom nodes
  React.useEffect(() => {
    const handleDeleteNode = (event: CustomEvent) => {
      deleteNode(event.detail.nodeId);
    };

    window.addEventListener("deleteNode", handleDeleteNode as EventListener);
    return () => {
      window.removeEventListener(
        "deleteNode",
        handleDeleteNode as EventListener
      );
    };
  }, [deleteNode]);

  return (
    <div className="w-full h-full relative">
      {/* Noise Texture (Darker Dots) Background, matching @page.tsx */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute inset-0 z-10">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          className="bg-transparent text-black"
          defaultEdgeOptions={{
            type: "smoothstep",
          }}
          nodeTypes={{
            custom: CustomNode,
          }}
          edgeTypes={{}}
          minZoom={0.1}
          maxZoom={4}
          attributionPosition="bottom-left"
        >
          <Controls />
          <Panel position="top-right">
            <div className="flex gap-2">
              <button
                onClick={addNode}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Node
              </button>
              <button
                onClick={deleteAllNodes}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2"
                title="Delete all nodes and connections"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3,6 5,6 21,6"></polyline>
                  <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                Delete All
              </button>
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

export default function FlowEditor() {
  return (
    <ReactFlowProvider>
      <FlowEditorInner />
    </ReactFlowProvider>
  );
}
