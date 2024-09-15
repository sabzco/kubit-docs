---
subDocuments:
  - settings
  - create-ticket
---

# الدعم

تقدم خدمة دعم کوبیت جميع الميزات اللازمة لإدارة تذاكر العملاء وتقديم خدمات الدعم.

## المفاهيم الأساسية

### تذكرة

التذكرة هي طلب أو شكوى من العميل يتم تقديمها لحل مشكلة أو تقديم خدمة.

### نظام الدعم (التذاكر)

نظام الدعم هو نظام يُستخدم لإدارة التذاكر وتقديم خدمات الدعم للعملاء.

### حالة التذكرة

حالة التذكرة تشير إلى المراحل المختلفة التي تمر بها التذكرة خلال دورة حياتها.

### قائمة الحالات

- **في انتظار الرد**: أي تذكرة يتم إنشاؤها بواسطة العميل في اللوحة، تتغير حالتها في البداية إلى انتظار الرد.
- **قيد التنفيذ**: عندما يقبل أحد موظفي الدعم التذكرة للمراجعة، تتغير حالة التذكرة إلى قيد التنفيذ.
- **في انتظار العميل**: إذا تم إرسال رد من الدعم إلى العميل، تتغير حالة التذكرة إلى في انتظار العميل.
- **مغلق**: عندما يتم تنفيذ طلب المستخدم ويتم حل المشكلة أو يتم إغلاق التذكرة بواسطة المستخدم، تتغير الحالة إلى مغلق.

### أولوية التذكرة

تحدد الأولوية أهمية أو إلحاح مراجعة التذكرة.

### قائمة الأولويات

- حرجة
- عاجلة
- عالية
- عادية
- منخفضة

:::info[الأولوية الافتراضية]
عند إنشاء تذكرة، يتم تعيين الأولوية الافتراضية إلى عادية، والتي يمكن تغييرها.
:::

### تصنيف التذاكر

الفئات المستخدمة لتقسيم التذاكر بناءً على نوع المشكلة أو الطلب.

- الفئات
- التفعيل
- الفنية المالية
- المبيعات

### دورة حياة التذكرة

أي تذكرة يتم إرسالها بواسطة العميل تكون في البداية **في حالة انتظار الرد**. عندما يبدأ فرد الدعم في مراجعة التذكرة، تتغير الحالة إلى **قيد التنفيذ**. بعد المراجعة، إذا كانت هناك أي أسئلة للعميل أو كانت هناك حاجة لمزيد من المعلومات من العميل، يتم إنشاء رسالة ضمن نفس التذكرة للعميل، وتتغير الحالة إلى **في انتظار العميل**. يستمر هذا الدورة حتى يتم حل المشكلة. بعد حل المشكلة، وإذا لم يتم إرسال أي رسائل أخرى من العميل خلال 48 ساعة بعد رد الدعم، يتم إغلاق التذكرة تلقائيًا.

### SLA (اتفاقية مستوى الخدمة)

SLA هو اختصار لاتفاقية مستوى الخدمة، والتي تحدد الالتزامات والمعايير والمقاييس الأداء بين مزود الخدمة والعميل. تتلقى كل منظمة SLAs للتذاكر ذات الأولويات المختلفة وفقًا لخطة الدعم الخاصة بها.

#### خطط الدعم

يوضح الجدول أدناه خطط الدعم المقدمة من كوبيت:

|                            اولویت |    سازمانی     |   متقدم    |   متوسط   |    أساسي    |
| --------------------------------: | :------------: | :--------: | :-------: | :---------: |
|             منخفضة (إرشادات عامة) |   < 24 ساعة    | < 24 ساعة  | < 48 ساعت |  < 48 ساعت  |
|             عادية (خلل في النظام) |   < 12 ساعة    | < 12 ساعة  | < 12 ساعة |  < 24 ساعة  |
|       عالية (خلل في نظام الإنتاج) |    < 4 ساعة    |  < 8 ساعة  | < 8 ساعة  |      -      |
|         عاجلة (توقف نظام الإنتاج) |    < 1 ساعة    |  < 2 ساعة  | < 2 ساعة  |      -      |
| حرجة (توقف النظام الحيوي للأعمال) | <10 - 30 دقيقة | < 30 دقیقه |     -     |      -      |
|                       الدعم الفني |      24/7      |    24/7    |   24/7    | ساعات العمل |

:::info[خطة الدعم الافتراضية]
يتم تعيين خطة الدعم الأساسية افتراضيًا للمنظمات الجديدة.
:::

:::tip[خطة الدعم المخصصة]
من الممكن أيضًا إعداد خطة دعم مخصصة للمنظمات الكبيرة، والتي يمكن ترتيبها عن طريق التواصل مع فريق دعم کوبیت.
:::