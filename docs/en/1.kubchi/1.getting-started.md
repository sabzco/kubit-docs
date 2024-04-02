# Getting Started

## Logging into Kubit Panel

After receiving your Kubit login credentials:

- Go to your organization's Kubit panel address. For example: `https://panel.kubit.ir/-/your-org`
- Select the SAML option.
- Log in with the username and password provided to you in the LDAP system.

## Getting Started with Kubit

To manage tools and cloud applications in the Kubechi system, you need to perform the following tasks:

- [Create a Project](#create-simple-project):
  All applications and tools must be placed within projects.
  So the first step is defining a project. ([More details](../create-project))
- [Create Users](#create-a-user):
  Create users and optionally set up user groups. ([More details](../manage-user))
- [Assign User Accesses](#give-access):
  Users you create must have the necessary accesses to use Kubechi. ([More details](../manage-access))
- [Install a Pack](#create-pack):
  Install your applications and tools in the form of packs. ([More details](../manage-pack))

### Creating the First Project {#create-simple-project}

To get started, you need to define a project:

- From the side menu, select the project option in the organization section.
- Click on the "New Project" button.
- Enter the title and key of your desired project and click "Confirm."
  For example, enter both as the word "default."
- Navigate to the Kubechi section by selecting from the side menu.
- Click on the "Connect Project to Kubechi" option.
- First, select the desired project from the list.
- Also, select your main cluster from the list of clusters.
- Click on the "Connect" option.

### Creating a New User {#create-a-user}

To allow other team members to use the Kubit panel, you need to create a user account for them. Here's how:

- From the side menu, go to the Users section under Organization.
- Click on the "New User" button.
- Fill out the LDAP user creation form and confirm.

### Setting User Accesses {#give-access}

To set user accesses, you need to assign roles directly or through group memberships. Follow these steps:

- From the side menu and in the Organization section, go to Users.
- Select one of the users to enter their user settings page.
- Choose the "Roles" tab and click on "Assign Role."
- Select a role from the list of roles. For example, choose the kubchi-devops option.
- Click on the "Add" button.
  By doing this, the corresponding role accesses will be granted to that user across all organization projects.

#### Setting User Access in a Project

You can also assign each role to a user for each project separately. To do this, simply select the desired project instead of "All Projects" in the role assignment menu.

### Installing the First Application via Pack {#create-pack}

First, let's get familiar with some concepts:

**What is a Chart?**
A chart in the Kubit system is the Helm Chart, and some of them are customized for the Kubechi UI.

**What is a Pack?**
It's the installed version of a chart (release) managed by the Kubit system in Kubernetes.

:::info[Installation Methods]

- Entering YAML
- Filling out the Pack Form
  :::

Now let's start installing:

- Go to the "Kubechi" section from the side menu and select your desired project.
- Choose the "Install Pack" button.
- In this section, select the pack chart you want to install.
  For example, find Redis-HA from the chart list and click on "Install."

#### Installation with Form

- Select the chart version you want your pack to be installed from. For example, redis-ha 4.15.1.
- Enter the pack name. For example, test-redis.
- Choose the namespace where you want to install the pack.
  - If you don't have a namespace yet, click on "Create New Namespace" and enter something like test-ns, then confirm.
- Enter the pack information. For Redis pack, you can enter the following:

  - In the Redis form section:

  ```
  Redis image tag = 6.2.5-alpine
  Redis image repository = docker.sabz.dev/redis
  Persist storage class = zfs-ssd # or similar storage class
  ```

  - In the Redis Configs section:

  ```
  mexmemory = 50mb
  ```

- Click on the "Install" button.

#### Installation with YAML Editor

Enter the code below in the YAML Editor section and click on the "Install" button.

```yaml
apiVersion: k8s.kubit.ir/v1alpha1
kind: Pack
metadata:
  name: test-redis
  namespace: test-ns
spec:
  chart:
    repository:
      kind: ClusterPackRepository
      name: kubit-packs
    name: redis-ha
    version: 4.15.2
  vars: {}
  values:
    image:
      tag: 6.4.5-alpine
      repository: doceker.sabz.dev/redis
    redis:
      resources: {}
      config:
        maxmemory: 50mb
    persistentVolume:
      storageClass: zfs-ssd
    haproxy: {}
```

## Obtaining and Installing Client Certificates

Since using systems under security layers requires client certificates, it is recommended to follow these steps.

After receiving your Kubit login information, each user needs to obtain and install a client certificate suitable for their organization.
Below is a summary of these steps. ([More details](../5.certman))

- Log into your organization's cert manager, for example: `https://cert.kubit.ir/-/your-org`
- Complete the registration in this system, which is done by verifying your mobile number. ([More details](../5.certman#complete-registeration))
- Log into the cert manager panel and obtain the client certificate. ([More details](../5.certman#get-client-cert))
- Install the certificate in your preferred browser according to the [certificate installation guide](../5.certman#installCertificate).

:::caution[Note]
You are solely responsible for the use of the Certificate file and its password. Therefore, do not share it with anyone under any circumstances.
:::
