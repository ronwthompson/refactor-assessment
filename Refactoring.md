# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The nested if statements are difficult to follow from beginning to end. We can reduce the number of branching paths by isolating a few of them in the beginning. For example, we don't need to go through the whole flow chart if no event is found. Additionally, we just return hash from the event if no partitionKey exists.In the rest of the function, we make simple checks to update the candidatevariable to ensure it meets our requirements (is a string, is within the max length) before finishing. I considered using a switch statement instead but wewant to make decisions on different properties of our event, which a switch doesnot support.