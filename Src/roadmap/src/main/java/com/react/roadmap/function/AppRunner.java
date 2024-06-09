// package com.react.roadmap.function;
// import com.react.roadmap.data.Node;

// import com.fasterxml.jackson.databind.ObjectMapper;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.ApplicationArguments;
// import org.springframework.boot.ApplicationRunner;
// import org.springframework.core.io.Resource;
// import org.springframework.core.io.ResourceLoader;
// import org.springframework.stereotype.Component;


// @Component
// public class AppRunner implements ApplicationRunner {

//     private final ResourceLoader resourceLoader;
//     private Node[] nodeArr;


//     @Autowired
//     public AppRunner(ResourceLoader resourceLoader) {
//         this.resourceLoader = resourceLoader;
//     }


//     @Override
//     public void run(ApplicationArguments args) throws Exception {
//         Resource resource = resourceLoader.getResource("classpath:static/json/node.json");
//         ObjectMapper objectMapper = new ObjectMapper();
//         nodeArr = objectMapper.readValue(resource.getInputStream(), Node[].class);
//     }

//     public Node[] getNodeArr() {
//         return nodeArr;
//     }

// }

// package com.react.roadmap.function;

// import com.react.roadmap.data.Node;
// import com.react.roadmap.data.Node_W;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import org.springframework.stereotype.Component;

// import java.io.File;
// import java.io.IOException;

// @Component
// public class AppRunner {

//     private Node[] nodeArr;
//     private Node_W[] nodeArr_W;

//     public AppRunner() {
//         ObjectMapper objectMapper = new ObjectMapper();
//         try {
//             nodeArr = objectMapper.readValue(new File("src/main/resources/static/json/node.json"), Node[].class);
//             nodeArr_W = objectMapper.readValue(new File("src/main/resources/static/json/node_W.json"), Node_W[].class);
//         } catch (IOException e) {
//             e.printStackTrace();
//         }
//     }

//     public Node[] getNodeArr() {
//         return nodeArr;
//     }

//     public Node_W[] getNodeArr_W() {
//         return nodeArr_W;
//     }
// }

package com.react.roadmap.function;

import com.react.roadmap.data.Node;
import com.react.roadmap.data.Node_W;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AppRunner implements ApplicationRunner {

    private final ResourceLoader resourceLoader;
    private Node[] nodeArr;
    private Node_W[] nodeArr_W;

    @Autowired
    public AppRunner(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        loadNodeData();
        loadNode_WData();
    }

    private void loadNodeData() {
        try {
            Resource resource = resourceLoader.getResource("classpath:static/json/node.json");
            ObjectMapper objectMapper = new ObjectMapper();
            nodeArr = objectMapper.readValue(resource.getInputStream(), Node[].class);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void loadNode_WData() {
        try {
            Resource resource = resourceLoader.getResource("classpath:static/json/node_W.json");
            ObjectMapper objectMapper = new ObjectMapper();
            nodeArr_W = objectMapper.readValue(resource.getInputStream(), Node_W[].class);
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
