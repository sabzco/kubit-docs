---
subDocuments:
  - postgrer-ha-pack-chart-installation-guide
  - pack-postgres-ha
---

# آموزش نصب گام به گام نمونه پک PostgreSQL HA

این فایل YAML یک طرح کامل و جامع برای راه‌اندازی یک PostgreSQL کاملاً مدیریت‌شده و با دسترسی بالا (HA) در کلاستر کوبرنتیز است. با استفاده از تنها این فایل، کوبچی `postgresql-ha` را دریافت می‌کند، سه پاد نگهدارنده همگام‌شده با ذخیره‌سازی سریع مبتنی بر NVMe را مستقر (deploy) می‌کند و پشتیبان‌گیری روزانه به S3 را تنظیم می‌کند که تنها دو نسخه آخر را نگه می‌دارد. این فایل یک پایگاه داده `test` با اعتبارنامه‌های خاص خود را از پیش ایجاد می‌کند، دسترسی سوپریوزر (superuser) و رپلیکا را با یک رمز عبور روت (root) مشترک قفل می‌کند و PostgreSQL را برای عملکرد مناسب از طریق بهینه‌سازی WAL، بافرها و ردیابی کوئری‌ (query) تنظیم می‌کند. در یک `spec` تعریف شده شما به کوبرنتیز نه تنها دستور اجرای Postgres را داده‌اید، بلکه آن را به‌صورت مقاوم، امن و آماده برای production از همان آغاز به کار اولین پاد تنظیم می‌کنید.

## تعریف منابع (Resource Identification)

```yaml
apiVersion: k8s.kubit.ir/v1alpha1
```

- **apiVersion**: نسخه و گروه API را برای منبع سفارشی مشخص می‌کند.
  - `k8s.kubit.ir/v1alpha1` به این معناست که این یک **تعریف منبع سفارشی (CRD)** ارائه‌شده توسط **Kubit** است.
  - `v1alpha1` نشان‌دهنده نسخه اولیه (آلفا) است که ممکن است تغییرات اساسی داشته باشد.

```yaml
kind: Pack
```

- **kind**: نوع شیء کوبرنتیز.
  - `Pack` یک **نوع سفارشی** است که توسط پلتفرم Kubit برای تعریف استقرار چارت Helm بسته‌بندی‌شده استفاده می‌شود.

---

## متادیتا (Metadata)

```yaml
metadata:
  name: test
  namespace: new-test-ns
```

- **metadata.name**: نام این منبع Pack — در اینجا `test` است.
- توجه کنید که اگر نام شامل `postgresql-ha` در انتهای آن نباشد، به‌طور خودکار به نام اضافه می‌شود، بنابراین نام نهایی `test-postgres-ha` خواهد بود. این مورد زمانی لازم است که بخواهید از سرور پایگاه داده در برنامه خود استفاده کنید.
- **metadata.namespace**: فضای نام کوبرنتیز که منابع در آن ایجاد می‌شوند — `new-test-ns`.

---

## مشخصات (Specification)

```yaml
spec:
```

- **spec**: بخش پیکربندی برای این Pack.

---

### تعریف چارت (Chart Definition)

```yaml
chart:
  name: postgresql-ha
  repository:
    kind: ClusterPackRepository
    name: kubit-packs
  version: ~=0.6.14
```

- **chart.name**: چارت Helm که باید مستقر شود، `postgresql-ha` — یک خوشه PostgreSQL با دسترسی بالا.
- **chart.repository.kind**: `ClusterPackRepository` به این معناست که چارت از یک مخزن Kubit در سطح خوشه کشیده می‌شود.
- **chart.repository.name**: `kubit-packs` — نام مخزن.
- **chart.version**: `~=0.6.14` — یک محدودیت نسخه به این معنا که “سازگار با 0.6.x اما حداقل 0.6.14”.

---

### متغیرها (Variables)

```yaml
vars:
  DATABASE_ROOT_PASSWORD: thisispass
```

- **vars**: متغیرهای تعریف‌شده توسط کاربر که می‌توانند در پیکربندی استفاده شوند.
- در اینجا، `DATABASE_ROOT_PASSWORD` به `thisispass` تنظیم شده است که بعداً در سایر فیلدها تزریق می‌شود.

---

### مقادیر چارت (Chart Values)

```yaml
values:
```

- این‌ها مستقیماً به **`values.yaml`** استفاده‌شده توسط چارت Helm نگاشت می‌شوند و PostgreSQL-HA را پیکربندی می‌کنند.

---

### پیکربندی پشتیبان‌گیری (Backup Configuration)

```yaml
backup:
  enabled: true
  maxBackups: 2
  provider: s3
  s3:
    accessKey: KAJMO44L018YG9OMR594
    bucket: democo-postgresql-backup
    endpoint: https://s3.kubit.ir
    region: us-east
    secretKey: CeQPAbDcihilB4rTogpl97wnkpZlpo3BxKyAwXYU
  schedule: 0 0 * * *
```

- **backup.enabled**: پشتیبان‌گیری را فعال می‌کند.
- **maxBackups**: فقط `2` پشتیبان آخر را نگه می‌دارد.
- **provider**: `s3` به این معناست که پشتیبان‌ها به ذخیره‌سازی شیء سازگار با S3 ارسال می‌شوند.
- **s3.accessKey / secretKey**: اعتبارنامه‌های دسترسی برای ذخیره‌سازی S3.
- **bucket**: `democo-postgresql-backup` نام باکت است.
- **endpoint**: آدرس URL سرویس S3 (`kubit.ir`).
- **region**: `us-east` — منطقه باکت S3.
- **schedule**: `0 0 * * *` — پشتیبان‌گیری روزانه در نیمه‌شب (فرمت cron).
  این کار یک cronjob ایجاد می‌کند.

همچنین می‌توانید یک نمونه پایگاه داده اختصاصی برای کار پشتیبان‌گیری به این پیکربندی اضافه کنید تا بار روی نمونه‌های اصلی کاهش یابد:

```yaml
# -- تعیین می‌کند که از کدام نگهدارنده (keeper) برای پشتیبان‌گیری استفاده شود. گزینه‌های معتبر عبارتند از: `only-standby`، `prefer-standby`، `exclusive-standby`. # با انتخاب `exclusive-standby` یک نگهدارنده اختصاصی برای پشتیبان‌گیری ایجاد می‌شود.
strategy: 'only-standby'
```

گزینه‌های معتبر عبارتند از:

- `only-standby`: فقط از نگهدارنده آماده‌به‌کار (standby) پشتیبان‌گیری می‌کند. اگر هیچ‌کدام وجود نداشته باشد، پشتیبان‌گیری 실패 می‌کند.
- `prefer-standby`: ترجیحاً از آماده‌به‌کار استفاده می‌کند، اما در صورت نیاز به اصلی بازمی‌گردد.
- `exclusive-standby`: یک **نگهدارنده آماده‌به‌کار اختصاصی** فقط برای پشتیبان‌گیری ایجاد می‌کند.

---

## مقداردهی اولیه پایگاه‌های داده (Databases Initialization)

```yaml
databases:
  - database: test
    password: thisispass
    username: test-user
```

- یک پایگاه داده PostgreSQL به نام `test` از پیش ایجاد می‌کند با:
  - **username**: `test-user`
  - **password**: `thisispass`

:::info[والت (Vault)]
می‌توانید از [والت](../../kubchi/vault) برای رمزنگاری رمزها و داده‌های حساس خود استفاده کنید.
:::

---

## پیکربندی تصویر (Image Configuration)

```yaml
image:
  tag: '16'
```

- از تصویر PostgreSQL **نسخه 16** استفاده می‌کند.

می‌توانید اطلاعات مربوط به نسخه‌های معتبر را در سایت پیدا کنید.

---

## نود‌های نگهدارنده (Keeper Nodes)

```yaml
keeper:
  replicaCount: 3
  resources:
    requests:
      cpu: 100m
      memory: 200Mi
```

- **replicaCount**: `3` نود نگهدارنده (نمونه‌های PostgreSQL در حالت دسترسی بالا) اجرا می‌کند.
- **resources.requests**: برای هر پاد نگهدارنده `100m` CPU و `200Mi` حافظه رزرو می‌کند.

همچنین می‌توانید محدودیت‌ها را به این صورت اضافه کنید:

```yaml
keeper:
  replicaCount: 3
  resources:
    requests:
      cpu: 100m
      memory: 200Mi
    limits:
      cpu: 5000
      memory: 100Gi
```

---

## پیکربندی ذخیره‌سازی (Storage Configuration)

```yaml
persistence:
  size: 5Gi
  storageClassName: vcd-nvme
```

- ذخیره‌سازی پایدار:
  - **size**: 5 گیگابایت
  - **storageClassName**: `vcd-nvme` — از کلاس دیسک سریع مبتنی بر NVMe استفاده می‌کند.

---

## پارامترهای PostgreSQL

این بخش بر اساس [فایل پیکربندی postgres](<[https://www.postgresql.org/docs/current/config-setting.html](https://www.postgresql.org/docs/current/config-setting.html)>) است.

```yaml
pgParameters:
  min_wal_size: 1GB
  pg_stat_statements.track: all
  shared_buffers: 100MB
  shared_preload_libraries: pg_stat_statements
  wal_buffers: 16MB
```

- **min_wal_size**: حداقل اندازه لاگ‌های پیش‌نویس (Write-Ahead Logs) (1 گیگابایت).
- **pg_stat_statements.track**: ردیابی تمام دستورات SQL برای تحلیل عملکرد.
- **shared_buffers**: مقدار حافظه برای کش PostgreSQL (100 مگابایت).
- **shared_preload_libraries**: بارگذاری کتابخانه `pg_stat_statements` در زمان راه‌اندازی.
- **wal_buffers**: اندازه بافر برای نوشتن WAL (16 مگابایت).

---

### رپلیکا و سوپریوزر (Replication & Superuser)

```yaml
replicationPassword: '{{ vars.DATABASE_ROOT_PASSWORD }}'
replicationUsername: postgres
superuserPassword: '{{ vars.DATABASE_ROOT_PASSWORD }}'
superuserUsername: postgres
```

- **replicationPassword / superuserPassword**: از متغیر `DATABASE_ROOT_PASSWORD` تنظیم شده است — `thisispass`.
- **replicationUsername**: `postgres` — کاربر رپلیکا بین نودها.
- **superuserUsername**: `postgres` — سوپریوزر اصلی PostgreSQL.

---

## مثال کامل و قابل نصب

```yaml
apiVersion: k8s.kubit.ir/v1alpha1

kind: Pack

metadata:

  name: test

  namespace: new-test-ns

spec:

  chart:

    name: postgresql-ha

    repository:

      kind: ClusterPackRepository

      name: kubit-packs

    version: ~=0.6.17

  vars:

    DATABASE_ROOT_PASSWORD: thisispass

  values:

    backup:

      enabled: true

      maxBackups: 2

      provider: s3

      s3:

        accessKey: KAJMO44L018YG9OMR594

        bucket: democo-postgresql-backup

        endpoint: https://s3.kubit.ir

        region: us-east

        secretKey: CeQPAbDcihilB4rTogpl97wnkpZlpo3BxKyAwXYU

      schedule: 0 0 * * *

    databases:

      - database: test

        password: thisispass

        username: test-user

    image:

      tag: '16'

    keeper:

      replicaCount: 3

      resources:

        requests:

          cpu: 100m

          memory: 200Mi

    persistence:

      size: 5Gi

      storageClassName: vcd-nvme

    pgParameters:

      min_wal_size: 1GB

      pg_stat_statements.track: all

      shared_buffers: 100MB

      shared_preload_libraries: pg_stat_statements

      wal_buffers: 16MB

    replicationPassword: '{{ vars.DATABASE_ROOT_PASSWORD }}'

    replicationUsername: postgres

    superuserPassword: '{{ vars.DATABASE_ROOT_PASSWORD }}'

    superuserUsername: postgres
```

### دیاگرام مثال

در اینجا یک **دیاگرام معماری مبتنی بر متن** از آنچه این YAML در کلاستر کوبرنتیز راه‌اندازی می‌کند، ارائه شده است:

```
┌─────────────────────────────────────────────────────────────┐
│                 Kubernetes Namespace: new-test-ns           │
│-------------------------------------------------------------│
│  Custom Resource: Pack (postgresql-ha)                      │
│                                                             │
│  ┌──────────────────────────-┐    ┌──────────────────────┐  │
│  │   Keeper Pod #1           │    │ Keeper Pod #2        │  │
│  │---------------------------│    │----------------------│  │
│  │ PostgreSQL 16             │    │ PostgreSQL 16        │  │
│  │ Role: Primary or Replica  │    │ Replica              │  │
│  │ Data Volume: 5Gi NVMe PVC |    │ 5Gi NVMe PVC         │  │
│  │ CPU: 100m, Mem: 200Mi     │    │ CPU: 100m, Mem:200Mi │  │
│  └───────────────────────────┘    └──────────────────────┘  │
│                 │                       │                   │
│                 ▼                       ▼                   │
│         ┌──────────────────────────────────────────┐        │
│         │   Keeper Pod #3                          │        │
│         │ PostgreSQL 16 (Replica)                  │        │
│         │ Data Volume: 5Gi NVMe PVC                │        │
│         └──────────────────────────────────────────┘        │
│                                                             │
│  Replication:                                               │
│     - Replication user: postgres                            │
│     - Password: thisispass                                  │
│                                                             │
│  Databases:                                                 │
│     - Name: test                                            │
│     - User: test-user/ Pass: thisispass                     │
│                                                             │
│  PostgreSQL Parameters:                                     │
│     - WAL min size: 1GB                                     │
│     - Shared Buffers: 100MB                                 │
│     - WAL Buffers: 16MB                                     │
│     - pg_stat_statements loaded                             │
│                                                             │
│  Backups:                                                   │
│     - Enabled: true                                         │
│     - Max stored: 2                                         │
│     - Schedule: Daily @ 00:00                               │
│     - Provider: S3 (https://s3.kubit.ir)                    │
│     - Bucket: democo-postgresql-backup                      │
│     - Access/Secret Keys provided                           │
│                                                             │
│  Chart Source: kubit-packs repo (version ~0.6.14)           │
└─────────────────────────────────────────────────────────────┘
```

موارد نمایش شده:

- **3 پاد نگهدارنده** (موجودیت‌های PostgreSQL) برای دسترسی بالا (HA)
- **ذخیره‌سازی پایدار مبتنی بر NVMe** برای هر نگهدارنده (keeper)
- **ساخت رپلیکا** بین گره‌ها با استفاده از کاربر `postgres`
- **پشتیبان‌گیری روزانه** به S3 با سیاست نگهداری
- **پایگاه داده اولیه** `test` با اعتبارنامه‌های خاص خود
- **پارامترهای تنظیم PostgreSQL** که در زمان راه‌اندازی اعمال می‌شوند
