---
title: Chapter 3 - Humanoid Description with URDF
sidebar_position: 5
description: Learn about URDF concepts, links and joints, and how to model humanoid structures
---

# Chapter 3: Humanoid Description with URDF

## Introduction to URDF

URDF (Unified Robot Description Format) is an XML-based format for representing robot models in ROS. It defines the physical and visual properties of a robot, including its links (rigid bodies), joints (kinematic constraints between links), and other elements like sensors and actuators.

URDF serves as the digital blueprint of a robot, enabling simulation, visualization, motion planning, and control. For humanoid robots, URDF is essential for understanding the robot's kinematic structure and for developing effective control algorithms.

## URDF Concepts: Links and Joints

### Links

A link in URDF represents a rigid body with physical and visual properties. Each link has:

- **Visual properties**: How the link looks in simulation and visualization
- **Collision properties**: How the link interacts with other objects for collision detection
- **Inertial properties**: Mass, center of mass, and inertia tensor for physics simulation

```xml
<link name="base_link">
  <visual>
    <geometry>
      <cylinder length="0.6" radius="0.2"/>
    </geometry>
    <material name="blue">
      <color rgba="0 0 .8 1"/>
    </material>
  </visual>
  <collision>
    <geometry>
      <cylinder length="0.6" radius="0.2"/>
    </geometry>
  </collision>
  <inertial>
    <mass value="10.0"/>
    <origin xyz="0 0 0"/>
    <inertia ixx="1.0" ixy="0.0" ixz="0.0" iyy="1.0" iyz="0.0" izz="1.0"/>
  </inertial>
</link>
```

### Joints

A joint in URDF connects two links and defines their kinematic relationship. The main joint types are:

- **Revolute**: Rotational joint with limits
- **Continuous**: Rotational joint without limits
- **Prismatic**: Linear sliding joint with limits
- **Fixed**: No movement between links
- **Floating**: 6 DOF movement
- **Planar**: Movement on a plane

```xml
<joint name="joint_name" type="revolute">
  <parent link="parent_link"/>
  <child link="child_link"/>
  <origin xyz="1.0 0.0 0.0" rpy="0.0 0.0 0.0"/>
  <axis xyz="0 0 1"/>
  <limit lower="-3.14" upper="3.14" effort="1000.0" velocity="0.5"/>
</joint>
```

## Modeling Humanoid Structure Using URDF

Modeling a humanoid robot in URDF involves creating a kinematic chain that represents the robot's body structure. A typical humanoid model includes:

- **Torso**: The main body segment
- **Head**: With neck joint for orientation
- **Arms**: Shoulders, elbows, wrists, and hands
- **Legs**: Hips, knees, ankles, and feet

Here's a simplified example of a humanoid torso and head:

```xml
<?xml version="1.0"?>
<robot name="simple_humanoid">
  <!-- Torso -->
  <link name="torso">
    <visual>
      <geometry>
        <box size="0.3 0.2 0.5"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <box size="0.3 0.2 0.5"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="5.0"/>
      <origin xyz="0 0 0"/>
      <inertia ixx="0.1" ixy="0" ixz="0" iyy="0.1" iyz="0" izz="0.1"/>
    </inertial>
  </link>

  <!-- Head -->
  <link name="head">
    <visual>
      <geometry>
        <sphere radius="0.1"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <sphere radius="0.1"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1.0"/>
      <origin xyz="0 0 0"/>
      <inertia ixx="0.01" ixy="0" ixz="0" iyy="0.01" iyz="0" izz="0.01"/>
    </inertial>
  </link>

  <!-- Neck joint connecting torso to head -->
  <joint name="neck_joint" type="revolute">
    <parent link="torso"/>
    <child link="head"/>
    <origin xyz="0.0 0.0 0.3"/>
    <axis xyz="0 1 0"/>
    <limit lower="-0.5" upper="0.5" effort="10.0" velocity="1.0"/>
  </joint>
</robot>
```

## The Role of URDF in Control and Simulation

URDF plays a crucial role in both robot control and simulation:

### In Simulation
- Provides the physical model for physics engines
- Enables collision detection and response
- Allows for realistic robot behavior simulation
- Supports sensor simulation (cameras, lidars, etc.)

### In Control
- Defines the kinematic structure for motion planning
- Enables inverse kinematics calculations
- Provides information for controller design
- Supports visualization of robot state

### In Motion Planning
- Defines joint limits and constraints
- Provides collision geometry for path planning
- Enables kinematic chain analysis
- Supports trajectory generation

## URDF Best Practices

1. **Start Simple**: Begin with a basic model and add complexity gradually
2. **Use Standard Joints**: Stick to well-documented joint types
3. **Validate Your Model**: Use tools like `check_urdf` to verify syntax
4. **Consider Mass Properties**: Accurate inertial properties improve simulation
5. **Organize with Xacro**: For complex models, use Xacro to avoid repetition

## Key Takeaways

- URDF is an XML-based format for describing robot models
- Links represent rigid bodies with visual, collision, and inertial properties
- Joints define kinematic relationships between links
- URDF is essential for humanoid robot modeling and control
- Proper URDF enables accurate simulation and effective control
- URDF supports both control and simulation applications

## Learning Objectives

By the end of this chapter, you should be able to:
- Explain URDF concepts including links and joints
- Understand how to model humanoid structures using URDF
- Describe the role of URDF in robot control and simulation
- Create basic URDF models for simple robot structures
- Recognize the importance of URDF in robotics applications