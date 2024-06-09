
// }

package com.react.roadmap.function_W;

import com.react.roadmap.data.Node;
import com.react.roadmap.data.Node_W;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;

@Component
public class AppRunner_W {

    private Node[] nodeArr;
    private Node_W[] nodeArr_W;

    public AppRunner_W() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            nodeArr = objectMapper.readValue(new File("src/main/resources/static/json/node.json"), Node[].class);
            nodeArr_W = objectMapper.readValue(new File("src/main/resources/static/json/node_W.json"), Node_W[].class);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Node[] getNodeArr() {
        return nodeArr;
    }

    public Node_W[] getNodeArr_W() {
        return nodeArr_W;
    }
}
