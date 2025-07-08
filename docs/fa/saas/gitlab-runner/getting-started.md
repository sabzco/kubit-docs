# شروع کار با گیتلب‌رانر

برای **ایجاد** و **اتصال** **رانر** جدید به مخزن خود پس از ایجاد یک مخزن [گیتلب](../../gitlab/getting-started) از طریق صفحه نصب ابرافزار اقدام کنید. (می‌توانید از این ابرافزار برای خودکارسازی فرایندهای CI\CD در مخزن‌های دیگر نیز استفاده کنید.)

پیش از شروع **آدرس مخزن**، **گروه** و همچنین **توکن** مخزنی که می‌خواهید رانر روی آن فعال باشد را بردارید.

### آدرس مخزن یا گروه

وارد [پنل گیتلب](../../gitlab/getting-started) شده و از مروگر خود این آدرس را پیدا کنید یا به صورت دستی آن را وارد کنید. فرمت آن به این صورت است:

`gitlab.example.com/YourRepoName/YourProjectOrGroupName`

![Install App: gitlab-runner-group-selecet](../img/gitlab-runner-group-select.png)

### توکن

از طریق بخش **Build** و روی گزینه **Runners** کلیک و یک راننر جدید بسازید.

![Install App: gitlab-runner-tab](../img/gitlab-runner-tab.png)
![App Insatall: gitlab-runner-new-btn](../img/gitlab-runner-new-btn.png)
مشخصات رانر خود را مطابق نیاز وارد کنید.
![App Insatall: gitlab-runner-new](../img/gitlab-runner-new-runner.png)
پس از ایجاد رانر، از این قسمت توکن را بردارید.
![App Insatall: gitlab-runner-new](../img/gitlab-runner-new-runner1.png)
![App Insatall: gitlab-runner-new](../img/gitlab-runner-new-runner2.png)

### نصب ابرافزار

در صفحه شروع نصب نرم‌افزار جدید را انتخاب کنید.
![App Install: gitlab-runner-install](../img/gitlab-runner-install.png)
سپس **نام** (slug) رانر خود را وارد کنید.
اگر می‌خواهید مقدار حجم را خود انتخاب کنید، از قسمت مشخص شده، حجمی از مضرب پنج و بیشتر از پلن فعلی خود مقدار دهید.

![App Insatall: gitlab-runner-specs](../img/gitlab-runner-spec.png)

آدرس **مخزن** متصل به رانر را در صفحه نمای کلی می‌بینید.
![App Insatall: gitlab-runner-overview](../img/gitlab-runner-overview.png)

:::info[تغییر پلن]
با انتخاب تغییر پلن دوباره به صفحه پلن‌ها می‌روید و با انتخاب پلن جدید و پرداخت مابه‌تفاوت پلن شما تغییر خواهد کرد.

![Install App: gitlab-plan-change](../img/gitlab-plan-change.png)

:::

در پنل خود می‌توانید لیست رانرهای موجود را ببینید و آن‌ها را متوقف کرده، ویرایش و یا حذف کنید.

![App Insatall: gitlab-runner-runner-options](../img/gitlab-runner-runner-options.png)

همچنین برای ساخت رانر جدید می‌توانید از بخش `Settings > CI/CD` هم اقدام کنید.

![App Insatall: gitlab-runner-add-new](../img/gitlab-runner-add-new.png)

### اجرای یک نمونه جاب

پس از ایجاد رانر برای اجرای یک جاب CI در مخزن خود یک فایل با نام `yml` ایجاد کنید.

![App Insatall: gitlab-runner-ci](../img/gitlab-runner-newci.png)

اسکریپت خود را در آن کپی کنید.

![App Insatall: gitlab-runner-ci](../img/gitlab-runner-newci-sample.png)

حال از بخش Build میتوانید **پایپ‌لاین** خود و **استیجی** (مرحله) که در آن است و نحوه اجرای آن را ببینید.

![App Insatall: gitlab-runner-specs](../img/gitlab-runner-pipeline.png)

گراف **پایپ‌لاین**:

![App Insatall: gitlab-runner-pipeline-graph](../img/gitlab-runner-pipeline-graph.png)

وضعیت (Status) هر **رانر**:

![App Insatall: gitlab-runner-status](../img/gitlab-runner-stages.png)

:::info[حذف ابرافزار]
برای حذف نرم‌افزار اَبری از طریق پنل، روی آیکون گزینه ها کلیک کرده سپس حذف را بزنید.

![Delete App: gitlab-delete](../img/gitlab-delete.png)
![Delete App: gitlab-delete-confirm](../img/gitlab-delete-confirm.png)
:::

:::warning[حذف دائم از سرورها]

\*پس از حذف، هر برنامه بین یک تا سه روز در صف حذف برای همیشه از سرور قرار می‌گیرد و شما می‌توانید طی این مدت اقدام به بازگردانی آن کنید.

![Delete App: gitlab-recovery](../img/gitlab-recovery.png)
![Delete App: gitlab-recovery-confirm](../img/gitlab-recovery-confirm.png)
![Delete App: gitlab-reactivated](../img/gitlab-reactivated.png)

:::
