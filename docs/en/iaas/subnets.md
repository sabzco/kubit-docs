# Subnets

On the subnets page, you can view a list of project and shared subnets within the organization, with options to **add a new subnet**, and perform actions such as **edit**, **connect to the internet**, **add a security group**, and **delete**.

![Subnets: subnets](img/subnets.png)

## Adding a New Subnet {#add-new-subnet}

- To add a subnet, click the **Add New Subnet** button.
- Then, enter the required information such as **name**, **CIDR**, and **gateway**.
- Finally, if you want to share this subnet across the organization, select the option **Use this subnet in all projects**, and click **Create Subnet**.
  ![Subnets: new subnet](img/new-subnet-btn.png)
  ![Subnets: new subnet form](img/new-subnet-form.png)

## Viewing Details and Status

To view details such as connected virtual machines, IP addresses assigned to each machine, and available operations, click on the icon shown in the image below:
![Subnets: subnet details btn](img/subnet-details-btn.png)

For the selected subnet, a list of the mentioned details will be displayed:
![Subnets: subnet details 1](img/subnet-details-1.png)

## Deleting a Network Interface

- To delete a network interface assigned to a virtual machine, click the **trash** icon next to the respective machine.
- Then, if confirmed, click the **Delete** button in the dialog that opens.
  ![Subnets: remove vm network from subnet](img/remove-vm-network-from-subnet.png)
  ![Subnets: confirm remove vm network from subnet](img/confirm-remove-vm-network-from-subnet.png)

## Redirecting to a Virtual Machine

To directly navigate to the overview page of a virtual machine connected to the subnet, click the specified icon:
![Subnets: redirect to vm](img/redirect-to-vm.png)

## Subnet Actions

To view the available operations for a subnet, click the three-dot button in the Actions column to display a list of options:
![Subnets: options btn](img/subnet-actions-btn.png)
![Subnets: options](img/subnet-actions.png)

### Edit

- To edit the subnet, click **Edit**.
- In the opened dialog, you can only modify the **name** and **sharing status** of the subnet. After entering your desired changes, click **Update Subnet**.
  ![Subnets: edit](img/edit-subnet.png)
  ![Subnets: update](img/update-subnet.png)

### Connecting to the Internet

- To connect a subnet to the internet, click **Connect to Internet**.
- To establish the connection, a floating IP is required. If a floating IP is available, you can select from the list of unassigned floating IPs or create a new floating IP.
  ![Subnets: connect to internet](img/connect-to-internet.png)
  ![Subnets: unassigned floating ip](img/unassigned-floating-ip.png)

#### Selecting from Available Floating IPs

![Subnets: select floating ip](img/select-unassigned-floating-ip.png)
![Subnets: connect 1](img/connect-to-internet-1.png)

#### Allocating a New Floating IP

![Subnets: assign floating ip btn](img/assign-floating-ip-btn.png)
![Subnets: assign floating ip form](img/assign-floating-ip-form.png)
![Subnets: connect 2](img/connect-to-internet-2.png)

In both methods, after clicking **Allocate Floating IP**, a task related to this operation will be created, and if successful, the subnet will be connected to the internet.
![Subnets: assign float ip to subnet](img/assign-float-ip-to-subnet.png)

### Adding a Security Group

- To add a security group to the subnet, click **Add Security Group**.
- Then, from the list of security groups in the project and shared within the organization, select the desired group and click **Confirm**.
  ![Subnets: add sec gp](img/add-sec-gp-to-subnet.png)
  ![Subnets: add sec gp form](img/add-sec-gp-to-subnet-form.png)
  ![Subnets: add sec gp lists](img/sec-gp-lists.png)

### Delete

To delete a subnet, click **Delete**.
Then, if confirmed, click the **Delete** button in the opened dialog.
![Subnets: remove](img/remove-subnet.png)
![Subnets: confirm remove](img/confirm-remove-subnet.png)
