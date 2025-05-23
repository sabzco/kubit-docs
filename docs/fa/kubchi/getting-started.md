# شروع به کار

## ورود به پنل کوبیت

پس از دریافت اطلاعات ورود به کوبیت:

- ‌به آدرس پنل کوبیت سازمان خود بروید. به‌عنوان نمونه: ` https://panel.kubit.ir/-/your-org`
- گزینه‌ی SAML را انتخاب کنید.
- با نام کاربری و رمز عبوری که در سامانه‌ی ldap برای شما در نظر گرفته شده، لاگین کنید.

## شروع به کار در کوبیت

به‌منظور مدیریت ابزارها و برنامه‌های ابری در سامانه‌ی کوبچی لازم است کارهای زیر را انجام دهید:

- [ایجاد پروژه](#create-simple-project)
  : همه‌ی برنامه‌ها و ابزارها باید در پروژه‌ها قرار بگیرند.
  لذا اولین گام تعریف یک پروژه است. ([توضیحات بیشتر](../create-project))
- [ایجاد کاربران](#create-a-user):
  .کاربران و در صورت تمایل گروه‌های کاربری (اختیاری) را تنظیم کنید ([توضیحات بیشتر](../manage-user))
- [تنظیم دسترسی‌های کاربر](#give-access): کاربرانی که ایجاد کردید، برای اینکه بتوانند از کوبچی استفاده کنند، باید دسترسی‌های موردنیاز را داشته باشند.([توضیحات بیشتر](../manage-access))
- [نصب پک](#create-pack): برنامه‌ها و ابزارهای خود را باید در قالب پک‌ نصب کنید. ([توضیحات بیشتر](../manage-pack))

### ایجاد اولین پروژه {#create-simple-project}

برای شروع به کار نیاز دارید که پروژه‌ای تعریف کنید، بدین منظور:

- از منوی کناری، گزینه‌ی پروژه را از بخش سازماندهی انتخاب کنید.
- بر روی دکمه‌ی «پروژه جدید» کلیک کنید.
- عنوان و کلید پروژه‌ی مدنظر خود را وارد کنید و «تأیید» را بزنید.
  به عنوان مثال هر دو را کلمه «default» وارد کنید.
- با انتخاب از منوی کنار به بخش کوبچی بروید.
- گزینه «اتصال پروژه به کوبچی» را بزنید.
- ابتدا پروژه‌ی موردنظر را از لیست انتخاب کنید.
- کلاستر اصلی خود را نیز از لیست کلاسترها انتخاب کنید.
- گزینه‌ی اتصال را بزنید.

### تعریف یک کاربر جدید {#create-a-user}

برای اینکه باقی اعضای تیم بتوانند از پنل کوبیت استفاده کنند، لازم است برایشان یک حساب کاربری ایجاد کنید. بدین منظور:

- از منوی کناری، وارد بخش کاربران در قسمت سازماندهی شوید.
- بر روی دکمه‌ی‌ «کاربر جدید» کلیک کنید.
- فرم ایجاد کاربر LDAP را پر و تأیید کنید.

### تنظیم دسترسی‌ها {#give-access}

برای تنظیم دسترسی کاربران باید نقش‌هایی را به‌صورت مستقیم و یا از طریق عضویت در گروه‌ها به ایشان اعطا کنید. برای این کار،
مراحل زیر را طی کنید:

- از منوی کناری و در قسمت سازماندهی، وارد بخش کاربران شوید.
- با انتخاب یکی از کاربران، وارد صفحه‌ی تنظیمات کاربری آن کاربر شوید.
- تب «نقش‌ها» را انتخاب کنید و بر روی «انتساب نقش» کلیک کنید.
- از لیست نقش‌ها، یک نقش را انتخاب کنید. به‌عنوان مثال گزینه‌ی kubchi-devops را انتخاب کنید.
- دکمه‌ی افزودن را بزنید.
  با این کار دسترسی‌های متناظر با آن نقش در همه‌ی پروژه‌های سازمان به آن کاربر داده می‌شود.

#### تنظیم دسترسی کاربر در یک پروژه

همچنین می‌توانید هر نقش را در هر پروژه به صورت مجزا به کاربر اعطا کنید. برای این کار کافی است در منوی انتساب نقش به‌جای گزینه‌ی «همه‌ی
پروژه‌ها»، پروژه‌ی مدنظر را انتخاب کنید.

### نصب اولین برنامه از طریق پک {#create-pack}

ابتدا با برخی مفاهیم آشنا شویم:

** چارت چیست؟**
چارت در سامانه‌ی کوبیت همان چارت هلم (Helm Chart) است و برخی از آن‌ها برای UI کوبیت مناسب‌سازی شده‌ است.

**پک چیست؟**
نسخه‌ی نصب‌شده‌ی چارت (release) است که سامانه‌ی کوبیت مدیریت آن در کوبرنتیز را به عهده می گیرد.

:::info[روش‌های نصب پک]

- وارد کردن YAML
- پر کردن فرم پک

:::

حال شروع به نصب کنید:

- از منوی کناری وارد بخش «کوبچی» شوید و پروژه‌ی مدنظرتان را انتخاب کنید.
- دکمه‌ی «نصب پک» را انتخاب کنید.
- در این قسمت چارت پکی را که می‌خواهید نصب کنید، انتخاب کنید.
  برای مثال Redis-HA را از میان لیست چارت‌ها پیدا کنید و بر
  روی «نصب» کلیک کنید.

#### نصب با فرم

- نسخه‌ی چارتی که می‌خواهیم پک شما از آن نصب شود را انتخاب کنید. به‌عنوان مثال redis-ha 4.15.1.
- نام پک را وارد کنید. به‌عنوان مثال test-redis.
- فضای نامی (namespace) که می‌خواهید پک را در آن نصب کنید، انتخاب کنید.
  - اگر فضای نامی از قبل ندارید،‌ دکمه‌ی «ایجاد فضای نام جدید» را کلیک کنید و مثلاً test-ns را وارد کنید و تأیید کنید.
- اطلاعات مربوط به پک را وارد کنید. برای پک ردیس واردکردن موارد زیر کافی است:

  - در بخش Redis فرم:

  ```
  Redis image tag = 6.2.5-alpine
  Redis image repository = docker.sabz.dev/redis
  Persist storage class = zfs-ssd # or similar storage class
  ```

  - در بخش Redis Configs فرم:

  ```
  mexmemory = 50mb
  ```

- بر روی دکمه‌ی «نصب» کلیک کنید.

#### نصب با ویرایشگر YAML

در بخش ویرایشگر YAML کد زیر را وارد کنید و بر روی دکمه‌ی «نصب» کلیک کنید.

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

## دریافت و نصب گواهی کلاینت

از آنجا که برای استفاده از سامانه‌هایی که تحت لایه امنیتی قرار دارند، باید از گواهی کلاینت استفاده کنید؛ توصیه می گردد مراحل زیر را انجام دهید.

پس از دریافت اطلاعات ورود به کوبیت، هر کاربر باید گواهی کلاینت متناسب با سازمان خود دریافت و نصب کند.
در ادامه خلاصه این مراحل آمده است.([توضیحات بیشتر](../5.certman))

- ورود به سرتمن سازمان خود، به عنوان نمونه: `https://cert.kubit.ir/-/your-org`
- تکمیل ثبت نام در این سامانه که به صورت تایید شماره موبایل است را انجام دهید.([توضیحات بیشتر](../5.certman#complete-registeration))
- ورود به پنل سرتمن و دریافت گواهی کلاینت([توضیحات بیشتر](../5.certman#get-client-cert))
- نصب گواهی در مرورگر مورد نظر طبق [راهنمای نصب گواهی](../5.certman#installCertificate)

:::caution[توجه]
تمام مسئولیت استفاده از فایل Certificate و رمز آن با شماست. لذا به هیچ وجه آن را در اختیار سایرین قرار
ندهید.
:::
