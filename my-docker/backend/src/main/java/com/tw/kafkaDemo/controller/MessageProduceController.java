package com.tw.kafkaDemo.controller;
import com.tw.kafkaDemo.KafkaDemoApplication;
import com.tw.kafkaDemo.LogQueue;
import com.tw.kafkaDemo.po.LogInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/kafka")
public class MessageProduceController {


    @Autowired
    private KafkaTemplate<String,Object> kafkaTemplate;

    @GetMapping("/produce")
    public String send(@RequestParam(value = "topic") String topic, @RequestParam(value = "msg") String msg){
        kafkaTemplate.send(topic, msg);
        System.out.println(String.format("发送消息的topic为: %s! 发送的内容为: %s", topic, msg));
        return "发送消息成功!";
    }

    @GetMapping("/test")
    public String test() {
        return "server is start!  " + "\n" + KafkaDemoApplication.version;
    }

    @GetMapping("/data")
    public List<LogInfo> data() {
        return LogQueue.logs;
    }
}
