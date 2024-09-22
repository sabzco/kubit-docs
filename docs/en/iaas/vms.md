# Virtual Machines

On the **Virtual Machines** page, you can view a list of virtual machines created in the selected project. This list includes the general specifications of the machines, along with various available operations.
![VMs: vms list](vms-list.png)
By clicking on any of the machines, you will be redirected to the machine's overview page. For more information, refer to the [Overview](../vm#overview) document.

## Virtual Machine Operations {#vm-operations}

There are various operations available for virtual machines, which we will explain below:

- **Shutdown/Power on the VM**: Powering off or on a virtual machine is similar to shutting down or turning on a physical computer; the operating system shuts down or starts normally.
- **Power Off**: Cutting the power is equivalent to a sudden shutdown without a proper shutdown process, which may result in data or operating system damage.
- **Restart the Machine**: Restarting the virtual machine restarts the operating system without completely powering off and on the virtual machine.

:::caution[Note!]
Please note that some operations depend on the machine's power state. If the required state is not met, the operation cannot be performed.

- Shutdown Requirement: Operations such as **Delete** and **Edit**.
- Power On Requirement: Operations such as **Restart** and **Power Off**.
  :::

:::info[Job Creation for Each Operation]
Every operation performed on a machine generates a corresponding **Job**, which shows the operation's status. An operation is considered successful if its job completes successfully and reaches the **Success** status. You can view the job statuses by accessing the machine’s job list:
![Vms: jobs list](vm-jobs-btn.png)
![VM: full jobs list](full-jobs-list.png)

**Example of a job in progress**
![VMs: power on job](power-on-job.png)
:::

### Accessing the Console

To open the machine’s console, click on the **Console** icon to open the console window:
![VMs: console](vm-console.png)

### Shutdown/Power on the Machine

- To Shutdown/Power on a machine, click on the **Shutdown/Power on** icon.
- If powering on, the machine will start without any user confirmation; however, if shutdown, a confirmation dialog will open. If you're sure, click **Shutdown** in the dialog.
- After the job related to the operation is successfully completed, the machine's status will change to either **STOPPED** or **RUNNING**.
  ![VMs: shutdown](vm-shutdown-btn.png)
  ![VMs: shutdown dialog](vm-shutdown.png)

For other operations, click the three-dot button in the **Operations** column to display a list of actions:
![VMs: options btn](vm-options.png)
![VMs: options](vm-options-list.png)

### Restart

- To restart the machine, click the **Restart** option.
- If you're sure, click **Restart**.
- Once the associated job is successfully completed, the machine’s status will updated to **RUNNING**.
  ![VMs: reboot btn](vm-reboot-btn.png)
  ![VMs: reboot](vm-reboot.png)

### Rename

- To change the machine's name, click **Rename**.
- In the opened dialog, enter a **valid and unique name** and click **Rename**.
  ![VMs: vm rename btn](vm-rename-btn.png)
  ![VMs: vm rename](vm-rename.png)

### Resize

- First, ensure the machine is powered off.
- To resize the machine, click **Resize**.
- In the opened dialog, select the new size for the machine and click **Resize**.
  ![VMs: resize btn](vm-resize-btn.png)
  ![VMs: resources](vm-resources-list.png)
  ![VMs: resize](vm-resize.png)

### Power Off

- First, ensure the machine is powered on.
- To cut the power, click **Power Off**.
- If you're sure, click **Power Off** in the confirmation dialog.
- After the job is successfully completed, the machine's status will change to **STUPPED**.
  ![VMs: power off btn](vm-power-off-btn.png)
  ![VMs: power off](vm-power-off.png)

### Delete

- First, ensure the machine is powered off.
- To delete the machine, click **Delete**.
- If you're sure, enter the machine's name as confirmation in the dialog and click **Delete**.
- After the job is successfully completed, the machine will be removed from the list.
  ![VMs: remove btn](vm-remove-btn.png)
  ![VMs: confirm](vm-remove-confirmation-phrase.png)
  ![VMs: remove](vm-remove.png)

:::tip[Operations on Multiple Machines]
All the above operations can also be performed on multiple machines at once. This functionality is explained below.
:::

## Bulk operations on Machines

To simplify performing operations on multiple machines, all the above operations are available via the **Bulk operations** option. First, select one or more machines:
![VMs: select vm](select-vm-icon.png)

After selecting the machine(s), the **Bulk operations** button will be enabled:
![VMs: vm gp options btn](vm-gp-options-btn.png)

Clicking **Bulk operations** will display a list of available operations for the selected machines:
![VMs: vm gp options](vm-gp-options.png)

:::tip[Available Operations]
Please note that only operations that can be performed on all selected machines will be displayed. In other words, the available operations depend on the machines having similar statuses. For example, if one machine is powered on and another is powered off, the Power Off and Power On operations will be disabled since they can't be applied to both machines simultaneously.
:::

By clicking any of the operations, the selected action will be applied to all selected machines, following the same steps described in the [Virtual Machine Operations](#vm-operations) section.
