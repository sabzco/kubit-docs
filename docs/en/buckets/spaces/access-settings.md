# Access Management

On the access management page, **access tokens** and a list of **service accounts** are available:
![Create Space: space access management](../img/space-access-managemet.png)

On this page, you will have access to **space access keys** and the **list of service accounts**:
![Create Space: space access details](../img/space-access-details.png)

## Service Accounts

In this section, the list of available service accounts is displayed along with information such as **name**, **access status in the space**, **space name**, **shared within the organization**, and the option to **create a new service account**.

### Creating a New Service Account

To create a service account for this space, click on the **Create New Service Account** button:
![Create Space: new service account](../img/new-space-service-account.png)

Enter the **name** and select the type of **access**:
![Create Space: new service account form](../img/new-space-service-account-form.png)

If you wish to share the service account at the organization level, select the **Shared within the organization** option and click **Create**:
![Create Space: create new sa](../img/create-new-space-sa.png)
The service account with the defined access level for the selected space will be created.

### Service Account Operations

In the operations column, via the three-dot button, a list of available operations for each service account is provided:
![Create Space: service account options](../img/space-service-account-options.png)

#### Display Keys

- First, click on the **Display Keys** option.
- A window containing the Access Key and Secret Key unique to the selected service account will be displayed.
  ![Create Space: display sa keys](../img/display-sa-keys.png)
  ![Create Space: display sa keys 2](../img/display-sa-keys-2.png)

#### Edit Access Level

- First, click on the **Edit Access Level** option.
- Then, select the desired access level from the list of access levels.
- Finally, to update the access level, click **Update Access Level**.
  ![Create Space: edit sa level](../img/edit-sa-access-level.png)
  ![Create Space: edit sa level 2](../img/edit-sa-access-level-2.png)
  ![Create Space: edit sa level 3](../img/edit-sa-access-level-3.png)

#### Regenerate Keys

This operation invalidates the current service account keys and replaces them with new ones.

- First, click on the **Regenerate Keys** option.
- If you are sure about performing this operation, click **Regenerate Keys**.
  ![Create Space: regenerate sa keys](../img/regenerate-sa-keys.png)

#### Delete Service Account

- First, click on the **Delete Service Account** option.
- If you wish to delete the service account from the buckets as well, select the **Remove Service Account from Buckets in this Space** option.
- Finally, to perform the deletion operation, click **Delete Service Account**.
  ![Create Space: remove sa](../img/remove-space-sa.png)
  ![Create Space: remove sa 2](../img/remove-space-sa-2.png)
