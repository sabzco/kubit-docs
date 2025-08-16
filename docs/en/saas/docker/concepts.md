# Prerequisite Concepts

:::tip[Documentation]
For comprehensive information about Docker, refer to its [documentation](https://docs.docker.com/) page.
:::

Suppose you have a website consisting of three components:

- **Frontend** using React
- **Backend** using Python API
- **Database** using PostgreSQL

To develop this project, you need to install tools like **Node.js**, **Python**, and **PostgreSQL** on your system. However, the main challenge is:

How can you ensure that the versions you install do not conflict with the versions required by the project or cause errors?

## Containers

The solution to this problem is containers.

Containers are isolated processes that run in a separate environment from the main operating system. For each part of the project (frontend, backend, database), a separate container can be defined.

### Difference with Virtual Machine

A virtual machine includes a complete operating system and consumes more resources. In contrast, a container only includes the essential components needed to run an application, making it **lighter, faster, and more efficient**.

## Container Image

A **Container Image** is a read-only template that includes all the files, configurations, and dependencies required to run a container.

Examples:

- A PostgreSQL image includes: database executable files, configuration files, and required libraries.
- A Python application image includes: the Python interpreter, application code, and required dependencies.

To run a container in another environment (e.g., on a server or a teammate’s system), the **image** must be shared with that environment.

## Registry and Repository

To **store** and **share** images, a **Docker Registry** is used.

**Registry**: A central service for storing and managing container images.

**Repository**: A collection of images related to a specific project or service (e.g., different versions of an application).

The difference between a registry and a repository is that a _registry_ is the storage location for _container images_, while _repositories_ are collections of _related images_. In other words, a **Registry** is like a large library, and a **Repository** is like a shelf in that library that holds different versions of an **Image** like books.
