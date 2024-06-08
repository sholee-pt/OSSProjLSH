package com.react.roadmap.function_W;
import com.react.roadmap.data.Node;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

@Component
public class AppRunner_W implements ApplicationRunner {

    private final ResourceLoader resourceLoader;
    private Node[] nodeArr;


    @Autowired
    public AppRunner_W(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }


    @Override
    public void run(ApplicationArguments args) throws Exception {
        Resource resource = resourceLoader.getResource("classpath:static/json/node_W.json");
        ObjectMapper objectMapper = new ObjectMapper();
        nodeArr = objectMapper.readValue(resource.getInputStream(), Node[].class);
    }

    public Node[] getNodeArr() {
        return nodeArr;
    }

}
