# Prerequisite Concepts

## Kubernetes: Container Orchestration

Kubernetes is a **container orchestration engine** platform, particularly used for managing packages built as **Docker containers**. Kubernetes helps to automatically run, scale, and recover these packages across different environments.

### Cluster {#cluster}

A **Kubernetes Cluster** consists of a **Control Plane** and a set of worker machines, referred to as **Nodes**, that run **containerized applications** (such as Docker images). Worker Nodes host **Pods**, which are the core components of an application's **Workload**.  
Each cluster requires at least one node to run pods.

### Node

Kubernetes places containers within pods to run a **Workload** and executes them on **Nodes**. A node can be a virtual or physical machine, depending on the cluster type. Each node is managed by the **Control Plane** and includes services necessary for running pods.

### Workload

In Kubernetes, a workload refers to a program running on the cluster. This program can be a standalone component or a set of components working together. In Kubernetes, workloads are always executed as a set of **Pods**. Each pod includes a group of **Containers** running on the cluster.  
Example: A web application or data processing system (consisting of one or more pods) can be defined as a workload. More precisely, workloads are executed by **Nodes**.

### Pod

A **Pod** is the smallest deployable and manageable unit in Kubernetes. A pod is a group of one or more **Containers** that share storage and network resources and have defined specifications for their execution. All components within a pod run in a **shared environment** (co-located and concurrent) and provide a logical host for running the application. The containers within a pod can easily communicate with each other and share resources. In non-cloud environments, this structure resembles applications running on a shared physical or virtual machine, similar to cloud applications running on a logical host.

### Pod Communication

Pods can communicate with each other through **Services**, which provide stable addresses and internal/external communication paths for pods. Additionally, advanced concepts like **Network Policies** are available for controlling security and access.

You configure the communication of these components through [Configuration](#manifest-config).

---

## Kubernetes Objects

**Kubernetes Objects** are persistent entities in the cluster used to represent the system's state. These objects determine:

- Which containerized applications are running and on which nodes
- What resources are available to these applications
- Policies regarding application behavior, such as restart policies, upgrades, and fault tolerance

Each object is a **record of intent**. When you create an object, the Kubernetes system continuously works to maintain it. In other words, you tell Kubernetes: "I want this desired state for my cluster."

To create, edit, or delete objects, you must use the **Kubit API interface** connected to your panel; keep this in mind when editing the **Object Manifest**.

### Namespace {#namespace}

**Namespace** in Kubernetes is an abstract concept for **isolating and categorizing resources** within a cluster. Namespaces allow you to create various virtual clusters supported by Kubernetes and separate resources allocated among projects, users, environments (e.g., dev, staging, prod), and secrets.

- Resource names must be unique within each namespace but can be repeated across different namespaces.
- Namespaces only apply to **namespaced** resources like Deployments and Services, not **cluster-wide** resources like Nodes or StorageClasses.

Manage your namespaces through the [**Namespace**](../namespace) tab.

### Infrastructure as Code

The approach of storing configuration files as code allows cluster and application configurations to be stored like software source code, versioned, reviewed, and recoverable through Git. This way, all your settings are stored in a repeatable, reviewable, and traceable format as code, instead of manual panels or variable commands. **Namespaces**, **Vaults**, and **configuration and manifest files** are all implemented this way to facilitate use in projects.

### Object Manifest {#manifest-config}

**Kubernetes manifest files** are typically written in YAML and used to define various resources, such as:

- `Deployment`
- `Service`
- `ConfigMap`

Each manifest file typically includes two nested sections:

- `spec`: The section that must be defined when creating an object, specifying the **desired state** of the resource.
- `status`: Describes the current state of the resource, automatically updated by Kubernetes.

This file can be edited in the Configuration section. You upload your unified configuration file there, and the Kubernetes **Control Plane** in the **Kubchi service** continuously checks the actual `status` and tries to keep it aligned with your desired `spec`.

#### Configuration File (ConfigMap) {#config-map}

`ConfigMap` is used to store non-sensitive application settings (such as service addresses, environment settings, public keys, etc.). The information in these files can be modified through the **Environment Variables** and **Vault** sections. Kubchi automatically creates and manages these files. In the Helm section, you have access to these configuration files. The values stored in these sections are accessible and usable through the [manifest file](../config).

---

## Helm {#helm}

Helm is a **Kubernetes package management** tool that simplifies the installation, updating, and deletion of applications. It functions like a "Linux package manager or npm for JavaScript packages" for Kubernetes and can execute various commands.

### Helm Chart {#helm-chart}

In **Helm**, charts are packages containing `YAML` templates, configuration files, and the information needed to run a specific application in Kubernetes. Library Charts are a special type of Helm chart designed to **provide shared logic and templates** but do not deploy any resources themselves. Each chart is like an installable version of an application that can be deployed with Helm. Charts can be designed with **reusable** logic to avoid repetition and increase extensibility. To deploy and source a chart, configuration files and forms are used. View the charts, rendered as `yaml` files (which are not editable but are affected by changes made through sections like Vault and Manifest), in the **Configuration** section and **Helm Editor** tab.

---

## Pack Installation

### Custom Resources {#crd}

In Kubernetes, **Custom Resources** act as extensions to the API, allowing the definition of new object types not present in the default installation. The files defining these resources (usually in YAML) are called CRDs or Custom Resource Definitions. These resources enable developers and operators to add specific capabilities to the cluster independently, without modifying the Kubernetes core. Many modern Kubernetes features, such as Operators, are built on these custom resources. After installation, these resources can be used with internal Kubernetes tools just like native resources (e.g., `Pod`).

### Operators in Kubernetes {#operator}

An **Operator** is a software extension in Kubernetes that uses **Custom Resources** to manage applications and their components.

Operators are designed based on Kubernetes principles, particularly the **Control Loop**, comparing the actual system state with the desired state and correcting any differences.

In other words, Operators are intelligent, automated tools that manage applications in Kubernetes like a "professional human operator."

### Pack {#pack}

:::info[Genpack]

To view the features defined in Kubit’s proprietary packs, see the [Chart](../charts) section.

:::

In the **Kubchi system**, a **Pack** is a proprietary type of Custom Resource Definition (CRD) used to manage the **installed version of a Helm Release** in Kubchi (independent of the Kubernetes core).

This installed version includes all resources deployed through that chart on the **Kubernetes Cluster**, along with execution status, settings, and change history.

In other words, a pack is used to deploy a package on the cluster and is essentially the installed application built from a **Helm chart** and now running on Kubernetes.

#### Key Features of Packs in Kubit:

- Each pack includes a **Helm chart** and related configuration files.
- Changes to `YAML` files can be applied to the pack in real-time.
- **Kubchi** monitors the pack’s execution status and provides features like updating, rolling back, and safe deletion.
- **All pack versions and changes** are stored in Git or an internal repository (GitOps).

### Pack Operator {#pack-operator}

In the **Kubchi system**, the **Pack Operator (PO)** is a tool developed by the Kubit team to manage custom resources, including:

- `Pack`
- `SecretReflector`
- Other proprietary resources

The primary responsibility of this operator is to manage the lifecycle of installing custom Helm charts or packs in the cluster, including:

- Installing, updating, and deleting packs
- Synchronizing the pack status with the cluster
- Applying changes made to configurations (e.g., via YAML or form) to packs
- Managing the pack lifecycle (restarting, refreshing, etc.)

  and more.

:::info[genpack]

The process of installing new applications is performed based on the powerful and flexible [**Genpack**](../charts/genpack) template. For details and capabilities of this chart, refer to its dedicated documentation page.

:::

---

## Ingress {#ingress}

**Ingress** in Kubernetes allows you to route **HTTP/HTTPS** traffic from outside the cluster to **internal Services**. These routing rules are defined by an object called `Ingress`. In simple terms, Ingress is a bridge between the outside world (the internet) and the internal services of your cluster.

### Key Features of Ingress

An Ingress can provide the following capabilities:

- Publicly accessible URLs for services
- Load balancing for requests
- TLS/SSL certificate management and SSL termination
- Name-based virtual hosting

### Ingress Controller

For Ingress to work, an **Ingress Controller** must be installed and running in the cluster. This controller is responsible for implementing and executing the rules defined in Ingress objects.

Depending on your configuration, the Ingress Controller can:

- Use an external Load Balancer
- Interface with a Router or Reverse Proxy like NGINX, Traefik, or HAProxy
- Manage TLS certificates (e.g., integration with Let’s Encrypt)

The **Kubchi service** handles the management of the Ingress Controller, and you can connect a domain to it and access Ingress capabilities through the [Domain Management](../domains) section.

---

## Event {#event}

An **Event** records information about changes in the status or performance of an object (e.g., Pod, Node, Deployment, etc.), such as:

- Successful or unsuccessful pod scheduling
- Node instability
- Failure to mount a volume
- Container restart due to a crash

Kubernetes events can fall into one of the following categories:

| Type        | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| **Normal**  | Informational messages indicating successful operations                      |
| **Warning** | Alerts, such as scheduling delays or unsuccessful mount attempts             |
| **Error**   | Typically not used; instead, Warning is used, and errors are visible in logs |

## Prometheus-Based Monitoring/Alerting System {#service-monitor}

:::info[Defining New Alerts]

You can define your alerts by making changes in [genpack](../charts/genpack/#gonbad-prometheusrule).

:::

Prometheus is an **open-source tool for system monitoring and alerting** widely used in the cloud-native ecosystem. Kubchi-managed Kubernetes clusters use this tool for service monitoring and observability.

This tool uses a **pull-based model** to collect metrics, meaning that instead of receiving data via push, **Prometheus periodically scrapes** data from services at specified intervals.

**How it works:**

1. Applications or services must expose their metrics via an **HTTP or HTTPS endpoint** (e.g., `/metrics`) in the standard Prometheus exposition format.
2. Prometheus, based on its configuration (e.g., in the `prometheus.yml` file or through CRDs in Kubernetes), periodically collects metrics from HTTP(S) endpoints at defined scrape intervals. In a Kubernetes environment, the Prometheus Operator uses CRDs like `ServiceMonitor` for automatic service discovery and another CRD called `PrometheusRule` for defining alerts.

Sample `/metrics` output for a simple application:

```
# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="GET", endpoint="/"} 1287
http_requests_total{method="POST", endpoint="/login"} 214

# HELP cpu_usage CPU usage percentage
# TYPE cpu_usage gauge
cpu_usage 67.3

# HELP memory_usage Memory usage in megabytes
# TYPE memory_usage gauge
memory_usage 512

# HELP go_gc_duration_seconds Duration of Go GC execution
# TYPE go_gc_duration_seconds summary
go_gc_duration_seconds{quantile="0.5"} 0.000031
go_gc_duration_seconds{quantile="0.9"} 0.00005
go_gc_duration_seconds{quantile="0.99"} 0.00009
go_gc_duration_seconds_sum 0.0035
go_gc_duration_seconds_count 102

# HELP process_resident_memory_bytes Resident memory size in bytes.
# TYPE process_resident_memory_bytes gauge
process_resident_memory_bytes 15892480
```

The output of this tool can be visualized using other tools like Grafana.

---

## Environment Variables

**Environment Variables** are named values stored **outside the program** and typically set by the operating system. These variables are accessible and usable by programs and processes.

In Kubernetes, when creating a **Pod**, you can define environment variables for the **Containers** within the pod. To do this, you must use the `env` or `envFrom` fields in the `YAML` configuration file.

### Difference Between `env` and `envFrom`

Each of these fields serves a different purpose:

#### env

Allows you to directly specify a value for each environment variable.

**Example:**

```yaml
env:
  - name: PORT
    value: '8080'
```

#### envFrom

Allows you to load environment variables from a defined **ConfigMap** or **Secret** in the cluster. All key-value pairs in the ConfigMap or Secret are set as environment variables in the container.

**Features:**

- You can specify a common **prefix** for all variables.
- It is a convenient method for managing environment settings in a centralized and versionable way.

**Example:**

```yaml
envFrom:
  - configMapRef:
      name: my-config
```

## Memory Resource Units in Kubernetes

In Kubernetes, memory allocation for containers is defined in **bytes** and can be specified with a number or suffix.

### Types of Suffixes:

- **Decimal (base 10):**  
   `k`, `M`, `G`, `T`, `P`, `E`  
   Example: `400M` means 400 megabytes
- **Binary (base 2):**  
   `Ki`, `Mi`, `Gi`, `Ti`, `Pi`, `Ei`  
   Example: `400Mi` means 400 mebibytes (approximately 420 megabytes)

### Important Note:

:::warning

Units are **case-sensitive**. For example:

- `400m` means 0.4 bytes
- `400M` or `400Mi` represents the actual memory value

For greater accuracy, use binary units like `Mi` and `Gi`, and always pay attention to case sensitivity.

:::
