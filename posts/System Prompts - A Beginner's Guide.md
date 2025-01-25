---
title: System Prompts - A Beginner's Guide
date: '2024-01-17'
excerpt: Master the art of system prompts with this beginner's guide to enhancing LLM interactions. Learn the essentials of crafting effective system prompts for your AI projects.
---

# System Prompts - A Beginner's Guide

System prompts are the first step to setting the stage for your conversation with an LLM. Projects will live or die based on their system prompt, because if the LLM doesn't have the context, it will be even more unpredictable. When you use ChatGPT or any other tool, your questions are being sent alongside a generic system prompt created by the company. 

When you want to create your own tool, a big task is creating a system prompt. Getting this right will improve the user experience as well as simplify your tech stack. A good system prompt will save you time, money, and frustration. 

Let's break the creation down into 3 steps:
1) Understanding the best practices when creating a system prompt for your selected model
2) Create a simple system prompt as a starting point
3) Iterate and add complexities one at a time

I am going to cover 1 and 2; 3 is based on 1 and your own creativity.

This is simple: Google "System prompt practices for [model name here]". Most companies will have a few pages of documentation on this; read through them and maybe watch a YouTube video as well.

To get a good starting point, access a relatively advanced LLM where you can set the system prompt (I am doing this in AWS, but this can be done through many other services as well). Here, you will create a system prompt for creating system prompts based on step 1. Then, using this, you will test and iterate your actual system prompt.

In this demo, I will be using the Anthropic Claude 3.5 v2 model. Here you can find the system prompt used in their interface at claude.ai - [link]. 
Here you can find the documentation on system prompt best practices for their models - [link].

Go into your AWS console and search for Bedrock. You might see a different page if you haven't been in Bedrock before. Click on the three lines on the left of the screen and start by requesting access to the models you want to use. Go into the chat/text section and select the model you want; you will see that here you can input a system prompt. 

To create my system prompt creating system prompt chatbot, I do a loop, starting with a simple prompt and letting the model do the heavy lifting. Once I pick (and modify as needed) my first system prompt, I give it my actual use case. From here, you are in step 3: test -> change -> test -> add complexity, and so on. I would recommend having two windows open so you can continue using your system prompt creator chatbot to modify your actual system prompt.