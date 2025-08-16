---
subDocuments:
  - concepts
  - settings
  - getting-started
  - vm
  - ssh-keys
  - subnets
  - floating-ips
  - disks
  - snapshots
  - backup
  - security-groups
---

# Infrastructure (Cloud Computing)

## Introduction to Kubit Cloud Infrastructure Services (Kubit IaaS)

**Kubit Cloud Infrastructure** provides cloud computing resources **on-demand** with a **pay-as-you-go** model. These resources include:

- **Processor (CPU)**
- **Memory**
- **Storage**: Selectable by type, size, and number
- **Networking**: Includes IP configurations, firewall, and security settings

Users can create virtual machines (Virtual Machines) with desired configurations within various projects. Configurable options include:

- Selecting the **operating system** (e.g., Linux or Windows)
- Specifying the **number and capacity of CPU cores**
- Determining the **amount of RAM (Memory)**
- Choosing the **size and type of disks** (e.g., SSD or HDD)
- Configuring **network and firewall settings**
- Adding **SSH keys** for secure access

## Quick Access to Infrastructure Service Features and Capabilities:

| [Infrastructure Service Prerequisites (Step Zero)](settings)                                                                         | [Setting Up a Virtual Machine (Step One)](getting-started)                                            |
| ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| Prerequisites for using cloud resources, including connecting the project to the infrastructure service and enabling basic settings. | After connecting the project, you can create and manage resources such as virtual machines and disks. |

[**Virtual Machines**](vm): Cloud hosts used to run services, applications, and operating systems

[**SSH Keys**](ssh-keys): Tools for secure, encrypted connections to machines without the need for a password

[**Subnets**](subnets): Subnetworks with specific IP ranges that separate resources in the network architecture

[**Floating IPs**](floating-ips): Transferable public addresses that can be moved between machines without interruption

[**Snapshots**](snapshots): Instantaneous copies of a machine or disk’s state for quick restoration or creating test versions

[**Backup**](backup): Periodic storage of virtual machine versions for recovery in critical situations

[**Security Groups**](security-groups): A set of network access rules that control inbound and outbound traffic

[**Detachable Disks**](disks): Independent storage disks that can be moved between different machines
