# Prerequisite Concepts

:::tip[Documentation]
For comprehensive information about GitLab and GitLab Runner, refer to its [documentation](https://docs.gitlab.com/).
Additionally, Git documentation is accessible via this [link](https://git-scm.com/doc).
:::

With the advancement of software development methods, the use of **Continuous Integration (CI)** and **Continuous Deployment (CD)** has become increasingly common. These approaches, by enabling **rapid cycles**, ensuring **code quality**, and supporting **integrated deployment**, help development teams deliver high-quality software at scale.

In this context, GitLab Runner plays a key role; this tool is responsible for executing the **CI/CD pipeline** defined in the GitLab configuration file (.gitlab-ci.yml). By automating tasks such as **build**, **test**, and **deployment** of code, GitLab Runner allows developers to focus on writing code without being bogged down by the complexities of **deployment** processes.

As an example, suppose you want to write clean code and don’t want to manually check each time whether all function naming conventions are correctly followed; in such cases, you can use **GitLab Runner** to check these aspects.

## Environment

An **environment** specifies a stage of development; it is used to define the scope of execution for a **job**. For instance, **environments** like build, test, and deploy.

## CI/CD Jobs

A **job** is a piece of code for **execution** that is defined in an **environment** and will run in that specific **environment**.

## Runner

A **runner** in GitLab is a **process** that executes various jobs.

Below is a sample `gitlab-ci.yml` file with explanations:

```yaml
stages:
  - build
  - test
  - deploy

build_job:
  stage: build
  script:
    - echo "Building the app..."
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist/

test_job:
  stage: test
  script:
    - echo "Running tests..."
    - npm test
  needs: [build_job]

deploy_staging:
  stage: deploy
  script:
    - echo "Deploying to staging..."
    - scp dist/* user@staging-server:/path/to/staging
    - ssh user@staging-server "restart-staging-service"
  environment:
    name: staging
    url: https://staging.example.com
  rules:
    - if: '$CI_COMMIT_BRANCH == "develop"'
```

A runner executes the defined file and, based on the environment specified with the environment tag, automatically starts the relevant **job** defined in the script section. This capability allows various tasks in different development stages (such as testing, building, deployment, etc.) to be executed in a targeted manner aligned with the intended stage.
