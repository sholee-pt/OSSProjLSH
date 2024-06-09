
package com.react.roadmap.function_W;

import java.util.*;
import com.react.roadmap.data.Node_W;

public class GetLatLng_W {
    public List<List<Double>> getLatLng(Node_W[] nodes, List<String> shortestPath){
        // 노드를 빠르게 검색하기 위해 Map을 사용합니다.
        Map<String, Node_W> nodeMap = new HashMap<>();
        for (Node_W node : nodes) {
            nodeMap.put(node.getCode(), node);
        }

        List<List<Double>> dLngLat = new ArrayList<>();
        for (String path : shortestPath) {
            Node_W node = nodeMap.get(path);
            if (node != null) {
                List<Double> temp = new ArrayList<>();
                double dLat = Double.parseDouble(node.getLatitude());
                double dLng = Double.parseDouble(node.getLongitude());
                temp.add(dLat);
                temp.add(dLng);
                dLngLat.add(temp);
            } else {
                // 노드를 찾지 못했을 때의 예외 처리
                System.err.println("Node not found for code: " + path);
            }
        }
        return dLngLat;
    }
}
