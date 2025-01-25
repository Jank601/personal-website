---
title: "Enhancing LLM Interactions with Personalized Context"
date: "2024-12-28"
excerpt: Learn to tailor your LLM interactions for precision by understanding how context windows work and providing personalized data to get the most accurate and relevant answers.
---

When chatting with LLMs, sometimes you just wish it could be more specific and less general. Maybe you're a cook and you want to generate recipes based on a specific book or style, or you're writing code and want help writing a very specific API call. Models today are trained on a LOT of data, so for most questions, they know the answer or can infer what the answer should be, or better yet, some can search the web and find data to answer your question. But what happens when that isn't enough? This happens a lot when you are familiar with the subject and you can tell the LLM is spitting out garbage just trying to give you some kind of answer. When sending a question to an LLM, a lot more is being sent: first, there is the system prompt (discussed in a previous post), then there is your conversation history, and then your question. When using a tool like ChatGPT, you might feel like you are having a continuous conversation with the LLM, but on the other side, each message is a totally new interaction. Once you understand this, you can hijack the mechanism. A context window is the total amount of data an LLM can ingest in each interaction (for most big models used today, this number is pretty big). It's important to note that the more data there is, the slower the response will be and the higher the odds of something getting lost in the mix. Now that we understand how the cookie crumbles, we can add chocolate chips. Next time you are asking an LLM a specific question, provide it with your personalized context and instruct it to only answer based on it; it would look something like this:

Help me write an API call to OpenAI.  
Here is my code: your code in plain text  
Here is the documentation: file or plain text  
Make sure to base your answer on the attached documentation and integrate it into my code.