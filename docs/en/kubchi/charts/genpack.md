# Genpack

Genpack Helm chart is designed to deploy containerized applications as easy as possible. Using the provided information,
this chart automatically generates all needed kubernetes resources and keeps them in sync.

## Prerequisites

- Kubernetes 1.20+
- Helm 3+
- PV provisioner support in the underlying infrastructure (when using volumes)

## TL;DR, How to use this chart?

### Installing the Chart

Add helm repository first

```shell
helm repo add kubit-packs https://repo.sabz.dev/artifactory/kubit-packs
```

To install the chart with the release name `my-release`:

```bash
helm install -n my-namespace my-release kubit-packs/genpack -f my-values.yaml
```

The command deploys genpack on the Kubernetes cluster with given parameters. The [Parameters](#parameters) section lists
the parameters that can be configured during installation.

> **Tip**: List all releases using `helm list`

### Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```bash
helm delete -n my-namespace my-release
```

The command removes all the Kubernetes components associated with the chart and deletes the release.

## Parameters

The following table lists the configurable parameters sections of the genpack chart.
(Hint: the )

| Sections            | Description                                                                |
| ------------------- | -------------------------------------------------------------------------- |
| [`global`](#global) | This section contains shared configurations across all generated resources |
| [`gonbad`](#gonbad) | This section defines workloads and related resources                       |

## Global

**section:** `global.*`

This object holds shared secrets and configs as well as shared certificate and repository related variables. for
example:

```yaml
global:
  commonImageRegistry: docker.sabz.dev
  commonImagePullSecrets:
    - name: docker-sabz-dev-registry
  sharedConfigs:
    POSTGRES_HOST: postgresql
    POSTGRES_PORT: 5432
    psk_conf: |
      TLSConnect=psk
      TLSAccept=psk
  sharedSecrets:
    POSTGRES_USER: user
    POSTGRES_PASSWORD: encrypted-password
  #...
```

The available parameters:

| Parameter                          | Type                                                   | Description                                                                            | Default                   |
| ---------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------- |
| `issuer`                           | object                                                 | Issuer to be used for certificates                                                     | --                        |
| `issuer.name`                      | string                                                 | (Required) Should follow `^[a-z][a-z0-9]*(-[a-z0-9]+)*$`                               | --                        |
| `issuer.kind`                      | string                                                 | Either `Issuer` or `ClusterIssuer`                                                     | `Issuer`                  |
| `certificate`                      | object                                                 |                                                                                        | --                        |
| `certificate.hosts`                | list                                                   | (Required) List of hosts to issue certificate for them (at least one host is required) | --                        |
| `certificate.create`               | boolean                                                | Whether to create this certificate or not                                              | `false`                   |
| `certificate.secretName`           | string                                                 | Name of secret                                                                         | --                        |
| `commonImageRegistry`              | string                                                 | Default image registry used by `common.containerImage` helper                          | --                        |
| `commonImagePullSecrets`           | list of [`imagePullSecret`](#workload-imagepullsecret) | list of pull secrets added to all workloads                                            | --                        |
| `sharedConfigs`                    | list                                                   | A mapping of `key: value` used to create a `ConfigMap` for shared configs              | --                        |
| `sharedSecrets`                    | list                                                   | A mapping of `key: value` used to create a `Secret` for shared secrets                 | --                        |
| `sharedConfigmapName`              | string                                                 | Name for shared `ConfigMap` created by `global.sharedConfigs`                          | `[.Release.name]-shared ` |
| `sharedSecretName`                 | string                                                 | Name for shared `Secret` created by `global.sharedConfigs`                             | `[.Release.name]-shared ` |
| `ingress.tls`                      | list                                                   | Additional tls for all ingresses see [`ingresses`](#gonbad-ingresses)                  | --                        |
| `ingress.annotations`              | mapping                                                | Additional annotations for all ingresses see [`ingresses`](#gonbad-ingresses)          | --                        |
| `metrics.serviceMonitor.namespace` | string                                                 | Defines a specific namespace for `serviceMonitor` of `metrics`                         | --                        |

---

## Gonbad

**Section:** `gonbad.*`

This is the main object. It contains values from which workloads and other manifests are created. It's most important
sub-object is [`workloads`](#gonbad-workloads). Workloads definition simplify creation and configuring most of used
Kubernetes resources like
Deployments, Services, ServiceMonitors and so on.

| Sections                                       | Description                                                                                                |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| [`workloads`](#gonbad-workloads)               | Workloads definitions which are rendered as kubernetes Deployment, Statefulset, ..                         |
| [`staticFiles`](#gonbad-staticfiles)           | Simplifies mounting small configuration files into workloads                                               |
| [`volumes`](#gonbad-volumes)                   | Volumes definition for workloads                                                                           |
| [`ingresses`](#gonbad-ingresses)               | Simplifies creating kubernetes Ingress resources                                                           |
| [`externalServices`](#gonbad-externalservices) | Creates kubernetes Service to connect to external services from within the cluster using cluster dns names |
| [`prometheusRule`](#gonbad-prometheusrule)     | Simplifies creating PrometheusRules resources                                                              |
| [`rawResources`](#gonbad-rawresources)         | Raw kubernetes resources to add beside other generated resources                                           |

For example:

```yaml
gonbad:
  workloads:
    server:
      kind: deployment
      replicaCount: 1
      service:
        type: NodePort
      containers:
        server:
          image:
            repository: zabbix/zabbix-server-pgsql
            tag: ubuntu-5.2.0
          ports:
            10051:
              name: server
              nodePort: 30051
            10052:
              enabled: false
              name: jmx

    web:
      kind: deployment
      replicaCount: 3
      containers:
        web:
          image:
            repository: zabbix/zabbix-web-nginx-pgsql
            tag: ubuntu-5.2.0
          ports:
            8080:
              name: http
            3040:
              name: metrics
              scrapePath: /metrics

      hostAliases:
        - ip: 1.2.3.4
          hostnames:
            - app1.local
            - app2.local

  ingresses:
    web:
      workloadName: web
      servicePort: http
      hosts:
        - host: zabbix.example.com
  #...
```

### Gonbad Workloads

**Section:** `gonbad.workloads.*`

There are 5 types of workloads. a [`simple`](#simple-workload) workload needs only an image and creates a simple single
container deployment. On the other hand, a [`deployment`](#deployment-workload) workload, takes at least one `container`
directive and can have as many as desired. A [`deployment`](#deployment-workload) workload, provides fine-tuning and
high control over the specified workload. A [`statefulset`](#statefulset-workload), [`daemonset`](#daemonset-workload)
and [`cronjob`](#cronjob-workload) workload are similar to deployment but with different kubernetes resources. To read
more about them go to following sections

- [Simple Workload](#simple-workload)
- [Deployment Workload](#deployment-workload)
- [Statefulset Workload](#statefulset-workload)
- [Daemonset Workload](#daemonset-workload)
- [Cronjob Workload](#cronjob-workload)

To create `simple` workload, set `gonbad.workload.<name>.kind` to [`simple`](#simple-workload) and so on. Each workload
should have a name. A workload is an object which it's key is the workload's name.

```yaml
gonbad:
  workloads:
    foo:
      kind: simple
      #...
    bar:
      kind: deployment
      #...
    rex:
      kind: statefulset
      #...
    jaz:
      kind: daemonset
      #...
    baz:
      kind: cronjob
      #...
```

#### Simple Workload

A `simple` workload named `foo` looks like:

```yaml
gonbad:
  workloads:
    foo:
      kind: simple
      #...
```

The following parameters are available for a `simple` workload.

| Parameter           | Type                                             | Description                                                                                                                         | Default           |
| ------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `kind`              | string                                           | (Required) `simple`                                                                                                                 | --                |
| `enabled`           | boolean                                          | Enables or disable flag for this workload                                                                                           | `true`            |
| `replicaCount`      | positive number                                  | Replica Count for this workload. 0 or greater                                                                                       | `1`               |
| `image`             | [`container.image`](#container-image)            | (Required) Image for the single container in this workload                                                                          | --                |
| `strategy`          | [`deployment.strategy`](#deployment-strategy)    | Update and redeployment strategy for this workload                                                                                  | --                |
| `usedSharedConfigs` | list of strings                                  | While all the `sharedConfigs` are accessible for all workloads, only reload this workload if any of`usedSharedConfigs` have changed | All sharedConfigs |
| `usedSharedSecrets` | list of strings                                  | While all the `sharedSecrets` are accessible for all workloads, only reload this workload if any of`usedSharedSecrets` have changed | All sharedSecrets |
| `command`           | list of strings                                  | Command to run when the container is run as the entrypoint (e.g. `["de.sh", "-v", "-c"]`)                                           | --                |
| `args`              | list of strings                                  | Arguments to pass to `gonbad.workload.command`                                                                                      | --                |
| `env`               | object                                           | Mappings of environment variables to pass to the container, see [`container.env`](#container-env) for samples                       | --                |
| `livenessProbe`     | [`container.probe`](#container-probes)           | liveness prob definition for workload                                                                                               | --                |
| `readinessProbe`    | [`container.probe`](#container-probes)           | Readiness prob definition for workload                                                                                              | --                |
| `resources`         | [`container.resources`](#container-resources)    | Resource definition for workload container                                                                                          | --                |
| `ports`             | mapping of [`container.ports`](#container-ports) | Ports definition for workload                                                                                                       | --                |

---

#### Deployment Workload

A `deployment` workload name `bar` looks like:

```yaml
gonbad:
  workloads:
    bar:
      kind: deployment
      #...
```

A `deployment` workload can have multiple `containers`.

The following parameters are available for a `deployment` workload.

| Parameter                                       | Type                                                   | Description                                                                                                                         | Default                      |
| ----------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `kind`                                          | string                                                 | (Required) `deployment`                                                                                                             | `deployment`                 |
| `enabled`                                       | boolean                                                | Enables or disable flag for this workload                                                                                           | `true`                       |
| `replicaCount`                                  | positive integer                                       | Number of pods for this workload, minimum is 0                                                                                      | `1`                          |
| `containers`                                    | mapping of [`container`](#container)                   | (Required) Containers for this deployment                                                                                           | --                           |
| `initContainers`                                | mapping of [`container`](#container)                   | Containers that are run once in order and must succeed before `containers` or the pod fails                                         | --                           |
| `strategy`                                      | [`deployment.strategy`](#deployment-strategy)          | Deployment strategy definition                                                                                                      | --                           |
| `usedSharedConfigs`                             | list of strings                                        | While all the `sharedConfigs` are accessible for all workloads, only reload this workload if any of`usedSharedConfigs` have changed | All sharedConfigs            |
| `usedSharedSecrets`                             | list of strings                                        | While all the `sharedSecrets` are accessible for all workloads, only reload this workload if any of`usedSharedSecrets` have changed | All sharedSecrets            |
| `serviceAccount.name`                           | string                                                 | Name of `serviceAccount` that this `deployment` uses                                                                                | --                           |
| `service.type`                                  | string                                                 | either `ClusterIP` or `NodePort`. Type of service to use for this `deployment`                                                      | `ClusterIP`                  |
| `service.labels`                                | mapping                                                | Extra labels to add to related Service [`k8s.label regex`](#common-regexes)                                                         | --                           |
| `service.annotations`                           | mapping                                                | Extra annotations to add to related Service [`k8s.annotation regex`](#common-regexes)                                               | --                           |
| `securityContext`                               | [`pod.securityContext`](#pod-securitycontext)          | Pod securityContext definition                                                                                                      | --                           |
| `labels`                                        | mapping                                                | Extra labels to add to Deployment [`k8s.label regex`](#common-regexes)                                                              | --                           |
| `annotations`                                   | mapping                                                | Extra annotations to add to Deployment [`k8s.annotation regex`](#common-regexes)                                                    | --                           |
| `podLabels`                                     | mapping                                                | Extra labels to add to final Pod [`k8s.label regex`](#common-regexes)                                                               | --                           |
| `podAnnotations`                                | mapping                                                | Extra annotations to add to final Pod [`k8s.annotation regex`](#common-regexes)                                                     | --                           |
| `terminationGracePeriodSeconds`                 | positive integer                                       | Optional duration in seconds the pod needs to terminate gracefully.                                                                 |                              |
| `hostNetwork`                                   | boolean                                                | Configure pod hostNetwork like kubernetes native notation                                                                           | `false`                      |
| `hostAliases`                                   | list                                                   | Resolve the given hostname to an IP                                                                                                 | --                           |
| `hostAliases[].ip`                              | string                                                 | Resolve to this `ip` for given `hostAliases.hostnames`                                                                              | --                           |
| `hostAliases[].hostnames`                       | list of strings                                        | List of host names to be resolved to `hostAliases.ip`                                                                               | --                           |
| `hpa`                                           | [`workload.hpa`](#workload-hpa)                        | Create and configure related `HorizontalPodAutoscaler`                                                                              | --                           |
| `pdb`                                           | [`workload.pdb`](#workload-pdb)                        | Create and configure related `PodDisruptionBudget`                                                                                  | --                           |
| `antiAffinityMode`                              | string                                                 | Configure pod affinity if workload.affinity is not set. Valid values are `preferred`, `required`                                    | --                           |
| `antiAffinityTopologyKeys`                      | list of strings                                        | topologyKeys for antiAffinityMode when setting workload.affinity                                                                    | `['kubernetes.io/hostname']` |
| `affinity`                                      | object                                                 | Configure pod affinity like kubernetes native notation                                                                              | --                           |
| `tolerations`                                   | list                                                   | Configure pod tolerations like kubernetes native notation                                                                           | --                           |
| `nodeSelector`                                  | mapping                                                | Configure pod nodeSelector as key:value pairs like kubernetes native notation                                                       | --                           |
| `dnsPolicy`                                     | string                                                 | dnsPolicy for this workload, one of `Default`,`ClusterFirst`,`ClusterFirstWithHostNet`,`None`                                       | --                           |
| `fullnameOverride`                              | string                                                 | Override name of workload                                                                                                           | --                           |
| `minReadySeconds`                               | positive integer                                       | Minimum number of seconds for which a newly created pod should be ready without any of its container crashing                       | --                           |
| `priorityClassName`                             | string                                                 | If specified, indicates the pod's priority. It must be defined by creating a PriorityClass object with that name.                   | --                           |
| `imagePullSecrets`                              | list of [`imagePullSecret`](#workload-imagepullsecret) | list of pull secrets added to this workloads                                                                                        | --                           |
| `topologySpreadConstraints`                     | list                                                   | describes how a group of pods ought to spread across topology domains                                                               | --                           |
| `topologySpreadConstraints[].maxSkew`           | positive integer                                       | (Required)                                                                                                                          |                              |
| `topologySpreadConstraints[].topologyKey`       | string                                                 | (Required)                                                                                                                          |                              |
| `topologySpreadConstraints[].whenUnsatisfiable` | string                                                 | (Required) oneOf `DoNotSchedule` or `ScheduleAnyway`                                                                                |                              |
| `topologySpreadConstraints[].labelSelector`     | mapping                                                | (Required)                                                                                                                          |                              |
| `topologySpreadConstraintsSkew`                 | positive integer                                       | Add simple pod topologySpreadConstraints with given skew                                                                            | --                           |

---

#### StatefulSet Workload

A `statefulset` workload name `bar` looks like:

```yaml
gonbad:
  workloads:
    rex:
      kind: statefulset
      #...
      volumeClaimTemplates:
        data-vol:
          size: 10Gi
        log-vol:
          size: 1Gi
    #...
```

A `statefulset` workload can have multiple `containers`.

The following parameters are available for a `statefulset` workload.

| Parameter                                       | Type                                                        | Description                                                                                                                         | Default                      |
| ----------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `kind`                                          | string                                                      | (Required) `statefulset`                                                                                                            | `statefulset`                |
| `enabled`                                       | boolean                                                     | Enables or disable flag for this workload                                                                                           | `true`                       |
| `replicaCount`                                  | positive integer                                            | Number of pods for this workload, minimum is 0                                                                                      | `1`                          |
| `containers`                                    | mapping of [`container`](#container)                        | (Required) Containers for this statefulset                                                                                          | --                           |
| `initContainers`                                | mapping of [`container`](#container)                        | Containers that are run once in order and must succeed before `containers` or the pod fails                                         | --                           |
| `podManagementPolicy`                           | string                                                      | Controls how pods are created during initial scale up, valid values are `OrderedReady`, `Parallel`                                  | `OrderedReady`               |
| `updateStrategy.type`                           | string                                                      | Statefulset update strategy type, valid values are `RollingUpdate`, `OnDelete`                                                      | `RollingUpdate`              |
| `usedSharedConfigs`                             | list of strings                                             | While all the `sharedConfigs` are accessible for all workloads, only reload this workload if any of`usedSharedConfigs` have changed | All sharedConfigs            |
| `usedSharedSecrets`                             | list of strings                                             | While all the `sharedSecrets` are accessible for all workloads, only reload this workload if any of`usedSharedSecrets` have changed | All sharedSecrets            |
| `serviceAccount.name`                           | string                                                      | Name of `serviceAccount` that this `statefulset` uses                                                                               | --                           |
| `service.type`                                  | string                                                      | either `ClusterIP` or `NodePort` or `Headless`. Type of service to use for this `statefulset`                                       | `ClusterIP`                  |
| `service.labels`                                | mapping                                                     | Extra labels to add to related Service [`k8s.label regex`](#common-regexes)                                                         | --                           |
| `service.annotations`                           | mapping                                                     | Extra annotations to add to related Service [`k8s.annotation regex`](#common-regexes)                                               | --                           |
| `securityContext`                               | [`pod.securityContext`](#pod-securitycontext)               | Pod securityContext definition                                                                                                      | --                           |
| `labels`                                        | mapping                                                     | Extra labels to add to Deployment [`k8s.label regex`](#common-regexes)                                                              | --                           |
| `annotations`                                   | mapping                                                     | Extra annotations to add to Deployment [`k8s.annotation regex`](#common-regexes)                                                    | --                           |
| `podLabels`                                     | mapping                                                     | Extra labels to add to final Pod [`k8s.label regex`](#common-regexes)                                                               | --                           |
| `podAnnotations`                                | mapping                                                     | Extra annotations to add to final Pod [`k8s.annotation regex`](#common-regexes)                                                     | --                           |
| `terminationGracePeriodSeconds`                 | positive integer                                            | Optional duration in seconds the pod needs to terminate gracefully.                                                                 |                              |
| `hostNetwork`                                   | boolean                                                     | Configure pod hostNetwork like kubernetes native notation                                                                           | `false`                      |
| `hostAliases`                                   | list                                                        | Resolve the given hostname to an IP                                                                                                 | --                           |
| `hostAliases[].hostnames`                       | list of strings                                             | List of host names to be resolved to `hostAliases.ip`                                                                               | --                           |
| `hostAliases[].ip`                              | string                                                      | Resolve to this `ip` for given `hostAliases.hostnames`                                                                              | --                           |
| `volumeClaimTemplates`                          | [`volumeClaimTemplates`](#statefulset-volumeclaimtemplates) | Simplified notation of StatefulSet.volumeClaimTemplates                                                                             |                              |
| `hpa`                                           | [`workload.hpa`](#workload-hpa)                             | Create and configure related `HorizontalPodAutoscaler`                                                                              | --                           |
| `pdb`                                           | [`workload.pdb`](#workload-pdb)                             | Create and configure related `PodDisruptionBudget`                                                                                  | --                           |
| `dnsPolicy`                                     | string                                                      | dnsPolicy for this workload, one of `Default`,`ClusterFirst`,`ClusterFirstWithHostNet`,`None`                                       | --                           |
| `antiAffinityMode`                              | string                                                      | Configure pod affinity if workload.affinity is not set. Valid values are `preferred`, `required`                                    | --                           |
| `antiAffinityTopologyKeys`                      | list of strings                                             | topologyKeys for antiAffinityMode when setting workload.affinity                                                                    | `['kubernetes.io/hostname']` |
| `affinity`                                      | object                                                      | Configure pod affinity like kubernetes native notation                                                                              | --                           |
| `tolerations`                                   | list                                                        | Configure pod tolerations like kubernetes native notation                                                                           | --                           |
| `nodeSelector`                                  | mapping                                                     | Configure pod nodeSelector as key:value pairs like kubernetes native notation                                                       | --                           |
| `fullnameOverride`                              | string                                                      | Override name of workload                                                                                                           | --                           |
| `minReadySeconds`                               | positive integer                                            | Minimum number of seconds for which a newly created pod should be ready without any of its container crashing                       | --                           |
| `priorityClassName`                             | string                                                      | If specified, indicates the pod's priority. It must be defined by creating a PriorityClass object with that name.                   | --                           |
| `imagePullSecrets`                              | list of [`imagePullSecret`](#workload-imagepullsecret)      | list of pull secrets added to this workloads                                                                                        | --                           |
| `topologySpreadConstraints`                     | list                                                        | describes how a group of pods ought to spread across topology domains                                                               | --                           |
| `topologySpreadConstraints[].maxSkew`           | positive integer                                            | (Required)                                                                                                                          |                              |
| `topologySpreadConstraints[].topologyKey`       | string                                                      | (Required)                                                                                                                          |                              |
| `topologySpreadConstraints[].whenUnsatisfiable` | string                                                      | (Required) oneOf `DoNotSchedule` or `ScheduleAnyway`                                                                                |                              |
| `topologySpreadConstraints[].labelSelector`     | mapping                                                     | (Required)                                                                                                                          |                              |
| `topologySpreadConstraintsSkew`                 | positive integer                                            | Add simple pod topologySpreadConstraints with given skew                                                                            | --                           |

---

#### Daemonset Workload

A `daemonset` workload name `jaz` looks like:

```yaml
gonbad:
  workloads:
    jaz:
      kind: daemonset
      #...
```

A `cronjob` workload can have multiple `containers`.

The following parameters are available for a `cronjob` workload.

| Parameter                       | Type                                                   | Description                                                                                                                         | Default                      |
| ------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `kind`                          | string                                                 | (Required) `daemonset`                                                                                                              | `daemonset`                  |
| `enabled`                       | boolean                                                | Enables or disable flag for this workload                                                                                           | `true`                       |
| `containers`                    | mapping of [`container`](#container)                   | (Required) Containers for this daemonset                                                                                            | --                           |
| `initContainers`                | mapping of [`container`](#container)                   | Containers that are run once in order and must succeed before `containers` or the pod fails                                         | --                           |
| `updateStrategy`                | string                                                 | OneOf `RollingUpdate`, `OnDelete`                                                                                                   | `RollingUpdate`              |
| `usedSharedConfigs`             | list of strings                                        | While all the `sharedConfigs` are accessible for all workloads, only reload this workload if any of`usedSharedConfigs` have changed | All sharedConfigs            |
| `usedSharedSecrets`             | list of strings                                        | While all the `sharedSecrets` are accessible for all workloads, only reload this workload if any of`usedSharedSecrets` have changed | All sharedSecrets            |
| `serviceAccount.name`           | string                                                 | Name of `serviceAccount` that this `daemonset` uses                                                                                 | --                           |
| `service.type`                  | string                                                 | either `ClusterIP` or `NodePort`. Type of service to use for this `daemonset`                                                       | `ClusterIP`                  |
| `service.labels`                | mapping                                                | Extra labels to add to related Service [`k8s.label regex`](#common-regexes)                                                         | --                           |
| `service.annotations`           | mapping                                                | Extra annotations to add to related Service [`k8s.annotation regex`](#common-regexes)                                               | --                           |
| `securityContext`               | [`pod.securityContext`](#pod-securitycontext)          | Pod securityContext definition                                                                                                      | --                           |
| `labels`                        | mapping                                                | Extra labels to add to Daemonset [`k8s.label regex`](#common-regexes)                                                               | --                           |
| `annotations`                   | mapping                                                | Extra annotations to add to Daemonset [`k8s.annotation regex`](#common-regexes)                                                     | --                           |
| `podLabels`                     | mapping                                                | Extra labels to add to final Pod [`k8s.label regex`](#common-regexes)                                                               | --                           |
| `podAnnotations`                | mapping                                                | Extra annotations to add to final Pod [`k8s.annotation regex`](#common-regexes)                                                     | --                           |
| `terminationGracePeriodSeconds` | positive integer                                       | Optional duration in seconds the pod needs to terminate gracefully.                                                                 |                              |
| `hostNetwork`                   | boolean                                                | Configure pod hostNetwork like kubernetes native notation                                                                           | `false`                      |
| `hostAliases`                   | list                                                   | Resolve the given hostname to an IP                                                                                                 | --                           |
| `hostAliases[].ip`              | string                                                 | Resolve to this `ip` for given `hostAliases.hostnames`                                                                              | --                           |
| `hostAliases[].hostnames`       | list of strings                                        | List of host names to be resolved to `hostAliases.ip`                                                                               | --                           |
| `antiAffinityMode`              | string                                                 | Configure pod affinity if workload.affinity is not set. Valid values are `preferred`, `required`                                    | --                           |
| `antiAffinityTopologyKeys`      | list of strings                                        | topologyKeys for antiAffinityMode when setting workload.affinity                                                                    | `['kubernetes.io/hostname']` |
| `affinity`                      | object                                                 | Configure pod affinity like kubernetes native notation                                                                              | --                           |
| `tolerations`                   | list                                                   | Configure pod tolerations like kubernetes native notation                                                                           | --                           |
| `nodeSelector`                  | mapping                                                | Configure pod nodeSelector as key:value pairs like kubernetes native notation                                                       | --                           |
| `dnsPolicy`                     | string                                                 | dnsPolicy for this workload, one of `Default`,`ClusterFirst`,`ClusterFirstWithHostNet`,`None`                                       | --                           |
| `fullnameOverride`              | string                                                 | Override name of workload                                                                                                           | --                           |
| `priorityClassName`             | string                                                 | If specified, indicates the pod's priority. It must be defined by creating a PriorityClass object with that name.                   | --                           |
| `imagePullSecrets`              | list of [`imagePullSecret`](#workload-imagepullsecret) | list of pull secrets added to this workloads                                                                                        | --                           |

---

#### CronJob Workload

A `cronjob` workload name `baz` looks like:

```yaml
gonbad:
  workloads:
    baz:
      kind: cronjob
      schedule: '0 */2 * * *'
      #...
```

A `cronjob` workload can have multiple `containers`.

The following parameters are available for a `cronjob` workload.

| Parameter                    | Type                                                   | Description                                                                                                                         | Default           |
| ---------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `kind`                       | string                                                 | (Required) `cronjob`                                                                                                                | `cronjob`         |
| `enabled`                    | boolean                                                | Enables or disable flag for this workload                                                                                           | `true`            |
| `schedule`                   | string                                                 | (Required) crontab like string eg: `0 */2 * * *`                                                                                    | --                |
| `containers`                 | mapping of [`container`](#container)                   | (Required) Containers for this cronjob                                                                                              | --                |
| `initContainers`             | mapping of [`container`](#container)                   | Containers that are run once in order and must succeed before `containers` or the pod fails                                         | --                |
| `startingDeadlineSeconds`    | positive integer                                       | Optional deadline in seconds for starting the job if it misses scheduled time for any reason                                        | --                |
| `concurrencyPolicy`          | string                                                 | Specifies how to treat concurrent executions of a Job. Valid values are: `Allow`, `Forbid`, `Replace`                               | `Allow`           |
| `successfulJobsHistoryLimit` | positive integer                                       | The number of successful finished jobs to retain                                                                                    | `3`               |
| `failedJobsHistoryLimit`     | positive integer                                       | The number of failed finished jobs to retain                                                                                        | `1`               |
| `suspend`                    | boolean                                                | This flag tells the controller to suspend subsequent executions                                                                     | `false`           |
| `restartPolicy`              | string                                                 | Restart policy for all containers within the pod. One of `Always`, `OnFailure`, `Never`                                             | `Always`          |
| `usedSharedConfigs`          | list of strings                                        | While all the `sharedConfigs` are accessible for all workloads, only reload this workload if any of`usedSharedConfigs` have changed | All sharedConfigs |
| `usedSharedSecrets`          | list of strings                                        | While all the `sharedSecrets` are accessible for all workloads, only reload this workload if any of`usedSharedSecrets` have changed | All sharedSecrets |
| `securityContext`            | [`pod.securityContext`](#pod-securitycontext)          | Pod securityContext definition                                                                                                      | --                |
| `serviceAccount.name`        | string                                                 | Name of `serviceAccount` that this `cronjob` uses                                                                                   | --                |
| `hostAliases`                | list                                                   | Resolve the given hostname to an IP                                                                                                 | --                |
| `hostAliases[].hostnames`    | list of strings                                        | List of host names to be resolved to `hostAliases.ip`                                                                               | --                |
| `hostAliases[].ip`           | string                                                 | Resolve to this `ip` for given `hostAliases.hostnames`                                                                              | --                |
| `imagePullSecrets`           | list of [`imagePullSecret`](#workload-imagepullsecret) | list of pull secrets added to this workloads                                                                                        | --                |

---

### Gonbad Staticfiles

**Section:** `gonbad.staticFiles`

In order to mount single staticfiles (e.g., configuration files) inside containers, they need to be defined under
`gonbad.staticfiles`. Then it's possible to reference the staticFiles from `gonbad.workloads.containers.fileMounts`.

Say one would want to define 2 static files named `.zshrc` and `sshd.config`. it would look like:

```yaml
gonbad:
  #...
  staticFiles:
    .zshrc: |
      alias ll="ls -alh"
      alias g="git"
    sshd.config: |
      Port: 23412
  #...
```

This will create related `configMaps` and handles the integrity and naming uniformity.

### Gonbad Volumes

**section:** `gonbad.volumes`

To create PVC and use them or mount Secrets/ConfigMaps into pods, they must first defined in the `volumes` section and
then mount in containers using `containers.volumeMounts`. Different types of volumes are: `persistentVolumeClaim`,
`secret`, `configMap`, `emptyDir`, `ephemeral` and `existingPVC`. The parameters of each will be described below.

The following parameters are available:

| Parameter | Type   | Description                                                                                                           | Default |
| --------- | ------ | --------------------------------------------------------------------------------------------------------------------- | ------- |
| `type`    | string | (Required) Valid values are `persistentVolumeClaim`, `secret`, `configMap`, `emptyDir`, `ephemeral` and `existingPVC` | --      |

#### volume.type: persistentVolumeClaim

| Parameter      | Type                       | Description                                                                                    | Default |
| -------------- | -------------------------- | ---------------------------------------------------------------------------------------------- | ------- |
| `type`         | string                     | (Required) `persistentVolumeClaim`                                                             | --      |
| `size`         | positive integer or string | (Required) The size of PVC. (eg. 1024 or 2Gi)                                                  | --      |
| `accessMode`   | string                     | (Required) Access Mode for this PVC; one of `ReadOnlyMany`, `ReadWriteOnce` or `ReadWriteOnce` | --      |
| `storageClass` | string                     | `storageClass` of ths PVC                                                                      | --      |

#### volume.type: existingPVC

| Parameter  | Type    | Description                                              | Default |
| ---------- | ------- | -------------------------------------------------------- | ------- |
| `type`     | string  | (Required) `existingPVC`                                 | --      |
| `name`     | string  | (Required) Name of existing PersistentVolumeClaim to use | --      |
| `readOnly` | boolean | Flag to mount as readonly                                | `false` |

#### volume.type: ephemeral

| Parameter      | Type                       | Description                                                                                              | Default |
| -------------- | -------------------------- | -------------------------------------------------------------------------------------------------------- | ------- |
| `type`         | string                     | (Required) `ephemeral`                                                                                   | --      |
| `size`         | positive integer or string | (Required) The size of ephemeral PVC . (eg. 1024 or 2Gi)                                                 | --      |
| `accessMode`   | string                     | (Required) Access Mode for this ephemeral PVC; one of `ReadOnlyMany`, `ReadWriteOnce` or `ReadWriteOnce` | --      |
| `storageClass` | string                     | `storageClass` of ths ephemeral PVC                                                                      | --      |

#### volume.type: emptyDir

| Parameter | Type   | Description           | Default |
| --------- | ------ | --------------------- | ------- |
| `type`    | string | (Required) `emptyDir` | --      |

#### volume.type: secret

| Parameter      | Type    | Description                                                                                                                       | Default |
| -------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `type`         | string  | (Required) `secret`                                                                                                               | --      |
| `name`         | string  | (Required) Name of Secret to use                                                                                                  | --      |
| `items`        | list    | If set only defined keys from secret will projected into the specified mount path                                                 | --      |
| `items[].key`  | string  | (Required) Key in Secret                                                                                                          | --      |
| `items[].path` | string  | (Required) The relative path of the file to map the key to                                                                        | --      |
| `items[].mode` | integer | mode bits used to set permissions on this file. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511 | --      |

#### volume.type: configMap

| Parameter      | Type    | Description                                                                                                                       | Default |
| -------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `type`         | string  | (Required) `configMap`                                                                                                            | --      |
| `name`         | string  | (Required) Name of ConfigMap to use                                                                                               | --      |
| `items`        | list    | If set only defined keys from configMap will projected into the specified mount path                                              | --      |
| `items[].key`  | string  | (Required) Key in ConfigMap                                                                                                       | --      |
| `items[].path` | string  | (Required) The relative path of the file to map the key to                                                                        | --      |
| `items[].mode` | integer | mode bits used to set permissions on this file. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511 | --      |

#### volume.type: hostPath

| Parameter      | Type   | Description                                                                                                      | Default |
| -------------- | ------ | ---------------------------------------------------------------------------------------------------------------- | ------- |
| `type`         | string | (Required) `hostPath`                                                                                            | --      |
| `path`         | string | (Required) path on host to use as volume                                                                         | --      |
| `hostPathType` | string | (Required) Oneof "DirectoryOrCreate", "Directory", "FileOrCreate", "File", "Socket", "CharDevice", "BlockDevice" | --      |

### Gonbad Ingresses

**Section:** `gonbad.ingresses`

In order to create ingress resources, one should define them under `gonbad.ingresses`. An ingress names `ing` looks
like:

```yaml
ingresses:
  web:
    workloadName: web
    servicePort: http
    hosts:
      - host: example.com
    annotations:
      annot: something
    tls:
      - secretName: example-com-tls
  media:
    #...
    hosts:
      paths:
        - /
            - /browse/
            - path: /serve/
            workloadName: media
            servicePort: http
```

| Parameter                      | Type                       | Description                                                                                                                               | Default                  |
| ------------------------------ | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `enabled`                      | boolean                    | Enables this ingress                                                                                                                      | `true`                   |
| `workloadName`                 | string                     | (Required) Name of workload to route traffic to its service (internally release-name will be prepend) it take precedence over serviceName | --                       |
| `serviceName`                  | string                     | (Required) Name of backend service to route traffic to                                                                                    | --                       |
| `servicePort`                  | string                     | (Required) Port name of the backend service                                                                                               | --                       |
| `ingressClassName`             | string                     |                                                                                                                                           |                          |
| `fullnameOverride`             | string                     |                                                                                                                                           |                          |
| `hosts`                        | list                       | (Required) Hosts that are routed through this ingress definition                                                                          | --                       |
| `hosts[].host`                 | string                     | (Required) Host address to be routed (in idn format)                                                                                      | --                       |
| `hosts[].paths`                | list                       | Path part of the address to be routed. The `paths` can be just a list of addresses or each path can have specific configurations          | --                       |
| `hosts[].paths[].path`         | string                     | (Required) Request path to be routed                                                                                                      | --                       |
| `hosts[].paths[].pathType`     | string                     | (Required) One of `ImplementationSpecific`, `Exact` or `Prefix`                                                                           | `ImplementationSpecific` |
| `hosts[].paths[].workloadName` | string                     | Name of workload to route traffic to its service (internally release-name will be prepend)it take precedence over serviceName             | parent `workloadName`    |
| `hosts[].paths[].serviceName`  | string                     | Name of backend service to route traffic to. default to                                                                                   | parent `serviceName`     |
| `hosts[].paths[].servicePort`  | string or positive integer | Port name of the backend service                                                                                                          | parent `servicePort`     |
| `labels`                       | mapping                    | Labels for this ingress                                                                                                                   | --                       |
| `annotations`                  | mapping                    | Annotations for this ingress                                                                                                              | --                       |
| `tls`                          | list                       | tls for this ingress                                                                                                                      | --                       |
| `tls[].secretName`             | string                     | (Required) Name of Secret to use                                                                                                          | --                       |
| `tls[].hosts`                  | list of strings            | Hostnames for which secretName will be used                                                                                               | --                       |

**Notes:**

- `workloadName` only prepend the release name internally. It does not check if workload is exists/enabled and not
  use`workload.fullnameOverride`
- In addition, `global.ingress.annotations` and `global.ingress.tls` can be configured. The two will be merged into all
  ingresses.

---

### Gonbad ExternalServices

**Section:** `gonbad.externalServices`

To point to an external service, one should define them under `gonbad.externalServices`. The parameters are as follows.
(take note that besides `ports`, one of `externalIPs` or `externalName are required)

| Parameter      | Type                                  | Description                                                                         | Default |
| -------------- | ------------------------------------- | ----------------------------------------------------------------------------------- | ------- |
| `enabled`      | boolean                               | Enables this `externalServices`                                                     | --      |
| `externalName` | string                                | (Either this or `externalIPs` is required) IDN hostname of the external service     | --      |
| `externalIPs`  | list of strings                       | (Either this or `externalName` is required) IPv4s or IPv6s for the external service | --      |
| `ports`        | [`container.ports`](#container-ports) | Ports of external services                                                          | --      |

---

### Gonbad PrometheusRule

**Section**: `gonbad.prometheusRule`

| Parameter             | Type              | Description                                                                                     | Default |
| --------------------- | ----------------- | ----------------------------------------------------------------------------------------------- | ------- |
| `enabled`             | boolean           | Enables this `prometheusrule`                                                                   | `true`  |
| `tpl`                 | string            | Treat rules as helm template                                                                    | `false` |
| `interval`            | positive integer  | Interval between each time `prometheusRule.rules` are run                                       | --      |
| `grafanaDomain`       | string            | grafana domain for connection from prometheus to grafana                                        | --      |
| `rules`               | list              | Prometheus Rules                                                                                | --      |
| `rules[].expr`        | integer or string | (Required) Rule expression to calculated in prometheus                                          | --      |
| `rules[].alert`       | string            | If set this rule will act as alert with given name                                              | --      |
| `rules[].record`      | string            | If set result of expr will saved in new metric with given name                                  | --      |
| `rules[].for`         | string            | How long to wait before raising the alert. Must match the regular expression `[0-9]+(ms\s\m\h)` | --      |
| `rules[].labels`      | mappings          | Labels for this rule                                                                            | --      |
| `rules[].annotations` | mappings          | Annotations for this rule                                                                       | --      |

---

### Gonbad rawResources

**Section**: `gonbad.rawResources`

Raw kubernetes resources to add beside other generated resources. This section is a `list` of raw resources with
following parameters

| Parameter              | Type    | Description                                                                           | Default |
| ---------------------- | ------- | ------------------------------------------------------------------------------------- | ------- |
| `apiVersion`           | string  | (Required) apiVersion on raw resource                                                 | --      |
| `kind`                 | string  | (Required) kind of raw resource                                                       | --      |
| `metadata.name`        | string  | (Required) name of raw resource                                                       | --      |
| `metadata.namespace`   | string  | namespace in which the raw resource will be created                                   | --      |
| `metadata.labels`      | mapping | Labels of raw resource [`k8s.label regex`](#common-regexes)                           | --      |
| `metadata.annotations` | mapping | Annotations of raw resource [`k8s.annotation regex`](#common-regexes)                 | --      |
| `*`                    | any     | Any other parameter treated as the resource parameter and not validated in this chart | --      |

---

## Additional Parameters

The following objects, are not used directly. They are sub-types of the above objects.

---

### Deployment strategy

**section: `deployment.strategy`**

Deployment strategy of a workload is used when the workload is reapplied or upgraded. A strategy is defined by:

| Parameter                      | Type                       | Description                                                                                                                     | Default         |
| ------------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `type`                         | string                     | Deployment strategy; either `Recreate` or `RollingUpdate`. If `type` is set to `Recreate`, no additional properties is accepted | `RollingUpdate` |
| `rollingUpdate.maxSurge`       | string or positive integer | Maximum over `replicaCount` pods when doing a Rolling Update (in percent or positive integer)                                   | `25%`           |
| `rollingUpdate.maxUnavailable` | string or positive integer | Maximum unavailable pods when doing a RollingUpdate (in percent or positive integer)                                            | `25%`           |

---

### Workload ImagePullSecret

| Parameter  | Type   | Description                                                                                  | Default |
| ---------- | ------ | -------------------------------------------------------------------------------------------- | ------- |
| `name`     | string | (Required) Name of `Secret` with type `kubernetes.io/dockerconfigjson` to be used or created | --      |
| `registry` | string | Registry for created Secret                                                                  | --      |
| `username` | string | Username for created Secret                                                                  | --      |
| `password` | string | Password for created Secret                                                                  | --      |

### Workload HPA

**section: `workload.hpa`**

Create a `HorizontalPodAutoscaler` resource related to workload and configure it

| Parameter                             | Type             | Description                                                                                                     | Default |
| ------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------- | ------- |
| `minReplicas`                         | integer          | Minimum replica set via hpa                                                                                     | 1       |
| `maxReplicas`                         | integer          | (Required) Maximum replica set via hpa                                                                          | --      |
| `cpuAverageUtilization`               | integer          | shortcut for resource based cpu metric                                                                          | --      |
| `memoryAverageUtilization`            | integer          | shortcut for resource based memory metric                                                                       | --      |
| `metrics`                             | list             | List of metrics used for autoscaling                                                                            | --      |
| `metrics[].type`                      | string           | (Required) one of `Resource`, `Pods`, `Object`, `External`                                                      | --      |
| `metrics[].name`                      | string           | (Required) metric name                                                                                          | --      |
| `metrics[].metricSelector`            | object           | Label selector for metric                                                                                       | --      |
| `metrics[].target`                    | object           | Target quantity or percentage on which autoscaling occure. Only one of its childs could be set for each metrics | --      |
| `metrics[].target.value`              | quantity         | Exact value of metric, could be set for `Resource`, `Object`, `External` metrics only                           | --      |
| `metrics[].target.averageValue`       | quantity         | Sum of metric value devided by pods number, could be set for all metrics                                        | --      |
| `metrics[].target.averageUtilization` | positive integer | Average utilization of resource over all pods, could be set only for `Resource` metric                          | --      |
| `metrics[].describedObject`           | object           | Describe another object in same namespace to get metrics for. could be set only for `Object` metric             | --      |

---

### Workload PDB

**section`workload.pdb`**

Create a `PodDisruptionBudget` resource related to workload and configure it

| Parameter        | Type                           | Description                                                                              | Default |
| ---------------- | ------------------------------ | ---------------------------------------------------------------------------------------- | ------- |
| `minAvailable`   | percentage or positive integer | Minimum available pods when kubelet evict pods. (mutually exclusive with maxUnavailable) | --      |
| `maxUnavailable` | percentage or positive integer | Maximum unavailable pods when kubelet evict pods. (mutually exclusive with minAvailable) | --      |

---

### Pod securityContext

**section: `workload.securityContext`**

`pod.securityContext` holds pod-level security attributes and common container settings. Some fields are also present in
`container.securityContext`. Field values of container.securityContext take precedence over field values
of `pod.securityContext`.

| Parameter             | Type             | Description                                                                                                                                                                                                                                                   | Default |
| --------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `runAsUser`           | positive integer | The UID to run the entrypoint of the container process. Uses runtime default if unset                                                                                                                                                                         | --      |
| `runAsGroup`          | positive integer | The GID to run the entrypoint of the container process. Uses runtime default if unset                                                                                                                                                                         | --      |
| `runAsNonRoot`        | boolean          | Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does.                                                  | --      |
| `fsGroup`             | positive integer | A special supplemental group that applies to all containers in a pod. Some volume types allow the Kubelet to change the ownership of that volume to be owned by the pod                                                                                       | --      |
| `fsGroupChangePolicy` | string           | One of `Always`, `OnRootMismatch`. fsGroupChangePolicy defines behavior of changing ownership and permission of the volume before being exposed inside Pod. This field will only apply to volume types which support fsGroup based ownership(and permissions) | --      |

**Valid additional parameters:** `kubectl explain pod.spec.securityContext`

---

### Container

| Parameter                  | Type                                                      | Description                                                                                                   | Default |
| -------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------- |
| `enabled`                  | boolean                                                   | Enable/Disable container in pod manifest                                                                      | `true`  |
| `image`                    | [`container.image`](#container-image)                     | The image that the container is build of                                                                      | --      |
| `command`                  | list of strings                                           | Command to run when the container is run as the entrypoint (e.g. `["de.sh", "-v", "-c"]`)                     | --      |
| `args`                     | list of strings                                           | Arguments to pass to `container.command`                                                                      | --      |
| `env`                      | object                                                    | Mappings of environment variables to pass to the container, see [`container.env`](#container-env) for samples | --      |
| `envFrom`                  | list of [`container.envFrom`](#container-envfrom)         | Load all env from ConfigMap or Secret                                                                         | --      |
| `livenessProbe`            | [`container.probe`](#container-probes)                    | liveness prob definition                                                                                      | --      |
| `readinessProbe`           | [`container.probe`](#container-probes)                    | Readiness prob definition                                                                                     | --      |
| `startupProbe`             | [`container.probe`](#container-probes)                    | Startup prob definition                                                                                       | --      |
| `resources`                | [`container.resources`](#container-resources)             | Resource requests and limits                                                                                  | --      |
| `ports`                    | [`container.ports`](#container-ports)                     | Ports definition                                                                                              | --      |
| `lifecycle`                | [`container.lifecycle`](#container-lifecycle)             | Container lifecycle definition                                                                                | --      |
| `securityContext`          | [`container.securityContext`](#container-securitycontext) | Container securityContext definition                                                                          | --      |
| `fileMounts`               | list                                                      | Single file mountings definition                                                                              | --      |
| `fileMounts[].name`        | string                                                    | StaticFile name                                                                                               | --      |
| `fileMounts[].mountPath`   | string                                                    | Path to mount the file                                                                                        | --      |
| `fileMounts[].executable`  | boolean                                                   | Mount file as executable ( 0555 )                                                                             | false   |
| `volumeMounts`             | list                                                      | Volume mountings definition                                                                                   | --      |
| `volumeMounts[].name`      | string                                                    | StaticFile name                                                                                               | --      |
| `volumeMounts[].mountPath` | string                                                    | Path to mount the volume                                                                                      | --      |
| `volumeMounts[].subPath`   | string                                                    | SubPath of volume to mount                                                                                    | --      |
| `volumeMounts[].readOnly`  | boolean                                                   | Flag to mount as readonly                                                                                     | `false` |
| `order`                    | positive integer                                          | Ensure container order when creating k8s manifest                                                             | --      |

### Container image

**section: `container.image`**

| Parameter    | Type   | Description                                                                                                                     | Default        |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `repository` | string | (Required) Repository from which the image is pulled, can contain the `registry` as well. e.g. `https://docer.sabz.dev/grafana` | --             |
| `tag`        | string | (Required)                                                                                                                      | --             |
| `pullPolicy` | string | Either `Always` or `IfNotPresent`                                                                                               | `IfNotPresent` |
| `registry`   | string | Registry address used for pulling the image, e.g. `https://docker.io`                                                           | --             |

---

### Container Env

**section:** `workload.container.env`

each env on `workload.container` can be a number, a string or an object described in below table to retrieve from other
places like ConfigMap, note that only one of `value`, `secretRef`, `configMapRef`, `resourceFieldRef` and `fieldRef` can
be set.

Envs are sorted as following groups, each group will sorted alphabetically:

1. all envs which have `order` by their order except `order: -1`
2. all unordered `secretRef`, `configMapRef`, `resourceFieldRef` and `fieldRef` envs
3. all simple or `value` envs which doesn't have `$(` in them
4. all simple or `value` envs which have `$(` in them
5. all `order: -1` envs

| Parameter                        | Type    | Description                                                                                                                                                                     | Default |
| -------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `order`                          | integer | Ensure env order when using kubernetes internal env templating $(...), Valid values are positive integers and `-1` which means last                                             | --      |
| `value`                          | string  | Exact value                                                                                                                                                                     | --      |
| `secretRef`                      | object  | To retrieve value from Secret                                                                                                                                                   | --      |
| `secretRef.name`                 | string  | (Required) secret name                                                                                                                                                          | --      |
| `secretRef.key`                  | string  | (Required) key in the given secret                                                                                                                                              | --      |
| `secretRef.optional`             | boolean | Specify whether the Secret or its key must be defined                                                                                                                           | --      |
| `configMapRef`                   | object  | To retrieve value from ConfigMap                                                                                                                                                | --      |
| `configMapRef.name`              | string  | (Required) configmap name                                                                                                                                                       | --      |
| `configMapRef.key`               | string  | (Required) key in the given configmap                                                                                                                                           | --      |
| `configMapRef.optional`          | boolean | Specify whether the ConfigMap or its key must be defined                                                                                                                        | --      |
| `resourceFieldRef`               | object  | To retrieve value from ConfigMap                                                                                                                                                | --      |
| `resourceFieldRef.resource`      | string  | (Required) resource name to use. Valid values are `limits.cpu`, `limits.memory`, `limits.ephemeral-storage`, `requests.cpu`, `requests.memory` and `requests.ephemeral-storage` | --      |
| `resourceFieldRef.containerName` | string  | Container name of which resource read                                                                                                                                           |         |
| `resourceFieldRef.divisor`       | string  | Divisor to normalize resource value                                                                                                                                             |         |
| `fieldRef`                       | object  | To retrieve value from Pod manifest                                                                                                                                             | --      |
| `fieldRef.fieldPath`             | string  | (Required) Dotted path of which field in pod manifest                                                                                                                           | --      |

**Samples:**

```yaml
...:
  env:
    NUMBER: 123456
    SIMPLE: 'simple env value'

    SENTRY_DSN:
      configMapKeyRef:
        name: app-configmap
        key: sentry-dsn

    POSTGRESQL_PASSWORD:
      secretKeyRef:
        name: postgresql
        key: password

    POD_MEMORY_LIMIT:
      resourceFieldRef:
        resource: limits.memory

    POD_IP:
      fieldRef:
        fieldPath: status.podIP

    SIMPLE_ORDERED:
      value: foo
      order: 1

    POD_MEMORY_LIMIT_ORDERED:
      resourceFieldRef:
        resource: limits.memory
      order: 2

    COMPLEX:
      value: foo-$(SIMPLE_ORDERED)-$(POD_MEMORY_LIMIT_ORDERED)

    ANOTHER_COMPLEX:
      value: bar-$(POD_ID)
      order: -1 # -1 means last
```

---

### Container envFrom

**section: `container.envFrom`**

For each envFrom only one of `secretRef` and `configMapRef` can be set.

| Parameter           | Type   | Description                               | Default |
| ------------------- | ------ | ----------------------------------------- | ------- |
| `secretRef`         | object | To retrieve all key:values from Secret    | --      |
| `secretRef.name`    | string | (Required) Secret name                    | --      |
| `configMapRef`      | object | To retrieve all key:values from ConfigMap | --      |
| `configMapRef.name` | string | (Required) ConfigMap name                 | --      |
| `prefix`            | string | Prefix added to keys imported             | --      |

**Samples:**

```yaml
...:
  envFrom:
    - secretRef:
        name: postgres-secret

    - configMapRef:
        name: deploy-configmap

    - configMapRef:
        name: django-configmap
      prefix: DJANGO_
```

---

### Container Probes

**section: `container.startupProbe`, `container.livenessProbe`, `container.readinessProbe`**

Each container can have, liveness, readiness and startup probes. All these probes follow the same schema:

| Parameter             | Type               | Description                                                                                                 | Default |
| --------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------- | ------- |
| `port`                | string or integer  | (Either this or `command` is Required) The port name or number to scan for probing                          | --      |
| `enabled`             | boolean            | Enables the probe                                                                                           | --      |
| `path`                | string             | Path for the probe                                                                                          | --      |
| `command`             | array of strings   | (Either this or `path` is Required) The command list to check the probe                                     | --      |
| `httpHeaders`         | mapping of strings | HTTP headers for the probe                                                                                  | --      |
| `initialDelaySeconds` | positive integer   | Initial delay in seconds for the probe                                                                      | --      |
| `periodSeconds`       | positive integer   | Probing interval                                                                                            | --      |
| `timeoutSeconds`      | positive integer   | Probe timeout                                                                                               | --      |
| `successThreshold`    | positive integer   | Minimum consecutive successes for the probe to be considered successful after having failed. Minimum is `1` | --      |
| `failureThreshold`    | positive integer   | Try `failureThreshold` times before giving up. Minimum is `1`                                               | --      |

---

### Container Resources

**section: `container.resources`**

A container can have `requests` and `limits` for CPU and Memory, if `requests` is set, the specified amount is reserved
for the container. Having set the `limits`, if more CPU is used, the container will be throttled, while if the memory is
overused, the container is killed, and the pod might get evicted.

| Parameter         | Type             | Description                                                                                                        | Default |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------ | ------- |
| `requests.cpu`    | positive integer | How much cpu is requested for each pod; either core count (a positive number) or milicore (e.g. `200m` or `1000m`) | --      |
| `requests.memory` | positive integer | How much memory is requested for each pod; in Bytes. Accepts values like `100`, `750Mi` or `2Gi`                   | --      |
| `limits.cpu`      | positive integer | Maximum cpu allowed for the pod. either core count (a positive number) or milicore (e.g. `200m` or `1000m`)        | --      |
| `limits.memory`   | positive integer | Maximum memory allowed for the pod; in Bytes. Accepts values like `100`, `750Mi` or `2Gi`                          | --      |

---

### Container Ports

**section: `container.ports`**

Mapping of `ports` and their configs for containers' ports as well as creating Service, ServiceMonitor, etc. resources
as a single, centralized point of truth.

For each mapping, the key is the port number, optionally suffixed with tcp or udp, e.g. `8080`, `1080/tcp`, `16049/udp`
and the value can be null, string (port name) or an object with the following parameters:

| Parameter               | Type             | Description                                                                                     | Default                |
| ----------------------- | ---------------- | ----------------------------------------------------------------------------------------------- | ---------------------- |
| `enabled`               | boolean          | Enables this port                                                                               | --                     |
| `name`                  | string           | Name of this port                                                                               | --                     |
| `protocol`              | string           | Either `UDP` or `TCP`                                                                           | --                     |
| `number`                | positive integer | Port number                                                                                     | The key of this object |
| `nodePort`              | positive integer | If set, the port `nodePort` will be created and related configurations will be set in resources | --                     |
| `servicePort`           | positive integer | Needed if an Ingress is to be created for this port                                             | --                     |
| `scrapePath`            | string           | create a serviceMonitor with this path and port `name` for prometheus to scrape                 | --                     |
| `scrapeTimeout`         | positive integer | Timeout for `scrapePath` used by prometheus operator                                            | --                     |
| `scrapeInterval`        | positive integer | Interval for `scrapePath` used by prometheus operator                                           | --                     |
| `scrapeExtraProperties` | object           | Extra ServiceMonitor.endpoint configuration                                                     | --                     |

---

### Container Lifecycle

**section: `container.lifecycle`**

Lifecycle describes actions that the management system should take in response to container lifecycle events. For the
`PostStart` and `PreStop` lifecycle handlers, management of the container blocks until the action is complete, unless
the container process fails, in which case the handler is aborted. For each lifecycle handlers only one of `exec`
, `httpGet` or `tcpSocket` could be defined at once.

| Parameter                | Type              | Description                                                                                                | Default |
| ------------------------ | ----------------- | ---------------------------------------------------------------------------------------------------------- | ------- |
| `preStop`                | object            | PreStop is called immediately before a container is terminated due to an API request or management event   | --      |
| `postStart`              | object            | PostStart is called immediately after a container is created. inner structure is same as `preStop`         | --      |
| `preStop.exec`           | object            | Exec specifies the action to take                                                                          | --      |
| `preStop.exec.command`   | list of strings   | Command is the command line to execute inside the container, the working directory for the command is root | --      |
| `preStop.httpGet`        | object            | HTTPGet specifies the http request to perform                                                              | --      |
| `preStop.httpGet.port`   | integer or string | (Required) Name or number of the port to access on the container                                           | --      |
| `preStop.httpGet.host`   | string            | Host name to connect to, defaults to the pod IP. You probably want to set `Host` in httpHeaders instead.   | --      |
| `preStop.httpGet.schema` | string            | Scheme to use for connecting to the host                                                                   | HTTP    |
| `preStop.tcpSecket`      | object            | TCPSocket specifies an action involving a TCP port                                                         | --      |
| `preStop.tcpSecket.port` | integer or string | (Required) Name or number of the port to access on the container                                           | --      |
| `preStop.tcpSecket.host` | string            | Host name to connect to, defaults to the pod IP.                                                           | --      |

---

### Container securityContext

**section: `container.securityContext`**

SecurityContext holds security configuration that will be applied to a container. Some fields are present in
both `container.securityContext` and `pod.securityContext`. When both are set, the values in `container.securityContext`
take precedence.

| Parameter                  | Type             | Description                                                                                                                                                                                                                                                                                               | Default |
| -------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `runAsUser`                | positive integer | The UID to run the entrypoint of the container process. Uses runtime default if unset                                                                                                                                                                                                                     | --      |
| `runAsGroup`               | positive integer | The GID to run the entrypoint of the container process. Uses runtime default if unset                                                                                                                                                                                                                     | --      |
| `runAsNonRoot`             | boolean          | Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does.                                                                                              | --      |
| `privileged`               | boolean          | Run container in privileged mode. Processes in privileged containers are essentially equivalent to root on the host                                                                                                                                                                                       | --      |
| `allowPrivilegeEscalation` | boolean          | AllowPrivilegeEscalation controls whether a process can gain more privileges than its parent process. This bool directly controls if the no_new_privs flag will be set on the container process. AllowPrivilegeEscalation is true always when the container is: 1) run as Privileged 2) has CAP_SYS_ADMIN | --      |
| `readOnlyRootFilesystem`   | boolean          | Whether this container has a read-only root filesystem                                                                                                                                                                                                                                                    | --      |
| `capabilities`             | object           | The capabilities to add/drop when running containers. Defaults to the default set of capabilities granted by the container runtime                                                                                                                                                                        | --      |
| `capabilities.add`         | list of strings  | capabilities to add                                                                                                                                                                                                                                                                                       | --      |
| `capabilities.drop`        | list of strings  | capabilities to drop                                                                                                                                                                                                                                                                                      | --      |

**Valid additional parameters:** `kubectl explain pod.spec.containers.securityContext`

---

### Statefulset volumeClaimTemplates

**section: `statefulset.volumeClaimTemplates`**

Creating a Persistent Volume Claim (PVC) per pod in SetatefulSets require configuring its volumeClaimTemplates.
Each `statefulset` workload in gonbad could have `volumeClaimTemplates`. A mapping with volume names as its keys and
object with following parameters as value.

| Parameter      | Type                       | Description                                                                                    | Default |
| -------------- | -------------------------- | ---------------------------------------------------------------------------------------------- | ------- |
| `enabled`      | boolean                    | Enables this volumeClaimTemplate                                                               | `true`  |
| `size`         | positive integer or string | (Required) The size of PVC. (eg. 1024 or 2Gi)                                                  | --      |
| `accessMode`   | string                     | (Required) Access Mode for this PVC; one of `ReadOnlyMany`, `ReadWriteOnce` or `ReadWriteOnce` | --      |
| `storageClass` | string                     | `storageClass` of ths PVC                                                                      | --      |

---

## Common Regexes

| Regex name             | Regex                                                                                                           | Documentation                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `k8s.label.key`        | `^([a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/)?([A-Za-z0-9][A-Za-z0-9_.-]*)?[A-Za-z0-9]$` | [link](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set)      |
| `k8s.label.value`      | `^(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])?$`                                                                 | [link](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set)      |
| `k8s.annotation.key`   | `^([a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/)?([A-Za-z0-9][A-Za-z0-9_.-]*)?[A-Za-z0-9]$` | [link](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/#syntax-and-character-set) |
| `k8s.annotation.value` | string                                                                                                          | [link](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/#syntax-and-character-set) |

---

## Samples

Here some samples to demonstrate some aspects of this chart

### Hello World Sample

```yaml
#!/usr/bin/env -S helm template hello-world-sample genpack -f
gonbad:
  workloads:
    web:
      kind: deployment
      replicaCount: 1
      containers:
        web:
          image:
            registry: docker.io # optional, defaults to ''
            repository: tutum/hello-world
            tag: latest # optional, defaults to latest
          ports:
            80:
              name: http
              scrapePath: /metrics # optional, will create a ServiceMonitor object

  ingresses:
    web:
      workloadName: web
      servicePort: http
      hosts:
        - host: hello-world.example.dev
```

### Volume Sample

```yaml
#!/usr/bin/env -S helm template volume-sample genpack -f
gonbad:
  workloads:
    web:
      kind: deployment
      replicaCount: 1
      containers:
        web:
          image:
            repository: nginx
          ports:
            80: http
          volumeMounts:
            - name: www-vol
              mountPath: /var/lib/nginx/sites/default/
            - name: existing-pvc-vol
              mountPath: /var/lib/nginx/sites/another/
            - name: config-vol
              mountPath: /etc/nginx/

  ingresses:
    web:
      workloadName: web
      servicePort: http
      hosts:
        - host: example.dev

  volumes:
    www-vol:
      type: persistentVolumeClaim
      size: 10Gi
      accessMode: ReadWriteOnce
      storageClass: zfs-hdd

    existing-pvc-vol:
      type: existingPVC
      name: pvc-fullname
      readOnly: false

    config-vol:
      type: configMap
      name: nginx-configs
```

### NodePort Sample

```yaml
#!/usr/bin/env -S helm template nodeport-sample genpack -f
gonbad:
  workloads:
    nginx:
      kind: deployment
      service:
        type: NodePort
      containers:
        nginx:
          image:
            repository: nginx
          ports:
            80:
              name: http
              nodePort: 30080
            443:
              name: https
              nodePort: 30443

    coredns:
      kind: deployment
      service:
        type: NodePort
      containers:
        coredns:
          image:
            repository: coredns
          ports:
            53/tcp:
              nodePort: 30053
            53/udp:
              nodePort: 30053
```

### ExternalServices Sample

```yaml
#!/usr/bin/env -S helm template external-service-sample genpack -f
gonbad:
  externalServices:
    kuma:
      externalIPs:
        - 1.2.3.4
      ports:
        443:
          enabled: true
          name: https
          scrapePath: /metrics
```

---

_last update: 2023-02-14_
