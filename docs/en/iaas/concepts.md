# Prerequisite Concepts

## Virtual Machine

A Virtual Machine (VM) is an isolated computing environment that simulates the functionality of a physical system through software. Each VM has its own operating system, applications, and configurations but shares hardware resources (such as CPU, memory, and storage) with other VMs on a physical server.  
This isolation enables running multiple virtual machines on a single host without interference. Virtual machines are commonly used for:

- **Optimizing hardware resource usage**
- **Running applications on different operating systems**
- **Testing software in controlled environments**
- **Enhancing infrastructure flexibility and scalability**

### Differences Between Virtual Machine (VM) and Other Hosting Solutions

| Feature                          | Virtual Machine (VM)                                                                | Hosting Solution                                                                                                                                           |
| -------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Definition**                   | A virtualized environment running on a physical server using a hypervisor.          | A service provided by hosting companies for hosting websites, applications, or data, typically including management, support, and pre-configured resources |
| **Technology Type**              | Infrastructure layer (IaaS)                                                         | Service layer (SaaS, PaaS, or a combination)                                                                                                               |
| **Control Level**                | Full control over the operating system, network settings, and software installation | Limited control; depends on the hosting type (shared, VPS, dedicated, managed)                                                                             |
| **Target Audience**              | Developers, DevOps, infrastructure administrators                                   | End-users, webmasters, small to medium business owners                                                                                                     |
| **Use Cases**                    | Running custom machines, test environments, simulations, scalable infrastructure    | Hosting websites, online stores, web applications, organizational email                                                                                    |
| **Configuration and Management** | Requires technical expertise for setup and maintenance                              | Typically pre-configured and ready to use                                                                                                                  |
| **What is Hosting?**             | May be part of a hosting solution (e.g., in VPS Hosting)                            | Can include VMs but operates at a higher level (e.g., Shared Hosting running on a VM)                                                                      |
| **Examples**                     | KVM VM, VMware, VirtualBox, Hyper-V                                                 | Shared Hosting, VPS, Dedicated Hosting, Managed WordPress Hosting, Cloud Hosting, Database Hosting                                                         |

#### When to Use Each?

| Scenario                                                    | Recommendation                                      |
| ----------------------------------------------------------- | --------------------------------------------------- |
| You want to set up a simple WordPress site                  | Shared Hosting or Managed Hosting                   |
| You need full control over the system (OS, ports, software) | VM or VPS                                           |
| You need high scalability and flexible infrastructure       | VM in a Cloud environment (e.g., AWS EC2, Azure VM) |
| You want a solution without technical expertise             | Hosting Solution with a ready panel like cPanel     |

### Differences Between VM and Container

| Feature                    | VM (Virtual Machine)                                                                        | Container                                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Architecture Structure** | VMs have their own operating system. Each VM includes a full OS, applications, and drivers. | Containers use the **host OS kernel** and only include the application and its dependencies.                 |
| **Size**                   | Heavier; typically several gigabytes                                                        | Very lightweight; typically a few megabytes                                                                  |
| **Boot Time**              | Several seconds to minutes                                                                  | Usually under a second                                                                                       |
| **Isolation**              | Complete; like an independent computer                                                      | Lighter; through namespaces and resource control (cgroups) in the Linux kernel                               |
| **Use Case**               | Suitable for running different operating systems or heavy, long-term workloads              | Suitable for **fast, scalable, and modular** application execution, especially in microservices architecture |
| **Scalability**            | Less agile; requires significant resources and time for creation and expansion              | Highly agile; automatic scaling with tools like Kubernetes                                                   |
| **Dependency on Host OS**  | Can run any OS (e.g., Windows on Linux)                                                     | Typically must be compatible with the host OS (e.g., Linux container on a Linux host)                        |
| **Examples**               | KVM, VMware, Hyper-V, VirtualBox                                                            | Docker, containerd, Podman                                                                                   |

#### When to Use Each?

| Scenario                                                              | Recommendation |
| --------------------------------------------------------------------- | -------------- |
| Running applications requiring a specific OS or different kernel      | VM             |
| Creating a fully isolated test environment with high security         | VM             |
| Running fast, lightweight, and scalable service-oriented applications | Container      |
| Implementing **Microservices** and DevOps CI/CD architecture          | Container      |

---

## SSH Key

An SSH key is a cryptographic authentication mechanism for securely connecting to virtual machines (Linux-based). It consists of a pair of public and private keys:

- **Public Key**: Stored on the virtual machine.
- **Private Key**: Kept by the user and must not be disclosed.

Using SSH keys, users can securely log into virtual machines without a password. This method enhances access security and eliminates risks associated with weak passwords.

---

## Subnet

A **Subnet** is a logical subdivision of an IP range within a **Virtual Private Cloud (VPC)**. Each subnet has a specific IP range for:

- **Resource separation** (e.g., separating databases from web servers)
- **More precise traffic and security control**
- **Simplifying network management**

Dividing a VPC into subnets helps structure the cloud architecture and enables applying different security policies to various network segments.

---

## Floating IP

A Floating IP is a **public IPv4 address** that can be dynamically assigned to any virtual machine in a specific geographic region. Key features include:

- **Transferable between servers without requiring a restart**
- **Suitable for High Availability and Failover scenarios**
- **Easy traffic routing to the active server in real-time**

Using a floating IP ensures continuous access to services even when switching between machines.

---

## Backup

**Backup** is a scheduled and ongoing process for maintaining copies of data or virtual machines. In the Kubit system, backups are performed through **Backup Rules** on a **periodic basis (daily, weekly, or monthly)**. Each rule specifies:

- Which virtual machine to back up
- The time interval (Frequency)
- The number of backup versions (Slots) to retain

Backups are used for **long-term data protection**, **recovery in critical situations**, and **migration between environments**. They are typically stored in a separate and stable storage space.

## Snapshot

A **Snapshot** is a **point-in-time copy** of a virtual machine or disk’s state at a specific moment. This copy includes the operating system, data, configurations, and file structure. Snapshots are useful for:

- **Quick restoration to a previous state before changes or errors**
- **Testing or applying changes without permanent risk**
- **Creating clones for development or testing**

Snapshots are typically suitable for **short-term, in-system backups** and are directly linked to the original volume, not a separate storage space.

## Differences Between Backup and Snapshot

| Feature                      | Snapshot                                              | Backup                                                          |
| ---------------------------- | ----------------------------------------------------- | --------------------------------------------------------------- |
| **Data Type**                | Instantaneous copy of a disk or VM                    | Full copy of data at specified intervals                        |
| **Storage Location**         | Typically in the same storage environment             | Usually in a separate and secure space                          |
| **Primary Purpose**          | Quick recovery from changes or failures               | Long-term data protection                                       |
| **Retention Period**         | Short-term (until the next change or manual deletion) | Long-term, retainable in multiple versions                      |
| **Execution Time**           | Instant, in a few seconds                             | Scheduled and potentially time-consuming depending on data size |
| **Scheduling Capability**    | Usually manual                                        | Scheduled (daily, weekly, monthly)                              |
| **Independence from Source** | Tied to the source (dependent on the original VM)     | Restorable independently, even after the original VM is deleted |
| **Suitable for**             | Testing, development, temporary changes               | Disaster recovery, migration, reliable archiving                |

---

## Security Group

A Security Group is a **virtual firewall** at the virtual machine or cloud resource level that provides **precise control over inbound and outbound traffic**. The rules of each security group can specify:

- Allowed or disallowed protocols (TCP, UDP, ICMP)
- Open or closed ports
- IP ranges (IPv4 or IPv6) permitted for access

Security groups enable precise and flexible security policy enforcement and operate in a Stateful manner, meaning return traffic is automatically allowed if the inbound connection was permitted (bidirectional communication).

### Differences Between Security Group, OS Firewall, and Access Control

| Feature              | **Security Group**                                                                         | **OS Firewall**                                | **Access Control**                                                       |
| -------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------------------------ |
| **Execution Level**  | Cloud infrastructure level (before traffic reaches the OS)                                 | Guest OS level (e.g., inside Linux or Windows) | User, application, or service level                                      |
| **Location**         | Typically at the virtual network/VM level in cloud platforms (e.g., AWS, Azure, OpenStack) | Within the virtual machine or physical server  | In the application, file system, database, or API                        |
| **Primary Function** | Filters **inbound/outbound** network traffic based on port, IP, and protocol               | Controls network traffic within the OS         | Restricts user or application access to specific resources or operations |
| **Example Rules**    | Allow TCP on port 22 from a specific IP                                                    | Deny all ports except 80/443 with `iptables`   | Only admin users can read table X in the database                        |
| **Suitable for**     | Restricting access at the network and cloud machine level                                  | Detailed control at the OS level               | Managing user, group, and role permissions                               |
| **Statefulness**     | Typically _Stateful_ (responses to allowed connections are permitted)                      | Often Stateful but configurable                | Stateless (depending on implementation)                                  |
| **Control Level**    | Configured by the cloud platform                                                           | Configured within the OS                       | Part of the service or application’s security policies                   |

These three layers **complement each other**:

1. **Security Groups**

- Play the primary role in filtering **network traffic**.
- Traffic is checked before reaching the OS.
- Example: Only allow SSH access from a specific IP.

2. **OS Firewall**

- Examines traffic that has passed the Security Group.
- Provides more precise control over protocols, connections, timing, and behaviors.
- Example: Use `ufw` or `iptables` to allow connections only for specific users.

3. **Access Control**

- Assumes a user has logged into the system via SSH; this layer determines **what they can access**.
- Examples:
  - Cannot view a file (`chmod`)
  - Cannot connect to a database unless in a specific role
  - Cannot call a specific API endpoint
