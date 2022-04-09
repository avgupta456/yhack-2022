/* eslint-disable */

import React, { useRef, useState } from "react";

import {
  GraphView,
  BwdlTransformer, // optional, Example JSON transformer
  GraphUtils, // optional, useful utility functions
} from "react-digraph";

const GraphConfig = {
  NodeTypes: {
    task: {
      // required to show empty nodes
      typeText: "Task",
      shapeId: "#task", // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 100 100" id="task" key="0">
          <circle cx="50" cy="50" r="45"></circle>
        </symbol>
      ),
    },
    startDate: {
      typeText: "Date",
      shapeId: "#date",
      shape: (
        <symbol viewBox="0 0 100 50" id="date" key="0">
          <rect x="0" y="0" width="100" height="50" fill="white"></rect>
        </symbol>
      ),
    },
    endDate: {
      typeText: "Date",
      shapeId: "#date",
      shape: (
        <symbol viewBox="0 0 100 50" id="date" key="0">
          <rect x="0" y="0" width="100" height="50" fill="white"></rect>
        </symbol>
      ),
    },
  },
  NodeSubtypes: {},
  EdgeTypes: {
    edge: {
      // required to show empty edges
      shapeId: "#emptyEdge",
      shape: (
        <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
          <circle cx="25" cy="25" r="8" fill="currentColor">
            {" "}
          </circle>
        </symbol>
      ),
    },
  },
};

const NODE_KEY = "id"; // Allows D3 to correctly update DOM

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const sample = {
  nodes: [
    ...days.map((day, i) => ({
      id: i,
      title: day,
      x: 175 * i + 100,
      y: 100,
      type: "startDate",
    })),
    ...days.map((day, i) => ({
      id: i + days.length,
      title: day,
      x: 175 * i + 100,
      y: 700,
      type: "endDate",
    })),
    {
      id: 14,
      title: "Node A",
      x: 200,
      y: 300,
      type: "task",
    },
    {
      id: 15,
      title: "Node B",
      x: 500,
      y: 200,
      type: "task",
    },
  ],
  edges: [],
};

const Graph = () => {
  const [nodes, setNodes] = useState(sample.nodes);
  const [edges, setEdges] = useState(sample.edges);
  const [selected, setSelected] = useState(null);

  const NodeTypes = GraphConfig.NodeTypes;
  const NodeSubtypes = GraphConfig.NodeSubtypes;
  const EdgeTypes = GraphConfig.EdgeTypes;

  const onSelect = (selected) => {
    setSelected(selected);
  };

  const setStartDate = (node, newEdge) => {
    const newEdges = edges.filter((edge) => {
      return (
        edge.target !== node[NODE_KEY] ||
        (edge.target === node[NODE_KEY] &&
          nodes[edge.source].type !== "startDate")
      );
    });

    setEdges([...newEdges, newEdge]);
  };

  const setEndDate = (node, newEdge) => {
    const newEdges = edges.filter((edge) => {
      return (
        edge.source !== node[NODE_KEY] ||
        (edge.source === node[NODE_KEY] &&
          nodes[edge.target].type !== "endDate")
      );
    });

    setEdges([...newEdges, newEdge]);
  };

  const onCreateEdge = (sourceViewNode, targetViewNode) => {
    const viewEdge = {
      source: sourceViewNode[NODE_KEY],
      target: targetViewNode[NODE_KEY],
      type: "edge",
    };

    if (sourceViewNode.type == "startDate" && targetViewNode.type == "task") {
      setStartDate(targetViewNode, viewEdge);
    } else if (
      sourceViewNode.type == "task" &&
      targetViewNode.type == "endDate"
    ) {
      setEndDate(sourceViewNode, viewEdge);
    } else if (sourceViewNode.type == "task" && targetViewNode.type == "task") {
      setEdges([...edges, viewEdge]);
    }
  };

  const onCreateNode = (x, y) => {
    const id = nodes.length;
    const newNode = {
      id: id,
      title: "New Task",
      x,
      y,
      type: "task",
    };
    const newNodes = [...nodes, newNode];
    const newEdges = [
      ...edges,
      { source: 0, target: id, type: "edge" },
      { source: id, target: 13, type: "edge" },
    ];
    setNodes(newNodes);
    setEdges(newEdges);
  };

  const onDeleteSelected = (selected) => {
    if (selected.nodes.length == 0) {
      return;
    }
    const node = [...selected.nodes][0][1];
    if (node.type !== "task") {
      return;
    }
    const newEdges = edges.filter(
      (edge) => edge.source !== node.id && edge.target !== node.id,
    );
    setEdges([...newEdges]);
    const newNodes = nodes.filter((n) => n[NODE_KEY] !== node.id);
    setNodes([...newNodes]);
    setSelected(null);
  };

  return (
    <div className="w-full h-full border-1" id="graph">
      <GraphView
        ref={useRef("GraphView")}
        gridSpacing={175}
        layoutEngineType={"SnapToGrid"}
        allowMultiselect={false}
        showGraphControls={true}
        zoomDur={0}
        renderNodeText={(node) => (
          <text x={-6.5 * node.title.length} y={5} fontSize={"24px"}>
            {node.title}
          </text>
        )}
        nodeKey={NODE_KEY}
        nodes={nodes}
        edges={edges}
        selected={selected}
        nodeTypes={NodeTypes}
        nodeSubtypes={NodeSubtypes}
        edgeTypes={EdgeTypes}
        onSelect={onSelect}
        onCreateEdge={onCreateEdge}
        onCreateNode={onCreateNode}
        onDeleteSelected={onDeleteSelected}
        /*
        onSelect={this.onSelect}
        onCreateNode={this.onCreateNode}
        onUpdateNode={this.onUpdateNode}
        onDeleteNode={this.onDeleteNode}
        onCreateEdge={this.onCreateEdge}
        onSwapEdge={this.onSwapEdge}
        onDeleteEdge={this.onDeleteEdge}
        */
      />
    </div>
  );
};

export default Graph;
