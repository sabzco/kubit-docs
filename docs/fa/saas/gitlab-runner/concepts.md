# مفاهیم پیش‌نیاز

:::tip[مستندات]
برای اطلاعات جامع راجع به گیتلب و گیتلب‌رانر به صفحه [مستندات](https://docs.gitlab.com/) آن مراجعه کنید.
همچنین مستندات گیت از این [لینک](https://git-scm.com/doc) قابل دسترس است.
:::

با پیشرفت روش‌های توسعه نرم‌افزار، استفاده از **یکپارچه‌سازی مداوم** (Continuous Integration/CI) و **استقرار مداوم** (Continuous Developmment/CD) به‌طور فزاینده‌ای رایج شده است. این رویکردها با امکان **تکرار سریع** (Rapid Cycles)، تضمین **کیفیت کد** (Code Quality) و **استقرار یکپارچه** (Integrated Deployment)، به تیم‌های توسعه کمک می‌کنند تا نرم‌افزارهایی با کیفیت بالا و در مقیاس وسیع ارائه دهند.

در این میان، GitLab Runner نقشی کلیدی ایفا می‌کند؛ این ابزار وظیفه اجرای **پایپ‌لاین CI/CD** تعریف‌شده در فایل پیکربندی GitLab (.gitlab-ci.yml) را بر عهده دارد. GitLab Runner با خودکارسازی وظایفی مانند **بیلد** (Build)، **تست** و **استقرار** کد، به توسعه‌دهندگان اجازه می‌دهد بر نوشتن کد تمرکز کنند، بدون آن‌که درگیر پیچیدگی‌های فرآیندهای **استقرار** (Deployment) شوند.

به عنوان یک مثال فرض کنید می‌خواهید یک کد تمیز بزنید و نمی‌خواهید هر دفعه به صورت دستی چک کنید که آیا همه دستورالعمل های نام گذاری توابع درست اجرا شده‌اند؛ در این مواقع می‌توان از **گیتلب رانر** برای چک کردن این موارد استفاده کرد.

## Environment

یک **محیط** مرحله‌ای از توسعه را مشخص می‌کند؛ از آن برای مشخص کردن حدود اجرای یک **جاب** استفاده می‌شود. به عنوان نمونه **محیط** build ،test و deploy.

## CI/CD Jobs

یک **جاب** قطعه‌کدی برای **اجرا** (Execute) است که در یک **محیط** تعریف می‌شود و در آن **محیط** خاص اجرا خواهد شد.

## Runner

یک **رانر** در گیتلب **فرایندی** (Proccess) است که جاب های مختلف را اجرا می‌کند.

در ادامه یک فایل نمونه `gitlab-ci.yml.` به همراه توضیحات:

```yaml
stages:
  - build
  - test
  - deploy

build_job:
  stage: build
  script:
    - echo "Building the app..."
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist/

test_job:
  stage: test
  script:
    - echo "Running tests..."
    - npm test
  needs: [build_job]

deploy_staging:
  stage: deploy
  script:
    - echo "Deploying to staging..."
    - scp dist/* user@staging-server:/path/to/staging
    - ssh user@staging-server "restart-staging-service"
  environment:
    name: staging
    url: https://staging.example.com
  rules:
    - if: '$CI_COMMIT_BRANCH == "develop"'
```

یک رانر، فایل تعریف‌شده را اجرا می‌کند و بسته به محیط مشخص‌شده با تگ environment، جاب (Job) مربوطه را که با بخش script تعریف شده، به‌صورت خودکار آغاز می‌نماید. این امکان باعث می‌شود تا وظایف مختلف در مراحل متنوع توسعه (مثل تست، بیلد، استقرار و...) به‌صورت هدفمند و متناسب با مرحله مورد نظر اجرا شوند.
