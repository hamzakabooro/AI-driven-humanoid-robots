---
title: Chapter 1 - ROS 2 Fundamentals
sidebar_position: 1
description: Learn the fundamentals of ROS 2 architecture, including nodes, topics, and services
---

# Chapter 1: ROS 2 Fundamentals

## Introduction to ROS 2

ROS 2 (Robot Operating System 2) is a flexible framework for writing robot software. It's a collection of tools, libraries, and conventions that aim to simplify the task of creating complex and robust robot behavior across a wide variety of robot platforms.

ROS 2 is designed to be the middleware that connects AI agents to humanoid robot bodies, serving as the nervous system of your robotic applications. It provides services designed for a heterogeneous computer cluster such as hardware abstraction, low-level device control, implementation of commonly used functionality, message-passing between processes, and a package management system.

## Purpose of ROS 2 in Physical AI

ROS 2 serves as the middleware connecting AI agents to humanoid robot bodies. It enables:

- Communication between different software components
- Hardware abstraction to work with various sensors and actuators
- Reusable software components (packages) that accelerate development
- Tools for visualization, simulation, and debugging
- A standardized way to structure robot applications

## Nodes, Topics, and Services

### Nodes

A node is a process that performs computation. ROS 2 is designed to be a distributed system where individual programs (nodes) can be run on different machines. Nodes are organized in a graph structure and communicate with each other through messages.

In ROS 2, nodes are written in various programming languages (C++, Python, etc.) and can be distributed across multiple machines. Each node can publish to or subscribe to multiple topics, and can provide or use multiple services.

```python
# Example of creating a simple node in Python
import rclpy
from rclpy.node import Node

class MinimalNode(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        # Node initialization code here
```

### Topics

Topics are named buses over which nodes exchange messages. A node can publish messages to a topic and/or subscribe to a topic to receive messages. This creates a many-to-many relationship where multiple nodes can publish to the same topic, and multiple nodes can subscribe to the same topic.

The publish/subscribe model enables loose coupling between nodes - the publisher doesn't know who subscribes to its data, and the subscriber doesn't know who publishes the data it receives.

### Services

Services provide a request/response communication pattern between nodes. A service has a client and a server. The client sends a request to the server, which performs an action and returns a response. This creates a direct connection between two nodes for specific tasks.

## Distributed Robot Control Model

ROS 2 uses a distributed architecture that allows different parts of a robot system to run on different machines. This distributed model enables:

- **Scalability**: Different computational tasks can run on machines with appropriate capabilities
- **Fault tolerance**: Failure of one node doesn't necessarily bring down the entire system
- **Flexibility**: Components can be developed and tested independently
- **Resource optimization**: Heavy computational tasks can be offloaded to more powerful machines

The distributed model is particularly important for humanoid robots, which often have different computational requirements for perception, planning, and control tasks.

## Key Takeaways

- ROS 2 is a middleware that connects AI agents to robot hardware
- Nodes are the basic computational elements in ROS 2
- Topics enable publish/subscribe communication (many-to-many)
- Services enable request/response communication (one-to-one)
- The distributed architecture allows for scalable robot systems
- ROS 2 enables hardware abstraction and code reusability

## Learning Objectives

By the end of this chapter, you should be able to:
- Explain the role of ROS 2 as middleware in robotic systems
- Identify the main components of ROS 2 architecture (nodes, topics, services)
- Describe the distributed control model and its advantages
- Understand how ROS 2 connects AI agents to humanoid robot bodies