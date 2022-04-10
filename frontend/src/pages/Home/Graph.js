/* eslint-disable */

import React, { useRef, useState, useEffect } from "react";

import { GraphView } from "react-digraph";

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
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const N = days.length;

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
      id: i + N,
      title: day,
      x: 175 * i + 100,
      y: 700,
      type: "endDate",
    })),
  ],
  edges: [],
};

const Graph = () => {
  const [nodes, setNodes] = useState(sample.nodes);
  const [edges, setEdges] = useState(sample.edges);
  const [selected, setSelected] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hoursDone, setHoursDone] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(2);
  const [showModal, setShowModal] = useState(-1);

  const setModal = (id) => {
    setShowModal(id);
    setName(nodes[id].title);
    setDescription(nodes[id].description);
    setHoursDone(nodes[id].hoursDone);
    setHoursLeft(nodes[id].hoursLeft);
  };

  const updateNode = () => {
    const newNodes = nodes.map((node) => {
      if (node.id === showModal) {
        return {
          ...node,
          title: name,
          description: description,
          hoursDone: hoursDone,
          hoursLeft: hoursLeft,
        };
      }
      return node;
    });
    setNodes(newNodes);
    setShowModal(-1);
    setSelected(null);
  };

  const createNode = () => {
    const id = Math.max(...nodes.map((node) => node.id)) + 1;
    const newNodes = [
      ...nodes,
      {
        id,
        x: 400,
        y: 400,
        title: name,
        description: description,
        hoursDone: hoursDone,
        hoursLeft: hoursLeft,
        type: "task",
      },
    ];
    const newEdges = [
      ...edges,
      { source: 0, target: id, type: "edge" },
      { source: id, target: 2 * N - 1, type: "edge" },
    ];
    setNodes(newNodes);
    setEdges(newEdges);
    setModal(id);
  };

  const NodeTypes = GraphConfig.NodeTypes;
  const NodeSubtypes = GraphConfig.NodeSubtypes;
  const EdgeTypes = GraphConfig.EdgeTypes;

  const onSelect = (selected) => {
    console.log(selected);
    setSelected(selected);
    if (selected.nodes?.length == 0) {
      return;
    }
    const node = [...selected.nodes][0][1];
    if (node.type !== "task") {
      return;
    }
    setModal(node.id);
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
    const id = Math.max(...nodes.map((node) => node.id)) + 1;
    const newNode = {
      id: id,
      title: "New Task",
      description: "",
      hoursDone: 0,
      hoursLeft: 2,
      x,
      y,
      type: "task",
    };
    const newNodes = [...nodes, newNode];
    const newEdges = [
      ...edges,
      { source: 0, target: id, type: "edge" },
      { source: id, target: 2 * N - 1, type: "edge" },
    ];
    setNodes(newNodes);
    setEdges(newEdges);
    setModal(id);
  };

  const onDeleteSelected = (selected) => {
    console.log(selected);
    if (!selected.nodes || selected.nodes.length === 0) {
      console.log("HERE");
      const edge = [...selected.edges][0][1];
      console.log(edge);
      const newEdges = edges.filter((e) => {
        return !(e.source === edge.source && e.target === edge.target);
      });
      setEdges([...newEdges]);
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
    setShowModal(-1);
  };

  return (
    <div className="flex h-full w-full">
      <div className="w-1/3 h-full p-8">
        {showModal > 0 ? (
          <div>
            <p className="mb-1 text-2xl text-gray-700">Edit Task</p>
            <hr />
            <div className="my-6">
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="my-2">
                  Task Title
                  <input
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="my-2">
                  Task Description
                  <input
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex">
                  <div className="w-1/2 mt-2 mr-2">
                    Hours Done
                    <input
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                      value={hoursDone}
                      onChange={(e) => setHoursDone(e.target.value)}
                    />
                  </div>
                  <div className="w-1/2 mt-2 ml-2">
                    Hours Left
                    <input
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                      value={hoursLeft}
                      onChange={(e) => setHoursLeft(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="my-6">
                <button
                  type="button"
                  onClick={updateNode}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Edit Task
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="mb-1 text-2xl text-gray-700">Create Task</p>
            <hr />
            <div className="my-6">
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="my-2">
                  Task Title
                  <input
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                    placeholder=""
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="my-2">
                  Task Description
                  <input
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                    placeholder=""
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex">
                  <div className="w-1/2 mt-2 mr-2">
                    Hours Done
                    <input
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                      placeholder=""
                      onChange={(e) => setHoursDone(e.target.value)}
                    />
                  </div>
                  <div className="w-1/2 mt-2 ml-2">
                    Hours Left
                    <input
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                      placeholder=""
                      onChange={(e) => setHoursLeft(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="my-6">
                <button
                  type="button"
                  onClick={createNode}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-2/3 h-full border-1" id="graph">
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
          onBackgroundClick={() => setShowModal(-1)}
        />
      </div>
    </div>
  );
};

export default Graph;
