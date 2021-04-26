package com.tw.kafkaDemo;


import com.tw.kafkaDemo.controller.MessageProduceController;
import com.tw.kafkaDemo.po.LogInfo;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import sun.rmi.runtime.Log;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Component
public class Consumer {
    /**
     * topics = "demo" 要消费的topic名称
     * @param record
     */
    @KafkaListener(topics = "test")
    public void listen (ConsumerRecord<?, ?> record){
        LogInfo logInfo = new LogInfo();
        logInfo.setBody(String.valueOf(record.value()));
        logInfo.setTopic(record.topic());
        Date date = new Date();
        String strDateFormat = "yyyy-MM-dd HH:mm:ss";
        SimpleDateFormat sdf = new SimpleDateFormat(strDateFormat);
        logInfo.setDate(sdf.format(date));
        LogQueue.logs.add(logInfo);
        System.out.println(String.format("consume msg: topic是: %s, value是: %s",
                record.topic(), record.value()));
    }
}
