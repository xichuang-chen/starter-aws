package com.tw.kafkaDemo;


import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.apache.kafka.clients.consumer.ConsumerRecord;

@Component
public class Consumer {
    /**
     * topics = "demo" 要消费的topic名称
     * @param record
     */
    @KafkaListener(topics = "test")
    public void listen (ConsumerRecord<?, ?> record){
        System.out.println(String.format("consume msg: topic是: %s, value是: %s",
                record.topic(), record.value()));
    }
}
