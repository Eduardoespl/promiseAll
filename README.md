# Resume

**Types of data fetching:**
* *Data Fetching on Demand:* This refers to fetching data after a user interacts with a page to update their experience. Examples include autocompletes, dynamic forms, and search experiences. In React, fetching this data is usually triggered in callbacks.

* *Initial Data Fetching:* This refers to the data you expect to see on a page right away when you open it. It's the data that needs to be fetched before a component ends up on the screen to show users a meaningful experience as soon as possible. In React, fetching data like this usually happens in useEffect (or in componentDidMount for class components).

**What is a “performant” React app?**
Before delving into specific patterns and code examples, it's important to understand what "performance" means for an application. When dealing with a simple component, performance can be measured by how long it takes to render it – the shorter the time, the more performant (or faster) the component is.

However, when dealing with asynchronous operations like data fetching, especially in the context of large applications and user experience, performance becomes more nuanced.

Performance depends on the message you're trying to convey to users. Imagine yourself as a storyteller, and your app is the story. What is the most important part of the story? What comes next? Does your story flow smoothly? Can it be told in parts, or do you want users to see the full story immediately, without any breaks?

Only after you have a clear idea of what your story (or app) should look like, should you start assembling it and optimizing it for speed. The true power lies not in libraries like GraphQL or Suspense, but in understanding:

1. When it's appropriate to start fetching data.
2. What can be done while data is being fetched.
3. What to do when data fetching is complete.

Having this knowledge, along with a few techniques to control all three stages of data fetching, is key to optimizing the performance of your app.

**React lifecycle and data fetching**

In React, components have a lifecycle that describes the different stages they go through from creation to destruction. This lifecycle is divided into three main phases: mounting, updating, and unmounting. Understanding these phases is crucial for managing data fetching in your components effectively.

*1. Mounting Phase:*
* constructor(): This is the first method called when a component is created. It's used for initializing state and binding event handlers.
* render(): This method is required and it returns the JSX that represents the component's UI.
* componentDidMount(): This method is called after the component is rendered for the first time. It's a good place to perform initial data fetching as the component has been added to the DOM.

*2. Updating Phase:*
* render(): This method is called whenever the component's state or props change. It re-renders the component to reflect the new state.
* componentDidUpdate(): This method is called after the component's update is flushed to the DOM. It's useful for performing additional data fetching based on the new props or state.

*3. Unmounting Phase:*

* componentWillUnmount(): This method is called before a component is removed from the DOM. It's used for cleaning up resources like event listeners or timers.

**Browser limitations and data fetching**

The text highlights an important consideration when it comes to data fetching in web applications: browser limitations. Browsers have a limit on the number of requests they can make in parallel to the same host, particularly relevant for apps using HTTP/1 (which is still common). For example, in Chrome, this limit is typically around 6 requests in parallel.

In simpler apps with few requests, it might be tempting to fire off all requests as soon as possible, store the data in a global store, and use it when needed. However, in larger apps with many data fetching requests, this strategy can lead to problems. Exceeding the parallel request limit can result in requests being queued and waiting for a slot to become available, potentially slowing down the user experience.

It's important to consider the number of initial data fetching requests in a large app and prioritize them based on their importance and impact on user experience. Avoiding unnecessary requests, optimizing the order of requests, and possibly implementing strategies like lazy loading can help manage browser limitations and ensure a smoother user experience.

**Requests waterfalls: how they appear**

The term "waterfall" in the context of web development refers to the visualization of how requests are made and processed by the browser. A waterfall chart is a graphical representation of the sequence of resources loaded by a web page. Each bar in the chart represents a resource (like HTML, CSS, JavaScript files, images, etc.), and the length of the bar indicates the time it took to load that resource.

When you load a web page, the browser starts fetching resources like HTML, CSS, and JavaScript files. As these resources are loaded, the browser may discover additional resources that need to be fetched, such as images, fonts, or additional scripts linked in the HTML or CSS files. Each of these requests is represented as a horizontal bar in the waterfall chart.

The chart is read from top to bottom, so the topmost bar represents the initial request for the HTML document. As the browser processes this request and encounters additional resources to fetch, new bars appear below the initial request, showing the sequence in which resources are loaded.

The waterfall chart provides valuable insights into how a web page loads and helps developers identify potential bottlenecks or issues that may be slowing down the loading time. By analyzing the chart, developers can optimize the loading process by prioritizing critical resources, reducing unnecessary requests, and optimizing the order in which resources are fetched.

**How to solve requests waterfall**

*Promise.all solution:*
One common approach to solving the requests waterfall problem is to use Promise.all to fetch multiple resources in parallel. Promise.all takes an array of promises and waits for all of them to resolve before proceeding. This allows you to fetch multiple resources concurrently, reducing the overall time it takes to fetch all resources.

*Parallel promises solution:*
Another solution to the requests waterfall problem is to fetch resources in parallel using multiple promises. By creating separate promises for each resource and fetching them concurrently, you can reduce the overall time it takes to fetch all resources. This approach can be more efficient than chaining promises sequentially, especially when fetching multiple resources that are not dependent on each other.

*Data providers to abstract away fetching:*
A more advanced solution to the requests waterfall problem is to use data providers to abstract away the process of fetching resources. Data providers are functions that encapsulate the logic for fetching data and can be reused across different components. By using data providers, you can centralize the data fetching logic, manage caching and error handling, and simplify the process of fetching resources in your application.