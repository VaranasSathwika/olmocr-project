import React, { useState, useEffect } from 'react';
import ReactFlow, { Controls, Background, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import './PipelineFlow.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 50, y: 100 },
    data: { label: 'Upload Document' },
    type: 'input',
    className: 'input-node',
  },
  {
    id: '2',
    position: { x: 250, y: 100 },
    data: { label: 'OCR Processing' },
    type: 'default',
    className: 'processing-node',
  },
  {
    id: '3',
    position: { x: 450, y: 100 },
    data: { label: 'Entity Extraction' },
    type: 'default',
    className: 'processing-node',
  },
  {
    id: '4',
    position: { x: 650, y: 100 },
    data: { label: 'Table Detection' },
    type: 'default',
    className: 'processing-node',
  },
  {
    id: '5',
    position: { x: 850, y: 100 },
    data: { label: 'Structured Data' },
    type: 'output',
    className: 'output-node',
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: false, label: 'Document' },
  { id: 'e2-3', source: '2', target: '3', animated: false, label: 'Text' },
  { id: 'e3-4', source: '3', target: '4', animated: false, label: 'Entities' },
  { id: 'e4-5', source: '4', target: '5', animated: false, label: 'Structured' },
];

function PipelineFlow({ trigger }) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  useEffect(() => {
    if (trigger) {
      const updateNode = (id, label, className) => {
        setNodes((prev) =>
          prev.map((node) =>
            node.id === id
              ? { ...node, data: { ...node.data, label }, className }
              : node
          )
        );
      };

      const animateEdge = (id, on) => {
        setEdges((prev) =>
          prev.map((edge) =>
            edge.id === id ? { ...edge, animated: on } : edge
          )
        );
      };

      // Step-by-step simulation
      updateNode('2', 'Processing OCR...', 'processing-node-active');
      animateEdge('e1-2', true);

      setTimeout(() => {
        updateNode('2', 'OCR Complete', 'success-node');
        animateEdge('e1-2', false);
        animateEdge('e2-3', true);
        updateNode('3', 'Extracting Entities...', 'processing-node-active');
      }, 1000);

      setTimeout(() => {
        updateNode('3', 'Entities Extracted', 'success-node');
        animateEdge('e2-3', false);
        animateEdge('e3-4', true);
        updateNode('4', 'Detecting Table...', 'processing-node-active');
      }, 2000);

      setTimeout(() => {
        updateNode('4', 'Table Detected', 'success-node');
        animateEdge('e3-4', false);
        animateEdge('e4-5', true);
        updateNode('5', 'Structured Output', 'output-node-active');
      }, 3000);
    }
  }, [trigger]);

  return (
    <div className="pipeline-container" style={{ marginTop: "2rem" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Pipeline</h2>
      <div
        className="flow-diagram"
        style={{
          height: "400px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1rem",
          backgroundColor: "#fff",
        }}
      >
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            nodesDraggable={false}
            nodesConnectable={false}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default PipelineFlow;
