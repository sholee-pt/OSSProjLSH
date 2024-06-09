

package com.react.roadmap.function_W;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.react.roadmap.data.Node_W;

import java.io.File;
import java.io.IOException;
import java.util.*;

public class DijkstraAlgorithm_W {

    public static void main(String[] args) {
        if (args.length < 2) {
            System.out.println("Usage: DijkstraAlgorithm_W <startNode> <finishNode>");
            return;
        }

        String startNode = args[0];
        String finishNode = args[1];

        // 프로젝트 구조에 맞는 파일 경로 설정
        String filePath = "src/main/resources/static/json/node_W.json";
        Node_W[] nodes = loadNodesFromFile(filePath);

        if (nodes == null) {
            System.out.println("Failed to load nodes.");
            return;
        }

        DijkstraAlgorithm_W algorithm = new DijkstraAlgorithm_W();
        List<String> shortestPath = algorithm.findShortestPath(nodes, startNode, finishNode);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String jsonOutput = objectMapper.writeValueAsString(shortestPath);
            System.out.println(jsonOutput);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static Node_W[] loadNodesFromFile(String filePath) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(new File(filePath), Node_W[].class);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<String> findShortestPath(Node_W[] nodes, String startNode, String finishNode) {
        Map<String, Double> distanceMap = new HashMap<>();
        Map<String, String> previousNodeMap = new HashMap<>();
        Set<String> visitedNodes = new HashSet<>();

        for (Node_W node : nodes) {
            distanceMap.put(node.getCode(), Double.POSITIVE_INFINITY);
        }
        distanceMap.put(startNode, 0.0);

        PriorityQueue<Node_W> priorityQueue = new PriorityQueue<>(Comparator.comparingDouble(node -> distanceMap.get(node.getCode())));
        priorityQueue.offer(getNodeByCode(nodes, startNode));

        while (!priorityQueue.isEmpty()) {
            Node_W currentNode = priorityQueue.poll();
            if (currentNode == null) {
                continue;
            }

            if (visitedNodes.contains(currentNode.getCode())) {
                continue;
            }
            visitedNodes.add(currentNode.getCode());

            if (currentNode.getCode().equals(finishNode)) {
                break;
            }

            for (int i = 0; i < 8; i++) {
                String neighborCode = getNodeProperty(currentNode, "nearNode" + i);
                if (neighborCode != null && distanceMap.containsKey(neighborCode)) {
                    double edgeWeight = getNodePropertyDouble(currentNode, "weight" + i);
                    double currentDistance = distanceMap.get(currentNode.getCode());
                    double neighborDistance = distanceMap.get(neighborCode);

                    String neighborCentralNode = getNodeProperty(getNodeByCode(nodes, neighborCode), "centralNode");
                    if (neighborCentralNode != null && neighborCentralNode.equals("O")) {
                        if (!neighborCode.equals(finishNode) && !currentNode.getCode().equals(startNode)) {
                            continue;
                        }
                    }

                    double newDistance = currentDistance + edgeWeight;
                    if (newDistance < neighborDistance) {
                        distanceMap.put(neighborCode, newDistance);
                        previousNodeMap.put(neighborCode, currentNode.getCode());
                        priorityQueue.offer(getNodeByCode(nodes, neighborCode));
                    }
                }
            }
        }

        List<String> shortestPath = new ArrayList<>();
        String currentNodeCode = finishNode;

        while (currentNodeCode != null) {
            shortestPath.add(currentNodeCode);
            currentNodeCode = previousNodeMap.get(currentNodeCode);
        }

        Collections.reverse(shortestPath);  // Reverse the list to get the correct order

        return shortestPath;
    }

    private String getNodeProperty(Node_W node, String propertyName) {
        try {
            return (String) node.getClass().getMethod("get" + capitalizeFirstLetter(propertyName)).invoke(node);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private double getNodePropertyDouble(Node_W node, String propertyName) {
        try {
            return (double) node.getClass().getMethod("get" + capitalizeFirstLetter(propertyName)).invoke(node);
        } catch (Exception e) {
            e.printStackTrace();
            return 0.0;
        }
    }

    private Node_W getNodeByCode(Node_W[] nodes, String code) {
        for (Node_W node : nodes) {
            if (node.getCode().equals(code)) {
                return node;
            }
        }
        return null;
    }

    private String capitalizeFirstLetter(String str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}


