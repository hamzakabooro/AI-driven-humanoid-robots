---
title: Chapter 3 Assessment - Humanoid Description with URDF
sidebar_position: 6
description: Test your understanding of URDF concepts, links and joints
---

# Chapter 3 Assessment: Humanoid Description with URDF

## Multiple Choice Questions

### Question 1
What does URDF stand for?
A) Universal Robot Definition Format
B) Unified Robot Description Format
C) Universal Robotics Data Format
D) Unified Robotics Development Framework

**Correct Answer:** B

### Question 2
In URDF, what does a 'link' represent?
A) A connection between two joints
B) A rigid body with physical and visual properties
C) A type of joint
D) A sensor definition

**Correct Answer:** B

### Question 3
Which of the following is NOT a valid joint type in URDF?
A) Revolute
B) Continuous
C) Prismatic
D) Oscillating

**Correct Answer:** D

## Short Answer Questions

### Question 4
Describe the three main properties that a URDF link can have.

**Expected Answer:** Visual properties (how the link looks), collision properties (how it interacts with other objects), and inertial properties (mass, center of mass, and inertia tensor).

### Question 5
Explain the difference between a 'revolute' and a 'continuous' joint in URDF.

**Expected Answer:** A revolute joint is a rotational joint with defined limits, while a continuous joint is a rotational joint without limits (can rotate infinitely).

## URDF Syntax Questions

### Question 6
What are the essential elements required in a URDF joint definition?

**Expected Answer:** Name, type, parent link, child link, and origin (transform from parent to child).

### Question 7
Given the following URDF joint definition, what type of joint is it and what is its range of motion?
```xml
<joint name="elbow_joint" type="revolute">
  <parent link="upper_arm"/>
  <child link="forearm"/>
  <origin xyz="0.3 0 0" rpy="0 0 0"/>
  <axis xyz="0 1 0"/>
  <limit lower="-2.0" upper="1.0" effort="30.0" velocity="1.5"/>
</joint>
```

**Expected Answer:** It's a revolute joint (rotational with limits). The range of motion is from -2.0 to 1.0 radians (about the y-axis).

## Practical Exercise

### Question 8
Sketch the basic link-joint structure for a simple humanoid arm with shoulder, elbow, and wrist joints.

**Expected Answer:**
- torso_link
  - joint: fixed (or revolute) to shoulder_link
    - joint: revolute (shoulder) to upper_arm_link
      - joint: revolute (elbow) to forearm_link
        - joint: revolute (wrist) to hand_link

## Learning Verification

After completing this assessment, you should be able to:
- Explain URDF concepts including links and joints with 80% accuracy
- Interpret URDF files to identify links and joints of humanoid robot models
- Describe the role of URDF in both robot control and simulation environments
- Create basic URDF models for simple robot structures