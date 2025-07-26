:::info[نسخه انگلیسی]
نسخه انگلیسی این سند زودتر بروزرسانی می‌شود و از [این آدرس](../../../../../en/docs/charts/genpack) قابل دسترس است.
:::

# هلم چارت Genpack

این **چارت هلم (Helm Chart)** که توسط **کوبیت (Kubit)** طراحی شده، به‌عنوان یک **چارت عمومی و قابل‌سفارشی‌سازی** برای استقرار آسان اپلیکیشن‌های کانتینری مورد استفاده قرار می‌گیرد.

با استفاده از اطلاعات پیکربندی وارد شده، **پک اپراتور (Pack Operator)** کوبیچی به‌صورت خودکار تمامی منابع موردنیاز کوبرنیتیز را (مانند Deployment، Service، ConfigMap و ...) ایجاد کرده و آن‌ها را به‌طور مداوم با وضعیت مطلوب (spec) همگام (sync) نگه می‌دارد.

## پیش‌نیازها (Prerequisites)

برای استفاده از این چارت، موارد زیر باید در محیط شما فراهم باشد:

- کوبرنیتیز نسخه `1.20` به بالا
- ابزار **Helm** نسخه `3` به بالا
- پشتیبانی از **PV Provisioner** در زیرساخت (در صورت استفاده از Volumes)

---

## آموزش سریع نصب چارت

### افزودن مخزن هلم (Helm Repository)

ابتدا مخزن هلم مربوط به کوبیت را اضافه کنید:

```bash
helm repo add kubit-packs https://repo.sabz.dev/artifactory/kubit-packs
```

---

### نصب چارت با نام دلخواه

برای نصب چارت با نام نسخه (Release) دلخواه مثلاً `my-release` در فضای‌نام (namespace) `my-namespace`:

```bash
helm install -n my-namespace my-release kubit-packs/genpack -f my-values.yaml
```

این دستور چارت `genpack` را روی کلاستر با پارامترهای داده‌شده نصب می‌کند و مقادیر موردنظر شما را از فایل `my-values.yaml` برای استفاده در فایل کانفیگ می‌خواند.  
مقادیر قابل پیکربندی در بخش [پارامترها](#parameters) آورده شده‌اند.

> **نکته:** برای مشاهده لیست تمام نسخه‌های منتشرشده از دستور `helm list` استفاده کنید.

---

### حذف چارت (Uninstall)

برای حذف نسخه نصب‌شده (`my-release`) و تمام منابع وابسته:

```bash
helm delete -n my-namespace my-release
```

این دستور تمام بخش‌ها و منابع ایجادشده توسط این چارت را حذف کرده و نسخه را پاک می‌کند.

---

## پارامترها (Parameters)

جدول زیر بخش‌های اصلی قابل پیکربندی در چارت `genpack` را نمایش می‌دهد:

| بخش (Section)       | توضیح                                                                     |
| ------------------- | ------------------------------------------------------------------------- |
| [`global`](#global) | تنظیمات سراسری شامل مقادیر مشترک، توکن‌ها، آدرس رجیستری، و متغیرهای عمومی |
| [`gonbad`](#gonbad) | تعریف ورک‌لودها (Workloads) و منابع مربوط به اجرای اپلیکیشن در کلاستر     |

---

## پارامترهای سراسری (Global)

**بخش:** `global.*`

این بخش شامل متغیرها و تنظیمات مشترک بین تمام منابع چارت است، مانند:

- آدرس رجیستری تصاویر (Image Registry)
- کلید و مقادیر خصوصی (سکرت) مشترک (Shared Secrets)
- متغیرهای پیکربندی (ConfigMap)
- گواهی‌ها و مجوزهای ورود
- اطلاعات ورود به پایگاه داده یا سرویس‌های وابسته

### نمونه پیکربندی:

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

### پارامترهای قابل پیکربندی در چارت `genpack`

| پارامتر                            | نوع داده (Type)           | توضیح                                                                                                | مقدار پیش‌فرض (Default)  |
| ---------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------ |
| `issuer`                           | شیء (object)              | تنظیمات صادرکننده گواهی (Certificate Issuer)                                                         | —                        |
| `issuer.name`                      | رشته (string)             | **(الزامی)** نام صادرکننده؛ باید از الگوی `^[a-z][a-z0-9]*(-[a-z0-9]+)*$` پیروی کند                  | —                        |
| `issuer.kind`                      | رشته (string)             | نوع صادرکننده: یکی از `Issuer` یا `ClusterIssuer`                                                    | `Issuer`                 |
| `certificate`                      | شیء (object)              | تنظیمات مربوط به گواهی SSL/TLS                                                                       | —                        |
| `certificate.hosts`                | لیست (list)               | **(الزامی)** لیستی از دامنه‌هایی که گواهی برای آن‌ها صادر می‌شود (حداقل یک دامنه لازم است)           | —                        |
| `certificate.create`               | بولی (boolean)            | آیا گواهی ایجاد شود یا نه                                                                            | `false`                  |
| `certificate.secretName`           | رشته (string)             | نام سکرتی (Secret) که گواهی در آن ذخیره می‌شود                                                       | —                        |
| `commonImageRegistry`              | رشته (string)             | رجیستری پیش‌فرض برای تصاویر داکر (Docker Registry)                                                   | —                        |
| `commonImagePullSecrets`           | لیست از `imagePullSecret` | لیستی از pull secrets برای کشیدن تصاویر، در تمام ورک‌لودها استفاده می‌شود                            | —                        |
| `sharedConfigs`                    | لیست (map: key-value)     | تعریف متغیرهای مشترک پیکربندی به‌صورت `key: value` تعریف‌شده و برای ساخت `ConfigMap` استفاده‌می‌شوند | —                        |
| `sharedSecrets`                    | لیست (map: key-value)     | تعریف مقادیر حساس مشترک به‌صورت `key: value` که برای ایجاد `Secret` استفاده می‌شوند                  | —                        |
| `sharedConfigmapName`              | رشته (string)             | نام `ConfigMap` مشترک ایجادشده از `global.sharedConfigs`                                             | `[.Release.name]-shared` |
| `sharedSecretName`                 | رشته (string)             | نام `Secret` مشترک ایجادشده از `global.sharedSecrets`                                                | `[.Release.name]-shared` |
| `ingress.tls`                      | لیست (list)               | TLS اضافی برای تمام Ingressها، جزئیات بیشتر در بخش [ingresses](#gonbad-ingresses)                    | —                        |
| `ingress.annotations`              | نگاشت (mapping)           | annotationهای اضافی برای همه‌ی Ingressها                                                             | —                        |
| `metrics.serviceMonitor.namespace` | رشته (string)             | فضای‌نام اختصاصی برای `ServiceMonitor` در `metrics` (متریک‌ها)                                       | —                        |

## تعریف عمومی ورک‌لودها (Gonbad)

**بخش:** `gonbad.*`

بخش `gonbad` مهم‌ترین بخش و آبجکت اصلی در فایل پیکربندی `values.yaml` است. بر اساس مقادیر موجود در این فایل ورک‌لودها و مانیفست‌ها ایجاد می‌شوند. مهم‌ترین زیرمجموعه‌ی آن، بخش [`workloads`](#gonbad-workloads) است که برای ساده‌سازی ساخت و پیکربندی منابع مختلف کوبرنیتیز منابع مختلف کوبرنیتیز (مانند Deployment، Service، Ingress و ...) به کار می‌رود.

### ساختار بخش‌ها

| بخش (Section)                                  | توضیح                                                                                          |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [`workloads`](#gonbad-workloads)               | تعریف ورک‌لودها، که به‌صورت خودکار به منابعی مانند Deployment، StatefulSet، و ... تبدیل می‌شود |
| [`staticFiles`](#gonbad-staticfiles)           | برای مانت (mount) و قراردادن فایل‌های پیکربندی کوچک درون کانتینرها                             |
| [`volumes`](#gonbad-volumes)                   | تعریف Volumeها برای ورک‌لودها                                                                  |
| [`ingresses`](#gonbad-ingresses)               | ساخت سریع منابع Ingress برای دسترسی به سرویس‌ها از خارج کلاستر                                 |
| [`externalServices`](#gonbad-externalservices) | ساخت سرویس‌هایی برای اتصال به سرویس‌های خارجی از داخل کلاستر، با استفاده از DNS داخلی          |
| [`prometheusRule`](#gonbad-prometheusrule)     | ساخت قوانین مانیتورینگ Prometheus به‌صورت خودکار                                               |
| [`rawResources`](#gonbad-rawresources)         | افزودن منابع خام کوبرنیتیز به‌صورت مستقیم در کنار منابع تولید شده توسط این چارت                |

---

### نمونه پیکربندی

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
```

در مثال بالا:

- دو ورک‌لود تعریف شده: یکی به نام `server` و دیگری `web`، هر کدام با image و پورت‌های خاص خود.
- برای ورک‌لود `web` یک Ingress نیز تعریف شده است که از طریق دامنه `zabbix.example.com` قابل دسترسی خواهد بود.
- پورت‌ها می‌توانند دارای ویژگی‌هایی مانند `scrapePath` (برای متریک‌ها) و `nodePort` باشند.
- می‌توان از `hostAliases` برای نگاشت نام‌های دامنه محلی استفاده کرد.

### ورک‌لودهای Gonbad {#gonbad-workloads}

**بخش:** `gonbad.workloads.*`

در سیستم Gonbad، پنج نوع ورک‌لود (Workload) تعریف‌پذیر هستند. ساده‌ترین نوع، ورک‌لود از نوع [`simple`](#simple-workload) است که فقط با مشخص‌کردن یک `image`، یک دیپلویمنت (Deployment) ساده تک‌کانتینری ایجاد می‌کند.

در مقابل، ورک‌لود از نوع [`deployment`](#deployment-workload) نیاز به حداقل یک بخش `container` دارد و می‌تواند شامل چندین کانتینر نیز باشد. این نوع از ورک‌لود امکان **کنترل دقیق و تنظیمات پیشرفته** را بر روی جزئیات اجرای ورک‌لود مشخص‌شده فراهم می‌کند.

انواع دیگر ورک‌لودها شامل:

- [`statefulset`](#statefulset-workload): مناسب برای اپلیکیشن‌هایی با وضعیت پایدار و وابسته به ذخیره‌سازی
- [`daemonset`](#daemonset-workload): برای اجرای یک پاد روی **تمام نودهای کلاستر**
- [`cronjob`](#cronjob-workload): برای اجرای زمان‌بندی‌شده‌ی وظایف خاص

برای آشنایی با هر نوع، می‌توانید به بخش‌های زیر مراجعه کنید:

- [ورک‌لود Simple](#simple-workload)
- [ورک‌لود Deployment](#deployment-workload)
- [ورک‌لود Statefulset](#statefulset-workload)
- [ورک‌لود Daemonset](#daemonset-workload)
- [ورک‌لود Cronjob](#cronjob-workload)

برای تعریف یک ورک‌لود از نوع خاص، کافی‌ست مقدار `gonbad.workload.<name>.kind` را روی مقدار مورد نظر مانند `simple` قرار دهید.

هر ورک‌لود آبجکتی با یک نام (name) منحصربه‌فرد است. این نام به‌عنوان کلید (key) آن آبجکت در فایل `values.yaml` استفاده می‌شود.

#### ورک‌لود Simple {#simple-workload}

یک وروک‌لود `simple` با نام `foo` بدین شکل تعریف می‌شود:

```yaml
gonbad:
  workloads:
    foo:
      kind: simple
      #...
```

پارامترهای قابل تنظیم برای ورک‌لود نوع `simple`:

| پارامتر             | نوع                                              | توضیح                                                                                                                     | مقدار پیش‌فرض        |
| ------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `kind`              | `string`                                         | (الزامی) نوع ورک‌لود، باید مقدار `simple` داشته باشد                                                                      | --                   |
| `enabled`           | `boolean`                                        | فعال یا غیرفعال بودن این ورک‌لود                                                                                          | `true`               |
| `replicaCount`      | positive number                                  | تعداد نمونه‌های (replica) این ورک‌لود. می‌تواند صفر یا بیشتر باشد                                                         | `1`                  |
| `image`             | [`container.image`](#container-image)            | (الزامی) ایمیج مورد استفاده برای تنها کانتینر این ورک‌لود                                                                 | --                   |
| `strategy`          | [`deployment.strategy`](#deployment-strategy)    | استراتژی به‌روزرسانی و دیپلوی مجدد این ورک‌لود                                                                            | --                   |
| `usedSharedConfigs` | list of strings                                  | اگرچه تمام `sharedConfigs` برای همه در دسترس‌اند، فقط زمانی در این بخش ریلود شوند که یکی از این کانفیگ‌ها تغییر کرده باشد | تمام `sharedConfigs` |
| `usedSharedSecrets` | list of strings                                  | مشابه بالا، ولی برای `sharedSecrets`                                                                                      | تمام `sharedSecrets` |
| `command`           | list of strings                                  | دستور اولیه‌ی اجرا برای کانتینر، مانند `["de.sh", "-v", "-c"]`                                                            | --                   |
| `args`              | list of strings                                  | آرگومان‌هایی که به دستور `command` داده می‌شود                                                                            | --                   |
| `env`               | `object`                                         | تعریف متغیرهای محیطی (Environment Variables) برای کانتینر. به [`container.env`](#container-env) مراجعه شود                | --                   |
| `livenessProbe`     | [`container.probe`](#container-probes)           | تعریف بررسی سلامت (Liveness Probe)                                                                                        | --                   |
| `readinessProbe`    | [`container.probe`](#container-probes)           | تعریف بررسی آمادگی (Readiness Probe)                                                                                      | --                   |
| `resources`         | [`container.resources`](#container-resources)    | تعریف محدودیت و درخواست منابع برای کانتینر                                                                                | --                   |
| `ports`             | mapping of [`container.ports`](#container-ports) | تعریف پورت‌های بازشده برای این ورک‌لود                                                                                    | --                   |

#### ورک‌لود Deployment {#deployment-workload}

یک وروک‌لود `deployment` با نام `bar` بدین شکل تعریف می‌شود:

```yaml
gonbad:
  workloads:
    bar:
      kind: deployment
      #...
```

یک ورک‌لود `deployment` می‌تواند داری چند کانتینر (`container`) باشد.

پارامترهای قابل تنظیم برای ورک‌لود نوع `deployment`:

| پارامتر                                         | نوع داده                                               | توضیح                                                                                                                                    | مقدار پیش‌فرض                |
| ----------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `kind`                                          | `string`                                               | (الزامی) مقدار باید `deployment` باشد                                                                                                    | `deployment`                 |
| `enabled`                                       | `boolean`                                              | فعال یا غیرفعال بودن این ورک‌لود                                                                                                         | `true`                       |
| `replicaCount`                                  | positive integer                                       | تعداد پادهای این ورک‌لود (حداقل ۰)                                                                                                       | `1`                          |
| `containers`                                    | mapping of [`container`](#container)                   | (الزامی) تعریف کانتینرهای این دیپلویمنت                                                                                                  | —                            |
| `initContainers`                                | mapping of [`container`](#container)                   | کانتینرهایی که پیش از کانتینرهای اصلی اجرا می‌شوند و باید با موفقیت اجرا شوند؛ در صورت عدم موفقیت اجرا، پاد از کار می‌افتد (fail می‌شود) | —                            |
| `strategy`                                      | [`deployment.strategy`](#deployment-strategy)          | استراتژی استقرار (deploy) این دیپلویمنت                                                                                                  | —                            |
| `usedSharedConfigs`                             | list of strings                                        | اگرچه تمام `sharedConfigs` برای همه در دسترس‌اند، فقط زمانی در این بخش ریلود شوند که یکی از این کانفیگ‌ها تغییر کرده باشد                | همه `sharedConfigs`          |
| `usedSharedSecrets`                             | list of strings                                        | مشابه مورد بالا، ولی برای `sharedSecrets`                                                                                                | همه `sharedSecrets`          |
| `serviceAccount.name`                           | `string`                                               | نام `ServiceAccount` مورد استفاده در این دیپلویمنت                                                                                       | —                            |
| `service.type`                                  | `string`                                               | نوع سرویس: `ClusterIP` یا `NodePort`                                                                                                     | `ClusterIP`                  |
| `service.labels`                                | `mapping`                                              | لیبل‌های اضافی برای سرویس [`k8s.label regex`](#common-regexes) مرتبط با این ورک‌لود                                                      | —                            |
| `service.annotations`                           | `mapping`                                              | annotationهای اضافی برای سرویس [`k8s.label regex`](#common-regexes)                                                                      | —                            |
| `securityContext`                               | [`pod.securityContext`](#pod-securitycontext)          | تعریف context امنیتی در سطح پاد                                                                                                          | —                            |
| `labels`                                        | `mapping`                                              | لیبل‌های اضافی برای آبجکت Deployment \*                                                                                                  | —                            |
| `annotations`                                   | `mapping`                                              | annotationهای اضافی برای آبجکت Deployment \*                                                                                             | —                            |
| `podLabels`                                     | `mapping`                                              | لیبل‌های اضافی در سطح Pod \*                                                                                                             | —                            |
| `podAnnotations`                                | `mapping`                                              | annotationهای اضافی در سطح Pod \*                                                                                                        | —                            |
| `terminationGracePeriodSeconds`                 | positive integer                                       | تعین مدت‌زمان اختیاری (برحسب ثانیه) تا پایان‌یافتن پادها                                                                                 | —                            |
| `hostNetwork`                                   | `boolean`                                              | فعال‌سازی `hostNetwork` مشابه با پیاده‌سازی بومی کوبرنیتیز                                                                               | `false`                      |
| `hostAliases`                                   | `ilist`                                                | نسبت hostname دلخواه به IP                                                                                                               | —                            |
| `hostAliases[].ip`                              | `string`                                               | آدرس IP که نام‌های دامنه مشخص‌شده به آن نسبت داده‌شوند                                                                                   | —                            |
| `hostAliases[].hostnames`                       | list of strings                                        | لیست نام‌هایی که باید به `hostAliases.ip` نسبت داده‌شوند                                                                                 | —                            |
| `hpa`                                           | [`workload.hpa`](#workload-hpa)                        | تعریف و فعال‌سازی HPA (مقیاس‌پذیری افقی خودکار)                                                                                          | —                            |
| `pdb`                                           | [`workload.pdb`](#workload-pdb)                        | تعریف محدودیت‌های مربوط به `PodDisruptionBudget`                                                                                         | —                            |
| `antiAffinityMode`                              | `string`                                               | نحوه اعمال affinity ورک‌لود؛ در صورت عدم تعریف دستی، مقادیر معتبر `preferred`، `required` می‌باشند                                       | —                            |
| `antiAffinityTopologyKeys`                      | list of strings                                        | کلیدهای توپولوژی برای تنظیم حالت anti-affinity (مثلاً `kubernetes.io/hostname`)                                                          | `['kubernetes.io/hostname']` |
| `affinity`                                      | `object`                                               | تعریف دستی affinity مانند نحوه‌ی تعریف در کوبرنیتیز                                                                                      | —                            |
| `tolerations`                                   | `list`                                                 | تعریف tolerationها برای اجرای پاد روی نودهای خاص همانند تعریف کوبرنیتیز                                                                  | —                            |
| `nodeSelector`                                  | `mapping`                                              | تعریف کلید-مقدار برای nodeSelector (اختصاص پاد به نودهای خاص) مشابه تعریف خود کوبرنیتیز                                                  | —                            |
| `dnsPolicy`                                     | `string`                                               | سیاست DNS برای پاد؛ یکی از مقادیر: `Default`، `ClusterFirst`، `ClusterFirstWithHostNet`، `None`                                          | —                            |
| `fullnameOverride`                              | `string`                                               | مقدار جایگزین برای نام کامل این ورک‌لود                                                                                                  | —                            |
| `minReadySeconds`                               | positive integer                                       | حداقل مدت زمانی که یک پاد باید آماده باشد در صورتی که کانتینری از آن کرش نکند                                                            | —                            |
| `priorityClassName`                             | `string`                                               | اگر مشخص شود، اولویت پاد را نشان می‌دهد. باید `PriorityClass` با همین نام از پیش تعریف شده باشد                                          | —                            |
| `imagePullSecrets`                              | list of [`imagePullSecret`](#workload-imagepullsecret) | لیستی از secretهایی که برای pull کردن ایمیج استفاده می‌شوند                                                                              | —                            |
| `topologySpreadConstraints`                     | `list`                                                 | تعریف نحوه‌ی پخش پادها در میان نواحی مختلف توپولوژیکی دامنه‌ها                                                                           | —                            |
| `topologySpreadConstraints[].maxSkew`           | positive integer                                       | (الزامی) مقدار انحراف مجاز در پخش پادها                                                                                                  | —                            |
| `topologySpreadConstraints[].topologyKey`       | `string`                                               | (الزامی) کلید توپولوژی برای پخش                                                                                                          | —                            |
| `topologySpreadConstraints[].whenUnsatisfiable` | `string`                                               | (الزامی) یکی از: `DoNotSchedule` یا `ScheduleAnyway`                                                                                     | —                            |
| `topologySpreadConstraints[].labelSelector`     | `mapping`                                              | (الزامی) selector برای انتخاب پادها                                                                                                      | —                            |
| `topologySpreadConstraintsSkew`                 | positive integer                                       | فعال‌سازی ساده `topologySpreadConstraints` با مقدار skew مشخص شده                                                                        | —                            |

/\* مثال‌های مجاز را در بخش [`k8s.label regex`](#common-regexes) ببینید.

#### ورک‌لود StatefulSet {#statefulset-workload}

یک وروک‌لود `statefulset` با نام `bar` بدین شکل تعریف می‌شود:

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

یک ورک‌لود `statefulset` می‌تواند شامل چندین کانتینر (`container`) باشد.

پارامترهای قابل تنظیم برای ورک‌لود نوع `statefulset`:

| پارامتر                                         | نوع داده                                                    | توضیح                                                                                                                     | مقدار پیش‌فرض                |
| ----------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `kind`                                          | `string`                                                    | (الزامی) مقدار باید `statefulset` باشد                                                                                    | `statefulset`                |
| `enabled`                                       | `boolean`                                                   | فعال یا غیرفعال بودن این ورک‌لود                                                                                          | `true`                       |
| `replicaCount`                                  | positive integer                                            | تعداد پادهای این ورک‌لود (حداقل ۰)                                                                                        | `1`                          |
| `containers`                                    | mapping of [`container`](#container)                        | (الزامی) تعریف کانتینرهای این statefulset                                                                                 | —                            |
| `initContainers`                                | mapping of [`container`](#container)                        | کانتینرهایی که پیش از کانتینرهای اصلی اجرا می‌شوند و باید موفق شوند؛ در غیر این‌صورت پاد شکست می‌خورد                     | —                            |
| `podManagementPolicy`                           | `string`                                                    | تعیین نحوه ایجاد پادها هنگام scale اولیه؛ مقادیر مجاز: `OrderedReady`, `Parallel`                                         | `OrderedReady`               |
| `updateStrategy.type`                           | `string`                                                    | نوع استراتژی به‌روزرسانی StatefulSet؛ مقادیر مجاز: `RollingUpdate`, `OnDelete`                                            | `RollingUpdate`              |
| `usedSharedConfigs`                             | list of strings                                             | اگرچه تمام `sharedConfigs` برای همه در دسترس‌اند، فقط زمانی در این بخش ریلود شوند که یکی از این کانفیگ‌ها تغییر کرده باشد | همه `sharedConfigs`          |
| `usedSharedSecrets`                             | list of strings                                             | مشابه بالا ولی برای `sharedSecrets`                                                                                       | همه `sharedSecrets`          |
| `serviceAccount.name`                           | `string`                                                    | نام `ServiceAccount` مورد استفاده برای این statefulset                                                                    | —                            |
| `service.type`                                  | `string`                                                    | نوع سرویس مرتبط: `ClusterIP`, `NodePort` یا `Headless`                                                                    | `ClusterIP`                  |
| `service.labels`                                | `mapping`                                                   | لیبل‌های اضافی برای سرویس \*                                                                                              | —                            |
| `service.annotations`                           | `mapping`                                                   | annotationهای اضافی برای سرویس \*                                                                                         | —                            |
| `securityContext`                               | [`pod.securityContext`](#pod-securitycontext)               | تنظیمات امنیتی در سطح پاد \*                                                                                              | —                            |
| `labels`                                        | `mapping`                                                   | لیبل‌های اضافی در محیط Deployment \*                                                                                      | —                            |
| `annotations`                                   | `mapping`                                                   | annotationهای اضافی در محیط Deployment \*                                                                                 | —                            |
| `podLabels`                                     | `mapping`                                                   | لیبل‌های اضافی برای پاد نهایی \*                                                                                          | —                            |
| `podAnnotations`                                | `mapping`                                                   | annotationهای اضافی برای پاد نهایی \*                                                                                     | —                            |
| `terminationGracePeriodSeconds`                 | positive integer                                            | مدت‌زمان (بر حسب ثانیه) تا خاتمه کار پاد                                                                                  | —                            |
| `hostNetwork`                                   | `boolean`                                                   | فعال‌سازی `hostNetwork` مشابه با پیاده‌سازی بومی کوبرنیتیز                                                                | `false`                      |
| `hostAliases`                                   | `list`                                                      | نسبت hostname دلخواه به IP                                                                                                | —                            |
| `hostAliases[].hostnames`                       | list of strings                                             | لیست نام‌هایی که باید به IP مشخص شده نسبت شوند                                                                            | —                            |
| `hostAliases[].ip`                              | `string`                                                    | آدرس IP که نام‌های داده‌شده به آن نسبت می‌شوند                                                                            | —                            |
| `volumeClaimTemplates`                          | [`volumeClaimTemplates`](#statefulset-volumeclaimtemplates) | تعریف ساده‌شده برای volumeClaimTemplateهای مربوط به StatefulSet                                                           | —                            |
| `hpa`                                           | [`workload.hpa`](#workload-hpa)                             | تعریف و پیکربندی HorizontalPodAutoscaler                                                                                  | —                            |
| `pdb`                                           | [`workload.pdb`](#workload-pdb)                             | تعریف و پیکربندی PodDisruptionBudget                                                                                      | —                            |
| `dnsPolicy`                                     | `string`                                                    | سیاست DNS برای این ورک‌لود: یکی از `Default`, `ClusterFirst`, `ClusterFirstWithHostNet`, `None`                           | —                            |
| `antiAffinityMode`                              | `string`                                                    | تعیین نحوه affinity پیش‌فرض در صورت عدم تنظیم دستی؛ مقادیر معتبر: `preferred`, `required`                                 | —                            |
| `antiAffinityTopologyKeys`                      | list of strings                                             | کلیدهای توپولوژی برای anti-affinity، در صورت استفاده از `antiAffinityMode`                                                | `['kubernetes.io/hostname']` |
| `affinity`                                      | `object`                                                    | تعریف کامل affinity در سطح پاد مشابه با تنظیمات کوبرنیتیز                                                                 | —                            |
| `tolerations`                                   | `list`                                                      | تعریف toleration برای پاد مشابه کوبرنیتیز                                                                                 | —                            |
| `nodeSelector`                                  | `mapping`                                                   | نگاشت کلید-مقدار برای تعیین نودهای هدف پاد                                                                                | —                            |
| `fullnameOverride`                              | `string`                                                    | مقدار جایگزین برای نام کامل ورک‌لود                                                                                       | —                            |
| `minReadySeconds`                               | positive integer                                            | حداقل زمانی که یک پاد در صورت عدم کرش باید آماده باقی بماند                                                               | —                            |
| `priorityClassName`                             | `string`                                                    | تعیین اولویت پاد؛ باید از پیش `PriorityClass` متناظر تعریف شده باشد                                                       | —                            |
| `imagePullSecrets`                              | list of [`imagePullSecret`](#workload-imagepullsecret)      | لیستی از سکرت‌هایی برای pull ایمیج‌ها                                                                                     | —                            |
| `topologySpreadConstraints`                     | `list`                                                      | نحوه پخش پادها در دامنه‌های توپولوژیکی                                                                                    | —                            |
| `topologySpreadConstraints[].maxSkew`           | positive integer                                            | (الزامی) میزان انحراف مجاز                                                                                                | —                            |
| `topologySpreadConstraints[].topologyKey`       | `string`                                                    | (الزامی) کلید توپولوژی                                                                                                    | —                            |
| `topologySpreadConstraints[].whenUnsatisfiable` | `string`                                                    | (الزامی) یکی از `DoNotSchedule` یا `ScheduleAnyway`                                                                       | —                            |
| `topologySpreadConstraints[].labelSelector`     | `mapping`                                                   | (الزامی) selector برای هدف قرار دادن پادها                                                                                | —                            |
| `topologySpreadConstraintsSkew`                 | positive integer                                            | تعریف ساده‌ی topologySpreadConstraints با skew مشخص                                                                       | —                            |

/\* مثال‌های مجاز labeling را در [`k8s.label regex`](#common-regexes) و annotations را در [`k8s.annotation regex`](#common-regexes) ببینید.

#### ورک‌لود Daemonset {#daemonset-workload}

یک ورک‌لود `daemonset` با نام `jaz` بدین صورت تعریف می‌شود:

```yaml
gonbad:
  workloads:
    jaz:
      kind: daemonset
      #...
```

یک ورک‌لود `daemonset` می‌تواند چندین کانتینر (`container`) داشته‌باشد.

پارامترهای قابل تنظیم برای ورک‌لود نوع `daemonset`:

| پارامتر                         | نوع داده                                               | توضیح                                                                                                                        | مقدار پیش‌فرض                |
| ------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `kind`                          | `string`                                               | (الزامی) مقدار باید `daemonset` باشد                                                                                         | `daemonset`                  |
| `enabled`                       | `boolean`                                              | فعال یا غیرفعال بودن این ورک‌لود                                                                                             | `true`                       |
| `containers`                    | mapping of [`container`](#container)                   | (الزامی) تعریف کانتینرهای این daemonset                                                                                      | —                            |
| `initContainers`                | mapping of [`container`](#container)                   | کانتینرهایی که یک‌بار و به ترتیب اجرا می‌شوند و باید موفق شوند تا کانتینرهای اصلی اجرا شوند                                  | —                            |
| `updateStrategy`                | `string`                                               | یکی از مقادیر `RollingUpdate` یا `OnDelete` برای تعیین نحوه به‌روزرسانی                                                      | `RollingUpdate`              |
| `usedSharedConfigs`             | list of strings                                        | اگرچه تمام `sharedConfigs` برای همه در دسترس‌اند، فقط زمانی در این بخش بازتعریف شوند که یکی از این کانفیگ‌ها تغییر کرده باشد | همه `sharedConfigs`          |
| `usedSharedSecrets`             | list of strings                                        | مشابه بالا، اما برای سکرت‌ها                                                                                                 | همه `sharedSecrets`          |
| `serviceAccount.name`           | `string`                                               | نام ServiceAccount استفاده‌شده در این daemonset                                                                              | —                            |
| `service.type`                  | `string`                                               | نوع سرویس: یکی از `ClusterIP` یا `NodePort`                                                                                  | `ClusterIP`                  |
| `service.labels`                | `mapping`                                              | لیبل‌های اضافی برای سرویس مرتبط \*                                                                                           | —                            |
| `service.annotations`           | `mapping`                                              | annotationهای اضافی برای سرویس \*                                                                                            | —                            |
| `securityContext`               | [`pod.securityContext`](#pod-securitycontext)          | تنظیمات امنیتی در سطح پاد                                                                                                    | —                            |
| `labels`                        | `mapping`                                              | لیبل‌های اضافی برای آبجکت daemonset \*                                                                                       | —                            |
| `annotations`                   | `mapping`                                              | annotationهای اضافی برای آبجکت daemonset \*                                                                                  | —                            |
| `podLabels`                     | `mapping`                                              | لیبل‌های اضافی برای پاد نهایی \*                                                                                             | —                            |
| `podAnnotations`                | `mapping`                                              | annotationهای اضافی برای پاد نهایی \*                                                                                        | —                            |
| `terminationGracePeriodSeconds` | positive integer                                       | مدت‌زمان اختیاری (برحسب ثانیه) تا توقف پاد                                                                                   | —                            |
| `hostNetwork`                   | `boolean`                                              | فعال‌سازی hostNetwork برای این پاد مشابه کوبرنیتیز بومی                                                                      | `false`                      |
| `hostAliases`                   | `list`                                                 | نگاشت hostname به IP مشخص‌شده                                                                                                | —                            |
| `hostAliases[].ip`              | `string`                                               | آدرس IP که `hostAliases.hostnames` به آن resolve شوند                                                                        | —                            |
| `hostAliases[].hostnames`       | list of strings                                        | لیست نام‌هایی که باید به IP مشخص‌شده resolve شوند                                                                            | —                            |
| `antiAffinityMode`              | `string`                                               | حالت anti-affinity پاد در صورت عدم تعریف دستی affinity؛ مقادیر: `preferred`, `required`                                      | —                            |
| `antiAffinityTopologyKeys`      | list of strings                                        | کلیدهای توپولوژی برای anti-affinity                                                                                          | `['kubernetes.io/hostname']` |
| `affinity`                      | `object`                                               | تعریف کامل affinity به سبک کوبرنیتیز                                                                                         | —                            |
| `tolerations`                   | `list`                                                 | تعریف toleration برای پاد مشابه کوبرنیتیز                                                                                    | —                            |
| `nodeSelector`                  | `mapping`                                              | تعیین نودهای هدف اجرای پاد با نگاشت کلید-مقدار                                                                               | —                            |
| `dnsPolicy`                     | `string`                                               | سیاست DNS: یکی از `Default`, `ClusterFirst`, `ClusterFirstWithHostNet`, `None`                                               | —                            |
| `fullnameOverride`              | `string`                                               | مقدار جایگزین برای نام کامل این ورک‌لود                                                                                      | —                            |
| `priorityClassName`             | `string`                                               | تعیین کلاس اولویت پاد؛ باید `PriorityClass` با همین نام از پیش تعریف شده باشد                                                | —                            |
| `imagePullSecrets`              | list of [`imagePullSecret`](#workload-imagepullsecret) | لیستی از سکرت‌ها برای pull کردن ایمیج‌ها                                                                                     | —                            |

/\* مثال‌های مجاز labeling را در [`k8s.label regex`](#common-regexes) و annotations را در [`k8s.annotation regex`](#common-regexes) ببینید.

#### ورک‌لود CronJob {#cronjob-workload}

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

پارامترهای قابل تنظیم برای ورک‌لود نوع `cronjob`:

### پارامترهای قابل تنظیم برای ورک‌لود نوع `cronjob`

| پارامتر                      | نوع داده                                               | توضیح                                                                                               | مقدار پیش‌فرض       |
| ---------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | ------------------- |
| `kind`                       | `string`                                               | (الزامی) نوع ورک‌لود باید `cronjob` باشد                                                            | `cronjob`           |
| `enabled`                    | `boolean`                                              | فعال یا غیرفعال بودن این ورک‌لود                                                                    | `true`              |
| `schedule`                   | `string`                                               | (الزامی) زمان‌بندی اجرا به‌صورت رشته‌ای شبیه `crontab` (مثلاً: `0 */2 * * *` برای هر ۲ ساعت یک‌بار) | —                   |
| `containers`                 | نگاشت از [`container`](#container)                     | (الزامی) تعریف کانتینرهای این cronjob                                                               | —                   |
| `initContainers`             | نگاشت از [`container`](#container)                     | کانتینرهایی که قبل از کانتینرهای اصلی به‌صورت ترتیبی اجرا می‌شوند و باید موفق شوند تا پاد اجرا شود  | —                   |
| `startingDeadlineSeconds`    | عدد صحیح مثبت                                          | حداکثر زمان (برحسب ثانیه) برای اجرای job در صورت جا افتادن زمان‌بندی به هر دلیل                     | —                   |
| `concurrencyPolicy`          | `string`                                               | نحوه مدیریت اجرای هم‌زمان چند job؛ مقادیر معتبر: `Allow`, `Forbid`, `Replace`                       | `Allow`             |
| `successfulJobsHistoryLimit` | عدد صحیح مثبت                                          | تعداد jobهای موفق تکمیل‌شده که باید نگه‌داری شوند                                                   | `3`                 |
| `failedJobsHistoryLimit`     | عدد صحیح مثبت                                          | تعداد jobهای شکست‌خورده که باید نگه‌داری شوند                                                       | `1`                 |
| `suspend`                    | `boolean`                                              | اگر `true` باشد، اجرای بعدی job به حالت تعلیق درمی‌آید                                              | `false`             |
| `restartPolicy`              | `string`                                               | سیاست ری‌استارت برای کانتینرها در پاد؛ مقادیر: `Always`, `OnFailure`, `Never`                       | `Always`            |
| `usedSharedConfigs`          | لیست رشته‌ای                                           | فقط در صورتی این ورک‌لود ری‌لود شود که یکی از `sharedConfigs` استفاده‌شده تغییر کرده باشد           | همه `sharedConfigs` |
| `usedSharedSecrets`          | لیست رشته‌ای                                           | مشابه بالا، اما برای `sharedSecrets`                                                                | همه `sharedSecrets` |
| `securityContext`            | [`pod.securityContext`](#pod-securitycontext)          | تعریف context امنیتی برای پاد                                                                       | —                   |
| `serviceAccount.name`        | `string`                                               | نام `ServiceAccount` که این cronjob از آن استفاده می‌کند                                            | —                   |
| `hostAliases`                | `list`                                                 | لیست نگاشت hostname به IP مشخص‌شده                                                                  | —                   |
| `hostAliases[].hostnames`    | لیست رشته‌ای                                           | لیست hostnameهایی که باید به IP مربوطه resolve شوند                                                 | —                   |
| `hostAliases[].ip`           | `string`                                               | IP مقصد که `hostnames` به آن resolve می‌شوند                                                        | —                   |
| `imagePullSecrets`           | لیست از [`imagePullSecret`](#workload-imagepullsecret) | لیستی از سکرت‌هایی که برای کشیدن ایمیج‌ها به کار می‌روند                                            | —                   |

### فایل‌های ایستا (Gonbad Staticfiles) {#gonbad-staticfiles}

**بخش:** `gonbad.staticFiles`

برای اینکه بتوانید تک فایل‌های ایستایی مانند فایل‌های پیکربندی (مثلاً `.zshrc` یا `sshd.config`) را درون کانتینر mount کنید، ابتدا باید آن‌ها را در بخش `gonbad.staticFiles` تعریف کنید.

پس از تعریف، می‌توان از طریق `gonbad.workloads.containers.fileMounts` به آن‌ها ارجاع داد و در کانتینر قرارشان داد.

به عنوان مثال فرض کنیم بخواهیم دو فایل ایستا به نام‌های `.zshrc` و `sshd.config` تعریف کنیم:

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

در این حالت، فایل‌ها به‌صورت خودکار به `ConfigMap` تبدیل می‌شوند و Gonbad وظیفه‌ی حفظ یکپارچگی و یکنواختی نام‌گذاری آن‌ها را بر عهده دارد.

### حجم‌ها (Gonbad Volumes) {#gonbad-volumes}

**بخش:** `gonbad.volumes`

برای ایجاد PersistentVolumeClaim (PVC) و استفاده از آن، یا mount کردن Secrets و ConfigMaps در داخل پادها، ابتدا باید آن‌ها در بخش `gonbad.volumes` تعریف کنید. سپس از طریق `containers.volumeMounts` در داخل کانتینر مانت شوند.

انواع Volumeهای پشتیبانی‌شده عبارت‌اند از:

| پارامتر | نوع داده | توضیح                                                                                                                           | مقدار پیش‌فرض |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `type`  | `string` | (الزامی) نوع Volume؛ یکی از: `persistentVolumeClaim`, `secret`, `configMap`, `emptyDir`, `ephemeral`, `existingPVC`, `hostPath` | —             |

در ادامه توضیح هر یک را مشاهده می‌کنید.

#### نوع Volume: `persistentVolumeClaim`

| پارامتر        | نوع داده                     | توضیح                                                             | مقدار پیش‌فرض |
| -------------- | ---------------------------- | ----------------------------------------------------------------- | ------------- |
| `type`         | `string`                     | (الزامی) مقدار باید `persistentVolumeClaim` باشد                  | —             |
| `size`         | عدد مثبت یا رشته مانند `2Gi` | (الزامی) اندازه حجم درخواستی                                      | —             |
| `accessMode`   | `string`                     | (الزامی) یکی از: `ReadOnlyMany`, `ReadWriteOnce`, `ReadWriteMany` | —             |
| `storageClass` | `string`                     | نام کلاس ذخیره‌سازی مورد استفاده برای این PVC                     | —             |

#### نوع Volume: `existingPVC`

| پارامتر    | نوع داده  | توضیح                                                        | مقدار پیش‌فرض |
| ---------- | --------- | ------------------------------------------------------------ | ------------- |
| `type`     | `string`  | (الزامی) مقدار باید `existingPVC` باشد                       | —             |
| `name`     | `string`  | (الزامی) نام PVC (نوع بالا) موجودی که قرار است استفاده شود   | —             |
| `readOnly` | `boolean` | اگر `true` باشد، این Volume به‌صورت فقط‌خواندنی mount می‌شود | `false`       |

#### نوع Volume: `ephemeral`

| پارامتر        | نوع داده                     | توضیح                                                                                | مقدار پیش‌فرض |
| -------------- | ---------------------------- | ------------------------------------------------------------------------------------ | ------------- |
| `type`         | `string`                     | (الزامی) مقدار باید `ephemeral` باشد                                                 | —             |
| `size`         | عدد مثبت یا رشته مانند `1Gi` | (الزامی) اندازه حافظه موقت                                                           | —             |
| `accessMode`   | `string`                     | (الزامی) حالت دسترسی یکی از حالات `ReadOnlyMany` ،`ReadWriteOnce` یا `ReadWriteOnce` | —             |
| `storageClass` | `string`                     | کلاس ذخیره‌سازی مورد استفاده برای این ephemeral PVC                                  | —             |

#### نوع Volume: `emptyDir`

| پارامتر | نوع داده | توضیح                               | مقدار پیش‌فرض |
| ------- | -------- | ----------------------------------- | ------------- |
| `type`  | `string` | (الزامی) مقدار باید `emptyDir` باشد | —             |

#### نوع Volume: `secret`

| پارامتر        | نوع داده  | توضیح                                                                                                               | مقدار پیش‌فرض |
| -------------- | --------- | ------------------------------------------------------------------------------------------------------------------- | ------------- |
| `type`         | `string`  | (الزامی) مقدار باید `secret` باشد                                                                                   | —             |
| `name`         | `string`  | (الزامی) نام سکرت مورد استفاده                                                                                      | —             |
| `items`        | `list`    | اگر تعیین شود، فقط کلیدهای مشخص‌شده از سکرت در آدرس مشخص شده mount می‌شوند                                          | —             |
| `items[].key`  | `string`  | (الزامی) کلید داخل Secret که باید مانت شود                                                                          | —             |
| `items[].path` | `string`  | (الزامی) مسیر نسبی فایلی که کلید به آن نگاشت می‌شود                                                                 | —             |
| `items[].mode` | `integer` | مجوز (permission) فایل را تعیین می‌کند؛ باید بین 0000 تا 0777 (به‌صورت octal) یا بین 0 تا 511 (به‌صورت دسیمال) باشد | —             |

#### نوع Volume: `configMap`

| پارامتر        | نوع داده  | توضیح                                                                                               | مقدار پیش‌فرض |
| -------------- | --------- | --------------------------------------------------------------------------------------------------- | ------------- |
| `type`         | `string`  | (الزامی) مقدار باید `configMap` باشد                                                                | —             |
| `name`         | `string`  | (الزامی) نام ConfigMap مورد استفاده                                                                 | —             |
| `items`        | `list`    | اگر تعیین شود، فقط کلیدهای مشخص‌شده از configMap، mount می‌شوند                                     | —             |
| `items[].key`  | `string`  | (الزامی) کلید داخل ConfigMap که باید mount شود                                                      | —             |
| `items[].path` | `string`  | (الزامی) مسیر نسبی فایلی که کلید به آن نگاشت می‌شود                                                 | —             |
| `items[].mode` | `integer` | مجوز (permission) فایل؛ باید بین 0000 تا 0777 (به‌صورت octal) یا بین 0 تا 511 (به‌صورت دسیمال) باشد | —             |

#### نوع Volume: `hostPath`

| پارامتر        | نوع داده | توضیح                                                                                                                   | مقدار پیش‌فرض |
| -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- | ------------- |
| `type`         | `string` | (الزامی) مقدار باید `hostPath` باشد                                                                                     | —             |
| `path`         | `string` | (الزامی) مسیر از نود میزبان که باید به عنوان Volume استفاده شود                                                         | —             |
| `hostPathType` | `string` | (الزامی) یکی از مقادیر: `DirectoryOrCreate`, `Directory`, `FileOrCreate`, `File`, `Socket`, `CharDevice`, `BlockDevice` | —             |

### اینگرس‌ها (Gonbad Ingresses) {#gonbad-ingresses}

**بخش:** `gonbad.ingresses`

برای ایجاد منابع `Ingress` در کوبرنیتیز، باید آن‌ها را در زیر بخش `gonbad.ingresses` تعریف کرد. هر تعریف اینگرس با یک نام مانند `ing` مشخص می‌شود.

نمونه‌ای از پارامترهای قابل تنظیم:

| پارامتر                        | نوع داده             | توضیح                                                                                                                                            | مقدار پیش‌فرض            |
| ------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `enabled`                      | `boolean`            | فعال یا غیرفعال بودن این ingress                                                                                                                 | `true`                   |
| `workloadName`                 | `string`             | (الزامی) نام ورک‌لودی که ترافیک باید به سرویس آن هدایت شود؛ (نام release-name به صورت داخلی به آن اضافه می‌شود) و نسبت به `serviceName` ارجح است | —                        |
| `serviceName`                  | `string`             | (الزامی) نام سرویس backend که ترافیک به آن هدایت می‌شود                                                                                          | —                        |
| `servicePort`                  | `string`             | (الزامی) نام پورتی در سرویس backend باید استفاده شود                                                                                             | —                        |
| `ingressClassName`             | `string`             | کلاس اینگرس (مثلاً `nginx`, `traefik`)                                                                                                           | —                        |
| `fullnameOverride`             | `string`             | مقدار جایگزین برای نام کامل اینگرس                                                                                                               | —                        |
| `hosts`                        | `list`               | (الزامی) لیست hostهایی که این اینگرس برای آن‌ها تعریف می‌شود                                                                                     | —                        |
| `hosts[].host`                 | `string`             | (الزامی) آدرس هاست به فرمت IDN که باید route شود                                                                                                 | —                        |
| `hosts[].paths`                | `list`               | مسیرهای مربوط به هر هاست؛ می‌تواند لیستی ساده از مسیرها باشد یا هر مسیر پیکربندی خاص خود را داشته باشد                                           | —                        |
| `hosts[].paths[].path`         | `string`             | (الزامی) مسیر درخواستی (URL path) که باید route شود                                                                                              | —                        |
| `hosts[].paths[].pathType`     | `string`             | (الزامی) نوع مسیر؛ یکی از `ImplementationSpecific`, `Exact`, یا `Prefix`                                                                         | `ImplementationSpecific` |
| `hosts[].paths[].workloadName` | `string`             | نام ورک‌لود برای هدایت ترافیک (نسبت به `serviceName` ارجح است)                                                                                   | از `workloadName` بالایی |
| `hosts[].paths[].serviceName`  | `string`             | نام سرویس backend برای هدایت ترافیک                                                                                                              | از `serviceName` بالایی  |
| `hosts[].paths[].servicePort`  | `string` یا عدد صحیح | پورت سرویس backend                                                                                                                               | از `servicePort` بالایی  |
| `labels`                       | `mapping`            | لیبل‌های اختصاصی برای این ingress                                                                                                                | —                        |
| `annotations`                  | `mapping`            | annotationهای اختصاصی برای این ingress                                                                                                           | —                        |
| `tls`                          | `list`               | پیکربندی TLS برای این ingress                                                                                                                    | —                        |
| `tls[].secretName`             | `string`             | (الزامی) نام Secret که برای TLS استفاده می‌شود                                                                                                   | —                        |
| `tls[].hosts`                  | لیست رشته‌ای         | هاست‌هایی که باید توسط `secretName` پشتیبانی شوند                                                                                                | —                        |

### نکات:

- `workloadName` فقط نام ریلیز را به صورت داخلی به نام سرویس اضافه می‌کند. این مقدار بررسی نمی‌کند که ورک‌لود موجود یا فعال است یا نه، برای دسترسی بیشر از مقدار `workload.fullnameOverride` استفاده کنید.
- می‌توان مقادیر `global.ingress.annotations` و `global.ingress.tls` را نیز به صورت سراسری تعریف کرد که با مقادیر محلی اینگرس‌ها ادغام می‌شوند.

### سرویس‌های خارجی (Gonbad ExternalServices) {#gonbad-externalservices}

**بخش:** `gonbad.externalServices`

برای ارجاع به سرویس‌هایی خارج از کلاستر کوبرنیتیز (مثلاً دیتابیس خارجی، API، یا DNS)، باید آن‌ها را در این بخش تعریف کنید.

توجه: برای تعریف معتبر یک سرویس خارجی، علاوه‌بر `ports` حتماً باید یکی از فیلدهای `externalName` یا `externalIPs` مقدار داشته باشند.

| پارامتر        | نوع داده                              | توضیح                                                                                       | مقدار پیش‌فرض |
| -------------- | ------------------------------------- | ------------------------------------------------------------------------------------------- | ------------- |
| `enabled`      | `boolean`                             | فعال یا غیرفعال بودن سرویس خارجی                                                            | —             |
| `externalName` | `string`                              | نام دامنه (IDN) سرویس خارجی (فقط این فیلد یا `externalName` باید تعریف شود)                 | —             |
| `externalIPs`  | list of strings                       | لیست IP (IPv4 یا IPv6) مربوط به سرویس خارجی (فقط این فیلد یا `externalName` باید تعریف شود) | —             |
| `ports`        | [`container.ports`](#container-ports) | لیست پورت‌های مربوط به سرویس‌‌های خارجی                                                     | —             |

### قوانین پرومتئوس (Gonbad PrometheusRule) {#gonbad-prometheusrule}

**بخش:** `gonbad.prometheusRule`

در این بخش می‌توان قوانین مانیتورینگ و هشدار Prometheus را تعریف کرد. این قابلیت به ویژه برای پروژه‌هایی که نیاز به پایش دقیق متریک‌ها دارند کاربرد دارد.

| پارامتر               | نوع داده          | توضیح                                                                             | مقدار پیش‌فرض |
| --------------------- | ----------------- | --------------------------------------------------------------------------------- | ------------- |
| `enabled`             | `boolean`         | فعال‌سازی این بخش                                                                 | `true`        |
| `tpl`                 | `string`          | اگر `true` باشد، قوانین به صورت قالب Helm پردازش می‌شوند                          | `false`       |
| `interval`            | positive integer  | فاصله زمانی بین اجرای هر rule                                                     | —             |
| `grafanaDomain`       | `string`          | دامنه گرافانا برای اتصال از Prometheus                                            | —             |
| `rules`               | `list`            | لیست قوانین Prometheus                                                            | —             |
| `rules[].expr`        | `string` یا `int` | (الزامی) عبارت قانون در PromQL که قرار است محاسبه شود                             | —             |
| `rules[].alert`       | `string`          | اگر تنظیم شده باشد، این قانون به‌عنوان یک هشدار با این نام فعال می‌شود            | —             |
| `rules[].record`      | `string`          | اگر تنظیم شده باشد، نتیجه عبارت `expr` به‌صورت متریک جدید با این نام ذخیره می‌شود | —             |
| `rules[].for`         | `string`          | مدت زمانی که باید قبل از فعال شدن هشدار صبر کرد؛ باید با الگوی `[0-9]+(ms\s\m\h)` | s             |
| `rules[].labels`      | `mapping`         | لیبل‌های اختصاصی برای این قانون                                                   | —             |
| `rules[].annotations` | `mapping`         | توضیحات (annotation) برای این قانون                                               | —             |

### منابع خام یا پردازش نشده (Gonbad RawResources) {#gonbad-rawresources}

**بخش:** `gonbad.rawResources`

اگر بخواهید منابع دلخواه کوبرنیتیز را خارج از سازوکار تعریف خودکار Gonbad به‌صورت مستقیم تعریف کنید (مثلاً CRD خاص یا تعریف دستی Secret)، می‌توانید آن‌ها را در این بخش وارد کنید. این منابع بدون اعتبارسنجی توسط پک اپراتور پردازش می‌شوند.

| پارامتر                | نوع داده  | توضیح                                                            | مقدار پیش‌فرض |
| ---------------------- | --------- | ---------------------------------------------------------------- | ------------- |
| `apiVersion`           | `string`  | (الزامی) نسخه API که برای منبع کوبرنیتیز مورد نظر استفاده می‌شود | —             |
| `kind`                 | `string`  | (الزامی) نوع منبع (مثلاً `Secret`, `Ingress`, `ConfigMap`)       | —             |
| `metadata.name`        | `string`  | (الزامی) نام منبع                                                | —             |
| `metadata.namespace`   | `string`  | فضای نام (namespace) که منبع باید در آن ایجاد شود                | —             |
| `metadata.labels`      | `mapping` | لیبل‌های منبع (مطابق با قالب `k8s.label regex`) \*               | —             |
| `metadata.annotations` | `mapping` | annotationهای منبع (مطابق با قالب `k8s.annotation regex`) \*     | —             |
| `*`                    | هر نوع    | سایر فیلدهای دلخواه مربوط به منبع؛ بدون اعتبارسنجی توسط این چارت | —             |

/\* مثال‌های مجاز labeling را در [`k8s.label regex`](#common-regexes) و annotations را در [`k8s.annotation regex`](#common-regexes) ببینید.

## پارامترهای تکمیلی (Additional Parameters)

این آبجکت‌ها به‌طور مستقیم استفاده نمی‌شوند، بلکه به‌عنوان زیرمجموعه (sub-type) برای تعریف دقیق‌تر ورک‌لودها و منابع بالا استفاده می‌شوند.

---

### استراتژی استقرار (Deployment Strategy) {#deployment-strategy}

**بخش:** `deployment.strategy`

این پارامترها تعیین می‌کنند که هنگام بروزرسانی یا اعمال مجدد یک workload، چه نوع استراتژی استقراری اعمال شود:

| پارامتر                        | نوع داده                       | توضیح                                                                                                 | مقدار پیش‌فرض   |
| ------------------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------- | --------------- |
| `type`                         | `string`                       | نوع استراتژی: یکی از `Recreate` یا `RollingUpdate`؛ اگر `Recreate` باشد، پارامترهای اضافه مجاز نیستند | `RollingUpdate` |
| `rollingUpdate.maxSurge`       | `string` یا `positive integer` | حداکثر پاد اضافی هنگام استقرار از نوع RollingUpdate (مثلاً 2 یا `25%`)                                | `25%`           |
| `rollingUpdate.maxUnavailable` | `string` یا `positive integer` | حداکثر پاد غیرقابل استفاده همزمان در حین RollingUpdate (مثلاً `1` یا `25%`)                           | `25%`           |

---

### ایمیج پول با سکرت (Workload ImagePullSecret) {#workload-imagepullsecret}

این بخش برای معرفی سکرتی (`secret`) است که به‌کمک آن، ایمیج‌ها از رجیستری‌های خصوصی دریافت می‌شوند.

| پارامتر    | نوع داده | توضیح                                                                                    | مقدار پیش‌فرض |
| ---------- | -------- | ---------------------------------------------------------------------------------------- | ------------- |
| `name`     | `string` | (الزامی) نام `secret` از نوع `kubernetes.io/dockerconfigjson` که استفاده یا ایجاد می‌شود | —             |
| `registry` | `string` | آدرس رجیستری که سکرت برای آن ساخته می‌شود                                                | —             |
| `username` | `string` | نام کاربری برای سکرت                                                                     | —             |
| `password` | `string` | رمز عبور برای سکرت                                                                       | —             |

---

### مقیاس‌گذاری خودکار (Workload HPA) {#workload-hpa}

**بخش:** `workload.hpa`

این بخش منجر به ایجاد منبع `HorizontalPodAutoscaler` برای workload مربوطه می‌شود و تنظیمات مقیاس‌پذیری را مشخص می‌کند.

| پارامتر                               | نوع داده      | توضیح                                                                                      | مقدار پیش‌فرض |
| ------------------------------------- | ------------- | ------------------------------------------------------------------------------------------ | ------------- |
| `minReplicas`                         | `integer`     | حداقل تعداد replica که توسط HPA تنظیم می‌شوند                                              | `1`           |
| `maxReplicas`                         | `integer`     | (الزامی) حداکثر تعداد replica در صورت تنظیم HPA                                            | —             |
| `cpuAverageUtilization`               | `integer`     | دسترسی سریع به میانگین استفاده بر اساس متریک های CPU                                       | —             |
| `memoryAverageUtilization`            | `integer`     | دسترسی سریع به میانگین استفاده از حافظه بر اساس متریک RAM                                  | —             |
| `metrics`                             | `list`        | لیست متریک‌های سفارشی برای مقیاس‌گذاری خودکار                                              | —             |
| `metrics[].type`                      | `string`      | (الزامی) نوع متریک؛ یکی از `Resource`, `Pods`, `Object`, `External`                        | —             |
| `metrics[].name`                      | `string`      | (الزامی) نام متریک                                                                         | —             |
| `metrics[].metricSelector`            | `object`      | لیبل‌سلکتور برای فیلتر کردن متریک‌ها                                                       | —             |
| `metrics[].target`                    | `object`      | مقدار هدف برای مقیاس‌گذاری (فقط یکی از زیر‌پارامترهای آن باید تنظیم شود)                   | —             |
| `metrics[].target.value`              | `quantity`    | مقدار دقیق متریک مورد نظر فقط برای انواع `Resource`, `Object`, `External` قابل تعریف هستند | —             |
| `metrics[].target.averageValue`       | `quantity`    | میانگین مقدار متریک بین تمام پادها                                                         | —             |
| `metrics[].target.averageUtilization` | عدد صحیح مثبت | میانگین درصد استفاده از متریک بر پایه منابع (فقط برای `Resource`)                          | —             |
| `metrics[].describedObject`           | `object`      | مشخص‌کردن یک شی دیگر برای گرفتن متریک از آن (فقط برای نوع `Object` معتبر است)              | —             |

### بودجه قطع‌شدن پادها (Workload PDB) {#workload-pdb}

**بخش:** `workload.pdb`

ایجاد منبع `PodDisruptionBudget` برای محافظت از تعداد حداقلی از پادها هنگام رخدادهایی مثل بروزرسانی نود یا قطع موقت:

| پارامتر          | نوع داده              | توضیح                                                                                                        | مقدار پیش‌فرض |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------------------------------ | ------------- |
| `minAvailable`   | درصد یا عدد صحیح مثبت | حداقل تعداد پادهای قابل دسترس در هنگام حذف پادها توسط kubelet (قابل استفاده همزمان با `maxUnavailable` نیست) | —             |
| `maxUnavailable` | درصد یا عدد صحیح مثبت | حداکثر تعداد پادهای مجاز برای غیرفعال بودن در هنگام اختلالات (قابل استفاده همزمان با `minAvailable` نیست)    | —             |

## ویژگی‌های امنیتی پاد (Pod securityContext) {#pod-securitycontext}

**بخش:** `workload.securityContext`

`pod.securityContext` شامل تنظیمات امنیتی سطح پاد است که برای تمام کانتینرها در یک پاد اعمال می‌شود. توجه داشته باشید که اگر پارامتر معادلی در `container.securityContext` نیز تعریف شود، اولویت با تنظیمات کانتینر خواهد بود.

| پارامتر               | نوع داده      | توضیح                                                                                                                                                                              | مقدار پیش‌فرض |
| --------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `runAsUser`           | عدد صحیح مثبت | UID کاربری که پروسه اصلی کانتینر با آن اجرا می‌شود. اگر مقدار نداشته باشد، مقدار پیش‌فرض زمان اجرا استفاده می‌شود.                                                                 | —             |
| `runAsGroup`          | عدد صحیح مثبت | GID گروهی که پروسه اصلی کانتینر با آن اجرا می‌شود.                                                                                                                                 | —             |
| `runAsNonRoot`        | `boolean`     | اگر `true` باشد، تضمین می‌شود که کانتینر با کاربری غیر از `root` اجرا شود. در غیر این صورت، kubelet از اجرای آن جلوگیری می‌کند.                                                    | —             |
| `fsGroup`             | عدد صحیح مثبت | گروه ثانویه‌ای که برای مالکیت مشترک فایل‌ها در حجم‌ها (Volumes) استفاده می‌شود.                                                                                                    | —             |
| `fsGroupChangePolicy` | `string`      | یکی از: `Always` یا `OnRootMismatch`. مشخص می‌کند که تغییر مالکیت و سطح دسترسی به حجم‌ها چگونه صورت گیرد. فقط برای نوع‌هایی از Volume که از fsGroup پشتیبانی می‌کنند اعمال می‌شود. | —             |

پارامترهای مجاز دیگر را با دستور `kubectl explain pod.spec.securityContext` دریافت کنید.

## تعریف کانتینر (Container) {#container}

| پارامتر                    | نوع داده                                                  | توضیح                                                              | مقدار پیش‌فرض |
| -------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------ | ------------- |
| `enabled`                  | `boolean`                                                 | فعال یا غیرفعال بودن این کانتینر در پاد                            | `true`        |
| `image`                    | [`container.image`](#container-image)                     | ایمیجی که کانتینر با آن ساخته می‌شود.                              | —             |
| `command`                  | `list of strings`                                         | دستور اصلی هنگام اجرای کانتینر (مثلاً: `["de.sh", "-v", "-c"]`)    | —             |
| `args`                     | `list of strings`                                         | آرگومان‌هایی که به دستور `command` پاس داده می‌شود                 | —             |
| `env`                      | `object`                                                  | متغیرهای محیطی به‌صورت `key: value`                                | —             |
| `envFrom`                  | `list` از [`container.envFrom`](#container-envfrom)       | بارگذاری همه متغیرهای محیطی از یک Secret یا ConfigMap              | —             |
| `livenessProbe`            | [`container.probe`](#container-probes)                    | تعریف پروب سلامت برای بررسی زنده بودن کانتینر                      | —             |
| `readinessProbe`           | [`container.probe`](#container-probes)                    | تعریف پروب آمادگی برای بررسی قابل استفاده بودن کانتینر             | —             |
| `startupProbe`             | [`container.probe`](#container-probes)                    | تعریف پروب راه‌اندازی برای کنترل زمان آماده شدن اولیه کانتینر      | —             |
| `resources`                | [`container.resources`](#container-resources)             | محدودیت‌ها و درخواست‌های منابع (CPU و RAM)                         | —             |
| `ports`                    | [`container.ports`](#container-ports)                     | تعریف پورت‌هایی که توسط کانتینر باز می‌شوند                        | —             |
| `lifecycle`                | [`container.lifecycle`](#container-lifecycle)             | مراحل lifecycle مانند preStop و postStart                          | —             |
| `securityContext`          | [`container.securityContext`](#container-securitycontext) | تنظیمات امنیتی خاص این کانتینر                                     | —             |
| `fileMounts`               | `list`                                                    | تعریف فایل‌هایی که از طریق `staticFiles` به مسیر خاصی مانت می‌شوند | —             |
| `fileMounts[].name`        | `string`                                                  | نام فایل از بخش `staticFiles`                                      | —             |
| `fileMounts[].mountPath`   | `string`                                                  | مسیر مانت فایل در کانتینر                                          | —             |
| `fileMounts[].executable`  | `boolean`                                                 | اگر `true` باشد، فایل به‌صورت اجرایی مانت می‌شود (`0555`)          | `false`       |
| `volumeMounts`             | `list`                                                    | تعریف Volumeهایی که باید در این کانتینر مانت شوند                  | —             |
| `volumeMounts[].name`      | `string`                                                  | نام Volume                                                         | —             |
| `volumeMounts[].mountPath` | `string`                                                  | مسیر مانت Volume                                                   | —             |
| `volumeMounts[].subPath`   | `string`                                                  | مسیر فرعی در Volume                                                | —             |
| `volumeMounts[].readOnly`  | `boolean`                                                 | اگر `true` باشد، Volume فقط‌خواندنی مانت می‌شود                    | `false`       |
| `order`                    | عدد صحیح مثبت                                             | ترتیب ایجاد کانتینرها در Manifest نهایی (در صورت چندکانتینری بودن) | —             |

---

## کانتینر ایمیج (Container Image) {#container-image}

**بخش:** `container.image`

| پارامتر      | نوع داده | توضیح                                                                                                 | مقدار پیش‌فرض  |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------- | -------------- |
| `repository` | `string` | (الزامی) نام ریپازیتوری ایمیج؛ می‌تواند شامل آدرس رجیستری نیز باشد (مثلاً: `docker.sabz.dev/grafana`) | —              |
| `tag`        | `string` | (الزامی) برچسب (tag) نسخه ایمیج                                                                       | —              |
| `pullPolicy` | `string` | سیاست دریافت ایمیج: یکی از `Always` یا `IfNotPresent`                                                 | `IfNotPresent` |
| `registry`   | `string` | آدرس رجیستری از جایی که ایمیج دریافت می‌شود (مثلاً: `docker.io` یا `docker.sabz.dev`)                 | —              |

### متغیرهای محیطی کانتینر (Container Env) {#container-env}

**بخش:** `workload.container.env`

در Gonbad، هر متغیر محیطی (env) در کانتینر می‌تواند به‌صورت مستقیم (مقدار رشته‌ای یا عددی) یا به‌صورت غیرمستقیم از منابعی مانند `Secret`، `ConfigMap`، منابع سیستم (`fieldRef`) یا منابع محدودیت منابع (`resourceFieldRef`) مقداردهی شود.

نکته: تنها **یکی از** فیلدهای `value`، `secretRef`، `configMapRef`، `resourceFieldRef` یا `fieldRef` باید تنظیم شود.

اولویت و ترتیب پردازش envها:

1. envهایی که `order` مشخص دارند (به جز `order: -1`)
2. envهای غیرترتیب‌دار از نوع `secretRef`، `configMapRef`، `resourceFieldRef` و `fieldRef`
3. envهای ساده‌ی دارای `value` که حاوی `$(...)` نیستند
4. envهای دارای `value` با `$(...)` (تمپلیتینگ کوبرنیتیز)
5. envهایی با `order: -1` (در آخر اعمال می‌شوند)

| پارامتر                          | نوع       | توضیح                                                                                                                | پیش‌فرض |
| -------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------- | ------- |
| `order`                          | `integer` | ترتیب تعریف env برای زمانی که از تمپلیتینگ کوبرنیتیز (مثل `$(...)`) استفاده می‌شود. مقدار `-1` یعنی در انتهای ترتیب. | —       |
| `value`                          | `string`  | مقدار مستقیم برای env                                                                                                | —       |
| `secretRef`                      | `object`  | استفاده از یک `Secret` برای مقداردهی                                                                                 | —       |
| `secretRef.name`                 | `string`  | (الزامی) نام سکرت                                                                                                    | —       |
| `secretRef.key`                  | `string`  | (الزامی) کلید مورد نظر در سکرت                                                                                       | —       |
| `secretRef.optional`             | `boolean` | تعیین اختیاری بودن وجود سکرت یا کلید مربوطه                                                                          | —       |
| `configMapRef`                   | `object`  | مقداردهی از طریق `ConfigMap`                                                                                         | —       |
| `configMapRef.name`              | `string`  | (الزامی) نام ConfigMap                                                                                               | —       |
| `configMapRef.key`               | `string`  | (الزامی) کلید مورد نظر در ConfigMap                                                                                  | —       |
| `configMapRef.optional`          | `boolean` | تعیین اختیاری بودن وجود ConfigMap یا کلید مربوطه                                                                     | —       |
| `resourceFieldRef`               | `object`  | استخراج مقدار از منابع کوبرنیتیز (مثل CPU یا حافظه)                                                                  | —       |
| `resourceFieldRef.resource`      | `string`  | (الزامی) نام منبع (مثل: `limits.cpu`، `requests.memory`)                                                             | —       |
| `resourceFieldRef.containerName` | `string`  | نام کانتینر (در صورت وجود چند کانتینر در یک پاد)                                                                     | —       |
| `resourceFieldRef.divisor`       | `string`  | مقسومی برای نرمال‌سازی مقدار منبع                                                                                    | —       |
| `fieldRef`                       | `object`  | مقداردهی از طریق اطلاعات خود پاد (مثل نام یا namespace)                                                              | —       |
| `fieldRef.fieldPath`             | `string`  | (الزامی) مسیر فیلد مورد نظر در مانفیست پاد (مثلاً: `metadata.name`، `spec.nodeName`)                                 | —       |

**نمونه:**

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

### متغیرهای محیطی از منابع خارجی (Container envFrom) {#container-envfrom}

**بخش:** `container.envFrom`

با استفاده از این بخش می‌توان تمام key/value‌های موجود در یک `Secret` یا `ConfigMap` را به‌صورت یکجا به عنوان متغیرهای محیطی به کانتینر اضافه کرد. در هر تعریف فقط یکی از `secretRef` یا `configMapRef` باید مشخص شود.

| پارامتر             | نوع      | توضیح                                       | پیش‌فرض |
| ------------------- | -------- | ------------------------------------------- | ------- |
| `secretRef`         | `object` | بارگذاری همه متغیرها از یک Secret           | —       |
| `secretRef.name`    | `string` | (الزامی) نام Secret                         | —       |
| `configMapRef`      | `object` | بارگذاری همه متغیرها از یک ConfigMap        | —       |
| `configMapRef.name` | `string` | (الزامی) نام ConfigMap                      | —       |
| `prefix`            | `string` | پیشوندی که به کلیدهای واردشده افزوده می‌شود | —       |

---

### پروب‌های کانتینر (Container Probes) {#container-probes}

**بخش‌ها:** `container.startupProbe`، `container.livenessProbe`، `container.readinessProbe`

هر کانتینر می‌تواند دارای سه نوع پروب باشد:

- **Startup Probe:** بررسی صحت اولیه اجرای کانتینر
- **Liveness Probe:** بررسی اینکه کانتینر هنوز زنده است
- **Readiness Probe:** بررسی آمادگی کانتینر برای دریافت ترافیک

ساختار همه آن‌ها یکسان است:

| پارامتر               | نوع داده           | توضیح                                                                    | پیش‌فرض |
| --------------------- | ------------------ | ------------------------------------------------------------------------ | ------- |
| `enabled`             | `boolean`          | فعال‌سازی پروب                                                           | —       |
| `port`                | `string` یا `int`  | (الزامی در صورت عدم وجود `command`) شماره یا نام پورتی که باید بررسی شود | —       |
| `path`                | `string`           | مسیر درون HTTP برای بررسی                                                | —       |
| `command`             | `list` از `string` | (الزامی در صورت عدم وجود `path`) لیست دستورات برای بررسی وضعیت           | —       |
| `httpHeaders`         | `mapping`          | سربرگ‌های HTTP برای درخواست پروب                                         | —       |
| `initialDelaySeconds` | `int` مثبت         | تأخیر اولیه پیش از شروع بررسی                                            | —       |
| `periodSeconds`       | `int` مثبت         | فاصله زمانی بین هر بررسی                                                 | —       |
| `timeoutSeconds`      | `int` مثبت         | حداکثر زمان انتظار برای پاسخ                                             | —       |
| `successThreshold`    | `int` مثبت         | حداقل تعداد موفقیت متوالی برای موفق در نظر گرفتن پروب (حداقل مقدار: `1`) | —       |
| `failureThreshold`    | `int` مثبت         | تعداد تلاش‌های ناموفق پیش از در نظر گرفتن خطا (حداقل مقدار: `1`)         | —       |

### منابع کانتینر (Container Resources) {#container-resources}

**بخش:** `container.resources`

با استفاده از این پارامترها می‌توان محدودیت‌ها و درخواست‌های منابع (CPU و RAM) را برای هر کانتینر تعریف کرد. با تعریف request منابع به صورت ذخیره می‌باشند و در صورتی که limit تعریف شود و منابع مورد استفاده از این محدودیت عبور کنند، کانتینر از کار می‌افتد.

| پارامتر           | نوع داده          | توضیح                                                                                   | پیش‌فرض |
| ----------------- | ----------------- | --------------------------------------------------------------------------------------- | ------- |
| `requests.cpu`    | `int` یا `string` | میزان CPU رزروشده برای کانتینر (مثلاً `500m` یا `1`)                                    | —       |
| `requests.memory` | `int` یا `string` | مقدار RAM موردنیاز برای کانتینر (مثلاً `512Mi` یا `2Gi`)                                | —       |
| `limits.cpu`      | `int` یا `string` | حداکثر CPU مجاز برای کانتینر؛ در صورت تجاوز، عملکرد کانتینر کاهش می‌یابد                | —       |
| `limits.memory`   | `int` یا `string` | حداکثر RAM مجاز برای کانتینر؛ در صورت تجاوز، کانتینر کشته می‌شود و پاد ممکن است حذف شود | —       |

### پورت‌های کانتینر (Container Ports) {#container-ports}

**بخش:** `container.ports`

این قسمت برای تعریف پورت‌های در دسترس در کانتینر و تولید منابع مرتبط مثل Service، Ingress و ServiceMonitor استفاده می‌شود. کلیدها شماره پورت (مثلاً `8080` یا `16049/udp`) و مقدار می‌تواند رشته (نام پورت)، null یا یک آبجکت با تنظیمات زیر باشد:

| پارامتر                 | نوع داده   | توضیح                                                                                  | پیش‌فرض        |
| ----------------------- | ---------- | -------------------------------------------------------------------------------------- | -------------- |
| `enabled`               | `boolean`  | فعال‌سازی این پورت                                                                     | —              |
| `name`                  | `string`   | نام پورت                                                                               | —              |
| `protocol`              | `string`   | نوع پروتکل: `TCP` یا `UDP`                                                             | —              |
| `number`                | `int` مثبت | شماره پورت (به‌صورت اختیاری؛ در صورت عدم وجود از کلید استفاده می‌شود)                  | کلید این آبجکت |
| `nodePort`              | `int` مثبت | اگر تنظیم شود، `NodePort` ساخته می‌شود و ترافیک مستقیم از نود به این پورت هدایت می‌شود | —              |
| `servicePort`           | `int` مثبت | اگر Ingress تعریف شود، باید پورت سرویس مشخص شود                                        | —              |
| `scrapePath`            | `string`   | مسیر مورد استفاده‌ی Prometheus برای اسکرپ (مانند `/metrics`)                           | —              |
| `scrapeTimeout`         | `int` مثبت | زمان‌انتظار Prometheus برای اسکرپ                                                      | —              |
| `scrapeInterval`        | `int` مثبت | فاصله بین هر بار اسکرپ توسط Prometheus                                                 | —              |
| `scrapeExtraProperties` | `object`   | تنظیمات اضافه برای بخش endpoint در ServiceMonitor                                      | —              |

### چرخه‌ی حیات کانتینر (Container Lifecycle) {#container-lifecycle}

**بخش:** `container.lifecycle`

در این بخش می‌توان رفتار سیستم هنگام رویدادهای آغاز و پایان اجرای کانتینر را تعریف کرد. این رویدادها شامل:

- `postStart`: بلافاصله پس از ایجاد کانتینر اجرا می‌شود.
- `preStop`: بلافاصله پیش از حذف کانتینر (به‌دلیل API یا event مدیریتی) اجرا می‌شود.

در هر یک از این مراحل، تنها یکی از روش‌های `exec` (اجرای دستور)، `httpGet` (درخواست HTTP)، یا `tcpSocket` (ارتباط TCP) قابل استفاده است.

| پارامتر                  | نوع               | توضیح                                                                       | پیش‌فرض |
| ------------------------ | ----------------- | --------------------------------------------------------------------------- | ------- |
| `postStart`              | `object`          | دستور یا عملیات بعد از اجرای کانتینر. ساختار مشابه `preStop` دارد.          | —       |
| `preStop`                | `object`          | دستور یا عملیات قبل از توقف کانتینر                                         | —       |
| `preStop.exec`           | `object`          | اجرای یک دستور خاص داخل کانتینر                                             | —       |
| `preStop.exec.command`   | `list[string]`    | لیست دستورات (مثلاً: `["sh", "-c", "echo hello"]`)                          | —       |
| `preStop.httpGet`        | `object`          | ارسال درخواست HTTP قبل از توقف                                              | —       |
| `preStop.httpGet.port`   | `int` یا `string` | (الزامی) شماره یا نام پورت مقصد در کانتینر                                  | —       |
| `preStop.httpGet.host`   | `string`          | نام میزبان؛ پیش‌فرض IP پاد. بهتر است از `Host` در `httpHeaders` استفاده شود | —       |
| `preStop.httpGet.schema` | `string`          | پروتکل ارتباط (مثلاً: `HTTP` یا `HTTPS`)                                    | `HTTP`  |
| `preStop.tcpSocket`      | `object`          | اجرای بررسی اتصال TCP                                                       | —       |
| `preStop.tcpSocket.port` | `int` یا `string` | شماره یا نام پورت                                                           | —       |
| `preStop.tcpSocket.host` | `string`          | نام میزبان؛ پیش‌فرض IP پاد                                                  | —       |

---

### تنظیمات امنیتی کانتینر (Container securityContext) {#container-securitycontext}

**بخش:** `container.securityContext`

تنظیمات امنیتی در سطح کانتینر. این پارامترها دسترسی‌ها، قابلیت ارتقاء سطح دسترسی، و ویژگی‌های سیستم‌عاملی کانتینر را کنترل می‌کنند. اگر تنظیمی هم در سطح `pod` و هم `container` انجام شود، مقدار `container` اولویت دارد.

| پارامتر                    | نوع            | توضیح                                                                       | پیش‌فرض |
| -------------------------- | -------------- | --------------------------------------------------------------------------- | ------- |
| `runAsUser`                | `int` مثبت     | UID که فرایند اصلی کانتینر با آن اجرا می‌شود                                | —       |
| `runAsGroup`               | `int` مثبت     | GID که فرایند اصلی کانتینر با آن اجرا می‌شود                                | —       |
| `runAsNonRoot`             | `boolean`      | اطمینان از اجرای کانتینر توسط کاربر غیر ریشه (`non-root`)                   | —       |
| `privileged`               | `boolean`      | اگر `true` باشد، کانتینر با سطح دسترسی کامل (شبیه root در هاست) اجرا می‌شود | —       |
| `allowPrivilegeEscalation` | `boolean`      | اگر فعال باشد، فرایند می‌تواند سطح دسترسی خود را افزایش دهد                 | —       |
| `readOnlyRootFilesystem`   | `boolean`      | اگر `true` باشد، فایل‌سیستم root فقط خواندنی خواهد بود                      | —       |
| `capabilities`             | `object`       | قابلیت‌هایی که باید اضافه یا حذف شوند                                       | —       |
| `capabilities.add`         | `list[string]` | لیست قابلیت‌هایی که باید به کانتینر افزوده شوند (مثلاً: `NET_ADMIN`)        | —       |
| `capabilities.drop`        | `list[string]` | لیست قابلیت‌هایی که باید حذف شوند                                           | —       |

📎 برای پارامترهای بیشتر، از دستور زیر در Kubernetes استفاده کنید:

```bash
kubectl explain pod.spec.containers.securityContext
```

---

### قالب Volume برای StatefulSet

**بخش:** `statefulset.volumeClaimTemplates`

برای هر پاد در یک `StatefulSet`، می‌توان به‌صورت خودکار یک Persistent Volume Claim (PVC) مجزا ایجاد کرد. این تعریف باید به‌صورت `mapping` باشد که کلید آن نام Volume و مقدار آن تنظیمات زیر است:

| پارامتر        | نوع               | توضیح                                                                 | پیش‌فرض |
| -------------- | ----------------- | --------------------------------------------------------------------- | ------- |
| `enabled`      | `boolean`         | فعال‌سازی این قالب Volume برای StatefulSet                            | `true`  |
| `size`         | `int` یا `string` | (الزامی) حجم PVC (مثلاً `2Gi` یا `1024`)                              | —       |
| `accessMode`   | `string`          | (الزامی) نوع دسترسی به Volume: یکی از `ReadWriteOnce`، `ReadOnlyMany` | —       |
| `storageClass` | `string`          | کلاس ذخیره‌سازی (StorageClass) مورد نظر برای PVC                      | —       |

## عبارات منظم قابل استفاده (Common Regexes) {#common-regexes}

| Regex name             | Regex                                                                                                           | اسناد                                                                                                           |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `k8s.label.key`        | `^([a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/)?([A-Za-z0-9][A-Za-z0-9_.-]*)?[A-Za-z0-9]$` | [link](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set)      |
| `k8s.label.value`      | `^(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])?$`                                                                 | [link](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set)      |
| `k8s.annotation.key`   | `^([a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*/)?([A-Za-z0-9][A-Za-z0-9_.-]*)?[A-Za-z0-9]$` | [link](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/#syntax-and-character-set) |
| `k8s.annotation.value` | `string`                                                                                                        | [link](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/#syntax-and-character-set) |

## نمونه ها

در این بخش چندین مثال ببینید تا با جنبه‌های مختلف پیاده‌سازی این چارت بیشتر آشنا شوید.

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
