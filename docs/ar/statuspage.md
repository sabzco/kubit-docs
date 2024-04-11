# نظام المراقبة

هذا النظام مسؤول عن مراقبة وتوفير حالة مختلفة من الأنظمة.
في هذا النظام، يجب أولاً تعريف خدمات مختلفة، ثم يمكن تعيين أنواع مختلفة من المراقبين ذوي الميزات المختلفة لكل خدمة.
حاليًا، يمكن تعريف المراقبين التالية في النظام (يمكن تعيين عدة مراقبين من نفس النوع لكل خدمة):
![img.png](img.png)

- مراقبة حالة عنوان URL
- مراقبة عنوان URL مع خيارات لتحديد الطريقة، اسم المستخدم، كلمة المرور، رؤوس الطلب، معلمات الطلب، وجسم الطلب
- مراقبة البينج
- مراقبة حالة البينج لاسم المضيف مع خيارات لتحديد الوقت القصوى للاستجابة، TTL، والبينج الأقصى
- مراقبة DNS
- مراقبة حالة DNS لاسم مضيف مع خيارات لتحديد نوع سجل DNS، خوادم الاسم، وأقصى وقت استجابة لـ DNS
- مراقبة شهادة SSL
- مراقبة الحالة وعدد الأيام المتبقية حتى انتهاء صلاحية شهادة SSL لاسم مضيف مع خيارات لتحديد الحد الأقصى لعدد الأيام قبل الانتهاء
- مراقبة عنصر Zabbix
- مراقبة حالة عنصر Zabbix محدد

بالإضافة إلى ذلك، يسمح النظام بكتابة وصف لحوادث أو أحداث مختلفة لتاريخ محدد في النظام.
ميزة أخرى لهذا النظام هي القدرة على تثبيت عملاء مختلفين في مواقع جغرافية مختلفة للتحقيق ومراقبة حالة الخدمات من مواقع مختلفة.
يتم عرض حالة الأنظمة المختلفة في رسوم بيانية شهرية، مع ألوان مختلفة تشير إلى حالة المراقبة في أوقات مختلفة للمستخدم.
يتم النظر في العناصر التالية في خطة المستقبل لهذا النظام، ليتم تنفيذها عند الحاجة:

- Ports Monitoring
- Firewall Rules
- Database Monitoring
- Custom Agents such as redis, elastic, …
- رسوم بيانية أسبوعية ويومية