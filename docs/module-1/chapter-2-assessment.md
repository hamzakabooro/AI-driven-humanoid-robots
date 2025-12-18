---
title: Chapter 2 Assessment - Python Agents with rclpy
sidebar_position: 4
description: Test your understanding of Python agents with rclpy
---

# Chapter 2 Assessment: Python Agents with rclpy

## Multiple Choice Questions

### Question 1
What is rclpy?
A) A C++ client library for ROS 2
B) A Python client library for ROS 2
C) A communication protocol
D) A robot hardware component

**Correct Answer:** B

### Question 2
In the publish/subscribe model, what is the relationship between publishers and subscribers?
A) One-to-one direct connection
B) Request/response pattern
C) Many-to-many, loose coupling
D) Broadcast only

**Correct Answer:** C

### Question 3
How do you create a ROS 2 node in Python?
A) By implementing an interface
B) By subclassing the Node class
C) By using a factory function
D) By importing a module

**Correct Answer:** B

## Code Analysis Questions

### Question 4
Given the following code snippet, what does it do?
```python
def timer_callback(self):
    msg = String()
    msg.data = f'Hello World: {self.i}'
    self.publisher.publish(msg)
    self.get_logger().info(f'Publishing: "{msg.data}"')
    self.i += 1
```

**Expected Answer:** This callback function creates a String message with a counter, publishes it to a topic, logs the message, and increments the counter.

### Question 5
Explain how AI decisions can be mapped to robot actions using ROS 2.

**Expected Answer:** AI nodes can publish commands to topics that robot control nodes subscribe to, enabling the AI to influence robot behavior without direct coupling.

## Practical Exercise

### Question 6
Write a simple Python ROS 2 node that subscribes to a 'sensor_data' topic and logs the received messages.

**Expected Answer:**
```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class SensorSubscriber(Node):
    def __init__(self):
        super().__init__('sensor_subscriber')
        self.subscription = self.create_subscription(
            String,
            'sensor_data',
            self.sensor_callback,
            10)
        self.subscription  # prevent unused variable warning

    def sensor_callback(self, msg):
        self.get_logger().info(f'Received sensor data: "{msg.data}"')
```

## Learning Verification

After completing this assessment, you should be able to:
- Create Python-based ROS 2 nodes using rclpy
- Implement publish/subscribe communication patterns
- Map AI decisions to robot actions through ROS 2
- Write basic Python agents that interface with robot systems