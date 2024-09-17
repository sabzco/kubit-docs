# Creating a New Virtual Machine

On the Infrastructure page, after selecting a bound project, go to the Virtual Machines section to create your first virtual machine and click on the "Create Virtual Machine" button.
![VM: create vm btn](create-vm-btn.png)

## Step 1: Selecting the Operating System

The first step in creating a new virtual machine is to select the **operating system**. Choose the desired operating system:
![VM: select os](select-os.png)

## Step 2: Machine Size

In the second step, there is a list of resources available in Kubit. According to your needs, select the appropriate size and specifications:
![VM: select resource](resource-list-1.png)

:::info[Optimized Resources]
The resource list includes different categories based on optimization criteria. In each of these sections, there is a list of optimized resources based on the processor, memory, and other criteria. You can select any of them according to your needs.
![VM: optimized resources](optimized-resources-list.png)
![VM: optimized resources](optimized-resources-list-2.png)
:::

:::tip[Optional Steps]
Please note that only the **operating system** and **machine size** steps are mandatory, and after the second step, you can go directly to the final step, which is the **final review**.
:::

## Step 3: Disk

If you need more storage space, you can select an additional disk for your machine in this step. Click on the **Add New Disk** button:
![VM: add additional disk](add-additional-disk.png)

Then select the **name** and **capacity** you need:
![VM: new additional disk](new-additional-disk.png)

## Step 4: Security

For the security settings of your machine, you can use an SSH key or a password. If you use a key, you can select multiple SSH keys, and if an SSH key is not selected, the password will be sent via email.

In this step, there is a list of keys created in the project and shared keys in the organization that you can select from, or you can directly add a new key.
![VM: ssh keys list](ssh-keys-list.png)

### Select Key from Available Keys{#select-key}

Select the desired keys from the current keys and click on **Next Step**:
![VM: select a key](select-key.png)

:::tip[Random Password]
Please note that despite setting an SSH key, it is still possible to use a password for the machine. By enabling the **Generate a random password for the virtual machine** option, the machine password will be emailed to the user.
:::

### Add a New Key

Click on the **Add SSH Key** box. Then enter the key information, including the **name** and **public SSH key**, and click on **Add Key**.
![VM: add new key card](add-new-key-card.png)
![VM: add new key](add-new-key.png)
Then the added key can be [selected](#select-key).

## Step 5: Network

In this step, network settings configuration, including **adding a network card** and assigning a **floating IP**, is done. To assign a floating IP, you must define at least one network card for your machine.

First, click on **Add interface** to open the network information form:
![VM: add network](add-network.png)
![VM: new network form](new-network-form.png)

Then you can select from the subnets of the project and those shared in the organization, or you can create a new subnet:
![VM: select subnet](select-subnet.png)

### Select Subnet

Choose one of the available subnets:
![VM: select one subnet](select-subnet-2.png)
![VM: selected subnet](selected-subnet.png)

### Add Subnet

Click on the **Add new subnet** box. Then enter the subnet information, including the **name**, **CIDR**, and **gateway**, and click on **Add Subnet**.
![VM: new subnet btn](new-subnet-btn-vm.png)
![VM: new subnet form](new-subnet-form-vm.png)
For more information about creating a subnet and its fields, please refer to the [Add New Subnet](../subnets#add-new-subnet) document.

### Allocating Floating IP

After selecting the subnet, you can also assign a floating IP to the machine. First, select the option "Allocate floating IP to this virtual machine!":
![VM: activate floating ip](activate-floating-ip.png)

Then you can choose from the floating IPs of the project and those shared in the organization, or you can create a new floating IP:
![VM: add floating ip](select-floating-ip.png)

#### Select Floating IP

Choose one of the available floating IPs:
![VM: select one floating ip](select-floating-ip-2.png)

#### Allocate Floating IP

Click on the **Allocate New Floating IP** button to open the allocation form. Then choose a name for it and click on the "Allocate Floating IP" button:
![VM: new floating ip btn](new-floating-ip-btn.png)

Finally, after selecting the subnet and allocating the floating IP, proceed to the next step.

## Step 6: Final Review

In the final review, you will see information such as the name of the virtual machine, location, operating system, processor, memory, additional disks, SSH keys, floating IP, and the network interface configured for the virtual machine.

![VM: overview 1](overview-new-vm-1.png)
![VM: overview 2](overview-new-vm-2.png)

To edit any of the specifications except for the location, simply click on the corresponding pencil icon:
![VM: edit vm details](edit-new-vm-details.png)

Finally, after reviewing the specifications and settings of the machine, click on the "Create Virtual Machine" button:
![VM: create new vm](create-new-vm.png)

Then you will be directed to the virtual machine overview page, and simultaneously, a task titled "Creating Virtual Machine" will be created that displays the status of the new machine's creation:
![VM: new vm job 1](new-vm-job-1.png)
![VM: new vm job 2](new-vm-job-2.png)
![VM: new vm jobs](new-vm-jobs.png)

Once all tasks are successfully completed, access to the created virtual machine will be provided.
![VM: overview](overview-new-vm.png)

Refer to the documents related to the virtual machine overview page in the [virtual machine settings](../vms) section.