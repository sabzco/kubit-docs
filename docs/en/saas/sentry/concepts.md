# Prerequisite Concepts

:::tip[Documentation]

For comprehensive information about Sentry, refer to its [official documentation](https://docs.sentry.io).

:::

## What is an Event?

In the world of software development, monitoring and logging application behavior play a crucial role in improving their quality and performance. **Sentry** comes into play precisely at this point. Every piece of data sent from the application or user to Sentry is considered an **Event**. These events are generally divided into two main categories: **Error** and **Transaction**.

:::info[Plan Limitation]

The rate of sending these events to Sentry is subject to limitations based on your subscription plan. These limits can be defined over various time periods. Importantly, each error may include multiple events, so the number of events is not necessarily equal to the number of errors.

:::

---

## Error: The Basic Event

The definition of an error may vary depending on the platform or programming language, but Sentry typically identifies and logs events such as **Exceptions** and **Unhandled Promise Rejections** as errors.

In the Sentry dashboard, the **Issues** section is designed for managing and tracking errors. The platform uses its internal algorithms to automatically group errors that occur in similar areas of the code or under similar conditions. This grouping is based on the location of occurrence, time, frequency, and other technical parameters, aiming to simplify the error analysis process for development teams.

---

## Transaction: An Event for Monitoring Application Performance

If you want to know how fast, lightweight, and efficient your application performs in practice, you should look at **Transactions**. Transactions in Sentry are used to monitor **performance** and **execution time of operations**. This section is accessible in the Performance tab.

Some events recorded as transactions include:

- Page Load
- Navigation
- Execution of a specific operation or task

When Performance Monitoring is enabled in the SDK, Sentry automatically generates transactions for many of these operations. However, note that a high volume of this data may cause you to exceed your plan's limits. In such cases, some transactions may be ignored.

### Solution? Sampling

To better manage the rate of transaction submissions, Sentry offers a feature called **Sampling**. Using the `tracesSampleRate` parameter, you can specify what percentage of transactions are sent to Sentry.

The value of this parameter ranges from 0.0 to 1.0:

- `1.0` means sending all transactions
- `0.5` means sending half of the transactions randomly

For more detailed information on how to configure this parameter, refer to the [official Sentry documentation](https://docs.sentry.io).

---

## DSN: The Address for Connecting the Application to Sentry

For your application to know where to send events, you need to use a **DSN (Data Source Name)**. This address establishes the connection between the application’s SDK and your specific project in the Sentry dashboard.

### How to Obtain a DSN?

- If you don’t yet have a project in Sentry, first create a new project.
- Then, go to the **Settings** section and find and copy the relevant address in the **Client Keys (DSN)** section.

For more detailed information, refer to the [official Sentry documentation](https://docs.sentry.io).

---

## Attachments: Additional Information for More Accurate Analysis

Each error may come with information that makes its analysis easier. These supplementary data are stored in Sentry as **Attachments**.

Examples of such attachments include:

- Log files
- Configuration files
- Error-related outputs

The presence of these files can significantly shorten the path to identifying issues for developers.

---

## Environment: In Which Environment Did the Error Occur?

One of the important tags you can define in the SDK is **Environment**. This tag specifies in which execution environment of the application an error or transaction occurred. Environments such as:

- `development`
- `testing`
- `staging`
- `production`

These tags allow you to filter errors more precisely and determine whether an issue pertains to the production version or is only seen in the development environment.

---

## Issue: Similar Errors in One Group

To simplify error management, Sentry displays them as **Issues**. Each Issue is essentially a collection of similar errors or events that typically occur in a specific area of the code or under similar conditions.

By reviewing an Issue, you can identify the root cause of a problem without needing to examine each event individually.

---

## Release: The Version of the Code Deployed on the Server

In Sentry, the concept of **Release** refers to a specific version of your code deployed in a particular environment.

If you correctly introduce a new Release in the SDK or via the API, Sentry can attribute errors and events occurring in that version to the specific Release. This capability plays a significant role in version-by-version problem analysis.

---

## Sentry SDKs: The Toolkit for Connecting to the System

**Sentry SDK** is a collection of libraries developed for various languages and frameworks. These tools enable developers to easily integrate Sentry’s capabilities into their applications.

Some supported languages include JavaScript, Python, Java, Go, PHP, .NET, and many others.

SDK use cases include:

- Logging and sending errors to the server
- Defining and sending transactions
- Setting Environment and Release
- Enabling Sampling

To view the complete list of supported SDKs and platforms, visit the official [sentry.io](https://sentry.io) website.

---

## Alerts: Get Notified at the First Error

One of Sentry’s highly useful features is its alert system. **Alerts** allow you to be immediately notified when an error occurs.

- Alerts can be defined automatically or manually (Custom).
- Notification methods are configurable: email, Slack, Webhook, etc.

This system ensures that no error goes unnoticed, keeping the development team always informed about the application’s status.

---

## Teams: Effective Collaboration in Project Management

In Sentry’s organizational structure, teams are groups of users who work together on one or more projects. When an error occurs in a project, relevant alerts are sent to the associated team members.

This structure enables:

- Better division of responsibilities
- Faster response to issues
- More effective collaboration among developers
