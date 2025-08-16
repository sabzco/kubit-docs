# Virtual Machine Management

In the virtual machine settings, various subpages display information and configurations related to the virtual machine. This information includes machine specifications such as the operating system, processor, memory, etc., as well as security, disks, and network settings.

:::caution[Note!]
Note that some configuration changes require the machine to be turned off. If this condition is not met, changes cannot be applied.
:::

## Overview {#overview}

In this subpage, information about the virtual machine is displayed. This includes the **name**, **operating system and its version**, **processor**, **memory**, and **disk** details, along with the **public IP** and **monitoring** of the machine.
![VM: overview](../img/iaas-vm-overview.png)

### Jobs

In this section, you can view the list of jobs at the machine level and the logs for each job performed on the machine.
![VM: overview](../img/iaas-vm-overview-works.png)
![VM: overview](../img/iaas-vm-overview-works-list.png)

### Accessing the Console

![VM: console](../img/iaas-vm-overview-console.png)

### Turn On/Off

![VM: shutdown/power on](../img/iaas-vm-overview-shutdown.png)

### Other Operations

See the [this section](../index#restart) for other operations that can be performed on the machine.

![VM: actions btn](../img/iaas-vm-overview-options.png)

## Security

Security-related settings for the machine, such as **password**, **SSH keys**, and **security groups**, are visible in this section. Below, we explain each setting.

![VM: security](../img/iaas-vm-security-overview.png)

### Display Password

If a password has been set for the machine, you can view it by clicking the **Display Password** button.
![VM: display pass](../img/iaas-vm-security-display-password.png)

### Reset Password

- To reset the password, first ensure the machine is turned off. Then, click the **Reset Password** button.
- If you are sure, click the **Confirm** option.
- Upon successful completion of the operation, the new password details will be sent to your email and displayed.
  ![VM: reset pass](../img/iaas-vm-security-reset-password.png)
  ![VM: confirm reset pass](../img/iaas-vm-security-reset-password-confirm.png)

### Add SSH Key

- To add an SSH key, first ensure the machine is turned off. Then, click the **Add SSH Key** button.
- Select the desired key from the available keys or define a new key.
- Finally, click the **Add** button.

  1. List of keys:
     ![VM: select ssh](../img/iaas-vm-security-ssh-list.png)
  2. Adding a key:
     ![VM: select ssh](../img/iaas-vm-security-add-sshkey.png)

### Add Security Group

- To add a security group, click the **Add Security Group** button.
- Then, select the desired group from the available groups.
- Finally, click the **Add** button.

  ![VM: add sec gp](../img/iaas-vm-security-securitygroups-list.png)

## Disks

In this subpage, information about the virtual machine’s disks is displayed. This includes **status**, **name**, **disk type**, **capacity**, and more, along with operations such as **adding**, **deleting**, and **resizing**.
![VM: disks](../img/iaas-vm-disks-overview.png)

### Add Disk

- To add a disk, click the **Add New Disk** button.
- Then, enter the desired specifications for the disk.
- Finally, click the **Create Disk** button.
  ![VM: new disk](../img/iaas-vm-disks-add.png)

### Disk Operations

Various operations available for a disk can be accessed through the **Operations** column:

![VM: disk actions list](../img/iaas-vm-disks-options.png)

#### Detach Disk

- To detach a disk, click the **Detach** option in the operations column.
- If you are sure, click the **Detach** button in the opened dialog.
  ![VM: detach disk btn](../img/iaas-vm-disks-detach.png)
  ![VM: detach disk](../img/iaas-vm-disks-detach-confirm.png)

#### Edit Disk

- To edit a disk, click the **Edit** option in the operations column.
- Then, enter the new size and desired name as needed.
- Finally, click the **Edit** button.
  ![VM: resize disk btn](../img/iaas-vm-disks-resize-btn.png)
  ![VM: resize disk](../img/iaas-vm-disks-resize.png)

#### Delete

- To delete a disk, click the **Delete** option in the operations column.
- If you are sure about the operation, enter the disk’s name as confirmation for deletion and click **Delete**.
  ![VM: remove disk btn](../img/iaas-vm-disks-remove-btn.png)
  ![VM: remove disk](../img/iaas-vm-disks-remove-disk-confirm.png)

##### Delete Detachable Disk

- To delete a detachable disk, first detach the disk. This will remove the disk from the machine’s disk list.
- Then, from the [Detachable Disks](../../disks) section, find the desired disk and select the **Delete** option.
- If you are sure about the operation, enter the disk’s name as confirmation for deletion and click **Delete**.

### Batch Operations

For ease of performing operations on multiple disks, some of the above operations are available through the **Batch Operations** option. First, select one or more disks. After selecting the disks, the **Batch Operations** button becomes active. Clicking on **Batch Operations** will display a list of available operations for the disks:
![VM: disks options](../img/iaas-vm-disks-group-options.png)
By clicking on any of the options, the selected operation will be applied to all chosen disks.

## Network

In this subpage, information about the virtual machine’s network settings is displayed. This includes **subnets**, **public IP addresses**, and more, along with operations such as **adding a network interface**, **deleting a subnet**, and **disconnecting a public IP**.
![VM: network](../img/iaas-vm-network-overview.png)

### Add Network Interface

- To add a network interface, click the **Add Network Interface** button.
- In the opened dialog, select a **subnet** from the available subnets and enter the desired **IP address**.
- Finally, click the **Add** button.
  ![VM: add network btn](../img/iaas-vm-network-add-Interface.png)

  ![VM: add network btn](../img/iaas-vm-network-add-Interface-subnet-list.png)
  ![VM: add network btn](../img/iaas-vm-network-add-Interface-subnet-add.png)

### Connect/Disconnect Public IP

- First, click on the **Connect Floating IP** option.
- Then, select one from the list of public IPs.
- If no IP has been assigned to you, you can request one, and the system will automatically assign a floating IP to you.
  ![VM: unbind floating ip btn](../img/iaas-vm-network-bind-floating-ip-btn.png)
  ![VM: unbind floating ip btn](../img/iaas-vm-network-bind-floating-ip.png)
  ![VM: unbind floating ip btn](../img/iaas-vm-network-bind-floating-ip-list.png)
  ![VM: unbind floating ip btn](../img/iaas-vm-network-bind-floating-ip-new.png)
- To disconnect the public IP and isolate the machine from the internet, click the **Disconnect Public IP** button.
- If you are sure about the operation, click the **Confirm** button.
  ![VM: unbind floating ip btn](../img/iaas-vm-network-unbind-floating-ip-btn.png)
  ![VM: confirm unbind floating ip](../img/iaas-vm-network-unbind-floating-ip-confirm.png)

### Subnet Operations

**Add:**

- To add a new subnet, click the **Add New Network Interface** button.
  ![VM: subnet actions](../img/iaas-vm-network-subnet-add-btn.png)
  ![VM: subnet actions](../img/iaas-vm-network-subnet-add-list.png)
  ![VM: subnet actions](../img/iaas-vm-network-subnet-add-list-new.png)
- Wait for the subnet to be created. Then, attach it to the network interface.
  ![VM: subnet actions](../img/iaas-vm-network-subnet-add-list-new-successful.png)

A list of available operations for subnets can be accessed through the three-dot button in the **Operations** column:
![VM: subnet actions](../img/iaas-vm-network-subnet-actions-list.png)

#### Convert to Primary Network Interface

- To convert a subnet to the primary network interface, click the **Convert to Primary** option.
- If you are sure about the operation, click the **Confirm** button.
  ![VM: convert to primary](../img/iaas-vm-network-subnet-convert-to-primary.png)

#### Delete Subnet

- To delete a subnet, click the **Delete** button.
- If you are sure about the operation, enter the subnet’s name as confirmation for deletion and click **Delete**.
  ![VM: remove subnet btn](../img/iaas-vm-network-remove-subnet.png)
