# Virtual Machine Settings

In the virtual machine settings, there are various subpages that display information and settings related to the virtual machine. These include details such as the operating system, processor, memory, security, disks, and networking.

:::caution[Note!]
Please note that some settings changes require the machine to be powered off. If this condition is not met, the changes cannot be applied.
:::

## Overview {#overview}

On this subpage, the virtual machine’s details are displayed. This includes **name**, **operating system** and **version**, **processor**, **memory**, **disk information**, along with the **public IP** and **monitoring status**.
![VM: overview](img/vm-overview.png)

### Accessing the Console

![VM: console](img/console.png)

### Shutdown/Power On

![VM: shutdown/power on](img/shutdown.png)

### Machine Actions

![VM: actions btn](img/vm-actions.png)
![VM: actions list](img/vm-actions-list.png)

## Security

In this section, you can view security-related items such as **password**, **SSH keys**, and **security groups**. Below are the settings for each.
![VM: security](img/security.png)

### Displaying the Password

If a password is set for the machine, you can view it by clicking the **Show Password** button.
![VM: display pass](img/display-password.png)
![VM: vm pass](img/vm-password.png)

### Resetting the Password

- To change the password, ensure that the machine is powered off. Then, click the **Reset Password** button.
- Finally, if confirmed, click the **Confirm** button.
- After successful completion, the new password information will be sent to your email and displayed.
  ![VM: reset pass](img/reset-password.png)
  ![VM: confirm reset pass](img/confirm-reset-password.png)

### Adding an SSH Key

- To add an SSH key, ensure that the machine is powered off. Then click the **Add SSH Key** button.
- Select the desired key from the existing keys or create a new one.
- Finally, click the **Add** button.
  ![VM: add ssh](img/add-sshkey-vm.png)
  ![VM: select ssh](img/select-ssh-key.png)

### Adding a Security Group

- To add a security group, click the **Add Group** button.
- Then, select the desired group from the available groups.
- Finally, click the **Add** button.
  ![VM: add sec gp btn](img/add-sec-gp-to-vm.png)
  ![VM: add sec gp](img/add-sec-gp.png)

## Disks

In this subpage, information about the virtual machine’s disks is displayed. This includes **status**, **name**, **disk type**, **capacity**, and operations such as **adding**, **deleting**, and **resizing**.
![VM: disks](img/disks.png)

### Adding a Disk

- To add a disk, click the **Add New Disk** button.
- Enter the **capacity** and **name** of the disk.
- Finally, click the **Create Disk** button.
  ![VM: new disk btn](img/new-disk-btn.png)
  ![VM: new disk](img/new-disk.png)

### Disk Actions

Various operations available for a disk can be accessed through the **Actions** column:
![VM: disk actions btn](img/disk-actions-btn.png)
![VM: disk actions list](img/disk-actions.png)

#### Detach

- To detach a disk, click the **Detach** disk button in the operations column.
- Then, if confirmed, click the **Detach** button in the dialog that opens.
  ![VM: detach disk btn](img/detach-disk-btn.png)
  ![VM: detach disk](img/detach-disk.png)

### Edit

- To edit a disk, click the **Edit** icon in the Actions column.
- Then enter the new size and name according to your needs.
- Finally, click the **Edit** button.
  ![VM: resize disk btn](img/disk-resize-btn.png)
  ![VM: resize disk](img/disk-resize.png)

### Delete

- To delete a disk, first click the **Delete** option in the Actions column.
- If you are sure about the operation, enter the name of the disk as a confirmation to delete and click on **Delete**.
  ![VM: remove disk btn](img/remove-disk-btn.png)
  ![VM: remove disk](img/remove-disk.png)

### Bulk Operations

For convenience in performing operations on multiple disks, some of the above operations are available through the **Bulk Operations** option. First, select one or more disks:

![VM: select disks](img/select-multi-disks.png)
After selecting the disks, the **Bulk Operations** button will be activated:
![VM: disks options btn](img/disks-options-btn.png)
Clicking **Bulk Operations** opens a list of available operations for the selected disks:
![VM: disks options](img/disks-options.png)
By clicking any of the options, the desired operation will be applied to all selected disks.

## Network

In this subpage, the virtual machine’s network information is displayed. This includes **subnets**, **public IP address**, and operations such as **adding a network interface**, **removing a subnet**, and **unassign the public IP**.
![VM: network](img/network.png)

### Adding a Network Interface

- To add a network interface, click the **Add New Interface** button.
- In the dialog, select a **subnet** from the available subnets and enter the desired **IP address**.
- Finally, click the **Create interface** button.
  ![VM: add network btn](img/add-new-network-btn.png)
  ![VM: new network to vm](img/new-network-to-vm.png)

### Unassigning the Public IP

- To disconnect the public IP and remove the machine's internet access, click the **Unassign Public IP** button.
- If confirmed, click the **Delete** button.
  ![VM: unbind floating ip btn](img/unbind-floating-ip-btn.png)
  ![VM: confirm unbind floating ip](img/unbind-floating-ip-from-vm.png)

### Subnet Actions

A list of available actions for subnets can be accessed by clicking the three-dot button in the **Actions** column:
![VM: subnet actions](img/subnet-actions-btn.png)
![VM: subnet actions](img/subnet-actions-list.png)

#### Convert to Primary Network Interface

- To convert a subnet to the primary network interface, click on the **Make Primary interface** option.
- If you're sure, click the **Confirm** button
  ![VM: convert to primary](img/convert-to-primary.png)
  ![VM: confirm convert to primary](img/confirm-convert-to-primary.png)

#### Removing a Subnet

- To remove a subnet, click the **Remove** button.
- If confirmed, enter the subnet name as confirmation and click Delete.
  ![VM: remove subnet btn](img/remove-subnet-btn.png)
  ![VM: remove subnet](img/remove-subnet-confirm.png)
