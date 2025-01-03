# شروع به کار

در بخش باکت‌های پنل کوبیت، دسترسی به **باکت‌ها** و **فضاها** فراهم شده است.
همانطور که در [مفاهیم پایه](../#concepts) ذکر شد، باکت‌ها با فضا و فضاها با پروژه‌ها معنی پیدا می‌کنند. بنابراین، باکت‌های یک سازمان توسط پروژه‌ها تفکیک می‌شوند. برای شروع کار با باکت‌ها، ابتدا باید یکی از پروژه‌هایی که قبلا در قسمت [سازماندهی](../../organize) ساخته‌اید را به این سرویس متصل کنید، یا یکی از پروژه‌های متصل به باکت را انتخاب کنید.

ابتدا از پنل کوبیت، وارد سرویس **باکت‌ها** شوید:
![Buckets: bucket](img/bucket.png)

## اتصال پروژه به سرویس باکت{#bind-project}

- از طریق گزینه **همه‌ی‌ پروژه‌ها**، لیست پروژه‌های فعلی سازمان را باز کنید.
- از میان پروژه‌ها، پروژه موردنظر خود را انتخاب کنید.
- سپس خطای عدم اتصال پروژه ظاهر می‌شود. برای اتصال پروژه، روی دکمه **اتصال** کلیک کنید.

![Buckets: empty project list](img/empty-project-list.png)
![Buckets: project lists](img/project-lists.png)
![Buckets: bind project](img/bind-project.png)

در انتها، پروژه به سرویس باکت متصل شده و به صفحه باکت‌های پروژه هدایت می‌شوید.

## انتخاب پروژه{#select-project}

در صفحه اول سرویس، لیستی از پروژه‌های متصل قابل مشاهده است. ابتدا باید پروژه موردنظر را از میان این لیست انتخاب کنید:
![Buckets: select project](img/select-project.png)

پس از انتخاب پروژه، به صفحه لیست باکت‌های پروژه، هدایت می‌شوید:
![Buckets: buckets chart](img/buckets_1.png)

برای دریافت چارت‌های باکت در بازه‌های زمانی مختلف، می‌توانید روی گزینه **فیلتر** کلیک کنید:
![Buckets: filter chart btn](img/filter-chart-btn.png)

سپس بازه زمانی موردنظر خود را انتخاب کنید تا چارت‌ها بر اساس بازه انتخاب شده به‌روزرسانی شوند:
![Buckets: filter chart options](img/filter-chart-options.png)

در انتهای صفحه نیز، لیست باکت‌های پروژه و مشترک در سازمان وجود دارد:
![Buckets: buckets list](img/buckets_2.png)

برای توضیحات بیشتر به مستندات [مدیریت باکت‌ها](../bucket) و [مدیریت فضاها](../space) مراجعه کنید.

:::tip[ساخت پروژه]
همچنین اگه تمایل به ایجاد پروژه جدید دارید، می‌توانید از طریق گزینه **ایجاد پروژه جدید** اقدام کنید:
![Buckets: new project](img/new-project.png)
سپس **عنوان** و **کلید** پروژه را وارد کرده و روی **ایجاد** کلیک کنید:
![Buckets: create project form](../organize/img/create-project-form.png)
:::

## قطع اتصال پروژه

:::warning[عدم قطع اتصال]
در صورتی که منابع و داده‌هایی در باکت‌های پروژه وجود داشته باشند، امکان قطع اتصال پروژه از سرویس باکت وجود ندارد.
:::

- برای قطع اتصال پروژه از سرویس باکت، می‌توانید از آیکون قطع اتصال روی کارت پروژه موردنظر اقدام کنید.
- سپس در صورت اطمینان، روی دکمه **تایید** دیالوگ باز شده کلیک کنید.
  ![Buckets: unbind project](img/unbind-project.png)
  ![Buckets: conform unbind project](img/confirm-unbind-project.png)
