# مستند فنی: اپلیکیشن Python با پایگاه‌های داده‌ Redis و PostgreSQL در کوبیت کلاود

این مستند نحوه استفاده از Redis و PostgreSQL را در بستر ابری کوبچی و ایجاد یک API وب با کارایی بالا و ماندگاری داده‌ها توضیح می‌دهد. هدف این است که تعادل بین سرعت (Redis) و قابلیت اطمینان (PostgreSQL) در یک سرویس وب ساده، مانند یک endpoint `/ping`، نشان داده شود. این مستند برای توسعه‌دهندگان و معماران سیستمی که به دنبال درک معماری‌ها و راه‌حل‌های مدرن ابری هستند، طراحی شده است.

## معماری سیستم

### نمای کلی

سیستم از یک API مبتنی بر Flask تشکیل شده است که با یک نمونه Redis مدیریت‌شده برای کش کردن و یک پایگاه داده PostgreSQL مدیریت‌شده برای ذخیره‌سازی دائمی داده‌ها تعامل دارد. این معماری از سرعت Redis برای پاسخ‌های سریع و قابلیت اطمینان PostgreSQL برای ماندگاری داده‌ها بهره می‌برد.

### دیاگرام معماری

```
                     |→ Redis (حافظه نهان پرسرعت)
Client → API Flask --|
                     |→ PostgreSQL (پایگاه داده ذخیره اصلی)
```

### اجزای اصلی

- **Flask API**: نقطه ورود برای درخواست‌های کاربران، که منطق برنامه را مدیریت می‌کند.
- **Redis**: ذخیره کلید-مقدار در حافظه برای دسترسی سریع به داده‌های کش‌شده.
- **PostgreSQL**: پایگاه داده رابطه‌ای برای ذخیره‌سازی دائمی و تراکنش‌های مطابق با استاندارد ACID.
- **Sentry**: ابزار نظارت برای ثبت خطاها و لاگ‌های عملکرد.

### ساختار فایل پروژه

```
- project_root/
  - sample_app/
	  - app.py
	  - requirements.txt
	  - Dockerfile
  - .gitlab-ci.yml
  - README.md
```

این ساختار شامل:

- **`sample_app/`**: این دایرکتوری تمام کدهای برنامه اصلی را در خود جای می‌دهد:

  1.  **`app.py`**: این فایل کد اصلی اپلیکیشن شما را در خود دارد.
  2.  **`requirements.txt`**: این فایل لیست کتابخانه‌های پایتون مورد نیاز برنامه را در خود جای داده است.
  3.  **`Dockerfile`**: این فایل شامل دستورالعمل‌های لازم برای ساخت **ایمیج داکر** از این برنامه است.

- **`.gitlab-ci.yml`**: این فایل مهم‌ترین بخش برای CI/CD است و به GitLab می‌گوید چگونه مراحل ساخت، تست و استقرار را اجرا کند.

- **`README.md`**: این فایل حاوی توضیحات پروژه و راهنمایی برای توسعه‌دهندگان است.

## آماده‌سازی و پیکربندی

### پیش‌نیازها

- پلتفرم کوبچی (PaaS) که از Redis و PostgreSQL پشتیبانی می‌کند
- محیط پایتون با کتابخانه‌های `Flask`، `redis-py`، و `psycopg2`
- اپلیکیشن مدیریت نسخه GitLab (اَبرافزار مدیریت شده توسط کوبیت کلاود)
- اپلیکیشن GitLab Runner برای مدیریت پایپ‌لاین‌های CI/CD (‏اَبرافزار مدیریت شده توسط کوبیت کلاود)
- اپلیکیشن مدیریت مخزن ایمیج‌‌های داکر یا داکر رجیستری (Docker Registry) (اَبرافزار مدیریت شده توسط کوبیت کلاود)
- اپلیکیشن Sentry برای نظارت بر خطاها (اَبرافزار مدیریت شده توسط کوبیت کلاود).
  :::info[نصب ابرافزارهای لازم]
  برای اطلاع از ابرافزارهای ارائه شده در کوبیت [این مستند](../saas) را ببینید.
  لینک مستندات ابرافزارهای ارائه شده:
- [ابرافزار گیتلب](../saas/gitlab)
- [ابرافزار گیتلب رانر](../saas/gitlab-runner)
- [ابرافزار داکر رجیستری](../saas/docker)
- [ابرافزار Sentry](../saas/sentry)
  :::
- یک دامنه به مالکیت شما (مثلاً `yourdomain.com`)
- دسترسی به پنل مدیریت DNS آن دامنه تا بتوانید رکوردهای لازم برای اتصال به سرویس خود را (مثلاً یک A Record) تنظیم کنید.

### پیکربندی Redis و PostgreSQL

:::info[نصب پک]

برای نصب پک از [این لینک](../kubchi/getting-started) اقدام کنید و همچنین اگر بدنبال راه‌حل‌های دسترسی پذیری بالا (High Availability یا HA) هستید، [مستند PostgresHA](../postgresqlha) یا RedisHA را ببینید.

:::

هر دو سرویس پایگاه‌داده از طریق پنل کوبچی از طریق نصب پک راه‌اندازی می‌شوند. نمونه‌ای از پیکربندی پک PostgreSQL در قالب YAML برای یک محیط مبتنی بر Kubernetes:

```yaml
apiVersion: k8s.kubit.ir/v1alpha1
kind: Pack
metadata:
  name: postgres
  namespace: base
spec:
  chart:
    name: postgres
  values:
    persistence:
      size: '1Gi'
    envs:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
```

Redis به‌طور مشابه با متغیرهای محیطی برای URI اتصال و تنظیمات TLS پیکربندی می‌شود.

### منطق اصلی اپلیکیشن: الگوی کشینگ با Redis و PostgreSQL

اندپوینت (`/ping`) در این برنامه، الگوی رایج **"Cache-Aside"** را پیاده‌سازی می‌کند تا عملکرد را بهینه‌سازی کند. این الگو بر اساس دو گام اصلی و یک گام افزوده نظارتی کار می‌کند:

1. **بررسی کش (Cache Hit)**: وقتی درخواستی به `/ping` می‌رسد، ابتدا با استفاده از Redis، کش بررسی می‌شود. اگر داده مورد نظر (در اینجا وضعیت آخرین `ping`) در Redis یافت شود، مستقیماً از آنجا برگردانده شده و درخواست بدون نیاز به دسترسی به دیسک یا پردازش‌های پایگاه داده، با کمترین تأخیر (latency) پاسخ داده می‌شود. این سناریو به عنوان **"Cache Hit"** شناخته می‌شود.
2. **دریافت از پایگاه داده و کش کردن (Cache Miss)**: در صورتی که داده مورد نظر در Redis موجود نباشد (سناریوی **"Cache Miss"**)، برنامه عملیات مورد نیاز را در پایگاه داده اصلی PostgreSQL انجام می‌دهد. پس از موفقیت‌آمیز بودن عملیات (مثلاً ثبت یک تراکنش)، پاسخ آن در Redis **کش** می‌شود. این داده کش‌شده با یک **زمان انقضا (`TTL`)** مشخص (برای مثال ۶۰ ثانیه) ذخیره می‌شود تا از کهنه شدن اطلاعات جلوگیری شود. درخواست‌های بعدی تا زمان انقضای کش، از Redis سرویس‌دهی خواهند شد.

3. **نظارت فعال با Sentry**: استفاده از Sentry به عنوان یک ابزار **مانیتورینگ خطا** بسیار حیاتی است. با ادغام Sentry SDK در برنامه، هرگونه خطای ناشناخته یا استثنا (exception) در زمان اجرا، مانند مشکلات اتصال به Redis یا PostgreSQL، به سرعت ثبت و به تیم توسعه‌دهنده گزارش می‌شود. این کار به شناسایی و رفع مشکلات قبل از تأثیرگذاری گسترده بر کاربران کمک می‌کند.

این رویکرد با **کاهش فشار روی پایگاه داده**، **بهبود چشمگیر زمان پاسخ‌دهی** و **استفاده از نظارت منظم** به مقیاس‌پذیری و کارایی و پایداری سیستم کمک می‌کند.

#### کد نمونه و فایل‌های وابسته‌ی اپلیکیشن قابل اجرا به زبان Python

کد اپلیکیشن `app.py`:

```python
import os
import logging
from flask import Flask, jsonify
import sentry_sdk
import redis
import psycopg2
from datetime import datetime
# --- 1. Configuration (simulating config.py) ---
# Load configuration from environment variables.
# The application will not start if a required variable is missing.
CONFIG = {
    'SENTRY_DSN': os.getenv('SENTRY_DSN'),
    'REDIS_URI': os.getenv('REDIS_URI'),
    'POSTGRES_URI': os.getenv('POSTGRES_URI')
}
# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
# Verify that all required environment variables are set
for key, value in CONFIG.items():
    if not value:
        error_message = f"❌ Required environment variable '{key}' not set. Exiting."
        logger.error(error_message)
        # In a real app, you might raise an exception here to stop execution
        # raise ValueError(error_message)
        # For this example, we'll just log and continue to show the error state.
# --- 2. Service Initialization (simulating database.py and redis.py) ---
# Sentry initialization
try:
    if not CONFIG['SENTRY_DSN']:
        raise ValueError("Sentry DSN not found in environment variables.")
    sentry_sdk.init(
        dsn=CONFIG['SENTRY_DSN'],
        traces_sample_rate=1.0
    )
    logger.info("✅ Successfully connected to Sentry.")
except Exception as e:
    logger.error("❌ Failed to connect to Sentry.")
    sentry_sdk.capture_exception(e)
# Redis initialization
redis_client = None
try:
    if not CONFIG['REDIS_URI']:
        raise ValueError("Redis URI not found in environment variables.")
    redis_client = redis.Redis.from_url(CONFIG['REDIS_URI'], decode_responses=True)
    redis_client.ping()
    logger.info("✅ Successfully connected to Redis.")
except (ValueError, redis.RedisError) as e:
    logger.error("❌ Failed to connect to Redis.")
    sentry_sdk.capture_exception(e)
# PostgreSQL initialization
try:
    if not CONFIG['POSTGRES_URI']:
        raise ValueError("PostgreSQL URI not found in environment variables.")
    conn = psycopg2.connect(CONFIG['POSTGRES_URI'])
    conn.close()
    logger.info("✅ Successfully connected to PostgreSQL.")
except (ValueError, psycopg2.Error) as e:
    logger.error("❌ Failed to connect to PostgreSQL.")
    sentry_sdk.capture_exception(e)
# A simplified database function for demonstration
def log_ping_db():
    """Logs a ping to the database (placeholder)."""
    if 'POSTGRES_URI' in CONFIG:
        logger.info("Logging ping to PostgreSQL...")
# --- 3. Flask Application Setup (simulating main.py) ---
app = Flask(__name__)
# A basic route that demonstrates the flow
@app.route('/ping')
def ping():
    """
    A simple endpoint that logs a ping and sets a Redis cache.
    """
    try:
        log_ping_db()
        if redis_client:
            redis_client.set('last_ping', str(datetime.utcnow()), ex=60)
            logger.info("Set 'last_ping' in Redis cache.")
        return jsonify({"message": "Ping received and processed."})
    except Exception as error:
        sentry_sdk.capture_exception(error)
        return jsonify({"error": "An error occurred."}), 500
# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

فایل کتابخانه‌ها و وابستگی‌های لازم `requirments.txt`:

```txt
flask==2.2.5
werkzeug==2.2.3
redis==4.0.2
psycopg2-binary==2.9.3
sentry-sdk[flask]==1.9.0
```

فایل `Dockerfile` برای ساخت کانتینر ایمیج اپلیکیشن:

```Dockerfile
FROM python:3.9-slim

WORKDIR /sample_app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py .
EXPOSE 5000
CMD ["python", "app.py"]
```

### آماده سازی برای استقرار با استفاده از GitLab و Docker Registry

برای آماده‌سازی استقرار با استفاده از **GitLab** با **GitLab Runner** و **Docker Registry**، ابتدا برای اتصال باید تنظیمات GitLab و Docker Registry برقرار کنید. این فرآیند به شما امکان می‌دهد تا از طریقGitLab Runner به صورت خودکار ایمیج‌های داکر را بسازید و در Registry ذخیره کنید.

### ۱. اتصال GitLab Runner به GitLab

**GitLab Runner** برنامه‌ای است که jobهای موجود در فایل `gitlab-ci.yml` را اجرا می‌کند. این برنامه روی یک سرور مجزا (چه در محیط‌های ابری، چه روی سرورهای محلی) نصب می‌شود و به صورت مداوم منتظر دستور از گیت‌لب می‌ماند.

پس از Push کردن کد به مخزن، GitLab به رانر اطلاع می‌دهد که یک job جدید برای اجرا دارد. رانر سپس job را دریافت کرده، محیط آن را فراهم می‌کند (برای مثال، ایمیج داکر را می‌سازد) و دستورات شما را خط به خط اجرا می‌کند.

**مراحل کلی**:

1. **نصب رانر**: ابتدا باید رانر را روی یک سرور نصب کنید.
2. **ثبت (Register) رانر**: پس از نصب، رانر باید در پروژه یا گروه شما در گیت‌لب **ثبت** شود تا گیت‌لب بتواند از آن برای اجرای jobها استفاده کند.
3. **فعال‌سازی رانر**: پس از ثبت، رانر آماده به کار است.

بدون یک رانر فعال، حتی اگر فایل `gitlab-ci.yml` را به درستی تنظیم کرده باشید، پایپ‌لاین شما هرگز اجرا نخواهد شد. بنابراین، نصب و فعال‌سازی رانر **اولین گام** در راه‌اندازی فرآیند CI/CD است.

### ۲. اتصال به GitLab و ذخیره کد و فایل‌های پروژه در آن

برای اتصال به گیتلب از جمله ابرافزار گیتلب کوبیت دو راه کلی امن و توصیه شده وجود دارد.

#### روش اول: استفاده از کلید SSH

این روش برای دسترسی از طریق **خط فرمان** بسیار رایج و امن است.

1. **ساخت کلید SSH**: ابتدا یک جفت کلید SSH می‌سازید.
2. **افزودن کلید به GitLab**: کلید عمومی خود را کپی کرده و در **Settings > SSH Keys** در GitLab جای‌گذاری می‌کنید.
3. **استفاده از SSH برای Cloning**: از این پس، برای دستوراتی مثل `git clone`، `git pull` و `git push` به صورت خودکار با SSH احراز هویت می‌شوید.

   ```bash
   git clone git@gitlab.com:your-username/your-project.git
   ```

#### روش دوم: استفاده از توکن‌های دسترسی شخصی (Personal Access Tokens)

این روش برای احراز هویت در محیط‌های **خودکارسازی (CI/CD)** و ابزارهای شخص ثالث، بهترین گزینه است.

1. **ساخت توکن در GitLab**: در **Profile Settings > Access Tokens** یک توکن جدید با نام و دسترسی‌های مورد نیاز (مثلاً `read_repository` و `write_repository`) ایجاد می‌کنید.
2. **استفاده از توکن**: از این توکن به جای رمز عبور استفاده می‌کنید. توجه داشته باشید که این توکن می‌تواند در تاریخچه ترمینال ذخیره شود، بنابراین بهتر است آن را به صورت یک **متغیر CI/CD** در GitLab ذخیره کنید.

```bash
    git clone https://<your_username>:<your_token>@gitlab.com/<your_username>/<your_project>.git
```

### تنظیم متغیرهای CI/CD در GitLab

این مرحله تنها یک بار برای هر پروژه انجام می‌شود و به **GitLab Runner** اجازه می‌دهد:

- با **Docker Registry** شما از طریق متغیرهای مربوط به احراز هویت ارتباط برقرار کند.
- از طریق وب‌هوک و با تنظیم متغیرهای محیطی لازم، **به صورت امن با کوبیت ارتباط بگیرد**. این کار به Runner اجازه می‌دهد تا در مراحل بعدی، اطلاعات لازم را برای استقرار برنامه به کوبیت ارسال کند.

#### نحوه تنظیم متغییرهای لازم برای اتصال به رجیستری در GitLab

در تنظیمات پروژه GitLab خود، به بخش Settings > CI/CD > Variables بروید. در آنجا، می‌توانید سه متغیر زیر را تعریف کنید:

- **`CI_REGISTRY`**: آدرس **Registry** داکر شما. در اینجا، آدرس Registry مدیریت‌شده توسط کوبیت را وارد کنید.
-
- `CI_REGISTRY_USER`: نام کاربری شما برای دسترسی به Registry.

- `CI_REGISTRY_PASSWORD`: توکن یا رمز عبور Registry شما.
  برای خودکارسازی مرحله استقرار ایمیج از طریق **GitLab CI/CD**، لازم است متغیرهای اتصال به **کوبیت** از طریق **Webhook** را تنظیم کنید. این متغیرها به CI/CD شما اجازه می‌دهند تا به صورت امن، اطلاعات لازم برای استقرار ایمیج جدید را به کوبیت ارسال کند.

#### تنظیم متغیرهای وب‌هوک

این متغیرها نیز باید به عنوان **Variables** در پروژه GitLab شما تعریف شوند. شما می‌توانید مقادیر آن‌ها را از پنل کوبیت، در بخش **Packs > \[پک مورد نظر] > CI/CD** دریافت کنید.

1. در GitLab، به **Settings > CI/CD > Variables** بروید.
2. متغیرهای زیر را با مقادیری که از پنل کوبیت دریافت کرده‌اید، تعریف کنید:

| نام متغیر (Variable)      | مقدار نمونه (Sample Value)                                          |
| ------------------------- | ------------------------------------------------------------------- |
| **`KUBIT_WEBHOOK_TOKEN`** | `2e97185aa35b3cfbc07613378` (توکن شما)                              |
| **`KUBIT_WEBHOOK_URL`**   | `https://api.kubit.cloud/api/core/packs/p6/vars/` (آدرس وب‌هوک شما) |

پس از تنظیم این متغیرها، پایپ‌لاین CI/CD شما می‌تواند از طریق `curl`، با استفاده از این توکن و URL، اطلاعات مربوط به ایمیج جدید را به کوبیت ارسال کرده و فرآیند استقرار را به صورت خودکار آغاز کند.

### ۴. بخش اول خودکارسازی با GitLab CI/CD: ساخت و push ایمیج

:::info[قابلیت CI/CD کوبچی]

برای استفاده از این قابلیت و امکانات جانبی آن و همچنین دریافت تمپلیت نمونه، [این مستند](../kubchi/conint) را مطالعه کنید.

:::

پس از اتصال Runner، شما یک فایل **`.gitlab-ci.yml`** در دایرکتوری ریشه (root) پروژه خود ایجاد می‌کنید. این فایل به GitLab می‌گوید که چگونه فرآیند **CI/CD** را اجرا کند. هر بار که کد را از **مخزن محلی (Local Repository)** به **مخزن اصلی (Remote Repository)** **پوش** می‌کنید، GitLab به صورت خودکار یک **pipeline** را اجرا می‌کند.

این پایپ‌لاین شامل دستوراتی برای ساخت ایمیج داکر، تگ‌گذاری آن و ارسال به Docker Registry است. یک نکته، استفاده از **تگ‌های خودکار** بر اساس آخرین نسخه کد (در اینجا متغییر `CI_COMMIT_SHORT_SHA`) است. این کار تضمین می‌کند که هر ایمیج به یک نسخه مشخص و قابل ردیابی از کد شما مرتبط باشد.

این فرآیند به صورت کاملاً خودکار است؛ شما فقط کد را از گیت Push می‌کنید و GitLab بقیه کار را انجام می‌دهد. این رویکرد، فرآیند توسعه را ساده‌تر و قابل اعتمادتر می‌کند.

نمونه‌ای از فایل `.gitlab-ci.yml` نسخه کامل استفاده شده برای اجرای این برنامه در **[بخش CI/CD](#gitlabcicd)** است.

```yaml
stages:
  - build
variables:
  # This variable is used to define the image name in the CI/CD jobs.
  # The value is pre-defined by GitLab CI/CD.
  # The full image name will be: $CI_REGISTRY_URL/$CI_PROJECT_PATH:$CI_COMMIT_SHORT_SHA
  IMAGE_ADDRESS: $CI_PROJECT_PATH
build docker image:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  only:
    refs:
      - main
  before_script:
    # Use the official CI_REGISTRY_URL, CI_REGISTRY_USERNAME, and CI_REGISTRY_PASSWORD
    # predefined variables provided by GitLab.
    - docker login $CI_REGISTRY -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD
  script:
    # Navigate into the sample_app directory to build the Docker image
    - cd sample_app
    # Build the image and tag it with the commit short SHA
    - docker build . -t $CI_REGISTRY/$IMAGE_ADDRESS:$CI_COMMIT_SHORT_SHA
    # Push the image to the GitLab container registry
    - docker push $CI_REGISTRY/$IMAGE_ADDRESS:$CI_COMMIT_SHORT_SHA
```

**نکته:** متغییرهای استفاده شده در این برنامه به جر آنهایی که برای احراز هویت و اتصال به رجیستری تنظیم می‌شود (توضیح شده در بخش اتصال GitLab به Docker Registry)، در حالت پیشفرض به صورت خودکار مقداردهی شده و نیاز به اعمال تغییرات دستی ندارند.
شما می‌توانید دامنه خود را برای استفاده با سرویس **Kubit** از طریق تنظیمات DNS پیکربندی کنید. این فرآیند شامل ایجاد رکورد‌های خاصی در مدیریت DNS دامنه شما است.

### تنظیم DNS برای دامنه

برای اتصال دامنه خود به اپلیکیشن، باید آن را در پنل DNS کوبیت پیکربندی کنید. این فرآیند به شما امکان می‌دهد تا ترافیک ورودی به دامنه خود را به سرویس اپلیکیشن هدایت کنید. این کار معمولاً با تنظیم دو نوع رکورد اصلی انجام می‌شود:

1. **رکورد A**: این رکورد برای اتصال مستقیم دامنه اصلی (مانند `example.com`) به یک آدرس IP استفاده می‌شود.
2. **رکورد CNAME**: این رکورد برای اتصال زیردامنه‌ها (مانند `www.example.com` یا `app.example.com`) به نام دامنه دیگری به کار می‌رود.

**توجه داشته باشید** که پس از ایجاد یا ویرایش رکوردهای DNS، ممکن است مدتی طول بکشد تا تغییرات در سراسر اینترنت منتشر شوند که به آن **propagation** می‌گویند. پس از تکمیل این فرآیند، **می‌توانید با استفاده از آدرس دامنه خود به اپلیکیشن دسترسی داشته باشید**.

### نصب اپلیکیشن: از طریق استقرار فایل پیکربندی YAML در کوبچی

:::info[genpack]

**کوبچی**، فرایند نصب اپلیکیشن‌های جدید را بر اساس قالب قدرتمند و منعطف [**Genpack**](../charts/genpack-pr) انجام می‌دهد. برای آشنایی با جزئیات و قابلیت‌های این چارت، به صفحه اختصاصی آن در مستندات مراجعه کنید.

:::
استقرار یک اپلیکیشن در پلتفرم **کوبچی** از طریق تنظیم کردن یک فایل YAML است. این فایل به جای استفاده مستقیم از YAMLهای پیچیده **Kubernetes**، یک لایه انتزاعی ارائه می‌دهد که استقرار برنامه‌ها را بسیار ساده‌تر می‌کند. این فایل، تنظیمات و مشخصات لازم برای اجرای یک برنامه را در قالب یک `Pack` تعریف می‌کند. سپس سیستم اپراتور پک کوبچی (Pack Operator) از طریق این فایل، پیکربندی‌های مورد نیاز برنامه را ایجاد و تنظیم کرده و مدیریت آن‌ها را به عهده می‌گیرد.

استفاده از **Kubit Pack**، فرآیند استقرار یک برنامه Flask را به شکل زیر خودکار می‌کند:

1. **ساخت Deployment**: یک Deployment با ایمیج `democo-docker-sample.r1.kubit.dev/app-image-v4` ایجاد می‌کند.
2. **تنظیم منابع**: منابع CPU و Memory کانتینر را محدود می‌کند تا از مصرف بیش از حد جلوگیری شود.
3. **تزریق متغیرهای محیطی**: مقادیر `REDIS_URI`، `POSTGRES_URI` و `SENTRY_DSN` را به عنوان متغیرهای محیطی به کانتینر تزریق می‌کند.
4. **ایجاد Ingress**: یک Ingress برای دسترسی از طریق دامنه `new1.demo.sabz.cloud` ایجاد می‌کند و گواهی TLS را برای HTTPS فعال می‌کند.

این رویکرد، توسعه‌دهنده را از جزئیات پیچیده Kubernetes (مثل ConfigMaps, Secrets, Ingresses, Deployments و Services) دور می‌کند و در عوض این کارها را به سیستم اپراتور پک کوبچی (Pack Operator) می‌سپارد و به او اجازه می‌دهد تنها روی تنظیمات مربوط به برنامه خود تمرکز کند.

```yaml
apiVersion: k8s.kubit.ir/v1alpha1
kind: Pack
metadata:
  name: sample-app
  namespace: base
spec:
  chart:
    repository:
      kind: ClusterPackRepository
      name: kubit-paas
    name: simplepack
    version: ~=0.3.1
  values:
    gonbad:
      workloads:
        main:
          containers:
            main:
              image:
                tag: 'latest'
                repository: democo-docker-sample.r1.kubit.dev/app-image-v4
              ports:
                http:
                  number: 5000
              resources:
                limits:
                  cpu: 100m
                  memory: 100Mi
      volumes:
        main:
          enabled: false
      ingresses:
        main:
          enabled: true
          tls:
            - secretName: managed-tools-star-demo.sabz.cloud-tls
          hosts:
            - host: new.demo.sabz.cloud
    global:
      sharedConfigs:
        DSN: https://779316d3ca3c340da70e317f94dba367@sentry.kubit.dev/308
        # POSTGRES_URI: postgres://uouser:thisispasss@postgres-edu.base:5432/db
        REDIS_URI: redis://:S6hf6vS2HPdshndgGTroWPtsvFOMSwOSFATVSm9d@redis-edu.base:6379/
        POSTGRES_URI: postgres://postgres:thisispass@test-postgresql-ha.new-test-ns.svc.cluster.local:5432/postgres
        SENTRY_DSN: https://779316d3ca3c340da70e317f94dba367@sentry.kubit.dev/308
```

#### توضیح بخش‌های اصلی فایل پیکربندی

#### ۱. `apiVersion`, `kind`, `metadata`

این بخش‌ها ساختار اصلی فایل را مشخص می‌کنند:

- **`apiVersion`**: نسخه API که فایل از آن استفاده می‌کند (`k8s.kubit.ir/v1alpha1`).
- **`kind`**: نوع شیء که تعریف می‌کنید. در اینجا، `Pack` به معنای یک بسته نرم‌افزاری آماده برای استقرار است.
- **`metadata`**: اطلاعات شناسایی آبجکت، شامل:
  - **`name`**: نام دلخواه برای این استقرار (deploy) (`sample-app`).
  - **`namespace`**: فضای نام Kubernetes که برنامه در آن اجرا می‌شود (`base`).

#### ۲. `spec.chart`

این بخش، به یک **Helm Chart** اشاره می‌کند که به عنوان الگوی اصلی برای استقرار (deploy) برنامه استفاده می‌شود.

- **`repository.kind`**: نوع مخزن چارت (`ClusterPackRepository`).
- **`repository.name`**: نام مخزن (`kubit-paas`).
- **`name`**: نام چارت مورد استفاده (`simplepack`). این چارت، ساختارهای لازم (مثل Deployment، Service و Ingress) را برای اپلیکیشن فراهم می‌کند.
- **`version`**: نسخه چارت مورد نیاز (`~=0.3.1`).

#### ۳. `spec.values`

این بخش مهم‌ترین قسمت است و شامل تنظیمات خاصی است که مقادیر پیش‌فرض Helm Chart را تغییر می‌دهد. این مقادیر به صورت تو در تو (nested) تنظیم شده‌اند.

- **`gonbad.workloads.main`**:
  - **`containers.main.image`**: مشخصات داکر ایمیج برنامه.
    - **`repository`**: آدرس مخزن ایمیج (`democo-docker-sample.r1.kubit.dev/app-image-v4`).
    - **`tag`**: تگ ایمیج (`latest`).
  - **`containers.main.ports.http.number`**: پورتی که برنامه روی آن اجرا می‌شود (`5000`).
  - **`containers.main.resources`**: محدودیت‌های منابع (CPU و Memory) برای کانتینر.
    - **`limits`**:
      - **`cpu`**: `100m` (100 میلی‌هسته).
      - **`memory`**: `100Mi` (100 مبی‌بایت).
- **`gonbad.volumes.main.enabled`**:
  - **`false`**: این تنظیم نشان می‌دهد که برنامه از Volume برای ذخیره‌سازی دائمی داده‌ها استفاده نمی‌کند.
- **`gonbad.ingresses.main`**:
  - **`enabled`**: `true`، نشان می‌دهد که دسترسی از طریق اینترنت به برنامه فعال است.
  - **`tls`**:
    - **`secretName`**: نام Secret برای گواهی SSL/TLS (`managed-tools-star-demo.sabz.cloud-tls`).
  - **`hosts`**:
    - **`host`**: آدرس دامنه برای دسترسی به برنامه (`new.demo.sabz.cloud`).
- **`global.sharedConfigs`**:
  - این بخش برای تعریف **متغیرهای محیطی** مشترک (مانند DSN، URI پایگاه داده و ...) استفاده می‌شود که در کد برنامه قابل دسترسی هستند.
  - **`DSN`** و **`SENTRY_DSN`**: آدرس DSN مربوط به Sentry برای ثبت خطاها.
  - **`REDIS_URI`**: URI اتصال به سرویس Redis که شامل نام کاربری، رمز عبور، آدرس و پورت است.
  - **`POSTGRES_URI`**: URI اتصال به سرویس PostgreSQL که شامل اطلاعات پایگاه داده، نام کاربری، رمز عبور و آدرس است.

#### ریسک‌های احتمالی و بهبودهای پیشنهادی

- **عدم همگام‌سازی (Drift)**: ریسکی که در استقرار اپلیکیشن‌ها از طریق یک فایل YAML `pack`، عدم همگام‌سازی بین وضعیت پیکربندی در مخزن گیت و وضعیت واقعی آن در محیط Kubernetes است. اگر تغییراتی به صورت دستی در خوشه (Cluster) اعمال شود (مثلاً از طریق محیط ترمینال پنل یا دستورات `kubectl`)، این تغییرات در فایل YAML گیت منعکس نخواهند شد و باعث ایجاد **Drift** می‌شود. در نتیجه، اگر نیاز به بازگشت به نسخه قبلی یا استقرار مجدد باشد، پیکربندی واقعی با آنچه در گیت ثبت شده، متفاوت خواهد بود. استفاده از GitOps کوبچی برای مدیریت تغییرات است.
  **راه حل -> استفاده از ابزارهای همگام‌ساز**: **[ابزار GitOps کوبچی](#gitops)** را برای کلاستر Kubernetes تنظیم می‌کنید. این ابزار به طور مداوم و در بازه‌های زمانی کوتاه، وضعیت واقعی خوشه را با پیکربندی موجود در مخزن گیت مقایسه می‌کند.
- **پیکربندی اطلاعات حساس**: اطلاعات حساس مانند **SENTRY_DSN**، **POSTGRES_URI** و **REDIS_URI** به صورت مستقیم در فایل YAML قرار گرفته‌اند. اگرچه این فایل به صورت داخلی مدیریت می‌شود، اما ذخیره مستقیم این اطلاعات در کد منبع (Repository) یک ریسک امنیتی محسوب می‌شود. برای محیط‌های تولید، بهتر است از مکانیسم‌های **مدیریت والت کوبچی** استفاده کنید.
  **راه حل -> جداسازی اطلاعات حساس**: به جای قرار دادن مستقیم `URI` سرویس‌ها در فایل YAML، از **والت کوبچی** استفاده کنید. در این حالت، شما تنها به نام Secret در YAML ارجاع می‌دهید و مقدار واقعی آن در یک Secret جداگانه ذخیره می‌شود که دسترسی به آن محدود است. این کار امنیت را به شدت افزایش می‌دهد.
  :::info [زیرسامانه مدیریت والت کوبچی]
  ;کوبچی دارای یک زیرسامانه اختصاصی مدیریت والت است؛ می‌توانید از [والت](../kubchi/vault) برای رمزنگاری رمزها و داده‌های حساس خود استفاده کنید.
  :::
- **عدم مدیریت نسخه‌ها**: در این فایل، از تگ **`'latest'`** برای ایمیج داکر استفاده شده است. این کار یک ریسک جدی محسوب می‌شود، چرا که هر زمان ایمیج جدیدی با همین تگ منتشر شود، برنامه بدون اطلاع‌رسانی قبلی و به صورت خودکار (در صورت فعال بودن این گزینه در کوبچی) به‌روز می‌شود. این می‌تواند منجر به استقرار نسخه‌های ناپایدار در محیط تولید شود.
  **راه حل -> مدیریت نسخه‌بندی ایمیج با CI/CD** : استفاده از تگ `latest` برای ایمیج‌های داکر یک ریسک بزرگ در محیط‌های تولید است، زیرا می‌تواند به صورت غیرمنتظره به آخرین نسخه برنامه به‌روزرسانی شود. بهترین راه‌حل برای این مشکل، استفاده از یک **[سیستم CI/CD (Continuous Integration / Continuous Deployment)](#gitlabcicd)** است.
- **مانیتورینگ جامع**: برای نظارت بر عملکرد و سلامت برنامه در محیط اجرا، از ابزارهای مانیتورینگ مانند **Prometheus** و **Grafana** استفاده کنید. این ابزارها با جمع‌آوری معیارهایی (Metrics) مانند میزان مصرف CPU و Memory، تعداد درخواست‌ها و تأخیر پاسخ‌ها، به شما کمک می‌کنند تا مشکلات را قبل از بحرانی شدن شناسایی و رفع کنید.

### بخش دوم استفاده از GitLab و مدیریت نسخه‌بندی ایمیج از طریق CI/CD: ارسال متغییر های استقرار به کوبیت {#gitlabcicd}

:::info[قابلیت CI/CD کوبچی]

برای استفاده از این قابلیت و امکانات جانبی آن و همچنین دریافت تمپلیت نمونه، [این مستند](../kubchi/conint) را مطالعه کنید.

:::
یک سیستم CI/CD می‌تواند به صورت خودکار، تگ‌گذاری ایمیج‌ها را بر اساس هر به‌روزرسانی در کد انجام دهد و این فرآیند را قابل ردیابی و مدیریت کند.

#### گذار به استقرار با CI/CD در دو مرحله

این فرآیند به دو مرحله تقسیم می‌شود تا شما بتوانید از حالت دستی به حالت خودکارسازی کامل با CI/CD منتقل شوید:

#### مرحله اول: استقرار دستی اولیه

در اولین استقرار، باید به صورت دستی در فایل **پیکربندی (`.yaml`)** برنامه، آدرس کامل ایمیج داکر را وارد کنید. این ایمیج باید از قبل در Registry شما موجود باشد. می‌توانید ایمیج برنامه‌های خود را به صورت دستی با استفاده از Docker CLI یا از طریق یک pipeline CI/CD ساخته و Push کنید. پس از این مرحله یک نسخه اولیه از برنامه در دسترس بوده و آن را با استفاده از تعریف فایل yaml پک، در کوبچی (PaaS) فعال می‌کنید.

نمونه تعریف شده:

```yml
spec:
  chart:
    repository:
      kind: ClusterPackRepository
      name: kubit-paas
    name: simplepack
    version: ~=0.3.1
  values:
    gonbad:
      workloads:
        main:
          containers:
            main:
              image:
                tag: 'latest' #or $CI_COMMIT_SHORT_SHA for a variable defenition  using CI/CD variables from GitLab
                repository: democo-docker-sample.r1.kubit.dev/app-image-v4
```

#### مرحله دوم: انتقال به استقرار خودکار با CI/CD

پس از استقرار دستی موفق، می‌توانید فرآیند را خودکار کنید. در این مرحله، فایل `.gitlab-ci.yml` را طوری تنظیم می‌کنید که:

1. ایمیج جدید را با هر **Commit** در گیت‌هاب بسازد.
2. ایمیج را با یک تگ یکتا (مثلاً **`CI_COMMIT_SHORT_SHA`**) تگ کند.
3. سپس، به جای تگ ثابت ایمیج، از یک **متغیر CI/CD** در فایل `yaml` خود استفاده می‌کند.

---

کد زیر یک فایل **GitLab CI/CD Pipeline** است که برای **خودکارسازی فرآیند توسعه و استقرار (CI/CD)** یک برنامه استفاده می‌شود. این پایپ‌لاین شامل دو مرحله اصلی است: `build` و `deploy`.

1. ایمیج داکر برنامه ساخته و تگ‌گذاری می‌شود.
2. ایمیج در Docker Registry ذخیره می‌شود.
3. سپس، یک job استقرار **به صورت غیر دستی** در دسترس قرار می‌گیرد که با یک کلیک، ایمیج جدید را به پلتفرم کوبچی ارسال و مستقر می‌کند. این فرآیند از ریسک‌های استفاده از تگ از پیش تعیین شده (مانند `latest`) جلوگیری کرده و یک فرآیند استقرار امن و کنترل‌شده را فراهم می‌کند.
   با وبهوک ارتباط برقرار می کند.

با انجام صحیح این کار، از این پس هر زمان که کد را به گیت Push کنید، CI/CD به صورت خودکار ایمیج جدید را می‌سازد و تگ آن را به روزرسانی می‌کند، و نیازی به دخالت دستی شما نخواهد بود. این رویکرد، فرآیند توسعه را قابل اطمینان و قابل ردیابی می‌کند.
نسخه کامل فایل `.gitlab-ci.yml` برای راه‌اندازی این اپلیکیشن به صورت زیر خواهد بود:

```yaml
stages:
  - build
  - deploy

variables:
  # This variable is used to define the image name in the CI/CD jobs.
  # The value is pre-defined by GitLab CI/CD.
  # The full image name will be: $CI_REGISTRY_URL/$CI_PROJECT_PATH:$CI_COMMIT_SHORT_SHA
  IMAGE_ADDRESS: $CI_PROJECT_PATH

build docker image:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  only:
    refs:
      - main
  before_script:
    # Use the official CI_REGISTRY_URL, CI_REGISTRY_USERNAME, and CI_REGISTRY_PASSWORD
    # predefined variables provided by GitLab.
    - docker login $CI_REGISTRY -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD
  script:
    # Navigate into the sample_app directory to build the Docker image
    - cd sample_app
    # Build the image and tag it with the commit short SHA
    - docker build . -t $CI_REGISTRY/$IMAGE_ADDRESS:$CI_COMMIT_SHORT_SHA
    # Push the image to the GitLab container registry
    - docker push $CI_REGISTRY/$IMAGE_ADDRESS:$CI_COMMIT_SHORT_SHA

deploy:
  stage: deploy
  image: docker.kubit.dev/curlimages/curl:latest
  only:
    refs:
      - main
  needs:
    - build docker image
  when: manual
  script:
    - 'set -ex'
    # Use curl to send a POST request to the webhook URL
    # -F DOCKER_TAG: Sends the Docker tag as form data
    # -H "Authorization: Bearer ...": Sets the Authorization header
    # The variables KUBIT_WEBHOOK_URL and KUBIT_WEBHOOK_TOKEN must be configured as CI/CD variables in your GitLab project settings.
    - 'curl -X POST -f -s -F DOCKER_TAG=$CI_COMMIT_SHORT_SHA -H "Authorization: Bearer ${KUBIT_WEBHOOK_TOKEN}" ${KUBIT_WEBHOOK_URL}'
```

این رویکرد تضمین می‌کند که هر نسخه از ایمیج داکر به یک نسخه مشخص از کد منبع مرتبط است. این کار امکان **بازگشت به نسخه قبلی (Rollback)** را در صورت بروز خطا آسان می‌کند، زیرا دقیقاً می‌دانید کدام نسخه از کد باعث مشکل شده است. به این ترتیب، با حذف تگ ثابت (مانند `latest`)، فرآیند استقرار کاملاً قابل پیش‌بینی، امن و قابل ردیابی می‌شود.

### پیاده‌سازی GitOps {#gitops}

با رویکرد **GitOps**، شما یک سیستم امن و قابل اطمینان برای مدیریت زیرساخت خود ایجاد می‌کنید. هیچ تغییری در زیرساخت نباید به صورت دستی اعمال شود؛ پس از ویرایش و Merge کردن فایل‌های کد در گیتلب، هر زمان که یک تغییر در مخزن اصلی (Main Branch) ایجاد شود، **کوبچی** به صورت خودکار آن تغییر را شناسایی کرده و وضعیت کلاستر Kubernetes را با محتوای مخزن همگام می‌کند. این کار تضمین می‌کند که وضعیت واقعی برنامه همیشه با آنچه در گیتلب ثبت شده، یکسان باشد و فرآیند مدیریت نسخه‌ها را به صورت کامل خودکار، قابل ردیابی و بازگشت‌پذیر می‌کند.

این الگو، گیت را به عنوان **"تنها منبع حقیقت" (Single Source of Truth)** برای وضعیت برنامه و زیرساخت تبدیل می‌کند. برای پیاده‌سازی موفق این الگو با **کوبچی**، باید دو مرحله کلیدی را طی کنید:

#### ۱. تنظیم مخزن و محل ذخیره فایل در کوبچی

- در پلتفرم **کوبچی**، باید به بخش مدیریت **GitOps** بروید و مخزن گیت مورد نظر خود (مثلاً یک ریپو در گیت‌هاب یا گیت‌لب) را به آن متصل کنید.
- شما باید یک توکن دسترسی (Access Token) به کوبچی بدهید تا بتواند به مخزن شما دسترسی داشته باشد.
- سپس، مسیری را که فایل‌های پیکربندی **`Pack`** در آن قرار دارند (مثلاً `app/packs/sample-app.yaml`) مشخص می‌کنید. این کار به کوبچی می‌گوید که کدام فایل‌ها را برای اعمال تغییرات در خوشه پایش کند.

#### ۲. مدیریت نسخه‌های مختلف با Git

- به جای ویرایش دستی فایل YAML در کوبچی، می‌توانید هرگونه تغییر در پیکربندی (مثلاً به‌روزرسانی مخرن ایمیج) را از طریق **Pull Request (PR)** در مخزن گیت خود (GitLab) انجام دهید.

## استقرار موفق اپ با کوبیت

با استفاده از امکانات یکپارچه کوبیت کلاود، مدیریت کامل فرایند ساخت و استقرار یک اپلیکیشن در کوبرنتیز را راحت‌تر، به طور جامع مدیریت نمایید.
