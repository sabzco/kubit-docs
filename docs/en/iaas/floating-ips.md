# Floating IPs

In this section, you can view the list of available floating IPs in the project and manage them, including **allocation**, **deletion**, and **disconnection**.

![Floating IP: floating ip](img/floating-ips.png)

## Allocate a Floating IP

- Click on the **Assign New Floating IP option**.
- In the opened dialog, enter a **valid and unique name**.
- Then, click on **Allocate Floating IP**. A **job** related to the floating IP assignment will be created, showing the status of the request.
- After the successful completion of the job, you can start using your new floating IP.
  ![Floating IP: new btn](img/new-floating-ips-btn.png)
  ![Floating IP: assign new](img/assign-new-floating-ip.png)

:::caution[Note!]
Please note that as long as the floating IP is reserved, it will incur costs for you.
:::

## Floating IP Actions

To view the possible operations for a floating IP, click the three-dot button in the **Actions** column to display a list of actions:
![Floating IP: options btn](img/floating-ips-options-btn.png)
![Floating IP: options list](img/floating-ip-options.png)

### Disconnect

- To disconnect from all resources, click the three-dot button in the **Actions** column and select **Disconnect**.
- Then, if confirmed, click the **Confirm** button in the opened dialog.
- ![Floating IP: unbind](img/unbind-floating-ip.png)
  ![Floating IP: confirm unbind](img/confirm-unbind-floating-ip.png)

## Deleting a Floating IP

- To delete a floating IP, click the three-dot button in the **Actions** column and select **Delete**.
- Then, if confirmed, click the **Delete** button in the opened dialog.
  ![Floating IP: remove](img/remove-floating-ip.png)
  ![Floating IP: confirm remove](img/confirm-remove-floating-ip.png)
