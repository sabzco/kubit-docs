# Bucket Browser {#broweser}

On the bucket browser page, you can view **uploaded files**, **folders**, **create new folders**, **upload files**, and access features related to objects:
![Browser: bucket details](../img/bucket-details.png)

## File Upload

To upload a file, click the **Upload File** option:
![Browser: upload file](../img/upload-file.png)
After selecting the file, it will be uploaded and added to the list of files on the **Browser** page.

:::info[Uploading Files to a Folder]
To upload a file to a folder, simply navigate to the desired folder and follow the steps outlined in **File Upload**.
:::

## Create Folder

To create a new folder, click the **New Folder** option:
![Browser: new folder](../img/new-folder.png)

Then, enter the **name** of the folder and click **Create**:
![Browser: new folder form](../img/new-folder-form.png)
The new folder will be created and added to the list of objects on the **Browser** page.

## Object Details

By clicking on any object, details about the selected object, including **name**, **size**, **last modified**, and **path**, are displayed, along with options to **copy the download link** and **download** the object directly:
![Browser: obj details](../img/obj-details.png)

For different objects, various operations are available through the browser, which are explained below.

### File Operations

Operations related to a file include **temporary link**, **copy**, **move**, **tags**, **versions**, and **delete**. Access to each of these operations is provided via the three-dot button on the file card:
![Browser: obj options btn](../img/obj-options-btn.png)
![Browser: obj options](../img/obj-options.png)

:::info[Disabled Versions]
If **versioning** is disabled for the bucket, this option will also be disabled in the list of operations.
:::

### Folder Operations

Operations related to a folder include **copy**, **move**, and **delete**. Access to each of these operations is provided via the three-dot button on the folder card:
![Browser: folder options btn](../img/folder-options-btn.png)
![Browser: folder options](../img/folder-options.png)

## Managing Cloud Storage Files with S3Browser Windows Software {#s3browser}

S3Browser is a powerful and convenient solution for accessing and working with files stored in the cloud. With it, you can easily use your spaces and buckets, and directly download or upload resources.
In the first step, create a service account to specify the level of access to the bucket. If you enter the default values on the page, you grant full access to the user.

1. API endpoint: Enter the service address from the public access menu, s3.kubit.ir.
2. Access Key ID: Obtain this value from the public access menu.
3. Secret Access Key: Obtain this value from the public access menu as well.
   ![Browser: s3broweser add new account](../img/s3broweser-add-new-account.png)
   ![Browser: s3broweser add new account fields](../img/s3broweser-add-new-account-fields.png)

Now you can view your buckets and spaces and apply the desired changes.
