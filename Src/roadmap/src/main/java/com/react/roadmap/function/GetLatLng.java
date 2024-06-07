// package com.react.roadmap.function;
// import java.util.*;
// import com.react.roadmap.data.Node;
// public class GetLatLng {
//     public List<List<Double>> getLatLng(Node[] nodes, List<String> shortestPath){
//         int line = 0;
//         double dLat, dLng;
//         String code;
//         List<List<Double>> dLngLat = new ArrayList<>();
//         for(int i = 0; i < shortestPath.size(); i++){
//             List<Double> temp = new ArrayList<>();
//             line = 0;
//             while(true){
//                 code = nodes[line].getCode();
//                 if(code.equals(shortestPath.get(i))){
//                     break;
//                 } else{
//                     line++;
//                 }
//             }
//             dLat = Double.parseDouble(nodes[line].getLatitude());
//             dLng = Double.parseDouble(nodes[line].getLongitude());
//             temp.add(dLat);
//             temp.add(dLng);
//             dLngLat.add(temp);
//         }
//         return dLngLat;
//     }
// }
package com.react.roadmap.function;

import java.util.*;
import com.react.roadmap.data.Node;

public class GetLatLng {
    public List<List<Double>> getLatLng(Node[] nodes, List<String> shortestPath){
        // 노드를 빠르게 검색하기 위해 Map을 사용합니다.
        Map<String, Node> nodeMap = new HashMap<>();
        for (Node node : nodes) {
            nodeMap.put(node.getCode(), node);
        }

        List<List<Double>> dLngLat = new ArrayList<>();
        for (String path : shortestPath) {
            Node node = nodeMap.get(path);
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
