# مدیریت فضاها

در این صفحه، چارت گزارش از وضعیت فضای ذخیره‌سازی سازمان شامل **تعداد باکت‌ها**، **حجم فضای استفاده شده**، **ترافیک آپلود** و **ترافیک دانلود** به همراه **لیست فضاهای سازمان** (فضاهای پروژه انتخاب شده و فضاهای مشترک در سازمان) وجود دارد.

از صفحه سرویس باکت‌ها، پس از [انتخاب یک پروژه متصل](../bucket-settings#select-project)، روی **فضاها** کلیک کنید:
![Create Space: spaces](spaces.png)

همانطور که مشاهده می‌کنید، در صفحه فضاها چارت گزارش در بازه‌های زمانی مختلف وجود دارد:
![Create Space: space page](space-page.png)

## لیست فضاها

لیست فضاهای پروژه انتخاب شده، در انتهای صفحه نیز قابل مشاهده می‌باشد. در این لیست اطلاعاتی شامل **مکان**، **اندازه** و **مشترک در سازمان** به ازای هر فضا، وجود دارد:
![Create Space: space page](spaces-list.png)

## تنظیمات فضا

با کلیک روی نام هر فضا، به صفحه جزئیات آن شامل **نمای کلی** (چارت گزارش و باکت‌ها) و مدیریت **دسترسی‌ها** هدایت خواهید شد.

### نمای کلی

چارت گزارش:
![Create Space: space details](space-details.png)

لیست باکت‌های فضا:
![Create Space: space details 2](space-details-2.png)

با کلیک روی نام هر باکت، به صفحه [مرورگر باکت](../bucket#bucket-browser) هدایت خواهید شد:
![Create Space: bucket overview](bucket-details.png)

### مدیریت دسترسی‌ها

از منوی سمت راست صفحه جزئیات یک فضا، روی گزینه **دسترسی‌ها** کلیک کنید:
![Create Space: space access management](space-access-managemet.png)

در این صفحه، به **کلیدهای دسترسی به فضا** و **لیست سرویس اکانت‌ها** دسترسی خواهید داشت:
![Create Space: space access details](space-access-details.png)

#### سرویس اکانت‌ها

در این بخش، لیست سرویس اکانت‌های موجود به همراه اطلاعاتی چون **نام**، **وضعیت دسترسی در فضا**، **نام فضا** و **مشترک در سازمان** و امکان **ساخت سرویس اکانت جدید** وجود دارد.

##### ساخت سرویس اکانت جدید

برای ساخت سرویس اکانت برای این فضا، روی دکمه **ساخت سرویس اکانت جدید** کلیک کنید:
![Create Space: new service account](new-space-service-account.png)

**نام** را وارد کرده و نوع **دسترسی** را نیز انتخاب کنید:
![Create Space: new service account form](new-space-service-account-form.png)
![Create Space: new sa access list](new-space-sa-access-list.png)

در صورت تمایل برای به اشتراک گذاری سرویس اکانت در سطح سازمان، گزینه **مشترک در سازمان** را انتخاب کرده و روی **ایجاد** کلیک کنید:
![Create Space: create new sa](create-new-space-sa.png)
سرویس اکانت با سطح دسترسی تعریف شده برای فضای انتخاب شده، ساخته می‌شود.

در ستون عملیات و از طریق دکمه سه نقطه، لیستی از عملیات‌های موجود برای هر سرویس اکانت وجود دارد:
![Create Space: service account options](space-service-account-options.png)

##### عملیات‌های سرویس اکانت

###### نمایش کلیدها

- ابتدا روی گزینه **نمایش کلیدها** کلیک کنید.
- در انتها پنجره‌ای حاوی کلیدهای Access Key و Secret Key نمایش داده می‌شود.
  ![Create Space: display sa keys](display-sa-keys.png)
  ![Create Space: display sa keys 2](display-sa-keys-2.png)

###### ویرایش سطح دسترسی

- ابتدا روی گزینه **ویرایش سطح دسترسی** کلیک کنید.
- سپس از لیست دسترسی‌ها، دسترسی موردنظر خود را انتخاب کنید.
- در انتها برای ویرایش سطح دسترسی روی **به‌روزرسانی سطح دسترسی** کلیک کنید.
  ![Create Space: edit sa level](edit-sa-access-level.png)
  ![Create Space: edit sa level 2](edit-sa-access-level-2.png)
  ![Create Space: edit sa level 3](edit-sa-access-level-3.png)
  ![Create Space: edit sa level 4](edit-sa-access-level-4.png)

###### ایجاد دوباره کلیدها

این عملیات، کلیدهای فعلی سرویس اکانت را باطل کرده و کلیدهای جدید را جایگزین آنها می‌کند.

- ابتدا روی گزینه **ایجاد دوباره کلیدها** کلیک کنید.
- در صورت اطمینان برای انجام این عملیات، روی گزینه **ایجاد دوباره‌ی کلیدها** کلیک کنید.
  ![Create Space: regenerate sa keys](regenerate-sa-keys.png)
  ![Create Space: regenerate sa keys 2](regenerate-sa-keys-2.png)

###### حذف سرویس اکانت

- ابتدا روی گزینه **حذف سرویس اکانت** کلیک کنید.
- در صورت تمایل برای حذف سرویس اکانت از باکت‌ها نیز، گزینه **پاک کردن سرویس اکانت از باکت‌های این فضا** را انتخاب کنید.
- در انتها برای انجام عملیات حذف، برای گزینه **پاک کردن سرویس اکانت** کلیک کنید.
  ![Create Space: remove sa](remove-space-sa.png)
  ![Create Space: remove sa 2](remove-space-sa-2.png)

## حذف فضا

- برای حذف فضا، کافیست روی دکمه سه نقطه فضای مربوطه کلیک کرده و گزینه **پاک کردن فضا** را انتخاب کنید.
- سپس با کلیک روی **پاک کردن**، فضا را حذف کنید.
  ![Create Space: remove space](remove-space.png)
  ![Create Space: confirm remove space](confirm-remove-space.png)
