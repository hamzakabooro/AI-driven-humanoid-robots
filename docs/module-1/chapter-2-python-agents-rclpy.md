---
title: Chapter 2 - Python Agents with rclpy
sidebar_position: 3
description: Learn to create Python-based ROS 2 nodes using rclpy and implement publish/subscribe patterns
---

# Chapter 2: Python Agents with rclpy

## Introduction to rclpy

rclpy is the Python client library for ROS 2. It enables Python developers to create ROS 2 nodes, publish and subscribe to topics, provide and use services, and generally interact with the ROS 2 system. This library bridges the gap between Python-based AI logic and robot hardware control.

rclpy provides a Pythonic interface to the ROS 2 middleware, allowing developers to leverage Python's strengths in AI, machine learning, and rapid prototyping while maintaining compatibility with the broader ROS 2 ecosystem.

## Creating Python-based ROS 2 Nodes

A ROS 2 node in Python is created by subclassing the `Node` class from `rclpy.node`. The node serves as a container for publishers, subscribers, services, and other ROS 2 functionality.

```python
import rclpy
from rclpy.node import Node

class MyPythonNode(Node):
    def __init__(self):
        super().__init__('my_python_node')
        self.get_logger().info('MyPythonNode has been started')

def main(args=None):
    rclpy.init(args=args)
    node = MyPythonNode()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## The Publish/Subscribe Model in Python

The publish/subscribe model is a fundamental communication pattern in ROS 2 that enables decoupled, asynchronous communication between nodes. In Python, this is implemented using publishers and subscribers.

### Publishers

A publisher node sends messages to a topic that any number of other nodes can subscribe to:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello World: {self.i}'
        self.publisher.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1
```

### Subscribers

A subscriber node receives messages from a topic:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalSubscriber(Node):
    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')
```

## Mapping AI Decisions to Robot Actions

One of the core capabilities of ROS 2 is connecting AI decision-making logic to robot actions. This is typically done by having AI nodes publish commands to topics that robot control nodes subscribe to.

```python
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist  # For robot movement commands

class AIAgentNode(Node):
    def __init__(self):
        super().__init__('ai_agent')
        self.publisher = self.create_publisher(Twist, 'cmd_vel', 10)

        # Simulate AI decision-making with a timer
        self.timer = self.create_timer(1.0, self.ai_decision_callback)

    def ai_decision_callback(self):
        # This is where AI logic would determine robot actions
        msg = Twist()

        # Example: Simple decision to move forward
        msg.linear.x = 0.5  # Move forward at 0.5 m/s
        msg.angular.z = 0.0  # No rotation

        self.publisher.publish(msg)
        self.get_logger().info('AI decided: Move forward')
```

## Practical Examples of rclpy Implementation

### Example 1: Sensor Data Processing

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan

class SensorProcessor(Node):
    def __init__(self):
        super().__init__('sensor_processor')
        self.subscription = self.create_subscription(
            LaserScan,
            'scan',
            self.scan_callback,
            10)
        self.publisher = self.create_publisher(String, 'obstacle_alert', 10)

    def scan_callback(self, msg):
        # Process sensor data to detect obstacles
        min_distance = min(msg.ranges)
        if min_distance < 1.0:  # If obstacle is closer than 1 meter
            alert_msg = String()
            alert_msg.data = f'Obstacle detected at {min_distance:.2f}m'
            self.publisher.publish(alert_msg)
```

### Example 2: Action Client for Complex Tasks

```python
import rclpy
from rclpy.action import ActionClient
from rclpy.node import Node
# Assuming we have an action definition
# from my_robot_msgs.action import NavigateToPose

class NavigationAgent(Node):
    def __init__(self):
        super().__init__('navigation_agent')
        # self._action_client = ActionClient(self, NavigateToPose, 'navigate_to_pose')

    def send_goal(self, x, y, theta):
        # goal_msg = NavigateToPose.Goal()
        # goal_msg.pose.x = x
        # goal_msg.pose.y = y
        # goal_msg.pose.theta = theta
        # self._action_client.send_goal_async(goal_msg)
        pass
```

## Key Takeaways

- rclpy is the Python client library for ROS 2
- Python nodes are created by subclassing the Node class
- The publish/subscribe model enables decoupled communication
- Publishers send messages to topics, subscribers receive them
- AI decisions can be mapped to robot actions through topic communication
- rclpy enables Python's AI capabilities to control robots

## Learning Objectives

By the end of this chapter, you should be able to:
- Create Python-based ROS 2 nodes using rclpy
- Implement the publish/subscribe model to connect AI logic with robots
- Map AI decisions to robot actions through ROS 2 communication
- Understand practical examples of rclpy implementations
- Develop basic Python agents that interface with robot systems