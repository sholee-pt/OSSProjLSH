
package com.react.roadmap.controller;

import com.react.roadmap.function.AppRunner;
import com.react.roadmap.function.DijkstraAlgorithm;
import com.react.roadmap.function_W.DijkstraAlgorithm_W;
import com.react.roadmap.function.GetLatLng;
import com.react.roadmap.function_W.GetLatLng_W;
import com.react.roadmap.data.Node;
import com.react.roadmap.data.Node_W;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.HashMap;
import java.util.Map;



@RestController
public class MainController {

    private final AppRunner appRunner;

    @Autowired
    public MainController(AppRunner appRunner) {
        this.appRunner = appRunner;
    }

    @GetMapping("map")
    public Map<String, Object> dataInsert(@RequestParam String start, @RequestParam String finish, @RequestParam String mode) {
        List<String> shortestPath = null;
        List<List<Double>> dLatLng = null;

        System.out.println("Received request with mode: " + mode + ", start: " + start + ", finish: " + finish);  // 로그 추가

        if ("wheelchair".equals(mode)) {
            Node_W[] nodeArr = appRunner.getNodeArr_W();
            System.out.println("Wheelchair mode: nodeArr_W length = " + nodeArr.length);  // 로그 추가
            System.out.println("First Node_W: " + nodeArr[0]);  // 첫 번째 노드의 정보 출력
            DijkstraAlgorithm_W dijkstraAlgorithm_W = new DijkstraAlgorithm_W();
            try {
                shortestPath = dijkstraAlgorithm_W.findShortestPath(nodeArr, start, finish);
                System.out.println("Wheelchair mode: shortestPath = " + shortestPath);  // 로그 추가
                GetLatLng_W getLatLng_W = new GetLatLng_W();
                dLatLng = getLatLng_W.getLatLng(nodeArr, shortestPath);
                System.out.println("Wheelchair mode: dLatLng = " + dLatLng);  // 로그 추가
            } catch (Exception e) {
                e.printStackTrace();
                System.err.println("Error in wheelchair mode processing: " + e.getMessage());
                throw e;
            }
        } else {
            Node[] nodeArr = appRunner.getNodeArr();
            System.out.println("Normal mode: nodeArr length = " + nodeArr.length);  // 로그 추가
            System.out.println("First Node: " + nodeArr[0]);  // 첫 번째 노드의 정보 출력
            DijkstraAlgorithm dijkstraAlgorithm = new DijkstraAlgorithm();
            try {
                shortestPath = dijkstraAlgorithm.findShortestPath(nodeArr, start, finish);
                System.out.println("Normal mode: shortestPath = " + shortestPath);  // 로그 추가
                GetLatLng getLatLng = new GetLatLng();
                dLatLng = getLatLng.getLatLng(nodeArr, shortestPath);
                System.out.println("Normal mode: dLatLng = " + dLatLng);  // 로그 추가
            } catch (Exception e) {
                e.printStackTrace();
                System.err.println("Error in normal mode processing: " + e.getMessage());
                throw e;
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("shortestPath", shortestPath);
        result.put("dLatLng", dLatLng);

        System.out.println("Response: " + result);

        return result;
    }
}

