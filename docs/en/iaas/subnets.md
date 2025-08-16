# Subnets

In the Subnets page, a list of project-specific and organization-shared subnets is displayed, along with options to **add a new subnet** and perform operations such as **edit**, **connect to the internet**, **add a security group**, and **delete**.
![Subnets: subnets](img/iaas-subnets-overview.png)

## Adding a New Subnet {#add-new-subnet}

- To add a subnet, click on the **Add New Subnet** button.
- Then, enter the requested information such as **Name**, **CIDR**, and **Gateway**.
- Finally, if you wish to share this subnet across the organization, select the **Use this subnet in all projects** option and click on **Create Subnet**.

  ![Subnets: new subnet form](img/iaas-subnets-add.png)

## Viewing Details and Status

To view details such as connected machines, allocated addresses for each machine, and perform operations on them, click on the (▼) icon. A list of the mentioned information will be displayed for the selected subnet:
![Subnets: subnet details 1](img/iaas-subnets-details.png)

### Deleting a Network Interface

- To delete the network interface assigned to a virtual machine, click on the **trash can** icon for the relevant machine.
- Then, if you are sure about the deletion, click the **Delete** button in the opened dialog.
  ![Subnets: remove vm network from subnet](img/iaas-subnets-vm-remove.png)

### Redirecting to the Virtual Machine

To directly navigate to the overview page of the virtual machine connected to the subnet, click on the specified icon:
![Subnets: redirect to vm](img/iaas-subnets-redirect-to-vm.png)

## Subnet Operations

To view possible operations for a subnet, click on the three-dot button in the **Operations** column to display a list of operations:

![Subnets: options](img/iaas-subnets-options.png)

### Editing

- To edit a subnet, click on the **Edit** option.
- In the opened dialog, you can only edit the **Name** and **Sharing Status** of the subnet. After entering the desired changes, click on the **Update Subnet** option.

  ![Subnets: update](img/iaas-subnets-update.png)

### Connecting to the Internet

- To connect a subnet to the internet, click on the **Connect to the Internet** option.
- To establish the connection, a floating IP is required. If a floating IP exists, you can select from the list of unassigned floating IPs or create a new floating IP.
  ![Subnets: floating ip](img/iaas-subnets-floating-ip.png)
  ![Subnets: unassigned floating ip](img/iaas-subnets-floating-ip-list.png)

#### Selecting from Existing Floating IPs

![Subnets: select floating ip](img/iaas-subnets-floating-ip-list-select.png)
![Subnets: connect 1](img/iaas-subnets-floating-ip-list-selected.png)

#### Assigning a New Floating IP

![Subnets: assign floating ip btn](img/iaas-subnets-floating-ip-new.png)
![Subnets: assign floating ip form](img/iaas-subnets-floating-ip-new-assign.png)
![Subnets: connect 2](img/iaas-subnets-floating-ip-new-assigned.png)

In both methods, after clicking **Connect Floating IP**, a task related to this operation is created, and if the task is successful, the subnet will be connected to the internet.
![Subnets: assign float ip to subnet](img/job-assign-float-ip-to-subnet.png)

### Adding a Security Group

- To add a security group to the subnet, click on the **Add Security Group** option:
- Then, select the desired security group from the list of project-specific and organization-shared security groups and click on **Confirm**:
  ![Subnets: options](img/iaas-subnets-securitygroup-add.png)
  ![Subnets: options](img/iaas-subnets-securitygroup-list.png)

### Deleting a Subnet

- To delete a subnet, first detach all resources from it.
- Then, click on the **Delete** option.
- If you are sure about the deletion, click the **Delete** button in the opened dialog.
  ![Subnets: remove](img/iaas-subnets-remove.png)
