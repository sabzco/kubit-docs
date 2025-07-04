# مدیریت سرویس زیرساخت

‌در صفحه زیرساخت پنل کوبیت، قادر خواهید بود ماشین‌های مجازی خود را ایجاد کنید و به **مدیریت ماشین‌های مجازی**، **کلیدهای SSH**، **سابنت‌ها**، **IPهای شناور**، **اسنپ‌شات‌ها** و **گروه‌های امنیتی**، دسترسی داشته باشید.

## اتصال پروژه به سرویس زیرساخت

- از طریق گزینه **همه‌ی‌ پروژه‌ها**، لیست پروژه‌های فعلی سازمان را باز کنید.
- از میان پروژه‌ها، پروژه موردنظر خود را انتخاب کنید.
- سپس خطای عدم اتصال پروژه ظاهر می‌شود. برای اتصال پروژه، روی دکمه **اتصال** کلیک کنید.
- مکان موردنظر خود را از میان مکان‌های موجود در کوبیت انتخاب کرده و روی **اتصال** کلیک کنید.
  ![IaaS: empty project list](img/empty-project-list.png)
  ![IaaS: project lists](img/project-lists.png)
  ![IaaS: bind project](img/bind-project.png)
  ![IaaS: locations list](img/locations-list.png)

در انتها، پروژه به سرویس زیرساخت متصل شده و به صفحه ماشین‌های مجازی پروژه هدایت می‌شوید:
![IaaS: after binding project](img/after-binding-project.png)

:::info[تنظیمات پیش‌فرض پروژه پس از اتصال]
پس از اتصال پروژه به زیرساخت، مقادیر **ساب‌نت**، **IP شناور** و **گروه امنیتی** پیش‌فرض نیز برای آن تنظیم می‌شود.

در صورتی که پیش از این در سازمان فعلی مقادیر بالا به صورت مشترک در سازمان ایجاد شده باشند، از آن مقادیر برای پروژه جدید استفاده می‌شود و در غیر این صورت، مقادیر جدید برای پروژه جدید ساخته می‌شود.
:::

## انتخاب پروژه{#select-project}

در صفحه اول سرویس، لیستی از پروژه‌های متصل قابل مشاهده است. ابتدا باید پروژه موردنظر را از میان این لیست انتخاب کنید:
![IaaS: select projects](img/select-project.png)

در انتها به صفحه ماشین‌های مجازی هدایت خواهید شد.

### لیست ماشین‌های مجازی

پس از انتخاب پروژه، به صفحه ماشین‌های مجازی آن پروژه هدایت می‌شوید. در این لیست، اطلاعاتی از هر ماشین قابل نمایش است که در ادامه به شرح و عملکرد آنها می‌پردازیم.

- **وضعیت**: نمایش وضعیت خاموش/روشن بودن ماشین با رنگ خاکستری/سبز
- **نام و مشخصات**: نمایش نام ماشین به همراه، اندازه ماشین و دیسک
- **سیستم عامل**: نمایش نام و نسخه سیستم عامل ماشین
- **IP** **عمومی**: نمایش IPهای عمومی تنظیم شده برای ماشین
- **برچسب‌ها**: نمایش برچسب‌های ماشین
- **عملیات**: دسترسی به خاموش/روشن کردن، هدایت به کنسول، راه‌اندازی مجدد، ویرایش نام، تغییر اندازه، قطع برق، پاک کردن
  ![IaaS: vms list](img/vms-list.png)

برای مطالعه و توضیحات بیشتر، به سند [ماشین‌های مجازی](../vms) مراجعه کنید.

:::tip[ساخت پروژه]
همچنین اگه تمایل به ایجاد پروژه جدید دارید، می‌توانید از طریق گزینه **ایجاد پروژه جدید** اقدام کنید:
سپس **عنوان** و **کلید** پروژه را وارد کرده و روی **ایجاد** کلیک کنید:
![IaaS: new project](img/new-project.png)
![IaaS: create project form](../organization/img/create-project-form.png)
:::

## قطع اتصال پروژه

- برای قطع اتصال پروژه از سرویس زیرساخت، می‌توانید از آیکون قطع اتصال روی کارت پروژه موردنظر اقدام کنید.
- سپس در صورت اطمینان، روی دکمه **تایید** دیالوگ باز شده کلیک کنید.
  ![IaaS: unbind project](img/unbind-project.png)
  ![IaaS: confirm unbind project](img/confirm-unbind-project.png)

## کارها

دکمه پایین صفحه زیرساخت، دسترسی سریع به لیستی از کارهای انجام شده/در حال انجام فراهم می‌کند. در صورت وجود کار جاری، وضعیت آن را نشان داده و در غیر این صورت، وضعیت آخرین کار انجام شده را نمایش می‌دهد.

:::tip[کارها در سطوح مختلف]
کارها در دو سطح مختلف **پروژه** و **ماشین** وجود دارند. متناسب با صفحه‌ای که در آن هستید، می‌توانید به کارهای همان صفحه و سطح دسترسی پیدا کنید.
:::

![IaaS: jobs btn](img/jobs-btn.png)
![IaaS: jobs list](img/jobs-list.png)

- نمونه کارها
  ![IaaS: full jobs list](img/full-jobs-list.png)
