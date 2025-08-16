# Getting Started with Sentry

To start using the Sentry cloud software, first install it through the cloud software page.
![App Install: sentry-install](../img/sentry-install.png)

Then specify the **name** (slug, which will be part of your panel’s URL) for your Sentry panel.

![Install App: sentry-spec](../img/sentry-spec.png)

On this page, view your repository details. By clicking on the address, you will be redirected to your GitLab panel. You can also access it via git or similar tools.

![Install App: sentry-info](../img/sentry-overview.png)

:::info[Change Plan]
By selecting change plan, you will return to the plans page, and by choosing a new plan and paying the difference, your plan will be updated.

![Install App: sentry-plan-change](../img/gitlab-plan-change.png)

:::

Then, log into your panel using the provided address with your [Kubit account](../../../account/). (For security reasons, access to Kubit services is only possible by logging in with a Kubit account.)
![App Install: sentry-install](../img/sentry-login.png)
Grant the usage permission.
![App Install: sentry-install](../img/sentry-login-oauth.png)

![App Install: sentry-install](../img/sentry-login-access.png)
This page is the panel that displays issues to you.
![App Install: sentry-install](../img/sentry-panel.png)
To connect Sentry to your project, click on Create project on this page. You will be taken to the project type selection page, where you can enter details according to your needs. For example, to create a Python project, proceed as follows.
![App Install: sentry-install](../img/sentry-new-proj-sample.png)
Now, follow the guide to set up the SDK connection to your code.
![App Install: sentry-insatall](../img/sentry-new-proj-sdk.png)
The specified section in the code indicates that errors should be sent to the service address. The service then collects these errors and displays them with relevant details as shown below.
![App Install: sentry-insatall](../img/sentry-sample-issue-log.png)

:::info[Delete Cloud Software]
To delete the cloud software through the panel, click on the options icon and then hit delete.

![Delete App: gitlab-delete](../img/gitlab-delete.png)
![Delete App: gitlab-delete-confirm](../img/gitlab-delete-confirm.png)
:::

:::warning[Permanent Deletion from Servers]

\*After deletion, each application is queued for permanent deletion from the server within one to three days, during which you can take action to restore it.

![Delete App: gitlab-recovery](../img/gitlab-recovery.png)
![Delete App: gitlab-recovery-confirm](../img/gitlab-recovery-confirm.png)
![Delete App: gitlab-reactivated](../img/gitlab-reactivated.png)

:::
