# Pack Operator

Pack Operator is a Kubernetes operator. It manage several CRDs such as Pack, SecretReflector, ... PO main responsibility
is to manage lifecycle of helm chart installation in cluster.

## Installation

```bash
helm upgrade --install pack-operator -n pack-operator --create-namespace kubit-packs/pack-operator
```

## Usage:

Create a Pack and apply it in the cluster, the operator will helm install/upgrade it

## Features

### Helm chart install/upgrade lifecycle through Pack CRD

**TODO:** complete this section

### Secret Reflection via SecretReflector CRD

**TODO:** complete this section

### Workload redeploy via annotation

When a `Pack`/`Deployment`/`StatefulSet` have `pack-operator.k8s.kubit.ir/watch-to-redeploy` annotation, pack-operator
watch given `ConfigMap`/`Secret` for modification and re-deploy the workload after a short time.

`pack-operator.k8s.kubit.ir/watch-to-redeploy` annotation syntax is simple as a list of comma-seperated or
whitespace-seperated `resource/name` segments which `resource` is one of (`configmap`, `secret`) and `name` is name of
whatched resource in same namespace. eg: `configmap/cm-1, secret/sec-2, secret/tls-secret`. Invalid syntax will rejected

### Samples:

If following ConfigMap exists in cluster

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: test-cm-1
  namespace: default
data:
  var1: tt
  var2: xx
```

To redeploy `test` deployment when `test-cm-1` configmap changed, just
add `pack-operator.k8s.kubit.ir/watch-to-redeploy: configmap/test-cm-1` to it it like below.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: test
  namespace: default
  annotations:
    pack-operator.k8s.kubit.ir/watch-to-redeploy: configmap/test-cm-1
spec:
  selector:
    app: test
  template:
    metadata:
      labels:
        app: test
    spec:
      containers:
        - name: test
          image: nginx
```

To redeploy only `web` deployment workload ( created via genpack ) when `test-cm-1` configmap changed, just
add `pack-operator.k8s.kubit.ir/watch-to-redeploy: configmap/test-cm-1` to it like below.

```yaml
apiVersion: k8s.kubit.ir/v1alpha1
kind: Pack
metadata:
  name: test
  namespace: default
spec:
  chart:
    repository:
      kind: ClusterPackRepository
      name: kubit-packs
    name: genpack
    version: ~=0.1
  values:
    gonbad:
      workloads:
        web:
          kind: deployment
          replicaCount: 1
            annotations:
              pack-operator.k8s.kubit.ir/watch-to-redeploy: configmap/test-cm-1
          containers:
            web:
              image:
                repository: nginx
        worker:
          kind: deployment
          replicaCount: 2
          containers:
            web:
              image:
                repository: nginx
```
