# Getting Started with GitLab Runner

To **create** and **connect** a new **runner** to your repository after creating a [GitLab repository](../../gitlab/getting-started), proceed through the cloud software installation page. (You can also use this software to automate CI/CD processes in other repositories.)

Before starting, obtain the **repository address**, **group**, and **token** for the repository where you want the runner to be active.

### Repository or Group Address

Log into the [GitLab panel](../../gitlab/getting-started) and find this address from your browser or enter it manually. The format is as follows:

`gitlab.example.com/YourRepoName/YourProjectOrGroupName`

![Install App: gitlab-runner-group-selecet](../img/gitlab-runner-group-select.png)

### Token

Go to the **Build** section and click on the **Runners** option to create a new runner.

![Install App: gitlab-runner-tab](../img/gitlab-runner-tab.png)
![App Install: gitlab-runner-new-btn](../img/gitlab-runner-new-btn.png)
Enter the runner specifications as needed.
![App Install: gitlab-runner-new](../img/gitlab-runner-new-runner.png)
After creating the runner, obtain the token from this section.
![App Install: gitlab-runner-new](../img/gitlab-runner-new-runner1.png)
![App Install: gitlab-runner-new](../img/gitlab-runner-new-runner2.png)

### Software Installation

On the start page, select to install new software.
![App Install: gitlab-runner-install](../img/gitlab-runner-install.png)
Then enter the **name** (slug) of your runner.
If you want to choose the capacity yourself, from the specified section, select a capacity in multiples of five and greater than your current plan.

![App Install: gitlab-runner-specs](../img/gitlab-runner-spec.png)

You can see the **repository** address connected to the runner on the overview page.
![App Install: gitlab-runner-overview](../img/gitlab-runner-overview.png)

:::info[Change Plan]
By selecting change plan, you will return to the plans page, and by choosing a new plan and paying the difference, your plan will be updated.

![Install App: gitlab-plan-change](../img/gitlab-plan-change.png)

:::

In your panel, you can view the list of available runners and pause, edit, or delete them.

![App Install: gitlab-runner-runner-options](../img/gitlab-runner-runner-options.png)

You can also create a new runner from the `不1`Settings > CI/CD` section.

![App Install: gitlab-runner-add-new](../img/gitlab-runner-add-new.png)

### Running a Sample Job

After creating the runner, to run a CI job in your repository, create a file named `yml`.

![App Install: gitlab-runner-ci](../img/gitlab-runner-newci.png)

Copy your script into it.

![App Install: gitlab-runner-ci](../img/gitlab-runner-newci-sample.png)

Now from the Build section, you can view your **pipeline** and the **stage** it is in, as well as how it is executed.

![App Install: gitlab-runner-specs](../img/gitlab-runner-pipeline.png)

**Pipeline** graph:

![App Install: gitlab-runner-pipeline-graph](../img/gitlab-runner-pipeline-graph.png)

Status of each **runner**:

![App Install: gitlab-runner-status](../img/gitlab-runner-stages.png)

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
