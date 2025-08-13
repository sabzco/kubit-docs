# مستند فنی پک PostgreSQL HA

**نسخه چارت:** 0.6.14  
**شرح کلی:**  
یک راهکار cloud native برای پیاده‌سازی PostgreSQL با قابلیت High Availability (HA) مبتنی بر Stolon.

---

## پیش‌نیازها

- نسخه Kubernetes: 1.25 یا بالاتر
- نسخه Helm: 3.11 یا بالاتر
- پشتیبانی از PV provisioner در زیرساخت پایه (در صورت استفاده از Volumeها)

---

## راهنمای استفاده از چارت

### نصب چارت

ابتدا مخزن Helm مربوطه را اضافه کنید:

```shell
helm repo add kubit-packs https://repo.sabz.dev/artifactory/kubit-packs
```

یک فایل مقادیر سفارشی (values file) به نام `my-postgresql-ha.values.yaml` ایجاد کنید. نمونه قالب:

```yaml
clusterName: <نام-کلاستر>
debug: <true|false>
image:
  repository: <آدرس-ریپازیتوری-ایمیج>
  tag: <نسخه-ایمیج>
superuserUsername: <نام-کاربر-سوپر یوزر>
superuserPassword: <رمز-عبور-سوپر یوزر>
# سایر پارامترهای مورد نیاز
```

سپس چارت را با دستور زیر نصب یا آپگرید کنید (در namespace دلخواه):

```shell
kubectl create ns test-postgresql-ha || true
helm upgrade --install -n test-postgresql-ha my-postgresql-ha kubit-packs/postgresql-ha -f my-postgresql-ha.values.yaml
```

> نکته: برای مشاهده همه رلیزهای نصب‌شده از دستور `helm list` استفاده کنید.

---

### حذف چارت

برای حذف نسخه نصب‌شده:

```shell
helm delete -n test-postgresql-ha my-postgresql-ha
```

این دستور تمامی منابع Kubernetes مربوط به این چارت را حذف خواهد کرد.

---

### نصب از طریق Pack

یک فایل Pack به نام `my-postgresql-ha.pack.yaml` با محتوای مشابه زیر بسازید:

```yaml
apiVersion: k8s.kubit.ir/v1alpha1
kind: Pack
metadata:
  name: my-postgresql-ha
  namespace: test-postgresql-ha

spec:
  chart:
    repository:
      kind: ClusterPackRepository
      name: kubit-packs
    name: postgresql-ha
    version: ~=0.6.14

  values:
    clusterName: <نام-کلاستر>
    debug: <true|false>
    image: {}
    superuserUsername: <نام-کاربر-سوپر یوزر>
    superuserPassword: <رمز-عبور-سوپر یوزر>
    # سایر مقادیر لازم
```

و سپس با دستور زیر آن را اعمال کنید:

```shell
kubectl create ns test-postgresql-ha || true
kubectl create -f my-postgresql-ha.pack.yaml
```

---

### حذف Pack

برای حذف Pack نصب‌شده:

```shell
kubectl -n test-postgresql-ha delete pack my-postgresql-ha
```

---

## نکات مربوط به ارتقا (Upgrade Notes)

برای مطالعه تغییرات دقیق نسخه‌ها، فایل CHANGELOG.md را مشاهده کنید.  
در صورت ارتقا از نسخه‌های قدیمی، موارد زیر را مد نظر قرار دهید:

| نسخه چارت | نیاز به اقدام | توضیحات                       |
| --------- | ------------- | ----------------------------- |
| 0.4.6     | بله           | تنظیم پارامتر `store.backend` |
| 0.5.x     | بله           | به روز رسانی پارامترها        |

### ارتقا از نسخه 0.4.6 به 0.5.x

- مقدار پیش‌فرض `store.backend` اکنون `kubernetes` است (قبلاً `etcdv2` بود).

### ارتقاء از هر نسخه به نسخه 0.4.6

- نسخه‌های جدیدتر تصاویر postgres و stolon با نام `docker.io/sabzco/postgres:PGVERSION` ساخته و منتشر شده‌اند، ولی چارت هنوز با تصاویر قدیمی `sorintlab/stolon` سازگار است.
- مقدار پیش‌فرض پارامتر `image.repository` به `sabzco/postgres` تغییر یافته است.
- مقدار پیش‌فرض `image.tag` به نسخه `15` تغییر کرده است.
- `keeper readinessProbe` به صورت پیش‌فرض فعال شده است؛ برای سازگاری با تصاویر قدیمی این گزینه باید غیرفعال شود.

---

## پارامترهای قابل پیکربندی در چارت PostgreSQL-HA

| پارامتر                                      | نوع          | شرح                                                                                               | مقدار پیش‌فرض                                                                       |
| -------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `clusterName`                                | string       | نام کلاستر stolon، به طور پیش‌فرض برابر نام release است                                           | `""`                                                                                |
| `debug`                                      | bool         | فعال‌سازی حالت دیباگ در کامپوننت‌های stolon                                                       | `false`                                                                             |
| `global.commonImageRegistry`                 | string       | رجیستری تصاویر پیش‌فرض در صورت عدم تعریف رجیستری در بخش‌های دیگر                                  | `""`                                                                                |
| `image`                                      | object       | ایمیج پیش‌فرض چارت (Postgres و Stolon)                                                            | `{repository:"sabzco/postgres", tag:"15", pullPolicy:"IfNotPresent", keeperTag:""}` |
| `image.registry`                             | string       | رجیستری تصاویر Postgres و Stolon                                                                  | `""`                                                                                |
| `image.repository`                           | string       | ریپازیتوری ایمیج Postgres و Stolon                                                                | `"sabzco/postgres"`                                                                 |
| `image.tag`                                  | string       | تگ نسخه ایمیج Postgres و Stolon                                                                   | `"15"`                                                                              |
| `image.keeperTag`                            | string       | جهت جلوگیری از ریستارت پادهای keeper هنگام تغییر `image.tag` استفاده می‌شود. (مثال: 14-v0.17.0)   | `""`                                                                                |
| `image.pullPolicy`                           | string       | سیاست کشیدن ایمیج (Image pull policy)                                                             | `"IfNotPresent"`                                                                    |
| `dockerize.image.repository`                 | string       | ریپازیتوری ایمیج dockerize                                                                        | `"jwilder/dockerize"`                                                               |
| `dockerize.image.pullPolicy`                 | string       | سیاست کشیدن ایمیج dockerize                                                                       | `"IfNotPresent"`                                                                    |
| `shmVolume.enabled`                          | bool         | فعال‌سازی volume نوع emptyDir برای `/dev/shm` روی پادهای keeper                                   | `false`                                                                             |
| `shmVolume.sizeLimit`                        | string       | محدودیت حجم volume `/dev/shm`                                                                     | `""`                                                                                |
| `persistence.enabled`                        | bool         | فعال‌سازی ذخیره‌سازی داده‌های پایدار در keepers                                                   | `true`                                                                              |
| `persistence.size`                           | string       | حجم دیسک keepers (مثال: 10Gi)                                                                     | `""`                                                                                |
| `persistence.storageClass`                   | string       | کلاس ذخیره‌سازی PVC keepers؛ اگر `"-"` تنظیم شود، provisioning پویا غیرفعال می‌شود                | `""`                                                                                |
| `persistence.accessModes`                    | list         | حالت دسترسی به volumeهای persistent keepers                                                       | `["ReadWriteOnce"]`                                                                 |
| `rbac.create`                                | bool         | ایجاد منابع RBAC                                                                                  | `true`                                                                              |
| `serviceAccount.create`                      | bool         | ایجاد ServiceAccount                                                                              | `true`                                                                              |
| `serviceAccount.name`                        | string       | نام ServiceAccount مورد استفاده (در صورت فعال بودن `create`)                                      | `""`                                                                                |
| `serviceAccount.imagePullSecrets`            | list         | لیست pull secretها جهت دسترسی به رجیستری تصاویر                                                   | `[]`                                                                                |
| `superuserUsername`                          | string       | نام کاربر سوپر یوزر PostgreSQL                                                                    | `"postgres"`                                                                        |
| `superuserPassword`                          | string       | رمز عبور سوپر یوزر (ضروری اگر `superuserSecret` یا `superuserPasswordFile` تنظیم نشده باشد)       | `""`                                                                                |
| `superuserPasswordFile`                      | string       | مسیر فایل حاوی رمز عبور سوپر یوزر                                                                 | `""`                                                                                |
| `superuserSecret.name`                       | string       | نام Secret شامل اعتبارنامه سوپر یوزر                                                              | `""`                                                                                |
| `superuserSecret.usernameKey`                | string       | کلید نام کاربری سوپر یوزر در Secret                                                               | `"pg_su_username"`                                                                  |
| `superuserSecret.passwordKey`                | string       | کلید رمز عبور سوپر یوزر در Secret                                                                 | `"pg_su_password"`                                                                  |
| `replicationUsername`                        | string       | نام کاربر برای replication                                                                        | `"replica"`                                                                         |
| `replicationPassword`                        | string       | رمز عبور replication (ضروری اگر `replicationSecret` یا `replicationPasswordFile` تنظیم نشده باشد) | `""`                                                                                |
| `replicationPasswordFile`                    | string       | مسیر فایل حاوی رمز عبور replication                                                               | `""`                                                                                |
| `replicationSecret.name`                     | string       | نام Secret شامل اعتبارنامه replication                                                            | `""`                                                                                |
| `replicationSecret.usernameKey`              | string       | کلید نام کاربری replication در Secret                                                             | `"pg_repl_username"`                                                                |
| `replicationSecret.passwordKey`              | string       | کلید رمز عبور replication در Secret                                                               | `"pg_repl_password"`                                                                |
| `store.backend`                              | string       | نوع backend ذخیره‌سازی Stolon: `consul`، `etcdv2`، `etcdv3` یا `kubernetes`                       | `"kubernetes"`                                                                      |
| `store.endpoints`                            | string       | آدرس‌های endpoints backend ذخیره‌سازی (برای etcd یا consul)                                       | `nil`                                                                               |
| `store.kubeResourceKind`                     | string       | نوع Resource در Kubernetes برای backend (configmap یا secret)                                     | `configmap`                                                                         |
| `store.replicateTo`                          | object       | پیکربندی تکرار داده‌ها به backend ثانویه (برای مهاجرت backend)                                    | See below                                                                           |
| `pgParameters`                               | object       | گزینه‌های پیکربندی `postgresql.conf` هنگام ایجاد کلاستر                                           | See below                                                                           |
| `serviceMonitor.enabled`                     | bool         | فعال‌سازی ServiceMonitor جهت جمع‌آوری متریک‌ها                                                    | `true`                                                                              |
| `serviceMonitor.labels`                      | object       | برچسب‌های سفارشی برای مطابقت با Prometheus                                                        | `{}`                                                                                |
| `serviceMonitor.namespace`                   | string       | namespace برای استقرار ServiceMonitor                                                             | `"default"`                                                                         |
| `serviceMonitor.interval`                    | string       | دوره زمانی نمونه‌برداری Prometheus                                                                | `"30s"`                                                                             |
| `serviceMonitor.scrapeTimeout`               | string       | مدت زمان انتظار Prometheus برای نمونه‌برداری (کمتر از interval)                                   | `"10s"`                                                                             |
| `forceInitCluster`                           | bool         | فعال/غیرفعال اجبار به مقداردهی اولیه کلاستر                                                       | `false`                                                                             |
| `databases`                                  | array        | آرایه‌ای از نام دیتابیس‌هایی که باید ساخته شوند                                                   | `[]`                                                                                |
| `databases[].database`                       | string       | نام دیتابیسی که باید ساخته شود                                                                    | `""`                                                                                |
| `databases[].databaseCreationExtraArguments` | string       | آرگومان‌های اضافی برای دستور SQL ساخت دیتابیس                                                     | `""`                                                                                |
| `databases[].username`                       | string       | نام کاربری که دسترسی به دیتابیس را خواهد داشت                                                     | `""`                                                                                |
| `databases[].password`                       | string       | رمز عبور کاربر دیتابیس                                                                            | `""`                                                                                |
| `databases[].userConnectionLimit`            | integer      | محدودیت تعداد اتصال کاربر                                                                         | `""`                                                                                |
| `databases[].extensions`                     | لیست رشته‌ها | لیستی از افزونه‌ها (extensions) که باید روی دیتابیس نصب شوند                                      | `[]`                                                                                |
| `mode`                                       | string       | حالت Stolon؛ پیش‌فرض کلاستر مستقل است، برای حالت standby مقدار `standby` تعیین می‌شود             | `"standalone"`                                                                      |
| `standbyConfig`                              | object       | مشخصات اتصال به سرور master زمانی که حالت standby فعال است                                        | `{}`                                                                                |
| `standbyConfig.host`                         | string       | هاست سرور master                                                                                  | `""`                                                                                |
| `standbyConfig.port`                         | string       | پورت سرور master                                                                                  | `""`                                                                                |
| `standbyConfig.sslmode`                      | string       | حالت ssl برای اتصال به سرور master                                                                | `"disable"`                                                                         |
| `standbyConfig.certs.enabled`                | bool         | فعال یا غیرفعال بودن نصب گواهی‌نامه‌ها در پاد keepers                                             | `false`                                                                             |
| `standbyConfig.certs.path`                   | string       | مسیر نصب گواهی‌نامه‌ها                                                                            | `"certs"`                                                                           |
| `standbyConfig.certs.files`                  | object       | محتوای فایل‌های گواهی‌نامه شامل `ca.crt`, `tls.crt`, `tls.key`                                    | `{}`                                                                                |
| `clusterSpec`                                | object       | مشخصات کلاستر Stolon (مراجعه به مستندات Stolon برای جزئیات بیشتر)                                 | `{}`                                                                                |
| `tls.enabled`                                | bool         | فعال‌سازی پشتیبانی SSL در PostgreSQL (گواهی‌نامه‌ها باید تعریف شوند)                              | `false`                                                                             |
| `tls."ca.crt"`                               | string       | محتوای فایل گواهی‌نامه CA                                                                         | `""`                                                                                |
| `tls."tls.crt"`                              | string       | محتوای فایل گواهی‌نامه TLS                                                                        | `""`                                                                                |
| `tls."tls.key"`                              | string       | محتوای کلید TLS                                                                                   | `""`                                                                                |
| `tls.existingSecret`                         | string       | نام Secret موجود شامل گواهی‌نامه‌ها برای credentials Stolon                                       | `nil`                                                                               |
| `keeper.replicaCount`                        | int          | تعداد نودهای keeper                                                                               | `2`                                                                                 |
| `keeper.resources`                           | object       | درخواست‌ها و محدودیت‌های منابع keeper                                                             | `{}`                                                                                |
| `keeper.podDisruptionBudget.enabled`         | bool         | فعال‌سازی Pod Disruption Budget برای podهای keeper                                                | `true`                                                                              |
| `keeper.readinessProbe.enabled`              | bool         | فعال‌سازی readinessProbe برای podهای keeper                                                       | `true`                                                                              |
| `proxy.replicaCount`                         | int          | تعداد پادهای proxy                                                                                | `2`                                                                                 |
| `proxy.resources`                            | object       | درخواست‌ها و محدودیت‌های منابع proxy                                                              | `{"requests":{"cpu":"20m","memory":"32Mi"}}`                                        |
| `proxy.podDisruptionBudget.enabled`          | bool         | فعال‌سازی Pod Disruption Budget برای podهای proxy                                                 | `false`                                                                             |
| `slaveProxy.enabled`                         | bool         | فعال‌سازی ایجاد slave-proxy برای اتصال به keeperهای slave                                         | `false`                                                                             |
| `slaveProxy.replicaCount`                    | int          | تعداد پادهای slaveProxy                                                                           | `2`                                                                                 |
| `sentinel.replicaCount`                      | int          | تعداد پادهای sentinel                                                                             | `3`                                                                                 |
| `sentinel.resources`                         | object       | درخواست‌ها و محدودیت‌های منابع sentinel                                                           | `{"requests":{"cpu":"10m","memory":"32Mi"}}`                                        |
| `sentinel.podDisruptionBudget.enabled`       | bool         | فعال‌سازی Pod Disruption Budget برای podهای sentinel                                              | `false`                                                                             |
| `postgresqlUpgrade.enabled`                  | bool         | فعال‌سازی مکانیزم ارتقاء PostgreSQL (توجه: در زمان ارتقاء دیتابیس خاموش خواهد بود)                | `false`                                                                             |
| `postgresqlUpgrade.oldVersion`               | string       | نسخه قدیمی PostgreSQL جهت ارتقاء                                                                  | `"11"`                                                                              |
| `postgresqlUpgrade.newVersion`               | string       | نسخه جدید PostgreSQL جهت ارتقاء                                                                   | `"13"`                                                                              |
| `metrics.enabled`                            | bool         | فعال‌سازی خروجی متریک‌ها                                                                          | `true`                                                                              |
| `metrics.image.repository`                   | string       | ریپازیتوری ایمیج exporter متریک‌ها                                                                | `"prometheuscommunity/postgres-exporter"`                                           |
| `metrics.port`                               | int          | پورت export متریک‌ها                                                                              | `9187`                                                                              |
| `adminer.enabled`                            | bool         | فعال‌سازی deployment ابزار مدیریت دیتابیس Adminer                                                 | `false`                                                                             |
| `adminer.replicaCount`                       | int          | تعداد پادهای Adminer                                                                              | `1`                                                                                 |
| `backup.enabled`                             | bool         | فعال‌سازی مکانیزم پشتیبان‌گیری توسط CronJob                                                       | `false`                                                                             |
| `backup.schedule`                            | string       | زمان‌بندی اجرای CronJob برای بکاپ‌گیری                                                            | `"0 0 * * *"`                                                                       |
| `backup.strategy`                            | string       | استراتژی انتخاب keeper برای بکاپ‌گیری (`only-standby`, `prefer-standby`, `exclusive-standby`)     | `"only-standby"`                                                                    |
| `backup.provider`                            | string       | سرویس ذخیره‌سازی بکاپ (`s3`, `local`)                                                             | `"s3"`                                                                              |
| `backup.s3.bucket`                           | string       | نام باکت S3 برای ذخیره بکاپ                                                                       | `""`                                                                                |
| `backup.s3.region`                           | string       | منطقه S3                                                                                          | `""`                                                                                |
| `backup.s3.accessKey`                        | string       | کلید دسترسی S3                                                                                    | `""`                                                                                |
| `backup.s3.secretKey`                        | string       | کلید مخفی S3                                                                                      | `""`                                                                                |

## مثال‌های کاربردی

در این بخش نمونه‌هایی از تنظیمات رایج و کاربردی برای استفاده سریع و بهینه از چارت PostgreSQL-HA ارائه شده است.

### 1. Hello World — راه‌اندازی اولیه

```yaml
image:
  tag: v0.17.0-pg13

mode: standalone

superuserUsername: postgres
superuserPassword: my-postgres-password
replicationUsername: replica
replicationPassword: my-replica-password

persistence:
  storageClassName: my-storage-class
  size: 5Gi

etcd:
  enabled: true
```

- راه‌اندازی ساده یک کلاستر مستقل PostgreSQL با تنظیمات پایه.
- استفاده از Persistent Volume با کلاس ذخیره‌سازی مشخص.
- فعال‌سازی etcd به عنوان backend ذخیره‌سازی کلاستر.

---

### 2. استفاده از etcd خارجی

```yaml
etcd:
  enabled: false # پیش‌فرض

store:
  backend: etcdv2 # پیش‌فرض
  endpoints: http://my-etcd-endpoint:port
```

- غیرفعال کردن etcd داخلی و استفاده از سرویس etcd خارجی.
- تنظیم آدرس endpoint مربوط به etcd خارجی برای اتصال کلاستر.

---

### 3. رجیستری سفارشی برای تصاویر داکر

```yaml
global:
  commonImageRegistry: my-docker.io
```

- تعریف رجیستری پیش‌فرض برای تمام تصاویر استفاده شده در چارت.

---

### 4. ایجاد دیتابیس با مشخصات سفارشی

```yaml
databases:
  - database: my-database
    username: my-username
    password: my-password
    extensions:
      - my-extension-1
      - my-extension-2
    databaseCreationExtraArguments: my-arguments
```

- ایجاد دیتابیس جدید به همراه کاربر مربوطه.
- نصب افزونه‌های مورد نیاز.
- اضافه کردن آرگومان‌های اضافی به دستور ساخت دیتابیس.

---

### 5. حالت Standby (دنبال کردن سرور master)

```yaml
mode: standby
replicationUsername: my-master-pg-replication-username
replicationPassword: my-master-pg-replication-password
standbyConfig:
  host: my-master-pg-host
  port: 5432
```

- راه‌اندازی کلاستر به صورت standby که داده‌ها را از سرور master دنبال می‌کند.

---

### 6. تبدیل به حالت Standalone (مستقل)

تنها کافی است مقدار `mode` را به صورت زیر تنظیم کنید:

```yaml
mode: standalone # پیش‌فرض
```

---

### 7. تنظیم منابع (Resource Requests) برای کامپوننت‌ها

```yaml
keeper:
  resources:
    requests:
      memory: 1Gi
      cpu: 100m
proxy:
  resources:
    requests:
      memory: 50Mi
      cpu: 50m
sentinel:
  resources:
    requests:
      memory: 10Mi
      cpu: 10m
```

- تخصیص منابع برای هر یک از اجزای کلاستر جهت بهینه‌سازی عملکرد و پایدارسازی بار کاری.

---

### 8. ارتقاء نسخه PostgreSQL

مراحل ارتقاء:

```yaml
postgresqlUpgrade:
  enabled: true
  oldVersion: 11
  newVersion: 13
```

پس از اتمام:

```yaml
postgresqlUpgrade:
  enabled: false # پیش‌فرض
```

- اجرای مکانیزم ارتقاء نسخه PostgreSQL با توقف موقت سرویس.

---

### 9. فعال‌سازی Adminer برای مدیریت دیتابیس

```yaml
adminer:
  enabled: true
  ingress:
    host: my-adminer.com
    secretName: my-secret-tls
  theme: pappu687 # پیش‌فرض
```

- راه‌اندازی ابزار وبی Adminer جهت مدیریت و مشاهده دیتابیس‌ها.
- تنظیم Host و Secret برای ingress و TLS.

---

### 10. پارامترهای پیشنهادی PostgreSQL

```yaml
pgParameters:
  shared_buffers: '0.5GB' # نیم حافظه درخواست شده keeper
  log_checkpoints: 'on'
  log_lock_waits: 'on'
  checkpoint_completion_target: '0.9'
  min_wal_size: '2GB'
  shared_preload_libraries: 'pg_stat_statements'
  pg_stat_statements.track: 'all'
```

- تنظیمات بهینه شده جهت افزایش عملکرد و رصد بهتر کلاستر.

### 11.توضیح یک نمونه عملی چارت Helm `my-postgresql-ha`

```yaml
apiVersion: k8s.kubit.ir/v1alpha1
kind: Pack
metadata:
  name: my-postgresql-ha # نام این پکیج/چارت در کلاستر کوبرنتیز
  namespace: test-postgres-ha # فضای نام (namespace) که منابع در آن ساخته می‌شوند
spec:
  chart:
    repository:
      kind: ClusterPackRepository
      name: kubit-packs # نام ریپازیتوری چارت‌ها
    name: postgresql-ha # نام چارت مورد استفاده که PostgreSQL HA را فراهم می‌کند
    version: ~=0.6.0 # نسخه چارت، اینجا مشخص شده نسخه 0.6.x

  vars:
    DOCKER_REGISTRY: registry.s # رجیستری داکر سفارشی برای تصاویر (Docker registry)
    DATABASE_ROOT_PASSWORD: | # پسورد اصلی دیتابیس که رمزنگاری شده و به Vault ارجاع داده شده است
      $KUBIT_VAULT;1.2;AES256;pass
      3663663832383838623116130366432

  values:
    global:
      commonImageRegistry: '{{ vars.DOCKER_REGISTRY }}' # استفاده از متغیر رجیستری داکر به صورت سراسری

    image:
      tag: 16 # نسخه ایمیج postgres/stolon (Postgres 16)
      pullPolicy: Always # همیشه ایمیج جدید از رجیستری کشیده شود (مناسب برای توسعه و استیجینگ)

    # بخش Backup فعال شده و تنظیمات مرتبط:
    backup:
      enabled: true # فعال بودن مکانیزم بکاپ خودکار (CronJob)
      maxBackups: 7 # نگه داشتن 7 نسخه آخر بکاپ و حذف بقیه
      s3:
        existingSecret: postgresbackupcreds # استفاده از Secret موجود برای دسترسی به S3 (اعتبارنامه‌ها)

    # تنظیمات حجم ذخیره‌سازی و کلاس آن برای Persistent Volume:
    persistence:
      storageClassName: zfs-ssd # کلاس ذخیره‌سازی مورد استفاده (مثلا دیسک SSD با ZFS)
      size: 10Gi # حجم 10 گیگابایت برای فضای ذخیره‌سازی داده‌ها

    # اطلاعات دسترسی به دیتابیس:
    superuserUsername: postgres # نام کاربر superuser
    superuserPassword: '{{ vars.DATABASE_ROOT_PASSWORD }}' # رمز عبور کاربر اصلی (از Vault خوانده می‌شود)
    replicationUsername: postgres # کاربر کپی‌برداری (replication) که اغلب یکی است
    replicationPassword: '{{ vars.DATABASE_ROOT_PASSWORD }}' # رمز کپی‌برداری (معمولا همان root)

    # تعریف دیتابیس‌ها و کاربران مورد نیاز همراه با رمزنگاری پسوردها:
    databases:
      - database: db1
        username: user1
        password: |
          $KUBIT_VAULT;1.2;AES256;pass
          3339333933313633316437306661306233643934336163343862383037326338
          37343639626238323561316165383932303865373535313433653765616165623464

      - database: db2
        username: user2
        password: |
          $KUBIT_VAULT;1.2;AES256;pass
          33356165303238353562353766333831376135366138633230393661313366666630383261313332
          61356138636232353732646335643837616332376566633566343331386238
          6337333034636264633231353761393836623734643663386531

    # منابع درخواستی (Resource Requests) برای Keeper (پادهایی که پایگاه داده را نگهداری می‌کنند)
    keeper:
      resources:
        requests:
          memory: 300Mi # درخواست 300 مگابایت رم برای هر keeper
          cpu: 100m # درخواست 100 میلی‌هسته پردازنده

    # بخش مربوط به ذخیره‌سازی داده Stolon (backend برای کلاستر کردن)
    # استفاده از etcdv2 و آدرس سرویس etcd در کلاستر کوبرنتیز
    store:
      backend: etcdv2
      endpoints: http://stolon-etcd.svc.cluster.local:xxxx # آدرس سرویس etcd (port باید جایگزین شود)

    # پارامترهای postgres.conf سفارشی (بهینه سازی تنظیمات پایگاه داده)
    pgParameters:
      shared_buffers: '150MB' # حافظه اشتراکی برای کش داده‌ها (کمتر از نیمی از رم درخواستی keeper)
      log_checkpoints: 'on' # ثبت لاگ نقاط چکپوینت برای عیب‌یابی
      log_lock_waits: 'on' # لاگ قفل‌های طولانی برای تشخیص مشکلات
      checkpoint_completion_target: '0.9' # هدف تکمیل چکپوینت (نسبت زمانی)
      autovacuum_max_workers: '1' # تعداد کارگران autovacuum
      min_wal_size: '2GB' # حداقل سایز WAL برای کارایی بهتر
      wal_buffers: '16MB' # حافظه بافر WAL
      shared_preload_libraries: 'pg_stat_statements' # لود افزونه برای مانیتورینگ پرس و جوها
      pg_stat_statements.track: 'all' # فعال‌سازی ردیابی همه کوئری‌ها
      max_connections: '1500' # حداکثر تعداد کانکشن‌های همزمان (توجه: باید کمتر از نصف حافظه keeper باشد)

# توضیحات اضافی درباره Backup (در فایل config جداگانه)

backup:
  enabled: false # مکانیزم بکاپ خودکار را خاموش می‌کند (در تنظیمات اصلی فعال است)
  schedule: '0 0 * * *' # زمان‌بندی اجرای کرون جاب (هر شب ساعت 12)
  activeDeadlineSeconds: 14400 # حداکثر زمان اجرای هر کار بکاپ به ثانیه (4 ساعت)
  strategy: 'only-standby' # انتخاب keeper مناسب برای بکاپ (ترجیحا از standby)
  maxBackups: 0 # تعداد بکاپ‌هایی که نگه داشته می‌شود (0 یعنی پاکسازی فعال نیست)
  provider: 's3' # نوع ذخیره‌سازی بکاپ (s3 یا local)
# اطلاعات دسترسی s3 در بخش s3.existingSecret تعریف می‌شود
```

#### توضیحات تکمیلی

- این چارت Helm برای راه‌اندازی یک کلاستر PostgreSQL با قابلیت HA و backup خودکار طراحی شده است.
- از vault برای مدیریت رمزها به صورت امن استفاده می‌کند.
- تنظیمات منابع، حجم ذخیره‌سازی و پارامترهای پایگاه داده به دقت تعیین شده‌اند.
- امکان تعریف چند دیتابیس و کاربران اختصاصی با رمزنگاری پسورد وجود دارد.
- پشتیبانی از بکاپ روی S3 با نگهداری چند نسخه.
- استفاده از backend ذخیره‌سازی etcd برای مدیریت وضعیت کلاستر.
- امکان استفاده از رجیستری داکر خصوصی.
- تنظیمات پایگاه داده با دقت برای مانیتورینگ و عملکرد بهینه انجام شده است.

---

## منابع و مستندات بیشتر

- [مستندات پیکربندی postgresql.conf](https://github.com/postgres/postgres/blob/master/src/backend/utils/misc/postgresql.conf.sample)
- [مستندات Stolon](https://github.com/sorintlab/stolon)

---

## نگهدارندگان پروژه

- [sabz-devops](https://kubit.cloud)
